import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { Box, Typography, Grid, Card, CardContent, Container, CircularProgress, Backdrop } from '@mui/material';

export default function SupplierEvaluationDashboard({ fetchItems }) {
  const [evaluationData, setEvaluationData] = useState([]);
  const [totalEvaluations, setTotalEvaluations] = useState(0);
  const [scoreDistribution, setScoreDistribution] = useState([]);
  const [evaluationTrends, setEvaluationTrends] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const data = await fetchItems();
      setEvaluationData(data);
      processEvaluationData(data);
      setLoading(false);
    };

    fetchData();
  }, [fetchItems]);

  const processEvaluationData = (data) => {
    // Total Evaluations
    setTotalEvaluations(data.length);

    // Performance Score Distribution for Pie Chart
    const scoreCounts = data.reduce((acc, evaluation) => {
      const scoreRange = evaluation.performanceScore >= 80 ? 'High Performance' :
        evaluation.performanceScore >= 50 ? 'Medium Performance' : 'Low Performance';
      acc[scoreRange] = (acc[scoreRange] || 0) + 1;
      return acc;
    }, {});
    setScoreDistribution(Object.keys(scoreCounts).map(key => ({
      name: key,
      y: scoreCounts[key],
    })));

    // Evaluation Date Trends for Line Chart
    const trendsData = data.map(evaluation => ({
      date: new Date(evaluation.evaluationDate).getTime(),
      count: 1,
    })).sort((a, b) => a.date - b.date);
    setEvaluationTrends(trendsData);
  };

  // Highcharts options for Performance Score Distribution
  const scoreChartOptions = {
    chart: { type: 'pie' },
    title: { text: 'Performance Score Distribution' },
    series: [{
      name: 'Scores',
      colorByPoint: true,
      data: scoreDistribution,
    }],
  };

  // Highcharts options for Evaluation Date Trends
  const evaluationDateChartOptions = {
    chart: { type: 'line' },
    title: { text: 'Evaluation Date Trends' },
    xAxis: { type: 'datetime', title: { text: 'Date' } },
    yAxis: { title: { text: 'Evaluations' } },
    series: [{
      name: 'Evaluations',
      data: evaluationTrends.map(item => [item.date, item.count]),
    }],
  };

  return (
    <Container maxWidth="xl" sx={{ paddingTop: 3, paddingBottom: 7 }}>
      <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <Box sx={{ padding: 4 }}>
        <Typography variant="h4" gutterBottom>
          Supplier Performance Evaluation Dashboard
        </Typography>

        <Grid container spacing={4}>
          {/* KPIs Section */}
          <Grid item xs={12} md={3}>
            <Card>
              <CardContent>
                <Typography variant="h6">Total Evaluations</Typography>
                <Typography variant="h4" color="green" sx={{ fontWeight: 'bold' }}>
                  {totalEvaluations}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Grid container spacing={4} sx={{ marginTop: 4 }}>
          {/* Performance Score Distribution Chart */}
          <Grid item xs={12} md={6}>
            <HighchartsReact highcharts={Highcharts} options={scoreChartOptions} />
          </Grid>

          {/* Evaluation Date Trends Chart */}
          <Grid item xs={12} md={6}>
            <HighchartsReact highcharts={Highcharts} options={evaluationDateChartOptions} />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
