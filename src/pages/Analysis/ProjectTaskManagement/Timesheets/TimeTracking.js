import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { Box, Typography, Grid, Card, CardContent, Container, CircularProgress, Backdrop } from '@mui/material';

export default function TimeTrackingDashboard({ fetchItems }) {
  const [trackingData, setTrackingData] = useState([]);
  const [totalHours, setTotalHours] = useState(0);
  const [urgentTasks, setUrgentTasks] = useState(0);
  const [taskDistribution, setTaskDistribution] = useState([]);
  const [timeTrends, setTimeTrends] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDataAsync = async () => {
      setLoading(true);
      const data = await fetchItems();
      setTrackingData(data);
      processTrackingData(data);
      setLoading(false);
    };

    fetchDataAsync();
  }, [fetchItems]);

  const processTrackingData = (data) => {
    // Total Hours
    const total = data.reduce((acc, item) => acc + item.hoursSpent, 0);
    setTotalHours(total);

    // Urgent Tasks
    const urgent = data.filter(item => item.tags.includes('urgent')).length;
    setUrgentTasks(urgent);

    // Task Distribution for Pie Chart
    const taskCounts = data.reduce((acc, item) => {
      acc[item.taskId] = (acc[item.taskId] || 0) + 1;
      return acc;
    }, {});
    setTaskDistribution(Object.keys(taskCounts).map(key => ({
      name: `Task ${key}`,
      y: taskCounts[key],
    })));

    // Time Trends for Line Chart
    const trendData = data.map(item => ({
      date: new Date(item.startTime).getTime(),
      hours: item.hoursSpent,
    })).sort((a, b) => a.date - b.date);
    setTimeTrends(trendData);
  };

  // Highcharts options for Task Distribution
  const taskChartOptions = {
    chart: { type: 'pie' },
    title: { text: 'Task Distribution' },
    series: [{
      name: 'Tasks',
      colorByPoint: true,
      data: taskDistribution,
    }],
  };

  // Highcharts options for Time Tracking Trends
  const timeTrendChartOptions = {
    chart: { type: 'line' },
    title: { text: 'Time Tracking Trends' },
    xAxis: { type: 'datetime', title: { text: 'Date' } },
    yAxis: { title: { text: 'Hours Spent' } },
    series: [{
      name: 'Hours Spent',
      data: timeTrends.map(item => [item.date, item.hours]),
    }],
  };

  return (
    <Container maxWidth="xl" sx={{ paddingTop: 3, paddingBottom: 7 }}>
      <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <Box sx={{ padding: 4 }}>
        <Typography variant="h4" gutterBottom>
          Time Tracking Dashboard
        </Typography>

        <Grid container spacing={4}>
          {/* KPIs Section */}
          <Grid item xs={12} md={3}>
            <Card>
              <CardContent>
                <Typography variant="h6">Total Hours Spent</Typography>
                <Typography variant="h4" color="green" sx={{ fontWeight: 'bold' }}>
                  {totalHours}
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={3}>
            <Card>
              <CardContent>
                <Typography variant="h6">Urgent Tasks</Typography>
                <Typography variant="h4" color="red" sx={{ fontWeight: 'bold' }}>
                  {urgentTasks}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Grid container spacing={4} sx={{ marginTop: 4 }}>
          {/* Task Distribution Chart */}
          <Grid item xs={12} md={6}>
            <HighchartsReact highcharts={Highcharts} options={taskChartOptions} />
          </Grid>

          {/* Time Tracking Trends Chart */}
          <Grid item xs={12} md={6}>
            <HighchartsReact highcharts={Highcharts} options={timeTrendChartOptions} />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
