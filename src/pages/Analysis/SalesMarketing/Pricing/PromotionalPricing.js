import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { Box, Typography, Grid, Card, CardContent, Container, CircularProgress, Backdrop } from '@mui/material';

export default function PromotionalPricingDashboard({ fetchData }) {
  const [promotionData, setPromotionData] = useState([]);
  const [totalPromotions, setTotalPromotions] = useState(0);
  const [averageDiscountRate, setAverageDiscountRate] = useState(0);
  const [seasonalPromotions, setSeasonalPromotions] = useState(0);
  const [clearancePromotions, setClearancePromotions] = useState(0);
  const [promotionPerformance, setPromotionPerformance] = useState([]);
  const [validityTrends, setValidityTrends] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDataAsync = async () => {
      setLoading(true);
      const data = await fetchData();
      setPromotionData(data);
      processPromotionData(data);
      setLoading(false);
    };

    fetchDataAsync();
  }, [fetchData]);

  const processPromotionData = (data) => {
    // Total Promotions
    setTotalPromotions(data.length);

    // Average Discount Rate
    const totalDiscount = data.reduce((acc, promotion) => acc + Number(promotion.discountRate), 0);
    setAverageDiscountRate(totalDiscount / data.length);

    // Count Seasonal and Clearance Promotions
    const seasonal = data.filter(promotion => promotion.tags.includes('seasonal')).length;
    const clearance = data.filter(promotion => promotion.tags.includes('clearance')).length;
    setSeasonalPromotions(seasonal);
    setClearancePromotions(clearance);

    // Promotion Performance for Column Chart
    const performanceData = data.map(promotion => ({
      name: `Promo ${promotion.promotionId.slice(-4)}`,
      y: Number(promotion.discountRate),
    }));
    setPromotionPerformance(performanceData);

    // Validity Trends Over Time
    const trends = data.map(promotion => ({
      start: new Date(promotion.validFrom).getTime(),
      end: new Date(promotion.validTo).getTime(),
      name: promotion.promotionName,
    })).sort((a, b) => a.start - b.start);
    setValidityTrends(trends);
  };

  // Highcharts options for Promotion Performance
  const performanceChartOptions = {
    chart: { type: 'column' },
    title: { text: 'Promotion Performance by Discount Rate' },
    series: [{
      name: 'Discount Rate',
      data: promotionPerformance,
    }],
  };

  // Highcharts options for Validity Trends Over Time
  const validityTrendsChartOptions = {
    chart: { type: 'line' },
    title: { text: 'Promotion Validity Trends' },
    xAxis: { type: 'datetime', title: { text: 'Date' } },
    yAxis: { title: { text: 'Promotion Validity Period' } },
    series: [{
      name: 'Promotion Validity',
      data: validityTrends.map(item => [item.start, item.end]),
    }],
  };

  return (
    <Container maxWidth="xl" sx={{ paddingTop: 3, paddingBottom: 7 }}>
      <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <Box sx={{ padding: 4 }}>
        <Typography variant="h4" gutterBottom>
          Promotional Pricing Dashboard
        </Typography>

        <Grid container spacing={4}>
          {/* KPIs Section */}
          <Grid item xs={12} md={3}>
            <Card>
              <CardContent>
                <Typography variant="h6">Total Promotions</Typography>
                <Typography variant="h4" color="green" sx={{ fontWeight: 'bold' }}>
                  {totalPromotions}
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={3}>
            <Card>
              <CardContent>
                <Typography variant="h6">Average Discount Rate (%)</Typography>
                <Typography variant="h4" color="blue" sx={{ fontWeight: 'bold' }}>
                  {averageDiscountRate.toFixed(2)}%
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={3}>
            <Card>
              <CardContent>
                <Typography variant="h6">Seasonal Promotions</Typography>
                <Typography variant="h4" color="orange" sx={{ fontWeight: 'bold' }}>
                  {seasonalPromotions}
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={3}>
            <Card>
              <CardContent>
                <Typography variant="h6">Clearance Promotions</Typography>
                <Typography variant="h4" color="purple" sx={{ fontWeight: 'bold' }}>
                  {clearancePromotions}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Grid container spacing={4} sx={{ marginTop: 4 }}>
          {/* Promotion Performance Chart */}
          <Grid item xs={12} md={6}>
            <HighchartsReact highcharts={Highcharts} options={performanceChartOptions} />
          </Grid>

          {/* Validity Trends Chart */}
          <Grid item xs={12} md={6}>
            <HighchartsReact highcharts={Highcharts} options={validityTrendsChartOptions} />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
