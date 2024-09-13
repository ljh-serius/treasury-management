import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { Box, Typography, Grid, Card, CardContent, Container, CircularProgress, Backdrop } from '@mui/material';

export default function OpportunityStagesDashboard({ fetchData }) {
  const [stageData, setStageData] = useState([]);
  const [totalStages, setTotalStages] = useState(0);
  const [stagesInProgress, setStagesInProgress] = useState(0);
  const [completedStages, setCompletedStages] = useState(0);
  const [stageDistribution, setStageDistribution] = useState([]);
  const [stageOrderTrends, setStageOrderTrends] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDataAsync = async () => {
      setLoading(true);
      const data = await fetchData();
      setStageData(data);
      processStageData(data);
      setLoading(false);
    };

    fetchDataAsync();
  }, [fetchData]);

  const processStageData = (data) => {
    // Total Stages
    setTotalStages(data.length);

    // Count Stages In Progress and Completed Stages
    const inProgress = data.filter(stage => stage.tags.includes('in-progress')).length;
    const completed = data.filter(stage => stage.tags.includes('completed')).length;
    setStagesInProgress(inProgress);
    setCompletedStages(completed);

    // Stage Distribution for Pie Chart
    const stageCounts = data.reduce((acc, stage) => {
      acc[stage.stageName] = (acc[stage.stageName] || 0) + 1;
      return acc;
    }, {});
    setStageDistribution(Object.keys(stageCounts).map(key => ({
      name: key,
      y: stageCounts[key],
    })));

    // Stage Order Trends
    const orderTrends = data.map(stage => ({
      order: stage.stageOrder,
      name: stage.stageName,
    })).sort((a, b) => a.order - b.order);
    setStageOrderTrends(orderTrends);
  };

  // Highcharts options for Stage Distribution
  const stageDistributionChartOptions = {
    chart: { type: 'pie' },
    title: { text: 'Stage Distribution' },
    series: [{
      name: 'Stages',
      colorByPoint: true,
      data: stageDistribution,
    }],
  };

  // Highcharts options for Stage Order Trends
  const stageOrderChartOptions = {
    chart: { type: 'line' },
    title: { text: 'Stage Order Trends' },
    xAxis: { title: { text: 'Order' } },
    yAxis: { title: { text: 'Stage Name' } },
    series: [{
      name: 'Stages by Order',
      data: stageOrderTrends.map(item => [item.order, item.name]),
    }],
  };

  return (
    <Container maxWidth="xl" sx={{ paddingTop: 3, paddingBottom: 7 }}>
      <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <Box sx={{ padding: 4 }}>
        <Typography variant="h4" gutterBottom>
          Opportunity Stages Dashboard
        </Typography>

        <Grid container spacing={4}>
          {/* KPIs Section */}
          <Grid item xs={12} md={3}>
            <Card>
              <CardContent>
                <Typography variant="h6">Total Stages</Typography>
                <Typography variant="h4" color="green" sx={{ fontWeight: 'bold' }}>
                  {totalStages}
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={3}>
            <Card>
              <CardContent>
                <Typography variant="h6">Stages In Progress</Typography>
                <Typography variant="h4" color="blue" sx={{ fontWeight: 'bold' }}>
                  {stagesInProgress}
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={3}>
            <Card>
              <CardContent>
                <Typography variant="h6">Completed Stages</Typography>
                <Typography variant="h4" color="purple" sx={{ fontWeight: 'bold' }}>
                  {completedStages}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Grid container spacing={4} sx={{ marginTop: 4 }}>
          {/* Stage Distribution Chart */}
          <Grid item xs={12} md={6}>
            <HighchartsReact highcharts={Highcharts} options={stageDistributionChartOptions} />
          </Grid>

          {/* Stage Order Trends Chart */}
          <Grid item xs={12} md={6}>
            <HighchartsReact highcharts={Highcharts} options={stageOrderChartOptions} />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
