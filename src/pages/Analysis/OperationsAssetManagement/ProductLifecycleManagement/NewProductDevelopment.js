import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { Box, Typography, Grid, Card, CardContent, Container } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import Backdrop from '@mui/material/Backdrop';

export default function NewProductDevelopmentAnalytics({ fetchItems }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalDevelopments, setTotalDevelopments] = useState(0);
  const [highPriorityDevelopments, setHighPriorityDevelopments] = useState([]);
  const [developmentStageDistribution, setDevelopmentStageDistribution] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const fetchedData = await fetchItems();
      setData(fetchedData);
      calculateKpis(fetchedData);
      generateCharts(fetchedData);
      setLoading(false);
    };

    fetchData();
  }, [fetchItems]);

  const calculateKpis = (data) => {
    setTotalDevelopments(data.length);

    const highPriority = data.filter((item) => item.tags.includes('high_priority'));
    setHighPriorityDevelopments(highPriority);
  };

  const generateCharts = (data) => {
    const stages = data.reduce((acc, item) => {
      acc[item.developmentStage] = (acc[item.developmentStage] || 0) + 1;
      return acc;
    }, {});

    setDevelopmentStageDistribution(
      Object.keys(stages).map((key) => ({
        name: key,
        y: stages[key],
      }))
    );
  };

  const developmentStageDistributionChart = {
    chart: { type: 'pie' },
    title: { text: 'Development Stage Distribution' },
    series: [
      {
        name: 'Stages',
        colorByPoint: true,
        data: developmentStageDistribution,
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
          New Product Development Analytics
        </Typography>
        <Grid container spacing={4}>
          {/* KPIs */}
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6">Total Developments</Typography>
                <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                  {totalDevelopments}
                </Typography>
                <Typography variant="body2">Total number of new product developments.</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6">High Priority Developments</Typography>
                <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                  {highPriorityDevelopments.length}
                </Typography>
                <Typography variant="body2">Developments tagged as 'High Priority'.</Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Charts */}
          <Grid item xs={12} md={6}>
            <HighchartsReact highcharts={Highcharts} options={developmentStageDistributionChart} />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
