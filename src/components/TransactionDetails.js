import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import HeatmapModule from 'highcharts/modules/heatmap';
import ExportingModule from 'highcharts/modules/exporting';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Container,
  FormControlLabel,
  Switch,
  Box
} from '@mui/material';
import DownloadExcelButton from './DownloadExcelButton'; // Import the download button
import { auth } from '../utils/firebaseConfig'; // Assuming you have auth setup for user ID
import { saveTransactionDetails, getTransactionDetails } from '../utils/firebaseHelpers'; // Import Firebase functions

// Initialize Highcharts modules
HeatmapModule(Highcharts);
ExportingModule(Highcharts);

const generateDetailedRandomSubElements = (totalAmount) => {
  const productUnits = [];
  const workUnits = [];

  const numProductUnits = Math.floor(Math.random() * 3) + 1;
  let remainingAmount = totalAmount;

  for (let i = 0; i < numProductUnits; i++) {
    const unitPrice = Math.floor(Math.random() * 100) + 50;
    const quantity = Math.floor(Math.random() * 10) + 1;
    const discount = Math.floor(Math.random() * 20);
    const totalBeforeDiscount = unitPrice * quantity;
    const discountedTotal = totalBeforeDiscount - (totalBeforeDiscount * discount) / 100;

    const purchaseDate = new Date(Date.now() - Math.floor(Math.random() * 10000000000)); // Random date in the past

    if (i === numProductUnits - 1) {
      productUnits.push({
        id: `Product ${i + 1}`,
        description: `A detailed description of Product ${i + 1}`,
        unitPrice,
        quantity,
        discount,
        totalBeforeDiscount,
        finalAmount: remainingAmount,
        notes: `Includes a discount of ${discount}%`,
        purchaseDate,
      });
    } else {
      productUnits.push({
        id: `Product ${i + 1}`,
        description: `A detailed description of Product ${i + 1}`,
        unitPrice,
        quantity,
        discount,
        totalBeforeDiscount,
        finalAmount: discountedTotal,
        notes: `Includes a discount of ${discount}%`,
        purchaseDate,
      });
      remainingAmount -= discountedTotal;
    }
  }

  const workTypes = ['hourly', 'daily', 'monthly', 'yearly', 'bonus'];
  const numWorkUnits = Math.floor(Math.random() * 3) + 1;

  for (let i = 0; i < numWorkUnits; i++) {
    const rate = Math.floor(Math.random() * 50) + 20;
    const hoursWorked = Math.floor(Math.random() * 100) + 10;
    const totalEarnings = rate * hoursWorked;

    if (i === numWorkUnits - 1) {
      workUnits.push({
        type: workTypes[Math.floor(Math.random() * workTypes.length)],
        rate,
        hoursWorked,
        totalEarnings: remainingAmount,
        notes: `Payment based on ${workTypes[i]} rate`,
      });
    } else {
      workUnits.push({
        type: workTypes[Math.floor(Math.random() * workTypes.length)],
        rate,
        hoursWorked,
        totalEarnings,
        notes: `Payment based on ${workTypes[i]} rate`,
      });
      remainingAmount -= totalEarnings;
    }
  }

  return { productUnits, workUnits };
};

