import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { Box, Typography, Grid, Card, CardContent, Container, CircularProgress, Backdrop } from '@mui/material';

export default function FeedbackAnalysisDashboard({ fetchItems }) {
  const [feedbackData, setFeedbackData] = useState([]);
  const [totalFeedback, setTotalFeedback] = useState(0);
  const [feedbackTypeDistribution, setFeedbackTypeDistribution] = useState([]);
  const [feedbackTimeline, setFeedbackTimeline] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDataAsync = async () => {
      setLoading(true);
      const data = await fetchItems();
      setFeedbackData(data);
      processFeedbackData(data);
      setLoading(false);
    };

    fetchDataAsync();
  }, [fetchItems]);

  const processFeedbackData = (data) => {
    // Total Feedback
    setTotalFeedback(data.length);

    // Feedback Type Distribution for Pie Chart
    const typeCounts = data.reduce((acc, feedback) => {
      acc[feedback.feedbackType] = (acc[feedback.feedbackType] || 0) + 1;
      return acc;
    }, {});
    setFeedbackTypeDistribution(Object.keys(typeCounts).map(key => ({
      name: key.charAt(0).toUpperCase() + key.slice(1),
      y: typeCounts[key],
    })));

    // Feedback Timeline for Line Chart
    const timelineData = data.map(feedback => ({
      date: new Date(feedback.feedbackDate).getTime(),
      label: `Feedback ${feedback.feedbackId.slice(-4)}`,
    })).sort((a, b) => a.date - b.date);
    setFeedbackTimeline(timelineData);
  };

  // Highcharts options for Feedback Type Distribution
  const feedbackTypeChartOptions = {
    chart: { type: 'pie' },
    title: { text: 'Feedback Type Distribution' },
    series: [{
      name: 'Feedback Type',
      colorByPoint: true,
      data: feedbackTypeDistribution,
    }],
  };

  // Highcharts options for Feedback Timeline
  const feedbackTimelineChartOptions = {
    chart: { type: 'line' },
    title: { text: 'Feedback Entries Over Time' },
    xAxis: { type: 'datetime', title: { text: 'Feedback Date' } },
    yAxis: { title: { text: 'Feedback Entries' } },
    series: [{
      name: 'Feedback Entries',
      data: feedbackTimeline.map(item => [item.date, 1]), // Y-axis is constant (1) since we're counting the occurrences
    }],
  };

  return (
    <Container maxWidth="xl" sx={{ paddingTop: 3, paddingBottom: 7 }}>
      <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <Box sx={{ padding: 4 }}>
        <Typography variant="h4" gutterBottom>
          Feedback Analysis Dashboard
        </Typography>

        <Grid container spacing={4}>
          {/* KPIs Section */}
          <Grid item xs={12} md={3}>
            <Card>
              <CardContent>
                <Typography variant="h6">Total Feedback</Typography>
                <Typography variant="h4" color="green" sx={{ fontWeight: 'bold' }}>
                  {totalFeedback}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Grid container spacing={4} sx={{ marginTop: 4 }}>
          {/* Feedback Type Distribution Chart */}
          <Grid item xs={12} md={6}>
            <HighchartsReact highcharts={Highcharts} options={feedbackTypeChartOptions} />
          </Grid>

          {/* Feedback Timeline Chart */}
          <Grid item xs={12} md={6}>
            <HighchartsReact highcharts={Highcharts} options={feedbackTimelineChartOptions} />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
