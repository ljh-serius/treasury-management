import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { Box, Typography, Grid, Card, CardContent, Container, CircularProgress, Backdrop } from '@mui/material';

export default function MilestoneDependenciesDashboard({ fetchData }) {
  const [dependencyData, setDependencyData] = useState([]);
  const [totalDependencies, setTotalDependencies] = useState(0);
  const [relationshipTypeDistribution, setRelationshipTypeDistribution] = useState([]);
  const [dependencyTrends, setDependencyTrends] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDataAsync = async () => {
      setLoading(true);
      const data = await fetchData();
      setDependencyData(data);
      processDependencyData(data);
      setLoading(false);
    };

    fetchDataAsync();
  }, [fetchData]);

  const processDependencyData = (data) => {
    // Total Dependencies
    setTotalDependencies(data.length);

    // Relationship Type Distribution for Pie Chart
    const relationshipCounts = data.reduce((acc, item) => {
      acc[item.relationshipType] = (acc[item.relationshipType] || 0) + 1;
      return acc;
    }, {});
    setRelationshipTypeDistribution(Object.keys(relationshipCounts).map(key => ({
      name: key.replace(/-/g, ' ').toUpperCase(),
      y: relationshipCounts[key],
    })));

    // Dependency Trends for Line Chart
    const trendData = data.map(item => ({
      date: new Date(item.createdDate).getTime(),
    })).sort((a, b) => a.date - b.date);
    setDependencyTrends(trendData);
  };

  // Highcharts options for Relationship Type Distribution
  const relationshipTypeChartOptions = {
    chart: { type: 'pie' },
    title: { text: 'Relationship Type Distribution' },
    series: [{
      name: 'Relationship Type',
      colorByPoint: true,
      data: relationshipTypeDistribution,
    }],
  };

  // Highcharts options for Dependency Trends
  const dependencyTrendChartOptions = {
    chart: { type: 'line' },
    title: { text: 'Milestone Dependency Trends' },
    xAxis: { type: 'datetime', title: { text: 'Created Date' } },
    yAxis: { title: { text: 'Number of Dependencies' } },
    series: [{
      name: 'Dependency Date',
      data: dependencyTrends.map(item => [item.date]),
    }],
  };

  return (
    <Container maxWidth="xl" sx={{ paddingTop: 3, paddingBottom: 7 }}>
      <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <Box sx={{ padding: 4 }}>
        <Typography variant="h4" gutterBottom>
          Milestone Dependencies Dashboard
        </Typography>

        <Grid container spacing={4}>
          {/* KPIs Section */}
          <Grid item xs={12} md={3}>
            <Card>
              <CardContent>
                <Typography variant="h6">Total Dependencies</Typography>
                <Typography variant="h4" color="green" sx={{ fontWeight: 'bold' }}>
                  {totalDependencies}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Grid container spacing={4} sx={{ marginTop: 4 }}>
          {/* Relationship Type Distribution Chart */}
          <Grid item xs={12} md={6}>
            <HighchartsReact highcharts={Highcharts} options={relationshipTypeChartOptions} />
          </Grid>

          {/* Dependency Trends Chart */}
          <Grid item xs={12} md={6}>
            <HighchartsReact highcharts={Highcharts} options={dependencyTrendChartOptions} />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