const AccountingSummary = () => {
  const [transactionRow, setTransactionRow] = useState();
  const [detailedMontants, setDetailedMontants] = useState([]);
  const [viewCharts, setViewCharts] = useState(false);  // State to control view
  const [transactionType, setTransactionType] = useState('');
  const userId = auth.currentUser?.uid;

  useEffect(() => {
    const fetchOrGenerateDetails = async () => {
      const savedTransaction = JSON.parse(localStorage.getItem('selectedTransaction'));
      const selectedTransactionType = localStorage.getItem('selectedTransactionType') || '';
      setTransactionType(selectedTransactionType);

      setTransactionRow(savedTransaction);

      if (savedTransaction && userId) {
        const transactionId = savedTransaction.id;

        // Try to fetch existing transaction details from the database
        const transactionDetails = await getTransactionDetails(userId, transactionId);

        if (transactionDetails) {
          // If details exist, use them
          setDetailedMontants(transactionDetails.detailedMontants);
        } else {
          // If no details exist, generate new details
          const detailed = savedTransaction.montants.map((totalAmount) => {
            const detailedAnalysis = generateDetailedRandomSubElements(totalAmount);
            return { totalAmount, ...detailedAnalysis };
          });

          setDetailedMontants(detailed);

          // Save the newly generated details to the database
          await saveTransactionDetails(userId, transactionId, { detailedMontants: detailed });
        }
      }
    };

    fetchOrGenerateDetails();
  }, [userId]);

  const getTranslatedText = (key) => {
    const translations = {
      decaissements: {
        initialAmount: 'Initial Outflow Amount',
        productSales: 'Product Purchases',
        workEarnings: 'Work Payments',
        financialOverview: 'Expenditure Overview',
        mostProfitableProducts: 'Most Expensive Products',
        productSalesHeatmap: 'Purchase Frequency Heatmap',
        productPurchaseTrends: 'Product Purchase Trends',
      },
      encaissements: {
        initialAmount: 'Initial Inflow Amount',
        productSales: 'Product Sales',
        workEarnings: 'Work Earnings',
        financialOverview: 'Revenue Overview',
        mostProfitableProducts: 'Most Profitable Products',
        productSalesHeatmap: 'Sales Heatmap',
        productPurchaseTrends: 'Product Sales Trends',
      },
    };

    return translations[transactionType]?.[key] || key;
  };

  const renderGraphOptions = (detailedMontants) => {
    const months = detailedMontants.map((_, index) => `Month ${index + 1}`);
    const productAmounts = detailedMontants.map(
      (monthDetail) => monthDetail.productUnits.reduce((sum, unit) => sum + unit.finalAmount, 0)
    );
    const workAmounts = detailedMontants.map(
      (monthDetail) => monthDetail.workUnits.reduce((sum, unit) => sum + unit.totalEarnings, 0)
    );

    return {
      chart: {
        type: 'column'
      },
      title: {
        text: 'Financial Overview'
      },
      xAxis: {
        categories: months,
        crosshair: true
      },
      yAxis: {
        min: 0,
        title: {
          text: 'Amount (€)'
        }
      },
      tooltip: {
        headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
        pointFormat:
          '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
          '<td style="padding:0"><b>{point.y:.1f} €</b></td></tr>',
        footerFormat: '</table>',
        shared: true,
        useHTML: true
      },
      plotOptions: {
        column: {
          pointPadding: 0.2,
          borderWidth: 0
        }
      },
      series: [
        {
          name: getTranslatedText('productSales'),
          data: productAmounts
        },
        {
          name: getTranslatedText('workEarnings'),
          data: workAmounts
        }
      ]
    };
  };

  const renderProfitableProductsChart = (detailedMontants) => {
    const productProfits = {};

    detailedMontants.forEach((monthDetail) => {
      monthDetail.productUnits.forEach((unit) => {
        if (productProfits[unit.id]) {
          productProfits[unit.id] += unit.finalAmount;
        } else {
          productProfits[unit.id] = unit.finalAmount;
        }
      });
    });

    const sortedProductProfits = Object.entries(productProfits).sort(
      (a, b) => b[1] - a[1]
    );

    return {
      chart: {
        type: 'bar'
      },
      title: {
        text: 'Most Profitable Products'
      },
      xAxis: {
        categories: sortedProductProfits.map(([product]) => product),
        title: {
          text: null
        }
      },
      yAxis: {
        min: 0,
        title: {
          text: 'Total Profit (€)',
          align: 'high'
        },
        labels: {
          overflow: 'justify'
        }
      },
      tooltip: {
        valueSuffix: ' €'
      },
      plotOptions: {
        bar: {
          dataLabels: {
            enabled: true
          }
        }
      },
      series: [
        {
          name: 'Profit',
          data: sortedProductProfits.map(([_, profit]) => profit)
        }
      ]
    };
  };

  const renderSalesHeatmapOptions = (detailedMontants) => {
    const heatmapData = [];

    detailedMontants.forEach((monthDetail, monthIndex) => {
      monthDetail.productUnits.forEach((unit) => {
        const productIndex = parseInt(unit.id.split(' ')[1], 10) - 1;
        heatmapData.push([productIndex, monthIndex, unit.quantity]);
      });
    });

    const productIds = Array.from(
      new Set(detailedMontants.flatMap((monthDetail) => monthDetail.productUnits.map((unit) => unit.id)))
    );

    return {
      chart: {
        type: 'heatmap',
        marginTop: 40,
        marginBottom: 80
      },
      title: {
        text: 'Product Sales Heatmap'
      },
      xAxis: {
        categories: productIds
      },
      yAxis: {
        categories: detailedMontants.map((_, index) => `Month ${index + 1}`),
        title: null
      },
      colorAxis: {
        min: 0,
        minColor: '#FFFFFF',
        maxColor: '#FF5733'
      },
      legend: {
        align: 'right',
        layout: 'vertical',
        margin: 0,
        verticalAlign: 'top',
        y: 25,
        symbolHeight: 280
      },
      tooltip: {
        formatter: function () {
          return `<b>${this.series.xAxis.categories[this.point.x]}</b><br><b>${this.point.value}</b> units sold in <br><b>${this.series.yAxis.categories[this.point.y]}</b>`;
        }
      },
      series: [
        {
          name: 'Sales per Product',
          borderWidth: 1,
          data: heatmapData,
          dataLabels: {
            enabled: true,
            color: '#000000'
          }
        }
      ]
    };
  };

  const renderPurchaseTrendsChart = (detailedMontants) => {
    const purchaseData = [];

    detailedMontants.forEach((monthDetail) => {
      monthDetail.productUnits.forEach((unit) => {
        purchaseData.push([unit.purchaseDate.getTime(), unit.finalAmount]);
      });
    });

    return {
      chart: {
        type: 'scatter'
      },
      title: {
        text: 'Product Purchase Trends'
      },
      xAxis: {
        type: 'datetime',
        title: {
          text: 'Date'
        }
      },
      yAxis: {
        title: {
          text: 'Amount (€)'
        }
      },
      tooltip: {
        formatter: function () {
          return `<b>${Highcharts.dateFormat('%A, %b %e, %Y', this.x)}</b><br>Amount: <b>${this.y} €</b>`;
        }
      },
      series: [{
        name: 'Purchases',
        data: purchaseData,
        marker: {
          radius: 5,
          symbol: 'circle'
        }
      }]
    };
  };

  if (!transactionRow) {
    return <div>Loading...</div>;
  }

  return (
    <Container maxWidth="xl" sx={{ paddingTop: 3, paddingBottom: 7 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="h4" gutterBottom>
          {getTranslatedText('financialOverview')} for: {transactionRow.nature}
        </Typography>
        <FormControlLabel
          control={
            <Switch
              checked={viewCharts}
              onChange={() => setViewCharts(!viewCharts)}
              name="viewToggle"
              color="primary"
            />
          }
          label={viewCharts ? "Show Charts" : "Show Tables"}
        />
        <DownloadExcelButton detailedMontants={detailedMontants} />
      </Box>

      {!viewCharts && (
        <>
          <Typography variant="h6" gutterBottom>
            {getTranslatedText('initialAmount')}: {transactionRow.montantInitial}€
          </Typography>

          <Typography variant="h5" gutterBottom>
            Detailed Breakdown
          </Typography>
          {detailedMontants.map((monthDetail, index) => (
            <div key={index} style={{ marginBottom: '20px' }}>
              <Typography variant="h6">Month {index + 1}</Typography>
              <Typography variant="subtitle1">Total Amount: {monthDetail.totalAmount}€</Typography>

              <Typography variant="subtitle2">{getTranslatedText('productSales')}</Typography>
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow sx={{ backgroundColor: '#424242' }}>
                      <TableCell sx={{ color: '#ffffff' }}>Product ID</TableCell>
                      <TableCell sx={{ color: '#ffffff' }}>Description</TableCell>
                      <TableCell sx={{ color: '#ffffff' }}>Unit Price</TableCell>
                      <TableCell sx={{ color: '#ffffff' }}>Quantity</TableCell>
                      <TableCell sx={{ color: '#ffffff' }}>Discount</TableCell>
                      <TableCell sx={{ color: '#ffffff' }}>Total Before Discount</TableCell>
                      <TableCell sx={{ color: '#ffffff' }}>Final Amount</TableCell>
                      <TableCell sx={{ color: '#ffffff' }}>Purchase Date</TableCell>
                      <TableCell sx={{ color: '#ffffff' }}>Notes</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {monthDetail.productUnits.map((unit, i) => (
                      <TableRow key={i} hover>
                        <TableCell>{unit.id}</TableCell>
                        <TableCell>{unit.description}</TableCell>
                        <TableCell>{unit.unitPrice}€</TableCell>
                        <TableCell>{unit.quantity}</TableCell>
                        <TableCell>{unit.discount}%</TableCell>
                        <TableCell>{unit.totalBeforeDiscount}€</TableCell>
                        <TableCell>{unit.finalAmount}€</TableCell>
                        <TableCell>{new Date(unit.purchaseDate).toDateString()}</TableCell>
                        <TableCell>{unit.notes}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>

              <Typography variant="subtitle2" style={{ marginTop: '20px' }}>
                {getTranslatedText('workEarnings')}
              </Typography>
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow sx={{ backgroundColor: '#424242' }}>
                      <TableCell sx={{ color: '#ffffff' }}>Type</TableCell>
                      <TableCell sx={{ color: '#ffffff' }}>Rate</TableCell>
                      <TableCell sx={{ color: '#ffffff' }}>Hours Worked</TableCell>
                      <TableCell sx={{ color: '#ffffff' }}>Total Earnings</TableCell>
                      <TableCell sx={{ color: '#ffffff' }}>Notes</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {monthDetail.workUnits.map((unit, i) => (
                      <TableRow key={i} hover>
                        <TableCell>{unit.type}</TableCell>
                        <TableCell>{unit.rate}€</TableCell>
                        <TableCell>{unit.hoursWorked}</TableCell>
                        <TableCell>{unit.totalEarnings}€</TableCell>
                        <TableCell>{unit.notes}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
          ))}
        </>
      )}

      {viewCharts && (
        <div className="chart-container">
          <Typography variant="h5" gutterBottom>
            Financial Overview
          </Typography>
          <HighchartsReact highcharts={Highcharts} options={renderGraphOptions(detailedMontants)} />

          <Typography variant="h5" gutterBottom>
            Most Profitable Products
          </Typography>
          <HighchartsReact highcharts={Highcharts} options={renderProfitableProductsChart(detailedMontants)} />

          <Typography variant="h5" gutterBottom>
            Product Sales Heatmap
          </Typography>
          <HighchartsReact highcharts={Highcharts} options={renderSalesHeatmapOptions(detailedMontants)} />

          <Typography variant="h5" gutterBottom>
            Product Purchase Trends
          </Typography>
          <HighchartsReact highcharts={Highcharts} options={renderPurchaseTrendsChart(detailedMontants)} />
        </div>
      )}
    </Container>
  );
};

export default AccountingSummary;
