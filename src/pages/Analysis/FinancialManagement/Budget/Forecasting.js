import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { Box, Typography, Grid, Card, CardContent, Container } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import Backdrop from '@mui/material/Backdrop';

export default function ForecastingAnalytics({ fetchItems }) {
  const [forecastData, setForecastData] = useState([]);
  const [forecastVsActual, setForecastVsActual] = useState([]);
  const [accuracyPercentage, setAccuracyPercentage] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const data = await fetchItems();
      setForecastData(data);
      processForecastData(data);
      setLoading(false);
    };

    fetchData();
  }, [fetchItems]);

  const processForecastData = (data) => {
    // Forecast vs Actual
    const forecastVsActualData = data.map(item => ({
      forecast: Number(item.forecastAmount),
      actual: Number(item.actualAmount),
    }));

    setForecastVsActual(forecastVsActualData);

    // Average Accuracy Percentage
    const totalAccuracy = data.reduce((sum, item) => sum + Number(item.accuracyPercentage), 0);
    setAccuracyPercentage(totalAccuracy / data.length);
  };

  const forecastVsActualChartOptions = {
    chart: { type: 'column' },
    title: { text: 'Forecast vs Actual Amounts' },
    series: [
      { name: 'Forecast Amount', data: forecastVsActual.map(item => item.forecast) },
      { name: 'Actual Amount', data: forecastVsActual.map(item => item.actual) },
    ],
  };

  return (
    <Container maxWidth="xl" sx={{ paddingTop: 3, paddingBottom: 7 }}>
      <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <Box sx={{ padding: 4 }}>
        <Typography variant="h4" gutterBottom>Forecasting Analytics</Typography>
        <Grid container spacing={4}>
          {/* KPI Section */}
          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Typography variant="h6">Average Forecast Accuracy</Typography>
                <Typography variant="h4" color="green" sx={{ fontWeight: 'bold' }}>
                  {accuracyPercentage.toFixed(2)}%
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Chart Section */}
          <Grid item xs={12}>
            <HighchartsReact highcharts={Highcharts} options={forecastVsActualChartOptions} />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
