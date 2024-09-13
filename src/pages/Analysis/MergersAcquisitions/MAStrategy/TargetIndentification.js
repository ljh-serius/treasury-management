import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { Box, Typography, Grid, Card, CardContent, Container, CircularProgress, Backdrop } from '@mui/material';

export default function TargetIdentificationDashboard({ fetchItems }) {
  const [targetData, setTargetData] = useState([]);
  const [totalTargets, setTotalTargets] = useState(0);
  const [statusDistribution, setStatusDistribution] = useState([]);
  const [revenueTrends, setRevenueTrends] = useState([]);
  const [marketValueTrends, setMarketValueTrends] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const data = await fetchItems();
      setTargetData(data);
      processTargetData(data);
      setLoading(false);
    };

    fetchData();
  }, [fetchItems]);

  const processTargetData = (data) => {
    // Total Targets
    setTotalTargets(data.length);

    // Status Distribution for Pie Chart
    const statusCounts = data.reduce((acc, target) => {
      acc[target.status] = (acc[target.status] || 0) + 1;
      return acc;
    }, {});
    setStatusDistribution(Object.keys(statusCounts).map(key => ({
      name: key.charAt(0).toUpperCase() + key.slice(1),
      y: statusCounts[key],
    })));

    // Revenue Trends for Line Chart
    const revenueData = data.map(target => ({
      date: new Date(target.identificationDate).getTime(),
      revenue: target.revenue,
    })).sort((a, b) => a.date - b.date);
    setRevenueTrends(revenueData);

    // Market Value Trends for Line Chart
    const marketValueData = data.map(target => ({
      date: new Date(target.identificationDate).getTime(),
      marketValue: target.marketValue,
    })).sort((a, b) => a.date - b.date);
    setMarketValueTrends(marketValueData);
  };

  // Highcharts options for Status Distribution
  const statusChartOptions = {
    chart: { type: 'pie' },
    title: { text: 'Target Status Distribution' },
    series: [{
      name: 'Status',
      colorByPoint: true,
      data: statusDistribution,
    }],
  };

  // Highcharts options for Revenue Trends
  const revenueChartOptions = {
    chart: { type: 'line' },
    title: { text: 'Revenue Trends Over Time' },
    xAxis: { type: 'datetime', title: { text: 'Date' } },
    yAxis: { title: { text: 'Revenue' } },
    series: [{
      name: 'Revenue',
      data: revenueTrends.map(item => [item.date, item.revenue]),
    }],
  };

  // Highcharts options for Market Value Trends
  const marketValueChartOptions = {
    chart: { type: 'line' },
    title: { text: 'Market Value Trends Over Time' },
    xAxis: { type: 'datetime', title: { text: 'Date' } },
    yAxis: { title: { text: 'Market Value' } },
    series: [{
      name: 'Market Value',
      data: marketValueTrends.map(item => [item.date, item.marketValue]),
    }],
  };

  return (
    <Container maxWidth="xl" sx={{ paddingTop: 3, paddingBottom: 7 }}>
      <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <Box sx={{ padding: 4 }}>
        <Typography variant="h4" gutterBottom>
          Target Identification Dashboard
        </Typography>

        <Grid container spacing={4}>
          {/* KPIs Section */}
          <Grid item xs={12} md={3}>
            <Card>
              <CardContent>
                <Typography variant="h6">Total Targets</Typography>
                <Typography variant="h4" color="green" sx={{ fontWeight: 'bold' }}>
                  {totalTargets}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Grid container spacing={4} sx={{ marginTop: 4 }}>
          {/* Status Distribution Chart */}
          <Grid item xs={12} md={6}>
            <HighchartsReact highcharts={Highcharts} options={statusChartOptions} />
          </Grid>

          {/* Revenue Trends Chart */}
          <Grid item xs={12} md={6}>
            <HighchartsReact highcharts={Highcharts} options={revenueChartOptions} />
          </Grid>

          {/* Market Value Trends Chart */}
          <Grid item xs={12} md={6} sx={{ marginTop: 4 }}>
            <HighchartsReact highcharts={Highcharts} options={marketValueChartOptions} />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
