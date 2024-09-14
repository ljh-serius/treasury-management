import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { Box, Typography, Grid, Card, CardContent, Container, CircularProgress, Backdrop } from '@mui/material';

export default function CampaignPerformanceDashboard({ fetchItems }) {
  const [performanceData, setPerformanceData] = useState([]);
  const [metricDistribution, setMetricDistribution] = useState([]);
  const [tagDistribution, setTagDistribution] = useState([]);
  const [averageValue, setAverageValue] = useState(0);
  const [totalMetrics, setTotalMetrics] = useState(0);
  const [medianValue, setMedianValue] = useState(0);
  const [maxValue, setMaxValue] = useState(0);
  const [minValue, setMinValue] = useState(0);
  const [valueOverTime, setValueOverTime] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const data = await fetchItems();
      setPerformanceData(data);
      processPerformanceData(data);
      setLoading(false);
    };

    fetchData();
  }, [fetchItems]);

  const processPerformanceData = (data) => {
    // Total Metrics
    setTotalMetrics(data.length);

    // Average Value
    const totalValue = data.reduce((acc, metric) => acc + Number(metric.value), 0);
    setAverageValue(totalValue / data.length);

    // Median Value
    const sortedValues = data.map(metric => Number(metric.value)).sort((a, b) => a - b);
    const mid = Math.floor(sortedValues.length / 2);
    setMedianValue(sortedValues.length % 2 !== 0 ? sortedValues[mid] : (sortedValues[mid - 1] + sortedValues[mid]) / 2);

    // Maximum and Minimum Values
    setMaxValue(Math.max(...sortedValues));
    setMinValue(Math.min(...sortedValues));

    // Metrics by Name (for chart)
    const metricCounts = data.reduce((acc, metric) => {
      acc[metric.metricName] = (acc[metric.metricName] || 0) + Number(metric.value);
      return acc;
    }, {});

    setMetricDistribution(Object.keys(metricCounts).map(key => ({
      name: key,
      y: metricCounts[key],
    })));

    // Tags Distribution (for chart)
    const tagsCounts = data.reduce((acc, metric) => {
      metric.tags.forEach(tag => {
        acc[tag] = (acc[tag] || 0) + 1;
      });
      return acc;
    }, {});

    setTagDistribution(Object.keys(tagsCounts).map(key => ({
      name: key,
      y: tagsCounts[key],
    })));

    // Value Trend Over Time
    const valuesOverTime = data.map(metric => ({
      date: new Date(metric.recordedDate).getTime(),
      value: Number(metric.value),
    })).sort((a, b) => a.date - b.date);

    setValueOverTime(valuesOverTime);
  };

  // Chart options
  const metricChartOptions = {
    chart: { type: 'column' },
    title: { text: 'Metrics Distribution' },
    series: [{ name: 'Metrics', data: metricDistribution }],
  };

  const tagChartOptions = {
    chart: { type: 'pie' },
    title: { text: 'Tags Distribution' },
    series: [{ name: 'Tags', colorByPoint: true, data: tagDistribution }],
  };

  const valueTrendChartOptions = {
    chart: { type: 'line' },
    title: { text: 'Value Trend Over Time' },
    xAxis: { type: 'datetime', title: { text: 'Date' } },
    yAxis: { title: { text: 'Value' } },
    series: [{ name: 'Value', data: valueOverTime.map(item => [item.date, item.value]) }],
  };

  return (
    <Container maxWidth="xl" sx={{ paddingTop: 3, paddingBottom: 7 }}>
      <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <Box sx={{ padding: 4 }}>
        <Typography variant="h4" gutterBottom>
          Campaign Performance Dashboard
        </Typography>

        <Grid container spacing={4}>
          {/* KPIs Section */}
          <Grid item xs={12} md={2}>
            <Card>
              <CardContent>
                <Typography variant="h6">Total Metrics</Typography>
                <Typography variant="h4" color="green" sx={{ fontWeight: 'bold' }}>
                  {totalMetrics}
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={2}>
            <Card>
              <CardContent>
                <Typography variant="h6">Average Value</Typography>
                <Typography variant="h4" color="blue" sx={{ fontWeight: 'bold' }}>
                  {averageValue.toFixed(2)}
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={2}>
            <Card>
              <CardContent>
                <Typography variant="h6">Median Value</Typography>
                <Typography variant="h4" color="purple" sx={{ fontWeight: 'bold' }}>
                  {medianValue.toFixed(2)}
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={2}>
            <Card>
              <CardContent>
                <Typography variant="h6">Max Value</Typography>
                <Typography variant="h4" color="red" sx={{ fontWeight: 'bold' }}>
                  {maxValue}
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={2}>
            <Card>
              <CardContent>
                <Typography variant="h6">Min Value</Typography>
                <Typography variant="h4" color="orange" sx={{ fontWeight: 'bold' }}>
                  {minValue}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Grid container spacing={4} sx={{ marginTop: 4 }}>
          {/* Metrics Distribution */}
          <Grid item xs={12} md={6}>
            <HighchartsReact highcharts={Highcharts} options={metricChartOptions} />
          </Grid>

          {/* Tags Distribution */}
          <Grid item xs={12} md={6}>
            <HighchartsReact highcharts={Highcharts} options={tagChartOptions} />
          </Grid>

          {/* Value Trend Over Time */}
          <Grid item xs={12}>
            <HighchartsReact highcharts={Highcharts} options={valueTrendChartOptions} />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
