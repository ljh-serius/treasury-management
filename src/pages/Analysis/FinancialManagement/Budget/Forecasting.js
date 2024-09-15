import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { Box, Typography, Grid, Card, CardContent, Container } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import Backdrop from '@mui/material/Backdrop';

export default function ForecastingAnalysisDashboard({ fetchItems }) {
  const [forecastData, setForecastData] = useState([]);
  const [statusDistribution, setStatusDistribution] = useState([]);
  const [varianceData, setVarianceData] = useState([]);
  const [totalForecastAmount, setTotalForecastAmount] = useState(0);
  const [totalActualAmount, setTotalActualAmount] = useState(0);
  const [accuracyPercentage, setAccuracyPercentage] = useState(0);
  const [ecoContributionTotal, setEcoContributionTotal] = useState(0);
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
    // Status Distribution
    const statusCounts = data.reduce((acc, forecast) => {
      acc[forecast.status] = (acc[forecast.status] || 0) + 1;
      return acc;
    }, {});

    setStatusDistribution(Object.keys(statusCounts).map(key => ({
      name: key,
      y: statusCounts[key],
    })));

    // Variance Data
    const varianceCounts = data.reduce((acc, forecast) => {
      const variance = Number(forecast.actualAmount) - Number(forecast.forecastAmount);
      acc[variance] = (acc[variance] || 0) + 1;
      return acc;
    }, {});

    setVarianceData(Object.keys(varianceCounts).map(key => ({
      name: `Variance: ${key}`,
      y: varianceCounts[key],
    })));

    // Total Forecast and Actual Amounts
    const totals = data.reduce(
      (acc, forecast) => {
        acc.forecastAmount += Number(forecast.forecastAmount) || 0;
        acc.actualAmount += Number(forecast.actualAmount) || 0;
        acc.ecoContribution += Number(forecast.ecoContribution) || 0;
        acc.accuracy += Number(forecast.accuracyPercentage) || 0;
        return acc;
      },
      { forecastAmount: 0, actualAmount: 0, ecoContribution: 0, accuracy: 0 }
    );

    setTotalForecastAmount(totals.forecastAmount);
    setTotalActualAmount(totals.actualAmount);
    setAccuracyPercentage(totals.accuracy / data.length);
    setEcoContributionTotal(totals.ecoContribution);
  };

  const statusChartOptions = {
    chart: { type: 'pie' },
    title: { text: 'Status Distribution' },
    series: [{ name: 'Status', colorByPoint: true, data: statusDistribution }],
  };

  const varianceChartOptions = {
    chart: { type: 'column' },
    title: { text: 'Forecast vs Actual Variance' },
    series: [{ name: 'Variance', data: varianceData }],
  };

  return (
    <Container maxWidth="xl" sx={{ paddingTop: 3, paddingBottom: 7 }}>
      <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <Box sx={{ padding: 4 }}>
        <Typography variant="h4" gutterBottom>
          Forecasting Analysis Dashboard
        </Typography>
        <Grid container spacing={4}>
          {/* KPI Section */}
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6">Total Forecast Amount</Typography>
                <Typography variant="h4" color="green" sx={{ fontWeight: 'bold' }}>
                  ${totalForecastAmount.toFixed(2)}
                </Typography>
                <Typography variant="body2">Total forecasted amount across all departments.</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6">Total Actual Amount</Typography>
                <Typography variant="h4" color="blue" sx={{ fontWeight: 'bold' }}>
                  ${totalActualAmount.toFixed(2)}
                </Typography>
                <Typography variant="body2">Total actual amount spent across all departments.</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6">Accuracy Percentage</Typography>
                <Typography variant="h4" color="orange" sx={{ fontWeight: 'bold' }}>
                  {accuracyPercentage.toFixed(2)}%
                </Typography>
                <Typography variant="body2">Average forecast accuracy across all departments.</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6">Eco Contribution</Typography>
                <Typography variant="h4" color="orange" sx={{ fontWeight: 'bold' }}>
                  ${ecoContributionTotal.toFixed(2)}
                </Typography>
                <Typography variant="body2">Total eco-tax contributions (French-specific).</Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Chart Section */}
          <Grid item xs={12} md={6}>
            <HighchartsReact highcharts={Highcharts} options={statusChartOptions} />
          </Grid>
          <Grid item xs={12} md={6}>
            <HighchartsReact highcharts={Highcharts} options={varianceChartOptions} />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
