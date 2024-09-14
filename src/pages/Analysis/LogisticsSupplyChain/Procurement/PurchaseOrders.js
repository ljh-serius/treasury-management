import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { Box, Typography, Grid, Card, CardContent, Container, CircularProgress, Backdrop } from '@mui/material';

export default function PurchaseOrdersDashboard({ fetchItems }) {
  const [orderData, setOrderData] = useState([]);
  const [totalOrders, setTotalOrders] = useState(0);
  const [quantityDistribution, setQuantityDistribution] = useState([]);
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
  
    // Quantity Distribution for Pie Chart
    const quantityCounts = data.reduce((acc, order) => {
      acc[order.quantity] = (acc[order.quantity] || 0) + 1;
      return acc;
    }, {});
    setQuantityDistribution(Object.keys(quantityCounts).map(key => ({
      name: `Quantity: ${key}`,
      y: quantityCounts[key],
    })));
  
    // Total Amount Trends for Line Chart
    const trendsData = data.map(order => ({
      date: new Date(order.orderDate).getTime(), // Convert date to timestamp
      amount: parseFloat(order.totalAmount), // Ensure totalAmount is a number
    })).sort((a, b) => a.date - b.date);
    setTotalAmountTrends(trendsData);
  };
  
  // Highcharts options for Total Amount Trends
  const totalAmountChartOptions = {
    chart: { type: 'line' },
    title: { text: 'Total Amount Trends Over Time' },
    xAxis: { type: 'datetime', title: { text: 'Order Date' } },
    yAxis: { title: { text: 'Total Amount' } },
    series: [{
      name: 'Total Amount',
      data: totalAmountTrends.map(item => [item.date, item.amount]), // Properly formatted date and amount
    }],
  };
  
  // Highcharts options for Quantity Distribution
  const quantityChartOptions = {
    chart: { type: 'pie' },
    title: { text: 'Quantity Distribution' },
    series: [{
      name: 'Quantity',
      colorByPoint: true,
      data: quantityDistribution,
    }],
  };

  return (
    <Container maxWidth="xl" sx={{ paddingTop: 3, paddingBottom: 7 }}>
      <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <Box sx={{ padding: 4 }}>
        <Typography variant="h4" gutterBottom>
          Purchase Orders Dashboard
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
          {/* Quantity Distribution Chart */}
          <Grid item xs={12} md={6}>
            <HighchartsReact highcharts={Highcharts} options={quantityChartOptions} />
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
