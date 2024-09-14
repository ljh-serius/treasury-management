import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { Box, Typography, Grid, Card, CardContent, Container, CircularProgress, Backdrop } from '@mui/material';

export default function NpsDashboard({ fetchItems }) {
  const [npsData, setNpsData] = useState([]);
  const [totalResponses, setTotalResponses] = useState(0);
  const [scoreDistribution, setScoreDistribution] = useState([]);
  const [commentsTimeline, setCommentsTimeline] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDataAsync = async () => {
      setLoading(true);
      const data = await fetchItems();
      setNpsData(data);
      processNpsData(data);
      setLoading(false);
    };

    fetchDataAsync();
  }, [fetchItems]);

  const processNpsData = (data) => {
    // Total Responses
    setTotalResponses(data.length);

    // Score Distribution for Pie Chart
    const scoreCounts = data.reduce((acc, response) => {
      acc[response.score] = (acc[response.score] || 0) + 1;
      return acc;
    }, {});
    setScoreDistribution(Object.keys(scoreCounts).map(key => ({
      name: `Score ${key}`,
      y: scoreCounts[key],
    })));

    // Comments Timeline for Line Chart
    const timelineData = data.map(response => ({
      date: new Date(response.surveyDate).getTime(),
      label: `NPS ${response.npsId.slice(-4)}`,
    })).sort((a, b) => a.date - b.date);
    setCommentsTimeline(timelineData);
  };

  // Highcharts options for NPS Score Distribution
  const scoreChartOptions = {
    chart: { type: 'pie' },
    title: { text: 'NPS Score Distribution' },
    series: [{
      name: 'Scores',
      colorByPoint: true,
      data: scoreDistribution,
    }],
  };

  // Highcharts options for Comments Timeline
  const commentsTimelineChartOptions = {
    chart: { type: 'line' },
    title: { text: 'NPS Responses Over Time' },
    xAxis: { type: 'datetime', title: { text: 'Survey Date' } },
    yAxis: { title: { text: 'Responses' } },
    series: [{
      name: 'Responses',
      data: commentsTimeline.map(item => [item.date, 1]), // Y-axis is constant (1) since we're counting occurrences
    }],
  };

  return (
    <Container maxWidth="xl" sx={{ paddingTop: 3, paddingBottom: 7 }}>
      <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <Box sx={{ padding: 4 }}>
        <Typography variant="h4" gutterBottom>
          Net Promoter Score (NPS) Dashboard
        </Typography>

        <Grid container spacing={4}>
          {/* KPIs Section */}
          <Grid item xs={12} md={3}>
            <Card>
              <CardContent>
                <Typography variant="h6">Total Responses</Typography>
                <Typography variant="h4" color="green" sx={{ fontWeight: 'bold' }}>
                  {totalResponses}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Grid container spacing={4} sx={{ marginTop: 4 }}>
          {/* NPS Score Distribution Chart */}
          <Grid item xs={12} md={6}>
            <HighchartsReact highcharts={Highcharts} options={scoreChartOptions} />
          </Grid>

          {/* Comments Timeline Chart */}
          <Grid item xs={12} md={6}>
            <HighchartsReact highcharts={Highcharts} options={commentsTimelineChartOptions} />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
