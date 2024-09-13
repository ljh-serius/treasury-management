import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { Box, Typography, Grid, Card, CardContent, Container, CircularProgress, Backdrop } from '@mui/material';

export default function SalesForecastingDashboard({ fetchData }) {
  const [forecastData, setForecastData] = useState([]);
  const [totalForecasts, setTotalForecasts] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [highProbabilityForecasts, setHighProbabilityForecasts] = useState(0);
  const [lowProbabilityForecasts, setLowProbabilityForecasts] = useState(0);
  const [revenueDistribution, setRevenueDistribution] = useState([]);
  const [probabilityDistribution, setProbabilityDistribution] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDataAsync = async () => {
      setLoading(true);
      const data = await fetchData();
      setForecastData(data);
      processForecastData(data);
      setLoading(false);
    };

    fetchDataAsync();
  }, [fetchData]);

  const processForecastData = (data) => {
    // Total Forecasts
    setTotalForecasts(data.length);

    // Total Expected Revenue
    const totalRev = data.reduce((acc, forecast) => acc + Number(forecast.expectedRevenue), 0);
    setTotalRevenue(totalRev);

    // Count High and Low Probability Forecasts
    const highProbability = data.filter(forecast => forecast.probability >= 70).length;
    const lowProbability = data.filter(forecast => forecast.probability <= 30).length;
    setHighProbabilityForecasts(highProbability);
    setLowProbabilityForecasts(lowProbability);

    // Revenue Distribution for Column Chart
    const revenueData = data.map(forecast => ({
      name: `Forecast ${forecast.forecastId.slice(-4)}`,
      y: Number(forecast.expectedRevenue),
    }));
    setRevenueDistribution(revenueData);

    // Probability Distribution for Pie Chart
    const probabilityCounts = {
      'High Probability (>= 70%)': highProbability,
      'Low Probability (<= 30%)': lowProbability,
      'Medium Probability': data.length - highProbability - lowProbability,
    };
    setProbabilityDistribution(Object.keys(probabilityCounts).map(key => ({
      name: key,
      y: probabilityCounts[key],
    })));
  };

  // Highcharts options for Revenue Distribution
  const revenueChartOptions = {
    chart: { type: 'column' },
    title: { text: 'Expected Revenue Distribution' },
    series: [{
      name: 'Revenue',
      data: revenueDistribution,
    }],
  };

  // Highcharts options for Probability Distribution
  const probabilityChartOptions = {
    chart: { type: 'pie' },
    title: { text: 'Forecast Probability Distribution' },
    series: [{
      name: 'Forecasts',
      colorByPoint: true,
      data: probabilityDistribution,
    }],
  };

  return (
    <Container maxWidth="xl" sx={{ paddingTop: 3, paddingBottom: 7 }}>
      <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <Box sx={{ padding: 4 }}>
        <Typography variant="h4" gutterBottom>
          Sales Forecasting Dashboard
        </Typography>

        <Grid container spacing={4}>
          {/* KPIs Section */}
          <Grid item xs={12} md={3}>
            <Card>
              <CardContent>
                <Typography variant="h6">Total Forecasts</Typography>
                <Typography variant="h4" color="green" sx={{ fontWeight: 'bold' }}>
                  {totalForecasts}
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={3}>
            <Card>
              <CardContent>
                <Typography variant="h6">Total Expected Revenue</Typography>
                <Typography variant="h4" color="blue" sx={{ fontWeight: 'bold' }}>
                  ${totalRevenue.toFixed(2)}
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={3}>
            <Card>
              <CardContent>
                <Typography variant="h6">High Probability Forecasts</Typography>
                <Typography variant="h4" color="green" sx={{ fontWeight: 'bold' }}>
                  {highProbabilityForecasts}
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={3}>
            <Card>
              <CardContent>
                <Typography variant="h6">Low Probability Forecasts</Typography>
                <Typography variant="h4" color="red" sx={{ fontWeight: 'bold' }}>
                  {lowProbabilityForecasts}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Grid container spacing={4} sx={{ marginTop: 4 }}>
          {/* Revenue Distribution Chart */}
          <Grid item xs={12} md={6}>
            <HighchartsReact highcharts={Highcharts} options={revenueChartOptions} />
          </Grid>

          {/* Probability Distribution Chart */}
          <Grid item xs={12} md={6}>
            <HighchartsReact highcharts={Highcharts} options={probabilityChartOptions} />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
