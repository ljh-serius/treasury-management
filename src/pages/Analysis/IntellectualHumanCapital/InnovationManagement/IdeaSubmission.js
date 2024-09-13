import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { Box, Typography, Grid, Card, CardContent, Container, CircularProgress, Backdrop } from '@mui/material';

export default function IdeaSubmissionDashboard({ fetchItems }) {
  const [submissionData, setSubmissionData] = useState([]);
  const [totalSubmissions, setTotalSubmissions] = useState(0);
  const [statusDistribution, setStatusDistribution] = useState([]);
  const [submissionTrends, setSubmissionTrends] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const data = await fetchItems();
      setSubmissionData(data);
      processSubmissionData(data);
      setLoading(false);
    };

    fetchData();
  }, [fetchItems]);

  const processSubmissionData = (data) => {
    // Total Submissions
    setTotalSubmissions(data.length);

    // Submission Status Distribution for Pie Chart
    const statusCounts = data.reduce((acc, submission) => {
      acc[submission.status] = (acc[submission.status] || 0) + 1;
      return acc;
    }, {});
    setStatusDistribution(Object.keys(statusCounts).map(key => ({
      name: key.charAt(0).toUpperCase() + key.slice(1),
      y: statusCounts[key],
    })));

    // Submission Date Trends for Line Chart
    const trendsData = data.map(submission => ({
      date: new Date(submission.submissionDate).getTime(),
      count: 1,
    })).sort((a, b) => a.date - b.date);
    setSubmissionTrends(trendsData);
  };

  // Highcharts options for Submission Status Distribution
  const statusChartOptions = {
    chart: { type: 'pie' },
    title: { text: 'Submission Status Distribution' },
    series: [{
      name: 'Status',
      colorByPoint: true,
      data: statusDistribution,
    }],
  };

  // Highcharts options for Submission Date Trends
  const submissionDateChartOptions = {
    chart: { type: 'line' },
    title: { text: 'Submission Date Trends' },
    xAxis: { type: 'datetime', title: { text: 'Submission Date' } },
    yAxis: { title: { text: 'Number of Submissions' } },
    series: [{
      name: 'Submissions',
      data: submissionTrends.map(item => [item.date, item.count]),
    }],
  };

  return (
    <Container maxWidth="xl" sx={{ paddingTop: 3, paddingBottom: 7 }}>
      <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <Box sx={{ padding: 4 }}>
        <Typography variant="h4" gutterBottom>
          Idea Submission Dashboard
        </Typography>

        <Grid container spacing={4}>
          {/* KPIs Section */}
          <Grid item xs={12} md={3}>
            <Card>
              <CardContent>
                <Typography variant="h6">Total Submissions</Typography>
                <Typography variant="h4" color="green" sx={{ fontWeight: 'bold' }}>
                  {totalSubmissions}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Grid container spacing={4} sx={{ marginTop: 4 }}>
          {/* Submission Status Distribution Chart */}
          <Grid item xs={12} md={6}>
            <HighchartsReact highcharts={Highcharts} options={statusChartOptions} />
          </Grid>

          {/* Submission Date Trends Chart */}
          <Grid item xs={12} md={6}>
            <HighchartsReact highcharts={Highcharts} options={submissionDateChartOptions} />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
