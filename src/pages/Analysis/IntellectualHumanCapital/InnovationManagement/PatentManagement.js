import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { Box, Typography, Grid, Card, CardContent, Container, CircularProgress, Backdrop } from '@mui/material';

export default function PatentManagementDashboard({ fetchItems }) {
  const [patentData, setPatentData] = useState([]);
  const [totalPatents, setTotalPatents] = useState(0);
  const [statusDistribution, setStatusDistribution] = useState([]);
  const [filingTrends, setFilingTrends] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const data = await fetchItems();
      setPatentData(data);
      processPatentData(data);
      setLoading(false);
    };

    fetchData();
  }, [fetchItems]);

  const processPatentData = (data) => {
    // Total Patents
    setTotalPatents(data.length);

    // Patent Status Distribution for Pie Chart
    const statusCounts = data.reduce((acc, patent) => {
      acc[patent.status] = (acc[patent.status] || 0) + 1;
      return acc;
    }, {});
    setStatusDistribution(Object.keys(statusCounts).map(key => ({
      name: key.charAt(0).toUpperCase() + key.slice(1),
      y: statusCounts[key],
    })));

    // Filing Trends for Line Chart
    const trendsData = data.map(patent => ({
      date: new Date(patent.filingDate).getTime(),
      count: 1,
    })).sort((a, b) => a.date - b.date);
    setFilingTrends(trendsData);
  };

  // Highcharts options for Patent Status Distribution
  const statusChartOptions = {
    chart: { type: 'pie' },
    title: { text: 'Patent Status Distribution' },
    series: [{
      name: 'Status',
      colorByPoint: true,
      data: statusDistribution,
    }],
  };

  // Highcharts options for Filing Trends
  const filingTrendsChartOptions = {
    chart: { type: 'line' },
    title: { text: 'Patent Filing Trends' },
    xAxis: { type: 'datetime', title: { text: 'Filing Date' } },
    yAxis: { title: { text: 'Number of Patents Filed' } },
    series: [{
      name: 'Patents Filed',
      data: filingTrends.map(item => [item.date, item.count]),
    }],
  };

  return (
    <Container maxWidth="xl" sx={{ paddingTop: 3, paddingBottom: 7 }}>
      <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <Box sx={{ padding: 4 }}>
        <Typography variant="h4" gutterBottom>
          Patent Management Dashboard
        </Typography>

        <Grid container spacing={4}>
          {/* KPIs Section */}
          <Grid item xs={12} md={3}>
            <Card>
              <CardContent>
                <Typography variant="h6">Total Patents</Typography>
                <Typography variant="h4" color="green" sx={{ fontWeight: 'bold' }}>
                  {totalPatents}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Grid container spacing={4} sx={{ marginTop: 4 }}>
          {/* Patent Status Distribution Chart */}
          <Grid item xs={12} md={6}>
            <HighchartsReact highcharts={Highcharts} options={statusChartOptions} />
          </Grid>

          {/* Filing Trends Chart */}
          <Grid item xs={12} md={6}>
            <HighchartsReact highcharts={Highcharts} options={filingTrendsChartOptions} />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
