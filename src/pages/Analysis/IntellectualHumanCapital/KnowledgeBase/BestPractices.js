import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { Box, Typography, Grid, Card, CardContent, Container, CircularProgress, Backdrop } from '@mui/material';

export default function BestPracticesDashboard({ fetchItems }) {
  const [practiceData, setPracticeData] = useState([]);
  const [totalPractices, setTotalPractices] = useState(0);
  const [statusDistribution, setStatusDistribution] = useState([]);
  const [implementationTrends, setImplementationTrends] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const data = await fetchItems();
      setPracticeData(data);
      processPracticeData(data);
      setLoading(false);
    };

    fetchData();
  }, [fetchItems]);

  const processPracticeData = (data) => {
    // Total Best Practices
    setTotalPractices(data.length);

    // Status Distribution for Pie Chart
    const statusCounts = data.reduce((acc, practice) => {
      acc[practice.status] = (acc[practice.status] || 0) + 1;
      return acc;
    }, {});
    setStatusDistribution(Object.keys(statusCounts).map(key => ({
      name: key.charAt(0).toUpperCase() + key.slice(1),
      y: statusCounts[key],
    })));

    // Implementation Trends for Line Chart
    const trendsData = data.map(practice => ({
      date: new Date(practice.implementationDate).getTime(),
      count: 1,
    })).sort((a, b) => a.date - b.date);
    setImplementationTrends(trendsData);
  };

  // Highcharts options for Status Distribution
  const statusChartOptions = {
    chart: { type: 'pie' },
    title: { text: 'Practice Status Distribution' },
    series: [{
      name: 'Status',
      colorByPoint: true,
      data: statusDistribution,
    }],
  };

  // Highcharts options for Implementation Trends
  const implementationTrendsChartOptions = {
    chart: { type: 'line' },
    title: { text: 'Practice Implementation Trends' },
    xAxis: { type: 'datetime', title: { text: 'Implementation Date' } },
    yAxis: { title: { text: 'Number of Practices Implemented' } },
    series: [{
      name: 'Practices Implemented',
      data: implementationTrends.map(item => [item.date, item.count]),
    }],
  };

  return (
    <Container maxWidth="xl" sx={{ paddingTop: 3, paddingBottom: 7 }}>
      <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <Box sx={{ padding: 4 }}>
        <Typography variant="h4" gutterBottom>
          Best Practices Dashboard
        </Typography>

        <Grid container spacing={4}>
          {/* KPIs Section */}
          <Grid item xs={12} md={3}>
            <Card>
              <CardContent>
                <Typography variant="h6">Total Practices</Typography>
                <Typography variant="h4" color="green" sx={{ fontWeight: 'bold' }}>
                  {totalPractices}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Grid container spacing={4} sx={{ marginTop: 4 }}>
          {/* Practice Status Distribution Chart */}
          <Grid item xs={12} md={6}>
            <HighchartsReact highcharts={Highcharts} options={statusChartOptions} />
          </Grid>

          {/* Implementation Trends Chart */}
          <Grid item xs={12} md={6}>
            <HighchartsReact highcharts={Highcharts} options={implementationTrendsChartOptions} />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
