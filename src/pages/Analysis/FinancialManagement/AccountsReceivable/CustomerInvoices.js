import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { Box, Typography, Grid, Card, CardContent, Container } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import Backdrop from '@mui/material/Backdrop';

export default function CustomerInvoicesDashboard({ fetchItems }) {
  const [invoicesData, setInvoicesData] = useState([]);
  const [currencyDistribution, setCurrencyDistribution] = useState([]);
  const [paymentTermsDistribution, setPaymentTermsDistribution] = useState([]);
  const [monthlyTrendsData, setMonthlyTrendsData] = useState([]);
  const [totalAmountTrendsData, setTotalAmountTrendsData] = useState([]);
  const [tagsDistribution, setTagsDistribution] = useState([]);
  const [totalInvoices, setTotalInvoices] = useState(0);
  const [totalAmountExclVAT, setTotalAmountExclVAT] = useState(0);
  const [totalAmountInclVAT, setTotalAmountInclVAT] = useState(0);
  const [averageInvoiceAmount, setAverageInvoiceAmount] = useState(0);
  const [overdueInvoices, setOverdueInvoices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const data = await fetchItems();
      setInvoicesData(data);
      processInvoicesData(data);
      setLoading(false);
    };

    fetchData();
  }, [fetchItems]);

  const processInvoicesData = (data) => {
    // Total Number of Invoices
    setTotalInvoices(data.length);

    // Total Amounts Excluding and Including VAT
    const totals = data.reduce(
      (acc, invoice) => {
        acc.exclVAT += Number(invoice.totalAmountExclVAT) || 0;
        acc.inclVAT += Number(invoice.totalAmountInclVAT) || 0;
        return acc;
      },
      { exclVAT: 0, inclVAT: 0 }
    );

    setTotalAmountExclVAT(totals.exclVAT);
    setTotalAmountInclVAT(totals.inclVAT);
    setAverageInvoiceAmount(totals.exclVAT / data.length);

    // Invoices by Currency
    const currencyCounts = data.reduce((acc, invoice) => {
      acc[invoice.preferredCurrency] = (acc[invoice.preferredCurrency] || 0) + 1;
      return acc;
    }, {});

    setCurrencyDistribution(Object.keys(currencyCounts).map(key => ({
      name: key,
      y: currencyCounts[key],
    })));

    // Invoices by Payment Terms
    const paymentTermsCounts = data.reduce((acc, invoice) => {
      acc[invoice.paymentTerms] = (acc[invoice.paymentTerms] || 0) + 1;
      return acc;
    }, {});

    setPaymentTermsDistribution(Object.keys(paymentTermsCounts).map(key => ({
      name: key,
      y: paymentTermsCounts[key],
    })));

    // Tags Distribution
    const tagsCounts = data.reduce((acc, invoice) => {
      invoice.tags.forEach(tag => {
        acc[tag] = (acc[tag] || 0) + 1;
      });
      return acc;
    }, {});

    setTagsDistribution(Object.keys(tagsCounts).map(key => ({
      name: key,
      y: tagsCounts[key],
    })));

    // Monthly Invoice Trends
    const trendCounts = data.reduce((acc, invoice) => {
      const month = new Date(invoice.issuedAt).getMonth() + 1;
      acc[month] = (acc[month] || 0) + 1;
      return acc;
    }, {});

    setMonthlyTrendsData(Object.keys(trendCounts).map(key => ({
      name: `Month ${key}`,
      y: trendCounts[key],
    })));

    // Total Amount Over Time
    const amountTrends = data.reduce((acc, invoice) => {
      const month = new Date(invoice.issuedAt).getMonth() + 1;
      acc[month] = (acc[month] || 0) + Number(invoice.totalAmountExclVAT);
      return acc;
    }, {});

    setTotalAmountTrendsData(Object.keys(amountTrends).map(key => ({
      name: `Month ${key}`,
      y: amountTrends[key],
    })));

    // Overdue Invoices
    const today = new Date();
    const overdueList = data.filter(invoice => new Date(invoice.dueDate) < today);
    setOverdueInvoices(overdueList);
  };

  // Chart options for each chart
  const currencyChartOptions = {
    chart: {
      type: 'pie',
    },
    title: {
      text: 'Invoices by Currency',
    },
    series: [
      {
        name: 'Currencies',
        colorByPoint: true,
        data: currencyDistribution,
      },
    ],
  };

  const paymentTermsChartOptions = {
    chart: {
      type: 'column',
    },
    title: {
      text: 'Invoices by Payment Terms',
    },
    series: [
      {
        name: 'Payment Terms',
        data: paymentTermsDistribution,
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

  const totalAmountTrendsChartOptions = {
    chart: {
      type: 'line',
    },
    title: {
      text: 'Total Amount Over Time',
    },
    xAxis: {
      categories: totalAmountTrendsData.map(data => data.name),
    },
    series: [
      {
        name: 'Total Amount Excl. VAT',
        data: totalAmountTrendsData.map(data => data.y),
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
          Customer Invoices Dashboard
        </Typography>
        <Grid container spacing={4}>
          {/* KPI Section */}
          <Grid item xs={12} md={3}>
            <Card>
              <CardContent>
                <Typography variant="h6">Total Invoices</Typography>
                <Typography variant="h4" color="green" sx={{ fontWeight: 'bold' }}>
                  {totalInvoices}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={3}>
            <Card>
              <CardContent>
                <Typography variant="h6">Total Amount (Excl. VAT)</Typography>
                <Typography variant="h4" color="blue" sx={{ fontWeight: 'bold' }}>
                  ${totalAmountExclVAT.toFixed(2)}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={3}>
            <Card>
              <CardContent>
                <Typography variant="h6">Total Amount (Incl. VAT)</Typography>
                <Typography variant="h4" color="orange" sx={{ fontWeight: 'bold' }}>
                  ${totalAmountInclVAT.toFixed(2)}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={3}>
            <Card>
              <CardContent>
                <Typography variant="h6">Average Invoice Amount</Typography>
                <Typography variant="h4" color="purple" sx={{ fontWeight: 'bold' }}>
                  ${averageInvoiceAmount.toFixed(2)}
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Chart Section */}
          <Grid item xs={12} md={6}>
            <HighchartsReact highcharts={Highcharts} options={currencyChartOptions} />
          </Grid>
          <Grid item xs={12} md={6}>
            <HighchartsReact highcharts={Highcharts} options={paymentTermsChartOptions} />
          </Grid>
          <Grid item xs={12} md={6}>
            <HighchartsReact highcharts={Highcharts} options={monthlyTrendsChartOptions} />
          </Grid>
          <Grid item xs={12} md={6}>
            <HighchartsReact highcharts={Highcharts} options={totalAmountTrendsChartOptions} />
          </Grid>
          <Grid item xs={12} md={12}>
            <HighchartsReact highcharts={Highcharts} options={tagsChartOptions} />
          </Grid>

          {/* Overdue Invoices Section */}
          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Typography variant="h6">Overdue Invoices</Typography>
                <ol>
                  {overdueInvoices.map(invoice => (
                    <li key={invoice.invoiceId}>
                      <Typography variant="body2">
                        {invoice.invoiceName} - Due Date: {new Date(invoice.dueDate).toLocaleDateString()}
                      </Typography>
                    </li>
                  ))}
                </ol>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
