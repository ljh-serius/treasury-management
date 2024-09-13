import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { Box, Typography, Grid, Card, CardContent, Container, CircularProgress, Backdrop } from '@mui/material';

export default function PriceListsDashboard({ fetchItems }) {
  const [priceListData, setPriceListData] = useState([]);
  const [totalPriceLists, setTotalPriceLists] = useState(0);
  const [averageDiscountRate, setAverageDiscountRate] = useState(0);
  const [currencyDistribution, setCurrencyDistribution] = useState([]);
  const [priceTrends, setPriceTrends] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDataAsync = async () => {
      setLoading(true);
      const data = await fetchItems();
      setPriceListData(data);
      processPriceListData(data);
      setLoading(false);
    };

    fetchDataAsync();
  }, [fetchItems]);

  const processPriceListData = (data) => {
    // Total Price Lists
    setTotalPriceLists(data.length);

    // Average Discount Rate
    const totalDiscount = data.reduce((acc, priceList) => acc + Number(priceList.discountRate), 0);
    setAverageDiscountRate(totalDiscount / data.length);

    // Currency Distribution for Pie Chart
    const currencyCounts = data.reduce((acc, priceList) => {
      acc[priceList.currency] = (acc[priceList.currency] || 0) + 1;
      return acc;
    }, {});
    setCurrencyDistribution(Object.keys(currencyCounts).map(key => ({
      name: key,
      y: currencyCounts[key],
    })));

    // Price Trends Over Time
    const trends = data.map(priceList => ({
      date: new Date(priceList.validFrom).getTime(),
      price: Number(priceList.basePrice),
    })).sort((a, b) => a.date - b.date);
    setPriceTrends(trends);
  };

  // Highcharts options for Currency Distribution
  const currencyChartOptions = {
    chart: { type: 'pie' },
    title: { text: 'Currency Distribution' },
    series: [{
      name: 'Currency',
      colorByPoint: true,
      data: currencyDistribution,
    }],
  };

  // Highcharts options for Price Trends Over Time
  const priceTrendsChartOptions = {
    chart: { type: 'line' },
    title: { text: 'Price Trends Over Time' },
    xAxis: { type: 'datetime', title: { text: 'Date' } },
    yAxis: { title: { text: 'Price' } },
    series: [{
      name: 'Base Price',
      data: priceTrends.map(item => [item.date, item.price]),
    }],
  };

  return (
    <Container maxWidth="xl" sx={{ paddingTop: 3, paddingBottom: 7 }}>
      <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <Box sx={{ padding: 4 }}>
        <Typography variant="h4" gutterBottom>
          Price Lists Dashboard
        </Typography>

        <Grid container spacing={4}>
          {/* KPIs Section */}
          <Grid item xs={12} md={3}>
            <Card>
              <CardContent>
                <Typography variant="h6">Total Price Lists</Typography>
                <Typography variant="h4" color="green" sx={{ fontWeight: 'bold' }}>
                  {totalPriceLists}
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
        </Grid>

        <Grid container spacing={4} sx={{ marginTop: 4 }}>
          {/* Currency Distribution Chart */}
          <Grid item xs={12} md={6}>
            <HighchartsReact highcharts={Highcharts} options={currencyChartOptions} />
          </Grid>

          {/* Price Trends Over Time Chart */}
          <Grid item xs={12} md={6}>
            <HighchartsReact highcharts={Highcharts} options={priceTrendsChartOptions} />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
