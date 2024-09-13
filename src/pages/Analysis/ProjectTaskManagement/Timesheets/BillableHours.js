import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { Box, Typography, Grid, Card, CardContent, Container, CircularProgress, Backdrop } from '@mui/material';

export default function BillableHoursDashboard({ fetchData }) {
  const [billableData, setBillableData] = useState([]);
  const [totalBillableHours, setTotalBillableHours] = useState(0);
  const [invoicedHours, setInvoicedHours] = useState(0);
  const [invoiceStatusDistribution, setInvoiceStatusDistribution] = useState([]);
  const [billingTrends, setBillingTrends] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDataAsync = async () => {
      setLoading(true);
      const data = await fetchData();
      setBillableData(data);
      processBillableData(data);
      setLoading(false);
    };

    fetchDataAsync();
  }, [fetchData]);

  const processBillableData = (data) => {
    // Total Billable Hours
    const totalHours = data.reduce((acc, item) => acc + item.billableHours, 0);
    setTotalBillableHours(totalHours);

    // Invoiced Hours
    const invoiced = data.filter(item => item.invoiceStatus === 'invoiced').reduce((acc, item) => acc + item.billableHours, 0);
    setInvoicedHours(invoiced);

    // Invoice Status Distribution for Pie Chart
    const statusCounts = data.reduce((acc, item) => {
      acc[item.invoiceStatus] = (acc[item.invoiceStatus] || 0) + 1;
      return acc;
    }, {});
    setInvoiceStatusDistribution(Object.keys(statusCounts).map(key => ({
      name: key.charAt(0).toUpperCase() + key.slice(1),
      y: statusCounts[key],
    })));

    // Billing Trends for Line Chart
    const trendData = data.map(item => ({
      date: new Date(item.createdDate).getTime(),
      amount: item.totalAmount,
    })).sort((a, b) => a.date - b.date);
    setBillingTrends(trendData);
  };

  // Highcharts options for Invoice Status Distribution
  const statusChartOptions = {
    chart: { type: 'pie' },
    title: { text: 'Invoice Status Distribution' },
    series: [{
      name: 'Invoice Status',
      colorByPoint: true,
      data: invoiceStatusDistribution,
    }],
  };

  // Highcharts options for Billing Trends
  const billingTrendChartOptions = {
    chart: { type: 'line' },
    title: { text: 'Billing Trends Over Time' },
    xAxis: { type: 'datetime', title: { text: 'Date' } },
    yAxis: { title: { text: 'Total Amount' } },
    series: [{
      name: 'Total Amount',
      data: billingTrends.map(item => [item.date, item.amount]),
    }],
  };

  return (
    <Container maxWidth="xl" sx={{ paddingTop: 3, paddingBottom: 7 }}>
      <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <Box sx={{ padding: 4 }}>
        <Typography variant="h4" gutterBottom>
          Billable Hours Dashboard
        </Typography>

        <Grid container spacing={4}>
          {/* KPIs Section */}
          <Grid item xs={12} md={3}>
            <Card>
              <CardContent>
                <Typography variant="h6">Total Billable Hours</Typography>
                <Typography variant="h4" color="green" sx={{ fontWeight: 'bold' }}>
                  {totalBillableHours}
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={3}>
            <Card>
              <CardContent>
                <Typography variant="h6">Invoiced Hours</Typography>
                <Typography variant="h4" color="blue" sx={{ fontWeight: 'bold' }}>
                  {invoicedHours}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Grid container spacing={4} sx={{ marginTop: 4 }}>
          {/* Invoice Status Distribution Chart */}
          <Grid item xs={12} md={6}>
            <HighchartsReact highcharts={Highcharts} options={statusChartOptions} />
          </Grid>

          {/* Billing Trends Chart */}
          <Grid item xs={12} md={6}>
            <HighchartsReact highcharts={Highcharts} options={billingTrendChartOptions} />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
