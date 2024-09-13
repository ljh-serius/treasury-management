import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { Box, Typography, Grid, Card, CardContent, Container, CircularProgress, Backdrop } from '@mui/material';

export default function FreightManagementDashboard({ fetchItems }) {
  const [freightData, setFreightData] = useState([]);
  const [totalFreight, setTotalFreight] = useState(0);
  const [freightTypeDistribution, setFreightTypeDistribution] = useState([]);
  const [costTrends, setCostTrends] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const data = await fetchItems();
      setFreightData(data);
      processFreightData(data);
      setLoading(false);
    };

    fetchData();
  }, [fetchItems]);

  const processFreightData = (data) => {
    // Total Freight
    setTotalFreight(data.length);

    // Freight Type Distribution for Pie Chart
    const typeCounts = data.reduce((acc, freight) => {
      acc[freight.freightType] = (acc[freight.freightType] || 0) + 1;
      return acc;
    }, {});
    setFreightTypeDistribution(Object.keys(typeCounts).map(key => ({
      name: key.charAt(0).toUpperCase() + key.slice(1),
      y: typeCounts[key],
    })));

    // Cost Trends for Line Chart
    const trendsData = data.map(freight => ({
      date: new Date(freight.departureDate).getTime(),
      amount: freight.cost,
    })).sort((a, b) => a.date - b.date);
    setCostTrends(trendsData);
  };

  // Highcharts options for Freight Type Distribution
  const freightTypeChartOptions = {
    chart: { type: 'pie' },
    title: { text: 'Freight Type Distribution' },
    series: [{
      name: 'Freight Types',
      colorByPoint: true,
      data: freightTypeDistribution,
    }],
  };

  // Highcharts options for Cost Trends
  const costChartOptions = {
    chart: { type: 'line' },
    title: { text: 'Freight Cost Trends Over Time' },
    xAxis: { type: 'datetime', title: { text: 'Departure Date' } },
    yAxis: { title: { text: 'Cost' } },
    series: [{
      name: 'Freight Cost',
      data: costTrends.map(item => [item.date, item.amount]),
    }],
  };

  return (
    <Container maxWidth="xl" sx={{ paddingTop: 3, paddingBottom: 7 }}>
      <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <Box sx={{ padding: 4 }}>
        <Typography variant="h4" gutterBottom>
          Freight Management Dashboard
        </Typography>

        <Grid container spacing={4}>
          {/* KPIs Section */}
          <Grid item xs={12} md={3}>
            <Card>
              <CardContent>
                <Typography variant="h6">Total Freight Shipments</Typography>
                <Typography variant="h4" color="green" sx={{ fontWeight: 'bold' }}>
                  {totalFreight}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Grid container spacing={4} sx={{ marginTop: 4 }}>
          {/* Freight Type Distribution Chart */}
          <Grid item xs={12} md={6}>
            <HighchartsReact highcharts={Highcharts} options={freightTypeChartOptions} />
          </Grid>

          {/* Cost Trends Chart */}
          <Grid item xs={12} md={6}>
            <HighchartsReact highcharts={Highcharts} options={costChartOptions} />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
