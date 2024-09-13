import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { Box, Typography, Grid, Card, CardContent, Container, CircularProgress, Backdrop } from '@mui/material';

export default function LeadConversionDashboard({ fetchItems }) {
  const [leadData, setLeadData] = useState([]);
  const [totalLeads, setTotalLeads] = useState(0);
  const [averageConversionRate, setAverageConversionRate] = useState(0);
  const [highConversionLeads, setHighConversionLeads] = useState(0);
  const [lowConversionLeads, setLowConversionLeads] = useState(0);
  const [conversionRateDistribution, setConversionRateDistribution] = useState([]);
  const [conversionTrends, setConversionTrends] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDataAsync = async () => {
      setLoading(true);
      const data = await fetchItems();
      setLeadData(data);
      processLeadData(data);
      setLoading(false);
    };

    fetchDataAsync();
  }, [fetchItems]);

  const processLeadData = (data) => {
    // Total Leads
    setTotalLeads(data.length);

    // Average Conversion Rate
    const totalRate = data.reduce((acc, lead) => acc + Number(lead.conversionRate), 0);
    setAverageConversionRate(totalRate / data.length);

    // Count High and Low Conversion Leads
    const highConversion = data.filter(lead => lead.conversionRate >= 75).length;
    const lowConversion = data.filter(lead => lead.conversionRate <= 25).length;
    setHighConversionLeads(highConversion);
    setLowConversionLeads(lowConversion);

    // Conversion Rate Distribution for Pie Chart
    const rateCounts = data.reduce((acc, lead) => {
      const rate = Math.floor(lead.conversionRate / 10) * 10; // Group by 10%
      acc[rate] = (acc[rate] || 0) + 1;
      return acc;
    }, {});
    setConversionRateDistribution(Object.keys(rateCounts).map(key => ({
      name: `${key}%`,
      y: rateCounts[key],
    })));

    // Conversion Trends Over Time
    const trends = data.map(lead => ({
      date: new Date(lead.conversionDate).getTime(),
      rate: lead.conversionRate,
    })).sort((a, b) => a.date - b.date);
    setConversionTrends(trends);
  };

  // Highcharts options for Conversion Rate Distribution
  const conversionRateChartOptions = {
    chart: { type: 'pie' },
    title: { text: 'Conversion Rate Distribution' },
    series: [{
      name: 'Leads',
      colorByPoint: true,
      data: conversionRateDistribution,
    }],
  };

  // Highcharts options for Conversion Trends Over Time
  const conversionTrendsChartOptions = {
    chart: { type: 'line' },
    title: { text: 'Conversion Trends Over Time' },
    xAxis: { type: 'datetime', title: { text: 'Date' } },
    yAxis: { title: { text: 'Conversion Rate (%)' } },
    series: [{
      name: 'Conversion Rate',
      data: conversionTrends.map(item => [item.date, item.rate]),
    }],
  };

  return (
    <Container maxWidth="xl" sx={{ paddingTop: 3, paddingBottom: 7 }}>
      <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <Box sx={{ padding: 4 }}>
        <Typography variant="h4" gutterBottom>
          Lead Conversion Rates Dashboard
        </Typography>

        <Grid container spacing={4}>
          {/* KPIs Section */}
          <Grid item xs={12} md={3}>
            <Card>
              <CardContent>
                <Typography variant="h6">Total Leads</Typography>
                <Typography variant="h4" color="green" sx={{ fontWeight: 'bold' }}>
                  {totalLeads}
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={3}>
            <Card>
              <CardContent>
                <Typography variant="h6">Average Conversion Rate</Typography>
                <Typography variant="h4" color="blue" sx={{ fontWeight: 'bold' }}>
                  {averageConversionRate.toFixed(2)}%
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={3}>
            <Card>
              <CardContent>
                <Typography variant="h6">High Conversion Leads</Typography>
                <Typography variant="h4" color="purple" sx={{ fontWeight: 'bold' }}>
                  {highConversionLeads}
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={3}>
            <Card>
              <CardContent>
                <Typography variant="h6">Low Conversion Leads</Typography>
                <Typography variant="h4" color="red" sx={{ fontWeight: 'bold' }}>
                  {lowConversionLeads}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Grid container spacing={4} sx={{ marginTop: 4 }}>
          {/* Conversion Rate Distribution Chart */}
          <Grid item xs={12} md={6}>
            <HighchartsReact highcharts={Highcharts} options={conversionRateChartOptions} />
          </Grid>

          {/* Conversion Trends Over Time Chart */}
          <Grid item xs={12} md={6}>
            <HighchartsReact highcharts={Highcharts} options={conversionTrendsChartOptions} />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
