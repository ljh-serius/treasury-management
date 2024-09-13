import React, { useEffect, useState } from 'react';
import { Box, Grid, Typography, Card, CardContent } from '@mui/material';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const InterestPaymentsAnalytics = ({ fetchItems }) => {
  const [data, setData] = useState([]);
  const [kpis, setKpis] = useState({
    totalPayments: 0,
    paidPayments: 0,
    pendingPayments: 0,
    overduePayments: 0,
    averageInterestRate: 0,
  });

  useEffect(() => {
    const loadData = async () => {
      const payments = await fetchItems();
      setData(payments);
      calculateKPIs(payments);
    };

    loadData();
  }, [fetchItems]);

  const calculateKPIs = (items) => {
    const totalPayments = items.length;
    const paidPayments = items.filter((item) => item.status === 'paid').length;
    const pendingPayments = items.filter((item) => item.status === 'pending').length;
    const overduePayments = items.filter((item) => item.status === 'overdue').length;
    const averageInterestRate = items.reduce((acc, curr) => acc + parseFloat(curr.interestRate || 0), 0) / totalPayments;

    setKpis({
      totalPayments,
      paidPayments,
      pendingPayments,
      overduePayments,
      averageInterestRate: averageInterestRate.toFixed(2),
    });
  };

  const statusChart = {
    chart: { type: 'pie' },
    title: { text: 'Payment Status Distribution' },
    series: [
      {
        name: 'Payments',
        colorByPoint: true,
        data: [
          { name: 'Paid', y: kpis.paidPayments },
          { name: 'Pending', y: kpis.pendingPayments },
          { name: 'Overdue', y: kpis.overduePayments },
        ],
      },
    ],
  };

  const interestRateChart = {
    chart: { type: 'column' },
    title: { text: 'Interest Rate by Lender' },
    xAxis: { categories: data.map((item) => item.lender) },
    yAxis: { title: { text: 'Interest Rate (%)' } },
    series: [
      {
        name: 'Interest Rate',
        data: data.map((item) => parseFloat(item.interestRate || 0)),
      },
    ],
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Interest Payments Analytics
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6">Total Payments</Typography>
              <Typography variant="h4">{kpis.totalPayments}</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6">Paid Payments</Typography>
              <Typography variant="h4">{kpis.paidPayments}</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6">Pending Payments</Typography>
              <Typography variant="h4">{kpis.pendingPayments}</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6">Overdue Payments</Typography>
              <Typography variant="h4">{kpis.overduePayments}</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Box mt={4}>
        <HighchartsReact highcharts={Highcharts} options={statusChart} />
      </Box>

      <Box mt={4}>
        <HighchartsReact highcharts={Highcharts} options={interestRateChart} />
      </Box>
    </Box>
  );
};

export default InterestPaymentsAnalytics;
