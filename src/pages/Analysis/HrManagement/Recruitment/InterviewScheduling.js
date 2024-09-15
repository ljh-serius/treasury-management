import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { Box, Typography, Grid, Card, CardContent, Container } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import Backdrop from '@mui/material/Backdrop';

export default function InterviewSchedulingAnalytics({ fetchItems }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalInterviews, setTotalInterviews] = useState(0);
  const [scheduledInterviews, setScheduledInterviews] = useState([]);
  const [interviewModeDistribution, setInterviewModeDistribution] = useState([]);

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
    setTotalInterviews(data.length);
    const scheduled = data.filter((interview) => interview.status === 'scheduled');
    setScheduledInterviews(scheduled);
  };

  const generateCharts = (data) => {
    const modeCounts = data.reduce((acc, interview) => {
      acc[interview.interviewMode] = (acc[interview.interviewMode] || 0) + 1;
      return acc;
    }, {});
    setInterviewModeDistribution(
      Object.keys(modeCounts).map((key) => ({
        name: key,
        y: modeCounts[key],
      }))
    );
  };

  const interviewModeChart = {
    chart: { type: 'pie' },
    title: { text: 'Interview Mode Distribution' },
    series: [
      {
        name: 'Interview Mode',
        colorByPoint: true,
        data: interviewModeDistribution,
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
          Interview Scheduling Analytics
        </Typography>
        <Grid container spacing={4}>
          {/* KPIs */}
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6">Total Interviews</Typography>
                <Typography variant="h4" color="blue" sx={{ fontWeight: 'bold' }}>
                  {totalInterviews}
                </Typography>
                <Typography variant="body2">Total number of interviews scheduled.</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6">Scheduled Interviews</Typography>
                <Typography variant="h4" color="green" sx={{ fontWeight: 'bold' }}>
                  {scheduledInterviews.length}
                </Typography>
                <Typography variant="body2">Interviews currently scheduled.</Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Charts */}
          <Grid item xs={12} md={12}>
            <HighchartsReact highcharts={Highcharts} options={interviewModeChart} />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
