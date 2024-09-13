import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { Box, Typography, Grid, Card, CardContent, Container, CircularProgress, Backdrop } from '@mui/material';

export default function PaymentTrackingDashboard({ fetchItems }) {
  const [paymentData, setPaymentData] = useState([]);
  const [totalPayments, setTotalPayments] = useState(0);
  const [totalAmountPaid, setTotalAmountPaid] = useState(0);
  const [paymentStatusDistribution, setPaymentStatusDistribution] = useState([]);
  const [paymentMethodDistribution, setPaymentMethodDistribution] = useState([]);
  const [paidCount, setPaidCount] = useState(0);
  const [pendingCount, setPendingCount] = useState(0);
  const [failedCount, setFailedCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDataAsync = async () => {
      setLoading(true);
      const data = await fetchItems();
      setPaymentData(data);
      processPaymentData(data);
      setLoading(false);
    };

    fetchDataAsync();
  }, [fetchItems]);

  const processPaymentData = (data) => {
    // Total Payments
    setTotalPayments(data.length);

    // Total Amount Paid
    const totalPaid = data.reduce((acc, payment) => acc + Number(payment.amountPaid), 0);
    setTotalAmountPaid(totalPaid);

    // Count Paid, Pending, and Failed Payments
    const paid = data.filter(payment => payment.status === 'paid').length;
    const pending = data.filter(payment => payment.status === 'pending').length;
    const failed = data.filter(payment => payment.status === 'failed').length;
    setPaidCount(paid);
    setPendingCount(pending);
    setFailedCount(failed);

    // Payment Status Distribution for Pie Chart
    setPaymentStatusDistribution([
      { name: 'Paid', y: paid },
      { name: 'Pending', y: pending },
      { name: 'Failed', y: failed },
    ]);

    // Payment Method Distribution for Pie Chart
    const methodCounts = data.reduce((acc, payment) => {
      acc[payment.paymentMethod] = (acc[payment.paymentMethod] || 0) + 1;
      return acc;
    }, {});
    setPaymentMethodDistribution(Object.keys(methodCounts).map(key => ({
      name: key.charAt(0).toUpperCase() + key.slice(1).replace('_', ' '),
      y: methodCounts[key],
    })));
  };

  // Highcharts options for Payment Status Distribution
  const paymentStatusChartOptions = {
    chart: { type: 'pie' },
    title: { text: 'Payment Status Distribution' },
    series: [{
      name: 'Payments',
      colorByPoint: true,
      data: paymentStatusDistribution,
    }],
  };

  // Highcharts options for Payment Method Distribution
  const paymentMethodChartOptions = {
    chart: { type: 'pie' },
    title: { text: 'Payment Method Distribution' },
    series: [{
      name: 'Payment Methods',
      colorByPoint: true,
      data: paymentMethodDistribution,
    }],
  };

  return (
    <Container maxWidth="xl" sx={{ paddingTop: 3, paddingBottom: 7 }}>
      <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <Box sx={{ padding: 4 }}>
        <Typography variant="h4" gutterBottom>
          Payment Tracking Dashboard
        </Typography>

        <Grid container spacing={4}>
          {/* KPIs Section */}
          <Grid item xs={12} md={3}>
            <Card>
              <CardContent>
                <Typography variant="h6">Total Payments</Typography>
                <Typography variant="h4" color="green" sx={{ fontWeight: 'bold' }}>
                  {totalPayments}
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={3}>
            <Card>
              <CardContent>
                <Typography variant="h6">Total Amount Paid</Typography>
                <Typography variant="h4" color="blue" sx={{ fontWeight: 'bold' }}>
                  ${totalAmountPaid.toFixed(2)}
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={3}>
            <Card>
              <CardContent>
                <Typography variant="h6">Paid Payments</Typography>
                <Typography variant="h4" color="green" sx={{ fontWeight: 'bold' }}>
                  {paidCount}
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={3}>
            <Card>
              <CardContent>
                <Typography variant="h6">Pending Payments</Typography>
                <Typography variant="h4" color="orange" sx={{ fontWeight: 'bold' }}>
                  {pendingCount}
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={3}>
            <Card>
              <CardContent>
                <Typography variant="h6">Failed Payments</Typography>
                <Typography variant="h4" color="red" sx={{ fontWeight: 'bold' }}>
                  {failedCount}
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

          {/* Payment Method Distribution Chart */}
          <Grid item xs={12} md={6}>
            <HighchartsReact highcharts={Highcharts} options={paymentMethodChartOptions} />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
