import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { Box, Typography, Grid, Card, CardContent, Container, CircularProgress, Backdrop } from '@mui/material';

export default function MilestoneCompletionDashboard({ fetchItems }) {
  const [completionData, setCompletionData] = useState([]);
  const [totalMilestones, setTotalMilestones] = useState(0);
  const [delayedMilestones, setDelayedMilestones] = useState(0);
  const [statusDistribution, setStatusDistribution] = useState([]);
  const [completionTrends, setCompletionTrends] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDataAsync = async () => {
      setLoading(true);
      const data = await fetchItems();
      setCompletionData(data);
      processCompletionData(data);
      setLoading(false);
    };

    fetchDataAsync();
  }, [fetchItems]);

  const processCompletionData = (data) => {
    // Total Milestones
    setTotalMilestones(data.length);

    // Count Delayed Milestones
    const delayed = data.filter(item => item.status === 'delayed').length;
    setDelayedMilestones(delayed);

    // Status Distribution for Pie Chart
    const statusCounts = data.reduce((acc, item) => {
      acc[item.status] = (acc[item.status] || 0) + 1;
      return acc;
    }, {});
    setStatusDistribution(Object.keys(statusCounts).map(key => ({
      name: key.charAt(0).toUpperCase() + key.slice(1),
      y: statusCounts[key],
    })));

    // Completion Trends for Line Chart
    const trendData = data.map(item => ({
      date: new Date(item.completionDate).getTime(),
      status: item.status,
    })).sort((a, b) => a.date - b.date);
    setCompletionTrends(trendData);
  };

  // Highcharts options for Status Distribution
  const statusChartOptions = {
    chart: { type: 'pie' },
    title: { text: 'Milestone Status Distribution' },
    series: [{
      name: 'Status',
      colorByPoint: true,
      data: statusDistribution,
    }],
  };

  // Highcharts options for Completion Trends
  const completionTrendChartOptions = {
    chart: { type: 'line' },
    title: { text: 'Milestone Completion Trends' },
    xAxis: { type: 'datetime', title: { text: 'Completion Date' } },
    yAxis: { title: { text: 'Milestone Status' } },
    series: [{
      name: 'Completion Date',
      data: completionTrends.map(item => [item.date]),
    }],
  };

  return (
    <Container maxWidth="xl" sx={{ paddingTop: 3, paddingBottom: 7 }}>
      <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <Box sx={{ padding: 4 }}>
        <Typography variant="h4" gutterBottom>
          Milestone Completion Dashboard
        </Typography>

        <Grid container spacing={4}>
          {/* KPIs Section */}
          <Grid item xs={12} md={3}>
            <Card>
              <CardContent>
                <Typography variant="h6">Total Milestones</Typography>
                <Typography variant="h4" color="green" sx={{ fontWeight: 'bold' }}>
                  {totalMilestones}
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={3}>
            <Card>
              <CardContent>
                <Typography variant="h6">Delayed Milestones</Typography>
                <Typography variant="h4" color="red" sx={{ fontWeight: 'bold' }}>
                  {delayedMilestones}
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

          {/* Completion Trends Chart */}
          <Grid item xs={12} md={6}>
            <HighchartsReact highcharts={Highcharts} options={completionTrendChartOptions} />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
