import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { Box, Typography, Grid, Card, CardContent, Container } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import Backdrop from '@mui/material/Backdrop';

export default function ExecutiveTrainingDashboard({ fetchItems }) {
  const [trainingsData, setTrainingsData] = useState([]);
  const [targetGroupDistribution, setTargetGroupDistribution] = useState([]);
  const [locationDistribution, setLocationDistribution] = useState([]);
  const [trainerDistribution, setTrainerDistribution] = useState([]);
  const [averageDuration, setAverageDuration] = useState(0);
  const [totalTrainings, setTotalTrainings] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const data = await fetchItems();
      setTrainingsData(data);
      processTrainingData(data);
      setLoading(false);
    };

    fetchData();
  }, [fetchItems]);

  const processTrainingData = (data) => {
    // Total Trainings
    setTotalTrainings(data.length);

    // Trainings by Target Group
    const targetGroupCounts = data.reduce((acc, training) => {
      acc[training.targetGroup] = (acc[training.targetGroup] || 0) + 1;
      return acc;
    }, {});

    setTargetGroupDistribution(Object.keys(targetGroupCounts).map(key => ({
      name: key,
      y: targetGroupCounts[key],
    })));

    // Trainings by Location
    const locationCounts = data.reduce((acc, training) => {
      acc[training.location] = (acc[training.location] || 0) + 1;
      return acc;
    }, {});

    setLocationDistribution(Object.keys(locationCounts).map(key => ({
      name: key,
      y: locationCounts[key],
    })));

    // Average Duration of Trainings
    const totalDuration = data.reduce((acc, training) => acc + Number(training.duration), 0);
    setAverageDuration(totalDuration / data.length);

    // Trainings by Trainer
    const trainerCounts = data.reduce((acc, training) => {
      acc[training.trainerName] = (acc[training.trainerName] || 0) + 1;
      return acc;
    }, {});

    setTrainerDistribution(Object.keys(trainerCounts).map(key => ({
      name: key,
      y: trainerCounts[key],
    })));
  };

  // Chart options for each chart
  const targetGroupChartOptions = {
    chart: {
      type: 'pie',
    },
    title: {
      text: 'Trainings by Target Group',
    },
    series: [
      {
        name: 'Target Group',
        colorByPoint: true,
        data: targetGroupDistribution,
      },
    ],
  };

  const locationChartOptions = {
    chart: {
      type: 'column',
    },
    title: {
      text: 'Trainings by Location',
    },
    series: [
      {
        name: 'Location',
        data: locationDistribution,
      },
    ],
  };

  const trainerChartOptions = {
    chart: {
      type: 'column',
    },
    title: {
      text: 'Trainings by Trainer',
    },
    series: [
      {
        name: 'Trainer',
        data: trainerDistribution,
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
          Executive Training Dashboard
        </Typography>
        <Grid container spacing={4}>
          {/* KPI Section */}
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
                <Typography variant="h6">Average Duration (days)</Typography>
                <Typography variant="h4" color="blue" sx={{ fontWeight: 'bold' }}>
                  {averageDuration.toFixed(2)}
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Chart Section */}
          <Grid item xs={12} md={6}>
            <HighchartsReact highcharts={Highcharts} options={targetGroupChartOptions} />
          </Grid>
          <Grid item xs={12} md={6}>
            <HighchartsReact highcharts={Highcharts} options={locationChartOptions} />
          </Grid>
          <Grid item xs={12} md={6}>
            <HighchartsReact highcharts={Highcharts} options={trainerChartOptions} />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
