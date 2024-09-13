import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { Box, Typography, Grid, Card, CardContent, Container, CircularProgress, Backdrop } from '@mui/material';

export default function TasksAssignmentsDashboard({ fetchData }) {
  const [assignmentData, setAssignmentData] = useState([]);
  const [totalAssignments, setTotalAssignments] = useState(0);
  const [urgentAssignments, setUrgentAssignments] = useState(0);
  const [roleDistribution, setRoleDistribution] = useState([]);
  const [assignmentTrends, setAssignmentTrends] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDataAsync = async () => {
      setLoading(true);
      const data = await fetchData();
      setAssignmentData(data);
      processAssignmentData(data);
      setLoading(false);
    };

    fetchDataAsync();
  }, [fetchData]);

  const processAssignmentData = (data) => {
    // Total Assignments
    setTotalAssignments(data.length);

    // Urgent Assignments
    const urgent = data.filter(assignment => assignment.tags.includes('urgent')).length;
    setUrgentAssignments(urgent);

    // Role Distribution for Pie Chart
    const roleCounts = data.reduce((acc, assignment) => {
      acc[assignment.role] = (acc[assignment.role] || 0) + 1;
      return acc;
    }, {});
    setRoleDistribution(Object.keys(roleCounts).map(key => ({
      name: key.charAt(0).toUpperCase() + key.slice(1),
      y: roleCounts[key],
    })));

    // Assignment Trends for Line Chart
    const trendData = data.map(assignment => ({
      date: new Date(assignment.assignmentDate).getTime(),
    })).sort((a, b) => a.date - b.date);
    setAssignmentTrends(trendData);
  };

  // Highcharts options for Role Distribution
  const roleChartOptions = {
    chart: { type: 'pie' },
    title: { text: 'Role Distribution in Task Assignments' },
    series: [{
      name: 'Roles',
      colorByPoint: true,
      data: roleDistribution,
    }],
  };

  // Highcharts options for Assignment Trends
  const assignmentTrendChartOptions = {
    chart: { type: 'line' },
    title: { text: 'Task Assignment Trends' },
    xAxis: { type: 'datetime', title: { text: 'Date' } },
    yAxis: { title: { text: 'Number of Assignments' } },
    series: [{
      name: 'Assignments',
      data: assignmentTrends.map(item => [item.date]),
    }],
  };

  return (
    <Container maxWidth="xl" sx={{ paddingTop: 3, paddingBottom: 7 }}>
      <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <Box sx={{ padding: 4 }}>
        <Typography variant="h4" gutterBottom>
          Task Assignments Dashboard
        </Typography>

        <Grid container spacing={4}>
          {/* KPIs Section */}
          <Grid item xs={12} md={3}>
            <Card>
              <CardContent>
                <Typography variant="h6">Total Assignments</Typography>
                <Typography variant="h4" color="green" sx={{ fontWeight: 'bold' }}>
                  {totalAssignments}
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={3}>
            <Card>
              <CardContent>
                <Typography variant="h6">Urgent Assignments</Typography>
                <Typography variant="h4" color="red" sx={{ fontWeight: 'bold' }}>
                  {urgentAssignments}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Grid container spacing={4} sx={{ marginTop: 4 }}>
          {/* Role Distribution Chart */}
          <Grid item xs={12} md={6}>
            <HighchartsReact highcharts={Highcharts} options={roleChartOptions} />
          </Grid>

          {/* Assignment Trends Chart */}
          <Grid item xs={12} md={6}>
            <HighchartsReact highcharts={Highcharts} options={assignmentTrendChartOptions} />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
