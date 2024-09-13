import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { Box, Typography, Grid, Card, CardContent, Container, CircularProgress, Backdrop } from '@mui/material';

export default function PropertyDashboard({ fetchData }) {
  const [propertyData, setPropertyData] = useState([]);
  const [totalProperties, setTotalProperties] = useState(0);
  const [totalSize, setTotalSize] = useState(0);
  const [usageDistribution, setUsageDistribution] = useState([]);
  const [sizeTrends, setSizeTrends] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDataAsync = async () => {
      setLoading(true);
      const data = await fetchData();
      setPropertyData(data);
      processPropertyData(data);
      setLoading(false);
    };

    fetchDataAsync();
  }, [fetchData]);

  const processPropertyData = (data) => {
    // Total Properties
    setTotalProperties(data.length);

    // Total Size of Properties
    const totalPropertySize = data.reduce((acc, property) => acc + Number(property.size), 0);
    setTotalSize(totalPropertySize);

    // Property Usage Distribution for Pie Chart
    const usageCounts = data.reduce((acc, property) => {
      acc[property.usage] = (acc[property.usage] || 0) + 1;
      return acc;
    }, {});
    setUsageDistribution(Object.keys(usageCounts).map(key => ({
      name: key.charAt(0).toUpperCase() + key.slice(1),
      y: usageCounts[key],
    })));

    // Property Size Trends for Line Chart
    const sizeData = data.map(property => ({
      name: property.propertyName,
      y: Number(property.size),
    }));
    setSizeTrends(sizeData);
  };

  // Highcharts options for Usage Distribution
  const usageChartOptions = {
    chart: { type: 'pie' },
    title: { text: 'Property Usage Distribution' },
    series: [{
      name: 'Usage',
      colorByPoint: true,
      data: usageDistribution,
    }],
  };

  // Highcharts options for Property Size Trends
  const sizeChartOptions = {
    chart: { type: 'column' },
    title: { text: 'Property Size Trends (sq ft)' },
    series: [{
      name: 'Size (sq ft)',
      data: sizeTrends,
    }],
  };

  return (
    <Container maxWidth="xl" sx={{ paddingTop: 3, paddingBottom: 7 }}>
      <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <Box sx={{ padding: 4 }}>
        <Typography variant="h4" gutterBottom>
          Property Details Dashboard
        </Typography>

        <Grid container spacing={4}>
          {/* KPIs Section */}
          <Grid item xs={12} md={3}>
            <Card>
              <CardContent>
                <Typography variant="h6">Total Properties</Typography>
                <Typography variant="h4" color="green" sx={{ fontWeight: 'bold' }}>
                  {totalProperties}
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={3}>
            <Card>
              <CardContent>
                <Typography variant="h6">Total Property Size (sq ft)</Typography>
                <Typography variant="h4" color="blue" sx={{ fontWeight: 'bold' }}>
                  {totalSize.toFixed(2)}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Grid container spacing={4} sx={{ marginTop: 4 }}>
          {/* Usage Distribution Chart */}
          <Grid item xs={12} md={6}>
            <HighchartsReact highcharts={Highcharts} options={usageChartOptions} />
          </Grid>

          {/* Property Size Trends Chart */}
          <Grid item xs={12} md={6}>
            <HighchartsReact highcharts={Highcharts} options={sizeChartOptions} />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
