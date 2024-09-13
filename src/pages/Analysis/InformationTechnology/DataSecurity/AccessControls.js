import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { Box, Typography, Grid, Card, CardContent, Container, CircularProgress, Backdrop } from '@mui/material';

export default function AccessControlsDashboard({ fetchItems }) {
  const [accessData, setAccessData] = useState([]);
  const [totalAccessControls, setTotalAccessControls] = useState(0);
  const [accessLevelDistribution, setAccessLevelDistribution] = useState([]);
  const [resourceDistribution, setResourceDistribution] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const data = await fetchItems();
      setAccessData(data);
      processAccessData(data);
      setLoading(false);
    };

    fetchData();
  }, [fetchItems]);

  const processAccessData = (data) => {
    // Total Access Controls
    setTotalAccessControls(data.length);

    // Access Level Distribution for Pie Chart
    const levelCounts = data.reduce((acc, access) => {
      acc[access.accessLevel] = (acc[access.accessLevel] || 0) + 1;
      return acc;
    }, {});
    setAccessLevelDistribution(Object.keys(levelCounts).map(key => ({
      name: key.charAt(0).toUpperCase() + key.slice(1),
      y: levelCounts[key],
    })));

    // Resource Distribution for Column Chart
    const resourceCounts = data.reduce((acc, access) => {
      acc[access.resource] = (acc[access.resource] || 0) + 1;
      return acc;
    }, {});
    setResourceDistribution(Object.keys(resourceCounts).map(key => ({
      name: key,
      y: resourceCounts[key],
    })));
  };

  // Highcharts options for Access Level Distribution
  const accessLevelChartOptions = {
    chart: { type: 'pie' },
    title: { text: 'Access Level Distribution' },
    series: [{
      name: 'Access Levels',
      colorByPoint: true,
      data: accessLevelDistribution,
    }],
  };

  // Highcharts options for Resource Distribution
  const resourceChartOptions = {
    chart: { type: 'column' },
    title: { text: 'Resource Distribution' },
    xAxis: { type: 'category', title: { text: 'Resources' } },
    yAxis: { title: { text: 'Number of Access Grants' } },
    series: [{
      name: 'Resources',
      data: resourceDistribution,
    }],
  };

  return (
    <Container maxWidth="xl" sx={{ paddingTop: 3, paddingBottom: 7 }}>
      <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <Box sx={{ padding: 4 }}>
        <Typography variant="h4" gutterBottom>
          Access Controls Dashboard
        </Typography>

        <Grid container spacing={4}>
          {/* KPIs Section */}
          <Grid item xs={12} md={3}>
            <Card>
              <CardContent>
                <Typography variant="h6">Total Access Controls</Typography>
                <Typography variant="h4" color="green" sx={{ fontWeight: 'bold' }}>
                  {totalAccessControls}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Grid container spacing={4} sx={{ marginTop: 4 }}>
          {/* Access Level Distribution Chart */}
          <Grid item xs={12} md={6}>
            <HighchartsReact highcharts={Highcharts} options={accessLevelChartOptions} />
          </Grid>

          {/* Resource Distribution Chart */}
          <Grid item xs={12} md={6}>
            <HighchartsReact highcharts={Highcharts} options={resourceChartOptions} />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
