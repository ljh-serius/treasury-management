import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { Box, Typography, Grid, Card, CardContent, Container, CircularProgress, Backdrop } from '@mui/material';

export default function TaskDeadlinesDashboard({ fetchItems }) {
  const [deadlineData, setDeadlineData] = useState([]);
  const [totalDeadlines, setTotalDeadlines] = useState(0);
  const [urgentDeadlines, setUrgentDeadlines] = useState(0);
  const [extensionRequestStatusDistribution, setExtensionRequestStatusDistribution] = useState([]);
  const [deadlineTrends, setDeadlineTrends] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDataAsync = async () => {
      setLoading(true);
      const data = await fetchItems();
      setDeadlineData(data);
      processDeadlineData(data);
      setLoading(false);
    };

    fetchDataAsync();
  }, [fetchItems]);

  const processDeadlineData = (data) => {
    // Total Deadlines
    setTotalDeadlines(data.length);

    // Urgent Deadlines
    const urgent = data.filter(deadline => deadline.tags.includes('urgent')).length;
    setUrgentDeadlines(urgent);

    // Extension Request Status Distribution for Pie Chart
    const statusCounts = data.reduce((acc, deadline) => {
      acc[deadline.extensionApprovalStatus] = (acc[deadline.extensionApprovalStatus] || 0) + 1;
      return acc;
    }, {});
    setExtensionRequestStatusDistribution(Object.keys(statusCounts).map(key => ({
      name: key.charAt(0).toUpperCase() + key.slice(1),
      y: statusCounts[key],
    })));

    // Deadline Trends for Line Chart
    const trendData = data.map(deadline => ({
      date: new Date(deadline.deadlineDate).getTime(),
    })).sort((a, b) => a.date - b.date);
    setDeadlineTrends(trendData);
  };

  // Highcharts options for Extension Request Status Distribution
  const statusChartOptions = {
    chart: { type: 'pie' },
    title: { text: 'Extension Request Status Distribution' },
    series: [{
      name: 'Extension Status',
      colorByPoint: true,
      data: extensionRequestStatusDistribution,
    }],
  };

  // Highcharts options for Deadline Trends
  const deadlineTrendChartOptions = {
    chart: { type: 'line' },
    title: { text: 'Deadline Trends' },
    xAxis: { type: 'datetime', title: { text: 'Deadline Date' } },
    yAxis: { title: { text: 'Number of Deadlines' } },
    series: [{
      name: 'Deadlines',
      data: deadlineTrends.map(item => [item.date]),
    }],
  };

  return (
    <Container maxWidth="xl" sx={{ paddingTop: 3, paddingBottom: 7 }}>
      <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <Box sx={{ padding: 4 }}>
        <Typography variant="h4" gutterBottom>
          Task Deadlines Dashboard
        </Typography>

        <Grid container spacing={4}>
          {/* KPIs Section */}
          <Grid item xs={12} md={3}>
            <Card>
              <CardContent>
                <Typography variant="h6">Total Deadlines</Typography>
                <Typography variant="h4" color="green" sx={{ fontWeight: 'bold' }}>
                  {totalDeadlines}
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={3}>
            <Card>
              <CardContent>
                <Typography variant="h6">Urgent Deadlines</Typography>
                <Typography variant="h4" color="red" sx={{ fontWeight: 'bold' }}>
                  {urgentDeadlines}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Grid container spacing={4} sx={{ marginTop: 4 }}>
          {/* Extension Request Status Distribution Chart */}
          <Grid item xs={12} md={6}>
            <HighchartsReact highcharts={Highcharts} options={statusChartOptions} />
          </Grid>

          {/* Deadline Trends Chart */}
          <Grid item xs={12} md={6}>
            <HighchartsReact highcharts={Highcharts} options={deadlineTrendChartOptions} />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
