import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { Box, Typography, Grid, Card, CardContent, Container } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import Backdrop from '@mui/material/Backdrop';

export default function DiscountsAnalytics({ fetchItems }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalDiscounts, setTotalDiscounts] = useState(0);
  const [seasonalDiscounts, setSeasonalDiscounts] = useState([]);
  const [discountDistribution, setDiscountDistribution] = useState([]);

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
    setTotalDiscounts(data.length);

    const seasonal = data.filter((item) => item.tags.includes('seasonal'));
    setSeasonalDiscounts(seasonal);
  };

  const generateCharts = (data) => {
    const discountRates = data.reduce((acc, item) => {
      acc[item.discountRate] = (acc[item.discountRate] || 0) + 1;
      return acc;
    }, {});

    setDiscountDistribution(
      Object.keys(discountRates).map((key) => ({
        name: `${key}%`,
        y: discountRates[key],
      }))
    );
  };

  const discountDistributionChart = {
    chart: { type: 'pie' },
    title: { text: 'Discount Rate Distribution' },
    series: [
      {
        name: 'Discount Rates',
        colorByPoint: true,
        data: discountDistribution,
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
          Discounts Analytics
        </Typography>
        <Grid container spacing={4}>
          {/* KPIs */}
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6">Total Discounts</Typography>
                <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                  {totalDiscounts}
                </Typography>
                <Typography variant="body2">Total number of discounts available.</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6">Seasonal Discounts</Typography>
                <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                  {seasonalDiscounts.length}
                </Typography>
                <Typography variant="body2">Discounts tagged as 'Seasonal'.</Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Charts */}
          <Grid item xs={12} md={6}>
            <HighchartsReact highcharts={Highcharts} options={discountDistributionChart} />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
