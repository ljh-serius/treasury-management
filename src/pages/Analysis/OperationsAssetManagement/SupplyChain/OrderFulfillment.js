import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { Box, Typography, Grid, Card, CardContent, Container } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import Backdrop from '@mui/material/Backdrop';

export default function OrderFulfillmentAnalytics({ fetchItems }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalOrders, setTotalOrders] = useState(0);
  const [rushOrders, setRushOrders] = useState([]);
  const [orderStatusDistribution, setOrderStatusDistribution] = useState([]);

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
    setTotalOrders(data.length);

    const rush = data.filter((item) => item.tags.includes('rush_order'));
    setRushOrders(rush);
  };

  const generateCharts = (data) => {
    const statuses = data.reduce((acc, item) => {
      acc[item.status] = (acc[item.status] || 0) + 1;
      return acc;
    }, {});

    setOrderStatusDistribution(
      Object.keys(statuses).map((key) => ({
        name: key,
        y: statuses[key],
      }))
    );
  };

  const orderStatusDistributionChart = {
    chart: { type: 'pie' },
    title: { text: 'Order Status Distribution' },
    series: [
      {
        name: 'Statuses',
        colorByPoint: true,
        data: orderStatusDistribution,
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
          Order Fulfillment Analytics
        </Typography>
        <Grid container spacing={4}>
          {/* KPIs */}
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6">Total Orders</Typography>
                <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                  {totalOrders}
                </Typography>
                <Typography variant="body2">Total number of orders processed.</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6">Rush Orders</Typography>
                <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                  {rushOrders.length}
                </Typography>
                <Typography variant="body2">Orders tagged as 'Rush Orders'.</Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Charts */}
          <Grid item xs={12} md={6}>
            <HighchartsReact highcharts={Highcharts} options={orderStatusDistributionChart} />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
