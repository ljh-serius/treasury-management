import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { Box, Typography, Grid, Card, CardContent, Container, CircularProgress, Backdrop } from '@mui/material';

export default function PerformanceMetricsDashboard({ fetchItems }) {
  const [metricsData, setMetricsData] = useState([]);
  const [totalMetrics, setTotalMetrics] = useState(0);
  const [metricNameDistribution, setMetricNameDistribution] = useState([]);
  const [metricValueTrends, setMetricValueTrends] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const data = await fetchItems();
      setMetricsData(data);
      processMetricsData(data);
      setLoading(false);
    };

    fetchData();
  }, [fetchItems]);

  const processMetricsData = (data) => {
    // Total Metrics
    setTotalMetrics(data.length);

    // Metric Name Distribution for Pie Chart
    const metricNameCounts = data.reduce((acc, metric) => {
      acc[metric.metricName] = (acc[metric.metricName] || 0) + 1;
      return acc;
    }, {});
    setMetricNameDistribution(Object.keys(metricNameCounts).map(key => ({
      name: key.charAt(0).toUpperCase() + key.slice(1),
      y: metricNameCounts[key],
    })));

    // Metric Value Trends for Line Chart
    const valueData = data.map(metric => ({
      date: new Date(metric.evaluationDate).getTime(),
      value: metric.metricValue,
    })).sort((a, b) => a.date - b.date);
    setMetricValueTrends(valueData);
  };

  // Highcharts options for Metric Name Distribution
  const metricNameChartOptions = {
    chart: { type: 'pie' },
    title: { text: 'Metric Name Distribution' },
    series: [{
      name: 'Metric Name',
      colorByPoint: true,
      data: metricNameDistribution,
    }],
  };

  // Highcharts options for Metric Value Trends
  const metricValueChartOptions = {
    chart: { type: 'line' },
    title: { text: 'Metric Value Trends Over Time' },
    xAxis: { type: 'datetime', title: { text: 'Evaluation Date' } },
    yAxis: { title: { text: 'Metric Value' } },
    series: [{
      name: 'Metric Value',
      data: metricValueTrends.map(item => [item.date, item.value]),
    }],
  };

  return (
    <Container maxWidth="xl" sx={{ paddingTop: 3, paddingBottom: 7 }}>
      <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <Box sx={{ padding: 4 }}>
        <Typography variant="h4" gutterBottom>
          Performance Metrics Dashboard
        </Typography>

        <Grid container spacing={4}>
          {/* KPIs Section */}
          <Grid item xs={12} md={3}>
            <Card>
              <CardContent>
                <Typography variant="h6">Total Metrics</Typography>
                <Typography variant="h4" color="green" sx={{ fontWeight: 'bold' }}>
                  {totalMetrics}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Grid container spacing={4} sx={{ marginTop: 4 }}>
          {/* Metric Name Distribution Chart */}
          <Grid item xs={12} md={6}>
            <HighchartsReact highcharts={Highcharts} options={metricNameChartOptions} />
          </Grid>

          {/* Metric Value Trends Chart */}
          <Grid item xs={12} md={6}>
            <HighchartsReact highcharts={Highcharts} options={metricValueChartOptions} />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
