import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { Box, Typography, Grid, Card, CardContent, Container } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import Backdrop from '@mui/material/Backdrop';

export default function TrainingProgramsAnalytics({ fetchItems }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalPrograms, setTotalPrograms] = useState(0);
  const [ongoingPrograms, setOngoingPrograms] = useState([]);
  const [programTypeDistribution, setProgramTypeDistribution] = useState([]);

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
    setTotalPrograms(data.length);
    const ongoing = data.filter((program) => program.status === 'ongoing');
    setOngoingPrograms(ongoing);
  };

  const generateCharts = (data) => {
    const typeCounts = data.reduce((acc, program) => {
      acc[program.programType] = (acc[program.programType] || 0) + 1;
      return acc;
    }, {});
    setProgramTypeDistribution(
      Object.keys(typeCounts).map((key) => ({
        name: key,
        y: typeCounts[key],
      }))
    );
  };

  const programTypeDistributionChart = {
    chart: { type: 'pie' },
    title: { text: 'Program Type Distribution' },
    series: [
      {
        name: 'Program Type',
        colorByPoint: true,
        data: programTypeDistribution,
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
          Training Programs Analytics
        </Typography>
        <Grid container spacing={4}>
          {/* KPIs */}
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6">Total Programs</Typography>
                <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                  {totalPrograms}
                </Typography>
                <Typography variant="body2">Total number of training programs.</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6">Ongoing Programs</Typography>
                <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                  {ongoingPrograms.length}
                </Typography>
                <Typography variant="body2">Training programs currently ongoing.</Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Charts */}
          <Grid item xs={12} md={12}>
            <HighchartsReact highcharts={Highcharts} options={programTypeDistributionChart} />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
