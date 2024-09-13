import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { Box, Typography, Grid, Card, CardContent, Container, CircularProgress, Backdrop } from '@mui/material';

export default function MilestoneDashboard({ fetchItems }) {
  const [milestoneData, setMilestoneData] = useState([]);
  const [totalMilestones, setTotalMilestones] = useState(0);
  const [statusDistribution, setStatusDistribution] = useState([]);
  const [creationTrends, setCreationTrends] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const data = await fetchItems();
      setMilestoneData(data);
      processMilestoneData(data);
      setLoading(false);
    };

    fetchData();
  }, [fetchItems]);

  const processMilestoneData = (data) => {
    // Total Milestones
    setTotalMilestones(data.length);

    // Status Distribution for Pie Chart
    const statusCounts = data.reduce((acc, milestone) => {
      acc[milestone.status] = (acc[milestone.status] || 0) + 1;
      return acc;
    }, {});
    setStatusDistribution(Object.keys(statusCounts).map(key => ({
      name: key.charAt(0).toUpperCase() + key.slice(1),
      y: statusCounts[key],
    })));

    // Creation Trends for Line Chart
    const trendsData = data.map(milestone => ({
      date: new Date(milestone.createdDate).getTime(),
      count: 1,
    })).sort((a, b) => a.date - b.date);
    setCreationTrends(trendsData);
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

  // Highcharts options for Creation Trends
  const creationTrendsChartOptions = {
    chart: { type: 'line' },
    title: { text: 'Milestone Creation Trends' },
    xAxis: { type: 'datetime', title: { text: 'Creation Date' } },
    yAxis: { title: { text: 'Number of Milestones Created' } },
    series: [{
      name: 'Milestones Created',
      data: creationTrends.map(item => [item.date, item.count]),
    }],
  };

  return (
    <Container maxWidth="xl" sx={{ paddingTop: 3, paddingBottom: 7 }}>
      <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <Box sx={{ padding: 4 }}>
        <Typography variant="h4" gutterBottom>
          Milestone Dashboard
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
        </Grid>

        <Grid container spacing={4} sx={{ marginTop: 4 }}>
          {/* Milestone Status Distribution Chart */}
          <Grid item xs={12} md={6}>
            <HighchartsReact highcharts={Highcharts} options={statusChartOptions} />
          </Grid>

          {/* Creation Trends Chart */}
          <Grid item xs={12} md={6}>
            <HighchartsReact highcharts={Highcharts} options={creationTrendsChartOptions} />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
