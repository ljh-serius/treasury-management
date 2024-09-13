import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { Box, Typography, Grid, Card, CardContent, Container } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import Backdrop from '@mui/material/Backdrop';

export default function AssetTrackingAnalytics({ fetchItems }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalTrackedAssets, setTotalTrackedAssets] = useState(0);
  const [criticalAssets, setCriticalAssets] = useState([]);
  const [locationDistribution, setLocationDistribution] = useState([]);

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
    setTotalTrackedAssets(data.length);

    const critical = data.filter((item) => item.tags.includes('critical'));
    setCriticalAssets(critical);
  };

  const generateCharts = (data) => {
    const locations = data.reduce((acc, item) => {
      acc[item.location] = (acc[item.location] || 0) + 1;
      return acc;
    }, {});

    setLocationDistribution(
      Object.keys(locations).map((key) => ({
        name: key,
        y: locations[key],
      }))
    );
  };

  const locationDistributionChart = {
    chart: { type: 'pie' },
    title: { text: 'Asset Location Distribution' },
    series: [
      {
        name: 'Locations',
        colorByPoint: true,
        data: locationDistribution,
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
          Asset Tracking Analytics
        </Typography>
        <Grid container spacing={4}>
          {/* KPIs */}
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6">Total Tracked Assets</Typography>
                <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                  {totalTrackedAssets}
                </Typography>
                <Typography variant="body2">Total number of assets being tracked.</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6">Critical Assets</Typography>
                <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                  {criticalAssets.length}
                </Typography>
                <Typography variant="body2">Assets tagged as 'Critical'.</Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Charts */}
          <Grid item xs={12} md={6}>
            <HighchartsReact highcharts={Highcharts} options={locationDistributionChart} />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
    