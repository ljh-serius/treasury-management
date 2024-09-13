import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { Box, Typography, Grid, Card, CardContent, Container } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import Backdrop from '@mui/material/Backdrop';

export default function ProductUpdatesAnalytics({ fetchItems }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalUpdates, setTotalUpdates] = useState(0);
  const [criticalUpdates, setCriticalUpdates] = useState([]);
  const [updateTypeDistribution, setUpdateTypeDistribution] = useState([]);

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
    setTotalUpdates(data.length);

    const critical = data.filter((item) => item.tags.includes('critical'));
    setCriticalUpdates(critical);
  };

  const generateCharts = (data) => {
    const types = data.reduce((acc, item) => {
      acc[item.updateType] = (acc[item.updateType] || 0) + 1;
      return acc;
    }, {});

    setUpdateTypeDistribution(
      Object.keys(types).map((key) => ({
        name: key,
        y: types[key],
      }))
    );
  };

  const updateTypeDistributionChart = {
    chart: { type: 'pie' },
    title: { text: 'Update Type Distribution' },
    series: [
      {
        name: 'Update Types',
        colorByPoint: true,
        data: updateTypeDistribution,
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
          Product Updates Analytics
        </Typography>
        <Grid container spacing={4}>
          {/* KPIs */}
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6">Total Updates</Typography>
                <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                  {totalUpdates}
                </Typography>
                <Typography variant="body2">Total number of product updates.</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6">Critical Updates</Typography>
                <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                  {criticalUpdates.length}
                </Typography>
                <Typography variant="body2">Updates tagged as 'Critical'.</Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Charts */}
          <Grid item xs={12} md={6}>
            <HighchartsReact highcharts={Highcharts} options={updateTypeDistributionChart} />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
