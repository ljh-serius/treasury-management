import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { Box, Typography, Grid, Card, CardContent, Container, CircularProgress, Backdrop } from '@mui/material';

export default function PropertyTaxesDashboard({ fetchData }) {
  const [taxData, setTaxData] = useState([]);
  const [totalTaxesDue, setTotalTaxesDue] = useState(0);
  const [pendingPayments, setPendingPayments] = useState(0);
  const [overduePayments, setOverduePayments] = useState(0);
  const [paymentStatusDistribution, setPaymentStatusDistribution] = useState([]);
  const [taxAmountTrends, setTaxAmountTrends] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDataAsync = async () => {
      setLoading(true);
      const data = await fetchData();
      setTaxData(data);
      processTaxData(data);
      setLoading(false);
    };

    fetchDataAsync();
  }, [fetchData]);

  const processTaxData = (data) => {
    // Total Taxes Due
    const totalDue = data.reduce((acc, tax) => acc + Number(tax.amountDue), 0);
    setTotalTaxesDue(totalDue);

    // Count Pending and Overdue Payments
    const pending = data.filter(tax => tax.paymentStatus === 'pending').length;
    const overdue = data.filter(tax => tax.paymentStatus === 'overdue').length;
    setPendingPayments(pending);
    setOverduePayments(overdue);

    // Payment Status Distribution for Pie Chart
    const statusCounts = data.reduce((acc, tax) => {
      acc[tax.paymentStatus] = (acc[tax.paymentStatus] || 0) + 1;
      return acc;
    }, {});
    setPaymentStatusDistribution(Object.keys(statusCounts).map(key => ({
      name: key.charAt(0).toUpperCase() + key.slice(1),
      y: statusCounts[key],
    })));

    // Tax Amount Trends for Line Chart
    const trends = data.map(tax => ({
      date: new Date(tax.taxYear).getTime(),
      value: Number(tax.amountDue),
    }));
    setTaxAmountTrends(trends);
  };

  // Highcharts options for Payment Status Distribution
  const paymentStatusChartOptions = {
    chart: { type: 'pie' },
    title: { text: 'Payment Status Distribution' },
    series: [{
      name: 'Payment Status',
      colorByPoint: true,
      data: paymentStatusDistribution,
    }],
  };

  // Highcharts options for Tax Amount Trends
  const taxAmountTrendsChartOptions = {
    chart: { type: 'line' },
    title: { text: 'Tax Amount Trends by Year' },
    xAxis: { type: 'datetime', title: { text: 'Year' } },
    yAxis: { title: { text: 'Amount Due' } },
    series: [{
      name: 'Amount Due',
      data: taxAmountTrends.map(item => [item.date, item.value]),
    }],
  };

  return (
    <Container maxWidth="xl" sx={{ paddingTop: 3, paddingBottom: 7 }}>
      <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <Box sx={{ padding: 4 }}>
        <Typography variant="h4" gutterBottom>
          Property Taxes Dashboard
        </Typography>

        <Grid container spacing={4}>
          {/* KPIs Section */}
          <Grid item xs={12} md={3}>
            <Card>
              <CardContent>
                <Typography variant="h6">Total Taxes Due</Typography>
                <Typography variant="h4" color="blue" sx={{ fontWeight: 'bold' }}>
                  ${totalTaxesDue.toFixed(2)}
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={3}>
            <Card>
              <CardContent>
                <Typography variant="h6">Pending Payments</Typography>
                <Typography variant="h4" color="orange" sx={{ fontWeight: 'bold' }}>
                  {pendingPayments}
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={3}>
            <Card>
              <CardContent>
                <Typography variant="h6">Overdue Payments</Typography>
                <Typography variant="h4" color="red" sx={{ fontWeight: 'bold' }}>
                  {overduePayments}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Grid container spacing={4} sx={{ marginTop: 4 }}>
          {/* Payment Status Distribution Chart */}
          <Grid item xs={12} md={6}>
            <HighchartsReact highcharts={Highcharts} options={paymentStatusChartOptions} />
          </Grid>

          {/* Tax Amount Trends Chart */}
          <Grid item xs={12} md={6}>
            <HighchartsReact highcharts={Highcharts} options={taxAmountTrendsChartOptions} />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
