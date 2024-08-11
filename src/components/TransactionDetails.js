import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

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
  const [transactionRow, setTransactionRow] = useState(null);
  const [detailedMontants, setDetailedMontants] = useState([]);

  useEffect(() => {
    const savedTransaction = JSON.parse(localStorage.getItem('selectedTransaction'));
    setTransactionRow(savedTransaction);

    if (savedTransaction) {
      const detailed = savedTransaction.montants.map((totalAmount) => {
        const detailedAnalysis = generateDetailedRandomSubElements(totalAmount);
        return { totalAmount, ...detailedAnalysis };
      });
      setDetailedMontants(detailed);
    }
  }, []);

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
          name: 'Product Sales',
          data: productAmounts
        },
        {
          name: 'Work Earnings',
          data: workAmounts
        }
      ]
    };
  };

  if (!transactionRow) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Accounting Summary for: {transactionRow.nature}</h2>
      <p>Initial Amount: {transactionRow.montantInitial}€</p>

      <h3>Detailed Breakdown</h3>
      {detailedMontants.map((monthDetail, index) => (
        <div key={index} style={{ marginBottom: '20px' }}>
          <h4>Month {index + 1}</h4>
          <p>Total Amount: {monthDetail.totalAmount}€</p>

          <h5>Product Units</h5>
          <table border="1" cellPadding="5">
            <thead>
              <tr>
                <th>Product ID</th>
                <th>Description</th>
                <th>Unit Price</th>
                <th>Quantity</th>
                <th>Discount</th>
                <th>Total Before Discount</th>
                <th>Final Amount</th>
                <th>Notes</th>
              </tr>
            </thead>
            <tbody>
              {monthDetail.productUnits.map((unit, i) => (
                <tr key={i}>
                  <td>{unit.id}</td>
                  <td>{unit.description}</td>
                  <td>{unit.unitPrice}€</td>
                  <td>{unit.quantity}</td>
                  <td>{unit.discount}%</td>
                  <td>{unit.totalBeforeDiscount}€</td>
                  <td>{unit.finalAmount}€</td>
                  <td>{unit.notes}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <h5>Work Units</h5>
          <table border="1" cellPadding="5">
            <thead>
              <tr>
                <th>Type</th>
                <th>Rate</th>
                <th>Hours Worked</th>
                <th>Total Earnings</th>
                <th>Notes</th>
              </tr>
            </thead>
            <tbody>
              {monthDetail.workUnits.map((unit, i) => (
                <tr key={i}>
                  <td>{unit.type}</td>
                  <td>{unit.rate}€</td>
                  <td>{unit.hoursWorked}</td>
                  <td>{unit.totalEarnings}€</td>
                  <td>{unit.notes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}

      <h3>Financial Overview</h3>
      <HighchartsReact highcharts={Highcharts} options={renderGraphOptions(detailedMontants)} />
    </div>
  );
};

export default AccountingSummary;
