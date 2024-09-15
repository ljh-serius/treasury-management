import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { Box, Typography, Grid, Card, CardContent, Container } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import Backdrop from '@mui/material/Backdrop';

export default function PriceListsAnalytics({ fetchItems }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalPriceLists, setTotalPriceLists] = useState(0);
  const [discountedPriceLists, setDiscountedPriceLists] = useState([]);
  const [priceListDistribution, setPriceListDistribution] = useState([]);

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
    setTotalPriceLists(data.length);

    const discounted = data.filter((item) => item.tags.includes('discounted'));
    setDiscountedPriceLists(discounted);
  };

  const generateCharts = (data) => {
    const currencies = data.reduce((acc, item) => {
      acc[item.currency] = (acc[item.currency] || 0) + 1;
      return acc;
    }, {});

    setPriceListDistribution(
      Object.keys(currencies).map((key) => ({
        name: key,
        y: currencies[key],
      }))
    );
  };

  const priceListDistributionChart = {
    chart: { type: 'pie' },
    title: { text: 'Price List Currency Distribution' },
    series: [
      {
        name: 'Currencies',
        colorByPoint: true,
        data: priceListDistribution,
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
          Price Lists Analytics
        </Typography>
        <Grid container spacing={4}>
          {/* KPIs */}
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6">Total Price Lists</Typography>
                <Typography variant="h4" color="blue" sx={{ fontWeight: 'bold' }}>
                  {totalPriceLists}
                </Typography>
                <Typography variant="body2">Total number of price lists available.</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6">Discounted Price Lists</Typography>
                <Typography variant="h4" color="green" sx={{ fontWeight: 'bold' }}>
                  {discountedPriceLists.length}
                </Typography>
                <Typography variant="body2">Price lists tagged as 'Discounted'.</Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Charts */}
          <Grid item xs={12} md={6}>
            <HighchartsReact highcharts={Highcharts} options={priceListDistributionChart} />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
