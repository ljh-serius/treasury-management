import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { Box, Typography, Grid, Card, CardContent, Container } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import Backdrop from '@mui/material/Backdrop';

export default function PromotionsAnalytics({ fetchItems }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalPromotions, setTotalPromotions] = useState(0);
  const [limitedTimePromotions, setLimitedTimePromotions] = useState([]);
  const [promotionDistribution, setPromotionDistribution] = useState([]);

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
    setTotalPromotions(data.length);

    const limitedTime = data.filter((item) => item.tags.includes('limited_time'));
    setLimitedTimePromotions(limitedTime);
  };

  const generateCharts = (data) => {
    const types = data.reduce((acc, item) => {
      acc[item.promotionType] = (acc[item.promotionType] || 0) + 1;
      return acc;
    }, {});

    setPromotionDistribution(
      Object.keys(types).map((key) => ({
        name: key,
        y: types[key],
      }))
    );
  };

  const promotionDistributionChart = {
    chart: { type: 'pie' },
    title: { text: 'Promotion Type Distribution' },
    series: [
      {
        name: 'Promotion Types',
        colorByPoint: true,
        data: promotionDistribution,
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
          Promotions Analytics
        </Typography>
        <Grid container spacing={4}>
          {/* KPIs */}
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6">Total Promotions</Typography>
                <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                  {totalPromotions}
                </Typography>
                <Typography variant="body2">Total number of promotions available.</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6">Limited Time Promotions</Typography>
                <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                  {limitedTimePromotions.length}
                </Typography>
                <Typography variant="body2">Promotions tagged as 'Limited Time'.</Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Charts */}
          <Grid item xs={12} md={6}>
            <HighchartsReact highcharts={Highcharts} options={promotionDistributionChart} />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
    