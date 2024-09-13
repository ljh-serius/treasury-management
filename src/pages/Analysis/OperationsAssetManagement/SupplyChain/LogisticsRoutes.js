import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { Box, Typography, Grid, Card, CardContent, Container } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import Backdrop from '@mui/material/Backdrop';

export default function LogisticsRoutesAnalytics({ fetchItems }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalRoutes, setTotalRoutes] = useState(0);
  const [criticalRoutes, setCriticalRoutes] = useState([]);
  const [routeDistribution, setRouteDistribution] = useState([]);

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
    setTotalRoutes(data.length);

    const critical = data.filter((item) => item.tags.includes('critical'));
    setCriticalRoutes(critical);
  };

  const generateCharts = (data) => {
    const transportModes = data.reduce((acc, item) => {
      acc[item.transportMode] = (acc[item.transportMode] || 0) + 1;
      return acc;
    }, {});

    setRouteDistribution(
      Object.keys(transportModes).map((key) => ({
        name: key,
        y: transportModes[key],
      }))
    );
  };

  const routeDistributionChart = {
    chart: { type: 'pie' },
    title: { text: 'Transport Mode Distribution' },
    series: [
      {
        name: 'Modes',
        colorByPoint: true,
        data: routeDistribution,
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
          Logistics Routes Analytics
        </Typography>
        <Grid container spacing={4}>
          {/* KPIs */}
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6">Total Routes</Typography>
                <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                  {totalRoutes}
                </Typography>
                <Typography variant="body2">Total number of logistics routes.</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6">Critical Routes</Typography>
                <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                  {criticalRoutes.length}
                </Typography>
                <Typography variant="body2">Routes tagged as 'Critical'.</Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Charts */}
          <Grid item xs={12} md={6}>
            <HighchartsReact highcharts={Highcharts} options={routeDistributionChart} />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
