import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { Box, Typography, Grid, Card, CardContent, Container, CircularProgress, Backdrop } from '@mui/material';

export default function CustomerSatisfactionDashboard({ fetchData }) {
  const [satisfactionData, setSatisfactionData] = useState([]);
  const [satisfactionDistribution, setSatisfactionDistribution] = useState([]);
  const [feedbackDistribution, setFeedbackDistribution] = useState([]);
  const [totalResponses, setTotalResponses] = useState(0);
  const [averageScore, setAverageScore] = useState(0);
  const [highSatisfactionCount, setHighSatisfactionCount] = useState(0);
  const [lowSatisfactionCount, setLowSatisfactionCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDataAsync = async () => {
      setLoading(true);
      const data = await fetchData();
      setSatisfactionData(data);
      processSatisfactionData(data);
      setLoading(false);
    };

    fetchDataAsync();
  }, [fetchData]);

  const processSatisfactionData = (data) => {
    // Total Responses
    setTotalResponses(data.length);

    // Average Satisfaction Score
    const totalScore = data.reduce((acc, survey) => acc + Number(survey.satisfactionScore), 0);
    setAverageScore(totalScore / data.length);

    // High and Low Satisfaction Count
    const highSatisfaction = data.filter(survey => survey.satisfactionScore >= 8).length;
    const lowSatisfaction = data.filter(survey => survey.satisfactionScore <= 3).length;
    setHighSatisfactionCount(highSatisfaction);
    setLowSatisfactionCount(lowSatisfaction);

    // Satisfaction Score Distribution
    const satisfactionCounts = data.reduce((acc, survey) => {
      const scoreRange = `${Math.floor(survey.satisfactionScore / 2) * 2}-${Math.floor(survey.satisfactionScore / 2) * 2 + 1}`;
      acc[scoreRange] = (acc[scoreRange] || 0) + 1;
      return acc;
    }, {});
    setSatisfactionDistribution(Object.keys(satisfactionCounts).map(key => ({
      name: key,
      y: satisfactionCounts[key],
    })));

    // Feedback Distribution (Positive vs Negative)
    const feedbackCounts = {
      'Positive Feedback': data.filter(survey => survey.tags.includes('positive-feedback')).length,
      'Negative Feedback': data.filter(survey => survey.tags.includes('negative-feedback')).length,
    };
    setFeedbackDistribution(Object.keys(feedbackCounts).map(key => ({
      name: key,
      y: feedbackCounts[key],
    })));
  };

  // Highcharts options
  const satisfactionChartOptions = {
    chart: { type: 'column' },
    title: { text: 'Satisfaction Score Distribution' },
    series: [{
      name: 'Scores',
      data: satisfactionDistribution,
    }],
  };

  const feedbackChartOptions = {
    chart: { type: 'pie' },
    title: { text: 'Feedback Distribution' },
    series: [{
      name: 'Feedback',
      colorByPoint: true,
      data: feedbackDistribution,
    }],
  };

  return (
    <Container maxWidth="xl" sx={{ paddingTop: 3, paddingBottom: 7 }}>
      <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <Box sx={{ padding: 4 }}>
        <Typography variant="h4" gutterBottom>
          Customer Satisfaction Dashboard
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

          <Grid item xs={12} md={3}>
            <Card>
              <CardContent>
                <Typography variant="h6">Average Satisfaction Score</Typography>
                <Typography variant="h4" color="blue" sx={{ fontWeight: 'bold' }}>
                  {averageScore.toFixed(2)}
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={3}>
            <Card>
              <CardContent>
                <Typography variant="h6">High Satisfaction</Typography>
                <Typography variant="h4" color="purple" sx={{ fontWeight: 'bold' }}>
                  {highSatisfactionCount}
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={3}>
            <Card>
              <CardContent>
                <Typography variant="h6">Low Satisfaction</Typography>
                <Typography variant="h4" color="red" sx={{ fontWeight: 'bold' }}>
                  {lowSatisfactionCount}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Grid container spacing={4} sx={{ marginTop: 4 }}>
          {/* Satisfaction Score Distribution */}
          <Grid item xs={12} md={6}>
            <HighchartsReact highcharts={Highcharts} options={satisfactionChartOptions} />
          </Grid>

          {/* Feedback Distribution */}
          <Grid item xs={12} md={6}>
            <HighchartsReact highcharts={Highcharts} options={feedbackChartOptions} />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
