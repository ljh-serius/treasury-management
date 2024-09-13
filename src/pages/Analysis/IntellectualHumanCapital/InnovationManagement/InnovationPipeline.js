import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { Box, Typography, Grid, Card, CardContent, Container, CircularProgress, Backdrop } from '@mui/material';

export default function InnovationPipelineDashboard({ fetchItems }) {
  const [pipelineData, setPipelineData] = useState([]);
  const [totalPipelines, setTotalPipelines] = useState(0);
  const [progressDistribution, setProgressDistribution] = useState([]);
  const [stageTrends, setStageTrends] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const data = await fetchItems();
      setPipelineData(data);
      processPipelineData(data);
      setLoading(false);
    };

    fetchData();
  }, [fetchItems]);

  const processPipelineData = (data) => {
    // Total Pipelines
    setTotalPipelines(data.length);

    // Progress Distribution for Pie Chart
    const progressCounts = data.reduce((acc, pipeline) => {
      acc[pipeline.stage] = (acc[pipeline.stage] || 0) + 1;
      return acc;
    }, {});
    setProgressDistribution(Object.keys(progressCounts).map(key => ({
      name: key.replace('-', ' ').toUpperCase(),
      y: progressCounts[key],
    })));

    // Stage Progress Trends for Line Chart
    const trendsData = data.map(pipeline => ({
      date: new Date(pipeline.expectedCompletionDate).getTime(),
      progress: pipeline.progressPercentage,
    })).sort((a, b) => a.date - b.date);
    setStageTrends(trendsData);
  };

  // Highcharts options for Progress Distribution
  const progressChartOptions = {
    chart: { type: 'pie' },
    title: { text: 'Pipeline Progress Distribution' },
    series: [{
      name: 'Stage',
      colorByPoint: true,
      data: progressDistribution,
    }],
  };

  // Highcharts options for Stage Progress Trends
  const stageTrendsChartOptions = {
    chart: { type: 'line' },
    title: { text: 'Stage Completion Trends' },
    xAxis: { type: 'datetime', title: { text: 'Expected Completion Date' } },
    yAxis: { title: { text: 'Progress Percentage' } },
    series: [{
      name: 'Progress',
      data: stageTrends.map(item => [item.date, item.progress]),
    }],
  };

  return (
    <Container maxWidth="xl" sx={{ paddingTop: 3, paddingBottom: 7 }}>
      <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <Box sx={{ padding: 4 }}>
        <Typography variant="h4" gutterBottom>
          Innovation Pipeline Dashboard
        </Typography>

        <Grid container spacing={4}>
          {/* KPIs Section */}
          <Grid item xs={12} md={3}>
            <Card>
              <CardContent>
                <Typography variant="h6">Total Pipelines</Typography>
                <Typography variant="h4" color="green" sx={{ fontWeight: 'bold' }}>
                  {totalPipelines}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Grid container spacing={4} sx={{ marginTop: 4 }}>
          {/* Progress Distribution Chart */}
          <Grid item xs={12} md={6}>
            <HighchartsReact highcharts={Highcharts} options={progressChartOptions} />
          </Grid>

          {/* Stage Completion Trends Chart */}
          <Grid item xs={12} md={6}>
            <HighchartsReact highcharts={Highcharts} options={stageTrendsChartOptions} />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
