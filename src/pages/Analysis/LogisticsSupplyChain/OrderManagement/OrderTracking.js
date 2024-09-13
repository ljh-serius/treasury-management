import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { Box, Typography, Grid, Card, CardContent, Container, CircularProgress, Backdrop } from '@mui/material';

export default function OrderTrackingDashboard({ fetchItems }) {
  const [orderData, setOrderData] = useState([]);
  const [totalOrders, setTotalOrders] = useState(0);
  const [statusDistribution, setStatusDistribution] = useState([]);
  const [deliveryDateTrends, setDeliveryDateTrends] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const data = await fetchItems();
      setOrderData(data);
      processOrderData(data);
      setLoading(false);
    };

    fetchData();
  }, [fetchItems]);

  const processOrderData = (data) => {
    // Total Orders
    setTotalOrders(data.length);

    // Status Distribution for Pie Chart
    const statusCounts = data.reduce((acc, order) => {
      acc[order.status] = (acc[order.status] || 0) + 1;
      return acc;
    }, {});
    setStatusDistribution(Object.keys(statusCounts).map(key => ({
      name: key.charAt(0).toUpperCase() + key.slice(1),
      y: statusCounts[key],
    })));

    // Delivery Date Trends for Line Chart
    const trendsData = data
      .filter(order => order.actualDeliveryDate)
      .map(order => ({
        date: new Date(order.actualDeliveryDate).getTime(),
        count: 1,
      }))
      .reduce((acc, curr) => {
        const existing = acc.find(item => item.date === curr.date);
        if (existing) {
          existing.count += 1;
        } else {
          acc.push(curr);
        }
        return acc;
      }, [])
      .sort((a, b) => a.date - b.date);
    setDeliveryDateTrends(trendsData);
  };

  // Highcharts options for Status Distribution
  const statusChartOptions = {
    chart: { type: 'pie' },
    title: { text: 'Order Status Distribution' },
    series: [{
      name: 'Status',
      colorByPoint: true,
      data: statusDistribution,
    }],
  };

  // Highcharts options for Delivery Date Trends
  const deliveryDateChartOptions = {
    chart: { type: 'line' },
    title: { text: 'Delivery Date Trends' },
    xAxis: { type: 'datetime', title: { text: 'Delivery Date' } },
    yAxis: { title: { text: 'Number of Deliveries' } },
    series: [{
      name: 'Deliveries',
      data: deliveryDateTrends.map(item => [item.date, item.count]),
    }],
  };

  return (
    <Container maxWidth="xl" sx={{ paddingTop: 3, paddingBottom: 7 }}>
      <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <Box sx={{ padding: 4 }}>
        <Typography variant="h4" gutterBottom>
          Order Tracking Dashboard
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
        </Grid>

        <Grid container spacing={4} sx={{ marginTop: 4 }}>
          {/* Status Distribution Chart */}
          <Grid item xs={12} md={6}>
            <HighchartsReact highcharts={Highcharts} options={statusChartOptions} />
          </Grid>

          {/* Delivery Date Trends Chart */}
          <Grid item xs={12} md={6}>
            <HighchartsReact highcharts={Highcharts} options={deliveryDateChartOptions} />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
