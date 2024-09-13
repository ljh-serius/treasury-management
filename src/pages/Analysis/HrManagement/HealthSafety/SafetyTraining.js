import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { Box, Typography, Grid, Card, CardContent, Container, CircularProgress, Backdrop } from '@mui/material';

export default function SafetyTrainingDashboard({ fetchItems }) {
  const [trainingData, setTrainingData] = useState([]);
  const [totalTrainings, setTotalTrainings] = useState(0);
  const [completionStatusData, setCompletionStatusData] = useState([]);
  const [averageCompletionTime, setAverageCompletionTime] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const data = await fetchItems();
      setTrainingData(data);
      processTrainingData(data);
      setLoading(false);
    };

    fetchData();
  }, [fetchItems]);

  const processTrainingData = (data) => {
    setTotalTrainings(data.length);

    // Calculate completion status distribution
    const statusMap = {};
    data.forEach((item) => {
      const status = item.status;
      statusMap[status] = (statusMap[status] || 0) + 1;
    });
    const statusArray = Object.entries(statusMap).map(([status, count]) => ({
      name: status.replace(/_/g, ' '),
      y: count,
    }));
    setCompletionStatusData(statusArray);

    // Calculate average completion time
    const completedTrainings = data.filter(item => item.status === 'completed');
    const totalCompletionTime = completedTrainings.reduce((sum, item) => {
      const completionDate = new Date(item.completionDate);
      const createdDate = new Date(item.createdDate);
      const completionTime = (completionDate - createdDate) / (1000 * 60 * 60 * 24); // in days
      return sum + completionTime;
    }, 0);

    setAverageCompletionTime(
      completedTrainings.length > 0 ? totalCompletionTime / completedTrainings.length : 0
    );
  };

  // Highcharts options for Training Completion Status
  const completionStatusChartOptions = {
    chart: { type: 'pie' },
    title: { text: 'Training Completion Status' },
    series: [
      {
        name: 'Status',
        data: completionStatusData,
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
          Safety Training Dashboard
        </Typography>

        <Grid container spacing={4}>
          {/* KPIs Section */}
          <Grid item xs={12} md={3}>
            <Card>
              <CardContent>
                <Typography variant="h6">Total Trainings</Typography>
                <Typography variant="h4" color="green" sx={{ fontWeight: 'bold' }}>
                  {totalTrainings}
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={3}>
            <Card>
              <CardContent>
                <Typography variant="h6">Average Completion Time (Days)</Typography>
                <Typography variant="h4" color="blue" sx={{ fontWeight: 'bold' }}>
                  {averageCompletionTime.toFixed(2)}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Grid container spacing={4} sx={{ marginTop: 4 }}>
          {/* Completion Status Chart */}
          <Grid item xs={12} md={6}>
            <HighchartsReact highcharts={Highcharts} options={completionStatusChartOptions} />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
