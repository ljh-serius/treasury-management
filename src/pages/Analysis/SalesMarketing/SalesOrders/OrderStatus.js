import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { Box, Typography, Grid, Card, CardContent, Container, CircularProgress, Backdrop } from '@mui/material';

export default function OrderStatusDashboard({ fetchItems }) {
  const [orderData, setOrderData] = useState([]);
  const [totalOrders, setTotalOrders] = useState(0);
  const [pendingOrders, setPendingOrders] = useState(0);
  const [shippedOrders, setShippedOrders] = useState(0);
  const [statusDistribution, setStatusDistribution] = useState([]);
  const [orderTimeline, setOrderTimeline] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDataAsync = async () => {
      setLoading(true);
      const data = await fetchItems();
      setOrderData(data);
      processOrderData(data);
      setLoading(false);
    };

    fetchDataAsync();
  }, [fetchItems]);

  const processOrderData = (data) => {
    // Total Orders
    setTotalOrders(data.length);

    // Count Pending and Shipped Orders
    const pending = data.filter(order => order.status === 'pending').length;
    const shipped = data.filter(order => order.status === 'shipped').length;
    setPendingOrders(pending);
    setShippedOrders(shipped);

    // Status Distribution for Pie Chart
    const statusCounts = data.reduce((acc, order) => {
      acc[order.status] = (acc[order.status] || 0) + 1;
      return acc;
    }, {});
    setStatusDistribution(Object.keys(statusCounts).map(key => ({
      name: key.charAt(0).toUpperCase() + key.slice(1),
      y: statusCounts[key],
    })));

    // Order Timeline for Line Chart
    const timeline = data.map(order => ({
      date: new Date(order.lastUpdated).getTime(),
      status: order.status,
    })).sort((a, b) => a.date - b.date);
    setOrderTimeline(timeline);
  };

  // Highcharts options for Status Distribution
  const statusChartOptions = {
    chart: { type: 'pie' },
    title: { text: 'Order Status Distribution' },
    series: [{
      name: 'Orders',
      colorByPoint: true,
      data: statusDistribution,
    }],
  };

  // Highcharts options for Order Timeline
  const timelineChartOptions = {
    chart: { type: 'line' },
    title: { text: 'Order Update Timeline' },
    xAxis: { type: 'datetime', title: { text: 'Date' } },
    yAxis: { title: { text: 'Order Status' } },
    series: [{
      name: 'Orders Over Time',
      data: orderTimeline.map(item => [item.date, item.status]),
    }],
  };

  return (
    <Container maxWidth="xl" sx={{ paddingTop: 3, paddingBottom: 7 }}>
      <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <Box sx={{ padding: 4 }}>
        <Typography variant="h4" gutterBottom>
          Order Status Dashboard
        </Typography>

        <Grid container spacing={4}>
          {/* KPIs Section */}
          <Grid item xs={12} md={3}>
            <Card>
              <CardContent>
                <Typography variant="h6">Total Orders</Typography>
                <Typography variant="h4" color="green" sx={{ fontWeight: 'bold' }}>
                  {totalOrders}
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={3}>
            <Card>
              <CardContent>
                <Typography variant="h6">Pending Orders</Typography>
                <Typography variant="h4" color="orange" sx={{ fontWeight: 'bold' }}>
                  {pendingOrders}
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={3}>
            <Card>
              <CardContent>
                <Typography variant="h6">Shipped Orders</Typography>
                <Typography variant="h4" color="blue" sx={{ fontWeight: 'bold' }}>
                  {shippedOrders}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Grid container spacing={4} sx={{ marginTop: 4 }}>
          {/* Status Distribution Chart */}
          <Grid item xs={12} md={6}>
            <HighchartsReact highcharts={Highcharts} options={statusChartOptions} />
          </Grid>

          {/* Order Timeline Chart */}
          <Grid item xs={12} md={6}>
            <HighchartsReact highcharts={Highcharts} options={timelineChartOptions} />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
