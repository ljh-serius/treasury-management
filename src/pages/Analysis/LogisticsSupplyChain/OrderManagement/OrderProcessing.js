import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { Box, Typography, Grid, Card, CardContent, Container, CircularProgress, Backdrop } from '@mui/material';

export default function OrderProcessingDashboard({ fetchItems }) {
  const [orderData, setOrderData] = useState([]);
  const [totalOrders, setTotalOrders] = useState(0);
  const [statusDistribution, setStatusDistribution] = useState([]);
  const [totalAmountTrends, setTotalAmountTrends] = useState([]);
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
  
    // Total Amount Trends for Line Chart
    const trendsData = data.map(order => ({
      date: new Date(order.orderDate).getTime(), // Convert date to timestamp
      amount: parseFloat(order.totalAmount), // Ensure totalAmount is a number
    })).sort((a, b) => a.date - b.date);
    setTotalAmountTrends(trendsData);
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
  
  // Highcharts options for Total Amount Trends
  const totalAmountChartOptions = {
    chart: { type: 'line' },
    title: { text: 'Total Amount Trends Over Time' },
    xAxis: { type: 'datetime', title: { text: 'Order Date' } },
    yAxis: { title: { text: 'Total Amount' } },
    series: [{
      name: 'Total Amount',
      data: totalAmountTrends.map(item => [item.date, item.amount]), // Correct format for Highcharts
    }],
  };
  
  return (
    <Container maxWidth="xl" sx={{ paddingTop: 3, paddingBottom: 7 }}>
      <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <Box sx={{ padding: 4 }}>
        <Typography variant="h4" gutterBottom>
          Order Processing Dashboard
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
  
          {/* Total Amount Trends Chart */}
          <Grid item xs={12} md={6}>
            <HighchartsReact highcharts={Highcharts} options={totalAmountChartOptions} />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}  