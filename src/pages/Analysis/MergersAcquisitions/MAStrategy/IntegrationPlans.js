import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { Box, Typography, Grid, Card, CardContent, Container, CircularProgress, Backdrop } from '@mui/material';

export default function IntegrationPlansDashboard({ fetchItems }) {
  const [planData, setPlanData] = useState([]);
  const [totalPlans, setTotalPlans] = useState(0);
  const [statusDistribution, setStatusDistribution] = useState([]);
  const [timelineTrends, setTimelineTrends] = useState([]);
  const [teamDistribution, setTeamDistribution] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDataAsync = async () => {
      setLoading(true);
      const data = await fetchItems();
      setPlanData(data);
      processPlanData(data);
      setLoading(false);
    };

    fetchDataAsync();
  }, [fetchItems]);

  const processPlanData = (data) => {
    // Total Plans
    setTotalPlans(data.length);

    // Status Distribution for Pie Chart
    const statusCounts = data.reduce((acc, plan) => {
      acc[plan.status] = (acc[plan.status] || 0) + 1;
      return acc;
    }, {});
    setStatusDistribution(Object.keys(statusCounts).map(key => ({
      name: key.charAt(0).toUpperCase() + key.slice(1),
      y: statusCounts[key],
    })));

    // Timeline Trends for Line Chart
    const trendData = data.map(plan => ({
      start: new Date(plan.startDate).getTime(),
      end: new Date(plan.endDate).getTime(),
    })).sort((a, b) => a.start - b.start);
    setTimelineTrends(trendData);

    // Responsible Team Distribution for Pie Chart
    const teamCounts = data.reduce((acc, plan) => {
      acc[plan.responsibleTeam] = (acc[plan.responsibleTeam] || 0) + 1;
      return acc;
    }, {});
    setTeamDistribution(Object.keys(teamCounts).map(key => ({
      name: key,
      y: teamCounts[key],
    })));
  };

  // Highcharts options for Status Distribution
  const statusChartOptions = {
    chart: { type: 'pie' },
    title: { text: 'Status Distribution' },
    series: [{
      name: 'Status',
      colorByPoint: true,
      data: statusDistribution,
    }],
  };

  // Highcharts options for Timeline Trends
  const timelineChartOptions = {
    chart: { type: 'line' },
    title: { text: 'Integration Plan Timelines' },
    xAxis: { type: 'datetime', title: { text: 'Start Date' } },
    yAxis: { title: { text: 'End Date' } },
    series: [{
      name: 'Duration',
      data: timelineTrends.map(item => [item.start, item.end]),
    }],
  };

  // Highcharts options for Responsible Team Distribution
  const teamChartOptions = {
    chart: { type: 'pie' },
    title: { text: 'Responsible Team Distribution' },
    series: [{
      name: 'Teams',
      colorByPoint: true,
      data: teamDistribution,
    }],
  };

  return (
    <Container maxWidth="xl" sx={{ paddingTop: 3, paddingBottom: 7 }}>
      <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <Box sx={{ padding: 4 }}>
        <Typography variant="h4" gutterBottom>
          Integration Plans Dashboard
        </Typography>

        <Grid container spacing={4}>
          {/* KPIs Section */}
          <Grid item xs={12} md={3}>
            <Card>
              <CardContent>
                <Typography variant="h6">Total Integration Plans</Typography>
                <Typography variant="h4" color="green" sx={{ fontWeight: 'bold' }}>
                  {totalPlans}
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

          {/* Timeline Trends Chart */}
          <Grid item xs={12} md={6}>
            <HighchartsReact highcharts={Highcharts} options={timelineChartOptions} />
          </Grid>

          {/* Team Distribution Chart */}
          <Grid item xs={12} md={6} sx={{ marginTop: 4 }}>
            <HighchartsReact highcharts={Highcharts} options={teamChartOptions} />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
