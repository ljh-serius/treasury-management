import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { Box, Typography, Grid, Card, CardContent, Container, CircularProgress, Backdrop } from '@mui/material';

export default function ProjectScopesDashboard({ fetchItems }) {
  const [scopeData, setScopeData] = useState([]);
  const [totalScopes, setTotalScopes] = useState(0);
  const [urgentScopes, setUrgentScopes] = useState(0);
  const [constraintDistribution, setConstraintDistribution] = useState([]);
  const [assumptionTrends, setAssumptionTrends] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDataAsync = async () => {
      setLoading(true);
      const data = await fetchItems();
      setScopeData(data);
      processScopeData(data);
      setLoading(false);
    };

    fetchDataAsync();
  }, [fetchItems]);

  const processScopeData = (data) => {
    // Total Scopes
    setTotalScopes(data.length);

    // Urgent Scopes
    const urgent = data.filter(scope => scope.tags.includes('urgent')).length;
    setUrgentScopes(urgent);

    // Constraint Distribution for Pie Chart
    const constraintCounts = data.reduce((acc, scope) => {
      acc[scope.constraints] = (acc[scope.constraints] || 0) + 1;
      return acc;
    }, {});
    setConstraintDistribution(Object.keys(constraintCounts).map(key => ({
      name: key.charAt(0).toUpperCase() + key.slice(1),
      y: constraintCounts[key],
    })));

    // Assumption Trends for Line Chart
    const trendData = data.map(scope => ({
      date: new Date(scope.createdDate).getTime(),
    })).sort((a, b) => a.date - b.date);
    setAssumptionTrends(trendData);
  };

  // Highcharts options for Constraint Distribution
  const constraintChartOptions = {
    chart: { type: 'pie' },
    title: { text: 'Constraint Distribution' },
    series: [{
      name: 'Constraints',
      colorByPoint: true,
      data: constraintDistribution,
    }],
  };

  // Highcharts options for Assumption Trends
  const assumptionTrendChartOptions = {
    chart: { type: 'line' },
    title: { text: 'Assumption Trends' },
    xAxis: { type: 'datetime', title: { text: 'Date' } },
    yAxis: { title: { text: 'Number of Assumptions' } },
    series: [{
      name: 'Assumptions',
      data: assumptionTrends.map(item => [item.date]),
    }],
  };

  return (
    <Container maxWidth="xl" sx={{ paddingTop: 3, paddingBottom: 7 }}>
      <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <Box sx={{ padding: 4 }}>
        <Typography variant="h4" gutterBottom>
          Project Scopes Dashboard
        </Typography>

        <Grid container spacing={4}>
          {/* KPIs Section */}
          <Grid item xs={12} md={3}>
            <Card>
              <CardContent>
                <Typography variant="h6">Total Scopes</Typography>
                <Typography variant="h4" color="green" sx={{ fontWeight: 'bold' }}>
                  {totalScopes}
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={3}>
            <Card>
              <CardContent>
                <Typography variant="h6">Urgent Scopes</Typography>
                <Typography variant="h4" color="red" sx={{ fontWeight: 'bold' }}>
                  {urgentScopes}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Grid container spacing={4} sx={{ marginTop: 4 }}>
          {/* Constraint Distribution Chart */}
          <Grid item xs={12} md={6}>
            <HighchartsReact highcharts={Highcharts} options={constraintChartOptions} />
          </Grid>

          {/* Assumption Trends Chart */}
          <Grid item xs={12} md={6}>
            <HighchartsReact highcharts={Highcharts} options={assumptionTrendChartOptions} />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
