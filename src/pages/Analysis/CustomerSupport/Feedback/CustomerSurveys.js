import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { Box, Typography, Grid, Card, CardContent, Container, CircularProgress, Backdrop } from '@mui/material';

export default function CustomerSurveysDashboard({ fetchItems }) {
  const [surveyData, setSurveyData] = useState([]);
  const [totalSurveys, setTotalSurveys] = useState(0);
  const [satisfactionDistribution, setSatisfactionDistribution] = useState([]);
  const [surveyTimeline, setSurveyTimeline] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const data = await fetchItems();
      setSurveyData(data);
      processSurveyData(data);
      setLoading(false);
    };

    fetchData();
  }, [fetchItems]);

  const processSurveyData = (data) => {
    // Total Surveys
    setTotalSurveys(data.length);

    // Satisfaction Score Distribution for Pie Chart
    const scoreCounts = data.reduce((acc, survey) => {
      acc[survey.satisfactionScore] = (acc[survey.satisfactionScore] || 0) + 1;
      return acc;
    }, {});
    setSatisfactionDistribution(Object.keys(scoreCounts).map(key => ({
      name: `Score ${key}`,
      y: scoreCounts[key],
    })));

    // Survey Timeline for Line Chart
    const timelineData = data.map(survey => ({
      date: new Date(survey.surveyDate).getTime(),
      label: `Survey ${survey.surveyId.slice(-4)}`,
    })).sort((a, b) => a.date - b.date);
    setSurveyTimeline(timelineData);
  };

  // Highcharts options for Satisfaction Score Distribution
  const satisfactionChartOptions = {
    chart: { type: 'pie' },
    title: { text: 'Satisfaction Score Distribution' },
    series: [{
      name: 'Satisfaction Score',
      colorByPoint: true,
      data: satisfactionDistribution,
    }],
  };

  // Highcharts options for Survey Timeline
  const surveyTimelineChartOptions = {
    chart: { type: 'line' },
    title: { text: 'Surveys Conducted Over Time' },
    xAxis: { type: 'datetime', title: { text: 'Survey Date' } },
    yAxis: { title: { text: 'Surveys' } },
    series: [{
      name: 'Surveys',
      data: surveyTimeline.map(item => [item.date, 1]), // Y-axis is constant (1) since we're counting the occurrences
    }],
  };

  return (
    <Container maxWidth="xl" sx={{ paddingTop: 3, paddingBottom: 7 }}>
      <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <Box sx={{ padding: 4 }}>
        <Typography variant="h4" gutterBottom>
          Customer Surveys Dashboard
        </Typography>

        <Grid container spacing={4}>
          {/* KPIs Section */}
          <Grid item xs={12} md={3}>
            <Card>
              <CardContent>
                <Typography variant="h6">Total Surveys</Typography>
                <Typography variant="h4" color="green" sx={{ fontWeight: 'bold' }}>
                  {totalSurveys}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Grid container spacing={4} sx={{ marginTop: 4 }}>
          {/* Satisfaction Score Distribution Chart */}
          <Grid item xs={12} md={6}>
            <HighchartsReact highcharts={Highcharts} options={satisfactionChartOptions} />
          </Grid>

          {/* Survey Timeline Chart */}
          <Grid item xs={12} md={6}>
            <HighchartsReact highcharts={Highcharts} options={surveyTimelineChartOptions} />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
