import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { Box, Typography, Grid, Card, CardContent, Container, CircularProgress, Backdrop } from '@mui/material';

export default function TrainingRecordsDashboard({ fetchItems }) {
  const [trainingData, setTrainingData] = useState([]);
  const [totalTrainings, setTotalTrainings] = useState(0);
  const [statusDistribution, setStatusDistribution] = useState([]);
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

    // Calculate status distribution
    const statusMap = {};
    data.forEach((item) => {
      const status = item.status;
      statusMap[status] = (statusMap[status] || 0) + 1;
    });

    const statusArray = Object.entries(statusMap).map(([status, count]) => ({
      name: status,
      y: count,
    }));
    setStatusDistribution(statusArray);
  };

  // Highcharts options for Training Status Distribution
  const statusChartOptions = {
    chart: { type: 'pie' },
    title: { text: 'Training Status Distribution' },
    series: [
      {
        name: 'Trainings',
        colorByPoint: true,
        data: statusDistribution,
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
          Training Records Dashboard
        </Typography>

        <Grid container spacing={4}>
          {/* KPIs Section */}
          <Grid item xs={12} md={3}>
            <Card>
              <CardContent>
                <Typography variant="h6">Total Trainings</Typography>
                <Typography variant="h4" color="blue" sx={{ fontWeight: 'bold' }}>
                  {totalTrainings}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Grid container spacing={4} sx={{ marginTop: 4 }}>
          {/* Training Status Distribution Chart */}
          <Grid item xs={12} md={6}>
            <HighchartsReact highcharts={Highcharts} options={statusChartOptions} />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
