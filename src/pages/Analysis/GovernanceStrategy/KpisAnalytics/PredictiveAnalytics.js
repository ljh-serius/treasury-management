import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { Box, Typography, Grid, Card, CardContent, Container, CircularProgress, Backdrop } from '@mui/material';

export default function PredictiveAnalyticsDashboard({ fetchItems }) {
  const [analyticsData, setAnalyticsData] = useState([]);
  const [totalAnalyses, setTotalAnalyses] = useState(0);
  const [accuracyScores, setAccuracyScores] = useState([]);
  const [tagsDistribution, setTagsDistribution] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const data = await fetchItems();
      setAnalyticsData(data);
      processAnalyticsData(data);
      setLoading(false);
    };

    fetchData();
  }, [fetchItems]);

  const processAnalyticsData = (data) => {
    setTotalAnalyses(data.length);

    const accuracyMap = {};
    const tagsMap = {};

    data.forEach((item) => {
      // Process accuracy scores
      const accuracy = item.accuracyScore;
      accuracyMap[item.analysisName] = accuracy;

      // Process tags distribution
      item.tags.forEach(tag => {
        tagsMap[tag] = (tagsMap[tag] || 0) + 1;
      });
    });

    const accuracyArray = Object.entries(accuracyMap).map(([name, score]) => ({
      name,
      y: score,
    }));

    const tagsArray = Object.entries(tagsMap).map(([tag, count]) => ({
      name: tag,
      y: count,
    }));

    setAccuracyScores(accuracyArray);
    setTagsDistribution(tagsArray);
  };

  // Highcharts options for Accuracy Scores
  const accuracyChartOptions = {
    chart: { type: 'column' },
    title: { text: 'Accuracy Scores per Analysis' },
    xAxis: { type: 'category' },
    yAxis: { title: { text: 'Accuracy Score' } },
    series: [
      {
        name: 'Accuracy Score',
        data: accuracyScores,
      },
    ],
  };

  // Highcharts options for Tags Distribution
  const tagsChartOptions = {
    chart: { type: 'pie' },
    title: { text: 'Tags Distribution' },
    series: [
      {
        name: 'Tags',
        colorByPoint: true,
        data: tagsDistribution,
      },
    ],
  };

  return (
    <Container maxWidth="xl" sx={{ paddingTop: 3, paddingBottom: 7 }}>
      <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <Box sx={{ padding: 4 }}>
        <Typography variant="h4" gutterBottom>
          Predictive Analytics Dashboard
        </Typography>

        <Grid container spacing={4}>
          {/* KPIs Section */}
          <Grid item xs={12} md={3}>
            <Card>
              <CardContent>
                <Typography variant="h6">Total Analyses</Typography>
                <Typography variant="h4" color="green" sx={{ fontWeight: 'bold' }}>
                  {totalAnalyses}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Grid container spacing={4} sx={{ marginTop: 4 }}>
          {/* Accuracy Scores Chart */}
          <Grid item xs={12} md={6}>
            <HighchartsReact highcharts={Highcharts} options={accuracyChartOptions} />
          </Grid>

          {/* Tags Distribution Chart */}
          <Grid item xs={12} md={6}>
            <HighchartsReact highcharts={Highcharts} options={tagsChartOptions} />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
