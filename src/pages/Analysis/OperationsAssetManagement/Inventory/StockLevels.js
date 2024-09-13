import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { Box, Typography, Grid, Card, CardContent, Container, CircularProgress, Backdrop } from '@mui/material';

export default function StockLevelDashboard({ fetchData }) {
  const [stockData, setStockData] = useState([]);
  const [totalStock, setTotalStock] = useState(0);
  const [outOfStockItems, setOutOfStockItems] = useState(0);
  const [reorderNeeded, setReorderNeeded] = useState(0);
  const [stockLevelTrends, setStockLevelTrends] = useState([]);
  const [statusDistribution, setStatusDistribution] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDataAsync = async () => {
      setLoading(true);
      const data = await fetchData();
      setStockData(data);
      processStockData(data);
      setLoading(false);
    };

    fetchDataAsync();
  }, [fetchData]);

  const processStockData = (data) => {
    // Total Stock
    const totalQty = data.reduce((acc, stock) => acc + Number(stock.quantity), 0);
    setTotalStock(totalQty);

    // Count Out of Stock Items and Reorder Needed
    const outOfStock = data.filter(stock => stock.status === 'out_of_stock').length;
    setOutOfStockItems(outOfStock);

    const reorder = data.filter(stock => Number(stock.quantity) <= Number(stock.reorderLevel)).length;
    setReorderNeeded(reorder);

    // Stock Level Trends for Column Chart
    const trendData = data.map(stock => ({
      name: stock.productName,
      y: Number(stock.quantity),
    }));
    setStockLevelTrends(trendData);

    // Status Distribution for Pie Chart
    const statusCounts = data.reduce((acc, stock) => {
      acc[stock.status] = (acc[stock.status] || 0) + 1;
      return acc;
    }, {});
    setStatusDistribution(Object.keys(statusCounts).map(key => ({
      name: key.replace('_', ' ').toUpperCase(),
      y: statusCounts[key],
    })));
  };

  // Highcharts options for Stock Level Trends
  const stockLevelChartOptions = {
    chart: { type: 'column' },
    title: { text: 'Stock Level Trends' },
    series: [{
      name: 'Quantity',
      data: stockLevelTrends,
    }],
  };

  // Highcharts options for Status Distribution
  const statusChartOptions = {
    chart: { type: 'pie' },
    title: { text: 'Inventory Status Distribution' },
    series: [{
      name: 'Items',
      colorByPoint: true,
      data: statusDistribution,
    }],
  };

  return (
    <Container maxWidth="xl" sx={{ paddingTop: 3, paddingBottom: 7 }}>
      <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <Box sx={{ padding: 4 }}>
        <Typography variant="h4" gutterBottom>
          Stock Level Dashboard
        </Typography>

        <Grid container spacing={4}>
          {/* KPIs Section */}
          <Grid item xs={12} md={3}>
            <Card>
              <CardContent>
                <Typography variant="h6">Total Stock Quantity</Typography>
                <Typography variant="h4" color="green" sx={{ fontWeight: 'bold' }}>
                  {totalStock}
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={3}>
            <Card>
              <CardContent>
                <Typography variant="h6">Out of Stock Items</Typography>
                <Typography variant="h4" color="red" sx={{ fontWeight: 'bold' }}>
                  {outOfStockItems}
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={3}>
            <Card>
              <CardContent>
                <Typography variant="h6">Reorder Needed</Typography>
                <Typography variant="h4" color="orange" sx={{ fontWeight: 'bold' }}>
                  {reorderNeeded}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Grid container spacing={4} sx={{ marginTop: 4 }}>
          {/* Stock Level Trends Chart */}
          <Grid item xs={12} md={6}>
            <HighchartsReact highcharts={Highcharts} options={stockLevelChartOptions} />
          </Grid>

          {/* Status Distribution Chart */}
          <Grid item xs={12} md={6}>
            <HighchartsReact highcharts={Highcharts} options={statusChartOptions} />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
