import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { Box, Typography, Grid, Card, CardContent, Container, CircularProgress, Backdrop } from '@mui/material';

export default function RecurringInvoicesDashboard({ fetchItems }) {
  const [invoiceData, setInvoiceData] = useState([]);
  const [totalInvoices, setTotalInvoices] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [monthlyInvoices, setMonthlyInvoices] = useState(0);
  const [quarterlyInvoices, setQuarterlyInvoices] = useState(0);
  const [annuallyInvoices, setAnnuallyInvoices] = useState(0);
  const [frequencyDistribution, setFrequencyDistribution] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDataAsync = async () => {
      setLoading(true);
      const data = await fetchItems();
      setInvoiceData(data);
      processInvoiceData(data);
      setLoading(false);
    };

    fetchDataAsync();
  }, [fetchItems]);

  const processInvoiceData = (data) => {
    // Total Invoices
    setTotalInvoices(data.length);

    // Total Revenue
    const totalAmount = data.reduce((acc, invoice) => acc + Number(invoice.amount), 0);
    setTotalRevenue(totalAmount);

    // Count Monthly, Quarterly, and Annually Invoices
    const monthly = data.filter(invoice => invoice.frequency === 'monthly').length;
    const quarterly = data.filter(invoice => invoice.frequency === 'quarterly').length;
    const annually = data.filter(invoice => invoice.frequency === 'annually').length;
    setMonthlyInvoices(monthly);
    setQuarterlyInvoices(quarterly);
    setAnnuallyInvoices(annually);

    // Frequency Distribution for Pie Chart
    setFrequencyDistribution([
      { name: 'Monthly', y: monthly },
      { name: 'Quarterly', y: quarterly },
      { name: 'Annually', y: annually },
    ]);
  };

  // Highcharts options for Frequency Distribution
  const frequencyChartOptions = {
    chart: { type: 'pie' },
    title: { text: 'Invoice Frequency Distribution' },
    series: [{
      name: 'Invoices',
      colorByPoint: true,
      data: frequencyDistribution,
    }],
  };

  return (
    <Container maxWidth="xl" sx={{ paddingTop: 3, paddingBottom: 7 }}>
      <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <Box sx={{ padding: 4 }}>
        <Typography variant="h4" gutterBottom>
          Recurring Invoices Dashboard
        </Typography>

        <Grid container spacing={4}>
          {/* KPIs Section */}
          <Grid item xs={12} md={3}>
            <Card>
              <CardContent>
                <Typography variant="h6">Total Recurring Invoices</Typography>
                <Typography variant="h4" color="green" sx={{ fontWeight: 'bold' }}>
                  {totalInvoices}
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={3}>
            <Card>
              <CardContent>
                <Typography variant="h6">Total Revenue from Recurring Invoices</Typography>
                <Typography variant="h4" color="blue" sx={{ fontWeight: 'bold' }}>
                  ${totalRevenue.toFixed(2)}
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={3}>
            <Card>
              <CardContent>
                <Typography variant="h6">Monthly Invoices</Typography>
                <Typography variant="h4" color="purple" sx={{ fontWeight: 'bold' }}>
                  {monthlyInvoices}
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={3}>
            <Card>
              <CardContent>
                <Typography variant="h6">Quarterly Invoices</Typography>
                <Typography variant="h4" color="orange" sx={{ fontWeight: 'bold' }}>
                  {quarterlyInvoices}
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={3}>
            <Card>
              <CardContent>
                <Typography variant="h6">Annually Invoices</Typography>
                <Typography variant="h4" color="green" sx={{ fontWeight: 'bold' }}>
                  {annuallyInvoices}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Grid container spacing={4} sx={{ marginTop: 4 }}>
          {/* Frequency Distribution Chart */}
          <Grid item xs={12} md={6}>
            <HighchartsReact highcharts={Highcharts} options={frequencyChartOptions} />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
