import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { Box, Typography, Grid, Card, CardContent, Container } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import Backdrop from '@mui/material/Backdrop';

export default function BankTransfersDashboard({ fetchItems }) {
  const [transfersData, setTransfersData] = useState([]);
  const [transfersStatusDistribution, setTransfersStatusDistribution] = useState([]);
  const [amountByCurrency, setAmountByCurrency] = useState([]);
  const [transfersOverTimeData, setTransfersOverTimeData] = useState([]);
  const [averageAmountByStatus, setAverageAmountByStatus] = useState([]);
  const [tagsDistribution, setTagsDistribution] = useState([]);
  const [totalTransfers, setTotalTransfers] = useState(0);
  const [totalAmountTransferred, setTotalAmountTransferred] = useState(0);
  const [averageTransferAmount, setAverageTransferAmount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const data = await fetchItems();
      setTransfersData(data);
      processTransfersData(data);
      setLoading(false);
    };

    fetchData();
  }, [fetchItems]);

  const processTransfersData = (data) => {
    // Total Number of Transfers
    setTotalTransfers(data.length);

    // Total Amount Transferred
    const totalAmount = data.reduce((acc, transfer) => acc + Number(transfer.amount), 0);
    setTotalAmountTransferred(totalAmount);

    // Average Transfer Amount
    setAverageTransferAmount(totalAmount / data.length);

    // Transfers by Status
    const statusCounts = data.reduce((acc, transfer) => {
      acc[transfer.status] = (acc[transfer.status] || 0) + 1;
      return acc;
    }, {});

    setTransfersStatusDistribution(Object.keys(statusCounts).map(key => ({
      name: key.charAt(0).toUpperCase() + key.slice(1),  // Capitalize status
      y: statusCounts[key],
    })));

    // Total Amount Transferred by Currency
    const amountByCurrency = data.reduce((acc, transfer) => {
      acc[transfer.currency] = (acc[transfer.currency] || 0) + Number(transfer.amount);
      return acc;
    }, {});

    setAmountByCurrency(Object.keys(amountByCurrency).map(key => ({
      name: key,
      y: amountByCurrency[key],
    })));

    // Transfers Over Time
    const transfersByMonth = data.reduce((acc, transfer) => {
      const month = new Date(transfer.transferDate).getMonth() + 1;
      acc[month] = (acc[month] || 0) + 1;
      return acc;
    }, {});

    setTransfersOverTimeData(Object.keys(transfersByMonth).map(key => ({
      name: `Month ${key}`,
      y: transfersByMonth[key],
    })));

    // Average Transfer Amount by Status
    const amountByStatus = data.reduce((acc, transfer) => {
      acc[transfer.status] = acc[transfer.status] || { totalAmount: 0, count: 0 };
      acc[transfer.status].totalAmount += Number(transfer.amount);
      acc[transfer.status].count += 1;
      return acc;
    }, {});

    setAverageAmountByStatus(Object.keys(amountByStatus).map(key => ({
      name: key.charAt(0).toUpperCase() + key.slice(1),
      y: amountByStatus[key].totalAmount / amountByStatus[key].count || 0,
    })));

    // Tags Distribution
    const tagsCounts = data.reduce((acc, transfer) => {
      transfer.tags.forEach(tag => {
        acc[tag] = (acc[tag] || 0) + 1;
      });
      return acc;
    }, {});

    setTagsDistribution(Object.keys(tagsCounts).map(key => ({
      name: key,
      y: tagsCounts[key],
    })));
  };

  // Chart options for each chart
  const transfersStatusChartOptions = {
    chart: {
      type: 'pie',
    },
    title: {
      text: 'Transfers by Status',
    },
    series: [
      {
        name: 'Status',
        colorByPoint: true,
        data: transfersStatusDistribution,
      },
    ],
  };

  const amountByCurrencyChartOptions = {
    chart: {
      type: 'column',
    },
    title: {
      text: 'Total Amount Transferred by Currency',
    },
    series: [
      {
        name: 'Amount',
        data: amountByCurrency,
      },
    ],
  };

  const transfersOverTimeChartOptions = {
    chart: {
      type: 'line',
    },
    title: {
      text: 'Transfers Over Time',
    },
    xAxis: {
      categories: transfersOverTimeData.map(data => data.name),
    },
    series: [
      {
        name: 'Number of Transfers',
        data: transfersOverTimeData.map(data => data.y),
      },
    ],
  };

  const averageAmountByStatusChartOptions = {
    chart: {
      type: 'bar',
    },
    title: {
      text: 'Average Transfer Amount by Status',
    },
    series: [
      {
        name: 'Average Amount',
        data: averageAmountByStatus,
      },
    ],
  };

  const tagsChartOptions = {
    chart: {
      type: 'column',
    },
    title: {
      text: 'Tags Distribution',
    },
    series: [
      {
        name: 'Tags',
        data: tagsDistribution,
      },
    ],
  };

  return (
    <Container maxWidth="xl" sx={{ paddingTop: 3, paddingBottom: 7 }}>
      <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <Box sx={{ padding: 4 }}>
        <Typography variant="h4" gutterBottom>
          Bank Transfers Dashboard
        </Typography>
        <Grid container spacing={4}>
          {/* KPI Section */}
          <Grid item xs={12} md={3}>
            <Card>
              <CardContent>
                <Typography variant="h6">Total Transfers</Typography>
                <Typography variant="h4" color="green" sx={{ fontWeight: 'bold' }}>
                  {totalTransfers}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={3}>
            <Card>
              <CardContent>
                <Typography variant="h6">Total Amount Transferred</Typography>
                <Typography variant="h4" color="blue" sx={{ fontWeight: 'bold' }}>
                  ${totalAmountTransferred.toFixed(2)}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={3}>
            <Card>
              <CardContent>
                <Typography variant="h6">Average Transfer Amount</Typography>
                <Typography variant="h4" color="orange" sx={{ fontWeight: 'bold' }}>
                  ${averageTransferAmount.toFixed(2)}
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Chart Section */}
          <Grid item xs={12} md={6}>
            <HighchartsReact highcharts={Highcharts} options={transfersStatusChartOptions} />
          </Grid>
          <Grid item xs={12} md={6}>
            <HighchartsReact highcharts={Highcharts} options={amountByCurrencyChartOptions} />
          </Grid>
          <Grid item xs={12} md={6}>
            <HighchartsReact highcharts={Highcharts} options={transfersOverTimeChartOptions} />
          </Grid>
          <Grid item xs={12} md={6}>
            <HighchartsReact highcharts={Highcharts} options={averageAmountByStatusChartOptions} />
          </Grid>
          <Grid item xs={12} md={12}>
            <HighchartsReact highcharts={Highcharts} options={tagsChartOptions} />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
