import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { Box, Typography, Grid, Card, CardContent, Container } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import Backdrop from '@mui/material/Backdrop';

export default function InvoiceAnalysisDashboard({ fetchItems }) {
  const [invoicesData, setInvoicesData] = useState([]);
  const [currencyDistribution, setCurrencyDistribution] = useState([]);
  const [paymentTermsDistribution, setPaymentTermsDistribution] = useState([]);
  const [monthlyTrendsData, setMonthlyTrendsData] = useState([]);
  const [topVendors, setTopVendors] = useState([]);
  const [totalAmountExclVAT, setTotalAmountExclVAT] = useState(0);
  const [totalAmountInclVAT, setTotalAmountInclVAT] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const data = await fetchItems();
      setInvoicesData(data);
      processInvoiceData(data);
      setLoading(false);
    };

    fetchData();
  }, [fetchItems]);

  const processInvoiceData = (data) => {
    // Currency Distribution
    const currencyCounts = data.reduce((acc, invoice) => {
      acc[invoice.preferredCurrency] = (acc[invoice.preferredCurrency] || 0) + 1;
      return acc;
    }, {});

    setCurrencyDistribution(Object.keys(currencyCounts).map(key => ({
      name: key,
      y: currencyCounts[key],
    })));

    // Payment Terms Distribution
    const paymentTermsCounts = data.reduce((acc, invoice) => {
      acc[invoice.paymentTerms] = (acc[invoice.paymentTerms] || 0) + 1;
      return acc;
    }, {});

    setPaymentTermsDistribution(Object.keys(paymentTermsCounts).map(key => ({
      name: key,
      y: paymentTermsCounts[key],
    })));

    // Monthly Trends Data (based on 'issuedAt')
    const trendCounts = data.reduce((acc, invoice) => {
      const month = new Date(invoice.issuedAt).getMonth() + 1;
      acc[month] = (acc[month] || 0) + 1;
      return acc;
    }, {});

    setMonthlyTrendsData(Object.keys(trendCounts).map(key => ({
      name: `Month ${key}`,
      y: trendCounts[key],
    })));

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

    // Top 5 Vendors by Total Amount Excluding VAT
    const topVendorsList = data
      .sort((a, b) => Number(b.totalAmountExclVAT) - Number(a.totalAmountExclVAT))
      .slice(0, 5);
    setTopVendors(topVendorsList);
  };

  const currencyChartOptions = {
    chart: {
      type: 'pie',
    },
    title: {
      text: 'Currency Distribution',
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
      text: 'Payment Terms Distribution',
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
                <Typography variant="h6">Total Amount (Excl. VAT)</Typography>
                <Typography variant="h4" color="green" sx={{ fontWeight: 'bold' }}>
                  ${totalAmountExclVAT.toFixed(2)}
                </Typography>
                <Typography variant="body2">
                  This represents the total amount of all invoices excluding VAT.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6">Total Amount (Incl. VAT)</Typography>
                <Typography variant="h4" color="blue" sx={{ fontWeight: 'bold' }}>
                  ${totalAmountInclVAT.toFixed(2)}
                </Typography>
                <Typography variant="body2">
                  This represents the total amount of all invoices including VAT.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6">Top 5 Vendors by Total Amount (Excl. VAT)</Typography>
                <ol>
                  {topVendors.map(invoice => (
                    <li key={invoice.invoiceId}>
                      <Typography variant="body2">
                        {invoice.providerDetails} - Value: ${Number(invoice.totalAmountExclVAT).toFixed(2)}
                      </Typography>
                    </li>
                  ))}
                </ol>
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
          <Grid item xs={12} md={12}>
            <HighchartsReact highcharts={Highcharts} options={monthlyTrendsChartOptions} />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
