import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { Box, Typography, Grid, Card, CardContent, Container, CircularProgress, Backdrop } from '@mui/material';

export default function SystemsIntegrationDashboard({ fetchItems }) {
  const [integrationData, setIntegrationData] = useState([]);
  const [totalIntegrations, setTotalIntegrations] = useState(0);
  const [statusDistribution, setStatusDistribution] = useState([]);
  const [progressTrends, setProgressTrends] = useState([]);
  const [timelineTrends, setTimelineTrends] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const data = await fetchItems();
      setIntegrationData(data);
      processIntegrationData(data);
      setLoading(false);
    };

    fetchData();
  }, [fetchItems]);

  const processIntegrationData = (data) => {
    // Total Integrations
    setTotalIntegrations(data.length);

    // Status Distribution for Pie Chart
    const statusCounts = data.reduce((acc, integration) => {
      acc[integration.status] = (acc[integration.status] || 0) + 1;
      return acc;
    }, {});
    setStatusDistribution(Object.keys(statusCounts).map(key => ({
      name: key.charAt(0).toUpperCase() + key.slice(1),
      y: statusCounts[key],
    })));

    // Progress Trends for Line Chart
    const progressData = data.map(integration => ({
      date: new Date(integration.startDate).getTime(),
      progress: integration.progress,
    })).sort((a, b) => a.date - b.date);
    setProgressTrends(progressData);

    // Timeline Trends for Line Chart
    const timelineData = data.map(integration => ({
      start: new Date(integration.startDate).getTime(),
      end: new Date(integration.endDate).getTime(),
    })).sort((a, b) => a.start - b.start);
    setTimelineTrends(timelineData);
  };

  // Highcharts options for Status Distribution
  const statusChartOptions = {
    chart: { type: 'pie' },
    title: { text: 'Systems Integration Status Distribution' },
    series: [{
      name: 'Status',
      colorByPoint: true,
      data: statusDistribution,
    }],
  };

  // Highcharts options for Progress Trends
  const progressChartOptions = {
    chart: { type: 'line' },
    title: { text: 'Progress Trends Over Time' },
    xAxis: { type: 'datetime', title: { text: 'Date' } },
    yAxis: { title: { text: 'Progress (%)' } },
    series: [{
      name: 'Progress',
      data: progressTrends.map(item => [item.date, item.progress]),
    }],
  };

  // Highcharts options for Timeline Trends
  const timelineChartOptions = {
    chart: { type: 'line' },
    title: { text: 'Systems Integration Timelines' },
    xAxis: { type: 'datetime', title: { text: 'Start Date' } },
    yAxis: { title: { text: 'End Date' } },
    series: [{
      name: 'Duration',
      data: timelineTrends.map(item => [item.start, item.end]),
    }],
  };

  return (
    <Container maxWidth="xl" sx={{ paddingTop: 3, paddingBottom: 7 }}>
      <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <Box sx={{ padding: 4 }}>
        <Typography variant="h4" gutterBottom>
          Systems Integration Dashboard
        </Typography>

        <Grid container spacing={4}>
          {/* KPIs Section */}
          <Grid item xs={12} md={3}>
            <Card>
              <CardContent>
                <Typography variant="h6">Total Integrations</Typography>
                <Typography variant="h4" color="green" sx={{ fontWeight: 'bold' }}>
                  {totalIntegrations}
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

          {/* Progress Trends Chart */}
          <Grid item xs={12} md={6}>
            <HighchartsReact highcharts={Highcharts} options={progressChartOptions} />
          </Grid>

          {/* Timeline Trends Chart */}
          <Grid item xs={12} md={6} sx={{ marginTop: 4 }}>
            <HighchartsReact highcharts={Highcharts} options={timelineChartOptions} />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
