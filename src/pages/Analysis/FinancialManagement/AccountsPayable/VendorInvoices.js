import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { Box, Typography, Grid, Card, CardContent, Container } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import Backdrop from '@mui/material/Backdrop';

export default function InvoiceAnalysisDashboard({ fetchItems }) {
  const [invoicesData, setInvoicesData] = useState([]);
  const [invoiceTypeDistribution, setInvoiceTypeDistribution] = useState([]);
  const [invoiceCategoryDistribution, setInvoiceCategoryDistribution] = useState([]);
  const [paymentMethodDistribution, setPaymentMethodDistribution] = useState([]);
  const [monthlyTrendsData, setMonthlyTrendsData] = useState([]);
  const [topVendors, setTopVendors] = useState([]);
  const [totalIssuedValue, setTotalIssuedValue] = useState(0);
  const [totalReceivedValue, setTotalReceivedValue] = useState(0);
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); // Start loading
      const data = await fetchItems();
      setInvoicesData(data);
      processInvoiceData(data);
      setLoading(false); // Stop loading
    };

    fetchData();
  }, [fetchItems]);

  const processInvoiceData = (data) => {
    // Invoice Type Distribution
    const typeCounts = data.reduce((acc, invoice) => {
      acc[invoice.invoiceType] = (acc[invoice.invoiceType] || 0) + 1;
      return acc;
    }, {});

    setInvoiceTypeDistribution(Object.keys(typeCounts).map(key => ({
      name: key,
      y: typeCounts[key],
      invoiceNames: data.filter(invoice => invoice.invoiceType === key).map(invoice => invoice.providerDetails).join(', '),
    })));

    // Invoice Category Distribution
    const categoryCounts = data.reduce((acc, invoice) => {
      acc[invoice.invoiceCategory] = (acc[invoice.invoiceCategory] || 0) + 1;
      return acc;
    }, {});

    setInvoiceCategoryDistribution(Object.keys(categoryCounts).map(key => ({
      name: key,
      y: categoryCounts[key],
      invoiceNames: data.filter(invoice => invoice.invoiceCategory === key).map(invoice => invoice.providerDetails).join(', '),
    })));

    // Payment Method Distribution
    const paymentCounts = data.reduce((acc, invoice) => {
      acc[invoice.paymentMethod] = (acc[invoice.paymentMethod] || 0) + 1;
      return acc;
    }, {});

    setPaymentMethodDistribution(Object.keys(paymentCounts).map(key => ({
      name: key,
      y: paymentCounts[key],
      invoiceNames: data.filter(invoice => invoice.paymentMethod === key).map(invoice => invoice.providerDetails).join(', '),
    })));

    // Monthly Trends Data
    const trendCounts = data.reduce((acc, invoice) => {
      const month = new Date(invoice.issuedAt).getMonth() + 1;
      acc[month] = (acc[month] || 0) + 1;
      return acc;
    }, {});

    setMonthlyTrendsData(Object.keys(trendCounts).map(key => ({
      name: `Month ${key}`,
      y: trendCounts[key],
    })));

    // Total Issued & Received Invoice Values
    const totals = data.reduce(
      (acc, invoice) => {
        const value = Number(invoice.contractValue) || 0;
        if (invoice.invoiceType === 'issued') {
          acc.issued += value;
        } else {
          acc.received += value;
        }
        return acc;
      },
      { issued: 0, received: 0 }
    );

    setTotalIssuedValue(totals.issued);
    setTotalReceivedValue(totals.received);

    // Top 5 Vendors by Invoice Value
    const topVendorsList = data
      .sort((a, b) => Number(b.contractValue) - Number(a.contractValue))
      .slice(0, 5);
    setTopVendors(topVendorsList);
  };

  const invoiceTypeChartOptions = {
    chart: {
      type: 'pie',
    },
    title: {
      text: 'Invoice Type Distribution',
    },
    tooltip: {
      pointFormat: '{point.name}: <b>{point.y}</b><br/>Providers: {point.invoiceNames}'
    },
    series: [
      {
        name: 'Invoices',
        colorByPoint: true,
        data: invoiceTypeDistribution,
      },
    ],
  };

  const invoiceCategoryChartOptions = {
    chart: {
      type: 'pie',
    },
    title: {
      text: 'Invoice Category Distribution',
    },
    tooltip: {
      pointFormat: '{point.name}: <b>{point.y}</b><br/>Providers: {point.invoiceNames}'
    },
    series: [
      {
        name: 'Categories',
        colorByPoint: true,
        data: invoiceCategoryDistribution,
      },
    ],
  };

  const paymentMethodChartOptions = {
    chart: {
      type: 'column',
    },
    title: {
      text: 'Payment Method Distribution',
    },
    tooltip: {
      pointFormat: '{point.name}: <b>{point.y}</b> invoices'
    },
    series: [
      {
        name: 'Payment Methods',
        data: paymentMethodDistribution,
      },
    ],
  };

  const monthlyTrendsChartOptions = {
    chart: {
      type: 'line',
    },
    title: {
      text: 'Monthly Invoice Trends',
    },
    xAxis: {
      categories: monthlyTrendsData.map(data => data.name),
    },
    series: [
      {
        name: 'Number of Invoices',
        data: monthlyTrendsData.map(data => data.y),
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
          Invoice Analysis Dashboard
        </Typography>
        <Grid container spacing={4}>
          {/* KPI Section */}
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6">Total Issued Invoice Value</Typography>
                <Typography variant="h4" color="green" sx={{ fontWeight: 'bold' }}>
                  ${totalIssuedValue.toFixed(2)}
                </Typography>
                <Typography variant="body2">
                  This represents the total value of all issued invoices.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6">Total Received Invoice Value</Typography>
                <Typography variant="h4" color="blue" sx={{ fontWeight: 'bold' }}>
                  ${totalReceivedValue.toFixed(2)}
                </Typography>
                <Typography variant="body2">
                  This represents the total value of all received invoices.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6">Top 5 Vendors by Invoice Value</Typography>
                <ol>
                  {topVendors.map(invoice => (
                    <li key={invoice.id}>
                      <Typography variant="body2">
                        {invoice.providerDetails} - Value: ${Number(invoice.contractValue).toFixed(2)}
                      </Typography>
                    </li>
                  ))}
                </ol>
              </CardContent>
            </Card>
          </Grid>

          {/* Chart Section */}
          <Grid item xs={12} md={6}>
            <HighchartsReact highcharts={Highcharts} options={invoiceTypeChartOptions} />
          </Grid>
          <Grid item xs={12} md={6}>
            <HighchartsReact highcharts={Highcharts} options={invoiceCategoryChartOptions} />
          </Grid>
          <Grid item xs={12} md={6}>
            <HighchartsReact highcharts={Highcharts} options={paymentMethodChartOptions} />
          </Grid>
          <Grid item xs={12} md={6}>
            <HighchartsReact highcharts={Highcharts} options={monthlyTrendsChartOptions} />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
