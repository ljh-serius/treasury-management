import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { Box, Typography, Grid, Card, CardContent, Container, CircularProgress, Backdrop } from '@mui/material';

export default function DiscountStructuresDashboard({ fetchItems }) {
  const [discountData, setDiscountData] = useState([]);
  const [totalDiscounts, setTotalDiscounts] = useState(0);
  const [averageDiscount, setAverageDiscount] = useState(0);
  const [seasonalDiscounts, setSeasonalDiscounts] = useState(0);
  const [clearanceDiscounts, setClearanceDiscounts] = useState(0);
  const [discountPerformance, setDiscountPerformance] = useState([]);
  const [validityTrends, setValidityTrends] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDataAsync = async () => {
      setLoading(true);
      const data = await fetchItems();
      setDiscountData(data);
      processDiscountData(data);
      setLoading(false);
    };

    fetchDataAsync();
  }, [fetchItems]);

  const processDiscountData = (data) => {
    // Total Discounts
    setTotalDiscounts(data.length);

    // Average Discount Percentage
    const totalDiscount = data.reduce((acc, discount) => acc + Number(discount.discountPercentage), 0);
    setAverageDiscount(totalDiscount / data.length);

    // Count Seasonal and Clearance Discounts
    const seasonal = data.filter(discount => discount.tags.includes('seasonal')).length;
    const clearance = data.filter(discount => discount.tags.includes('clearance')).length;
    setSeasonalDiscounts(seasonal);
    setClearanceDiscounts(clearance);

    // Discount Performance for Column Chart
    const performanceData = data.map(discount => ({
      name: `Discount ${discount.discountId.slice(-4)}`,
      y: Number(discount.discountPercentage),
    }));
    setDiscountPerformance(performanceData);

    // Validity Trends Over Time
    const trends = data.map(discount => ({
      start: new Date(discount.validFrom).getTime(),
      end: new Date(discount.validTo).getTime(),
      name: discount.discountName,
    })).sort((a, b) => a.start - b.start);
    setValidityTrends(trends);
  };

  // Highcharts options for Discount Performance
  const performanceChartOptions = {
    chart: { type: 'column' },
    title: { text: 'Discount Performance by Percentage' },
    series: [{
      name: 'Discount Percentage',
      data: discountPerformance,
    }],
  };

  // Highcharts options for Validity Trends Over Time
  const validityTrendsChartOptions = {
    chart: { type: 'line' },
    title: { text: 'Discount Validity Trends' },
    xAxis: { type: 'datetime', title: { text: 'Date' } },
    yAxis: { title: { text: 'Discount Validity Period' } },
    series: [{
      name: 'Discount Validity',
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
          Discount Structures Dashboard
        </Typography>

        <Grid container spacing={4}>
          {/* KPIs Section */}
          <Grid item xs={12} md={3}>
            <Card>
              <CardContent>
                <Typography variant="h6">Total Discounts</Typography>
                <Typography variant="h4" color="green" sx={{ fontWeight: 'bold' }}>
                  {totalDiscounts}
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={3}>
            <Card>
              <CardContent>
                <Typography variant="h6">Average Discount (%)</Typography>
                <Typography variant="h4" color="blue" sx={{ fontWeight: 'bold' }}>
                  {averageDiscount.toFixed(2)}%
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={3}>
            <Card>
              <CardContent>
                <Typography variant="h6">Seasonal Discounts</Typography>
                <Typography variant="h4" color="orange" sx={{ fontWeight: 'bold' }}>
                  {seasonalDiscounts}
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={3}>
            <Card>
              <CardContent>
                <Typography variant="h6">Clearance Discounts</Typography>
                <Typography variant="h4" color="purple" sx={{ fontWeight: 'bold' }}>
                  {clearanceDiscounts}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Grid container spacing={4} sx={{ marginTop: 4 }}>
          {/* Discount Performance Chart */}
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
