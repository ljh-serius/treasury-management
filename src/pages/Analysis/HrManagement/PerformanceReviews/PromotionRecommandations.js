import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { Box, Typography, Grid, Card, CardContent, Container } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import Backdrop from '@mui/material/Backdrop';

export default function PerformanceMetricsAnalytics({ fetchItems }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalMetrics, setTotalMetrics] = useState(0);
  const [averageScore, setAverageScore] = useState(0);
  const [scoreDistribution, setScoreDistribution] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const fetchedData = await fetchItems();
      setData(fetchedData);
      calculateKPIs(fetchedData);
      generateCharts(fetchedData);
      setLoading(false);
    };

    fetchData();
  }, [fetchItems]);

  const calculateKPIs = (data) => {
    setTotalMetrics(data.length);
    const totalScore = data.reduce((sum, metric) => sum + metric.score, 0);
    setAverageScore((totalScore / data.length).toFixed(2));
  };

  const generateCharts = (data) => {
    const scoreCounts = data.reduce((acc, metric) => {
      const scoreRange = Math.floor(metric.score / 10) * 10; // Group scores by ranges of 10
      acc[scoreRange] = (acc[scoreRange] || 0) + 1;
      return acc;
    }, {});

    setScoreDistribution(
      Object.keys(scoreCounts).map((key) => ({
        name: `${key}-${parseInt(key) + 9}`,
        y: scoreCounts[key],
      }))
    );
  };

  const scoreDistributionChart = {
    chart: { type: 'column' },
    title: { text: 'Score Distribution' },
    xAxis: { type: 'category', title: { text: 'Score Range' } },
    yAxis: { title: { text: 'Number of Metrics' } },
    series: [
      {
        name: 'Scores',
        data: scoreDistribution,
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
          Performance Metrics Analytics
        </Typography>
        <Grid container spacing={4}>
          {/* KPIs */}
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6">Total Metrics</Typography>
                <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                  {totalMetrics}
                </Typography>
                <Typography variant="body2">Total performance metrics measured.</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6">Average Score</Typography>
                <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                  {averageScore}
                </Typography>
                <Typography variant="body2">Average score across all metrics.</Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Charts */}
          <Grid item xs={12} md={12}>
            <HighchartsReact highcharts={Highcharts} options={scoreDistributionChart} />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
