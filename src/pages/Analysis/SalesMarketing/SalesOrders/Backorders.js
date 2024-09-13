import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { Box, Typography, Grid, Card, CardContent, Container, CircularProgress, Backdrop } from '@mui/material';

export default function BackorderDashboard({ fetchData }) {
  const [backorderData, setBackorderData] = useState([]);
  const [totalBackorders, setTotalBackorders] = useState(0);
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [urgentBackorders, setUrgentBackorders] = useState(0);
  const [backorderTrends, setBackorderTrends] = useState([]);
  const [restockTimeline, setRestockTimeline] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDataAsync = async () => {
      setLoading(true);
      const data = await fetchData();
      setBackorderData(data);
      processBackorderData(data);
      setLoading(false);
    };

    fetchDataAsync();
  }, [fetchData]);

  const processBackorderData = (data) => {
    // Total Backorders
    setTotalBackorders(data.length);

    // Total Quantity Backordered
    const totalQty = data.reduce((acc, backorder) => acc + Number(backorder.quantity), 0);
    setTotalQuantity(totalQty);

    // Count Urgent Backorders
    const urgent = data.filter(backorder => backorder.tags.includes('urgent')).length;
    setUrgentBackorders(urgent);

    // Backorder Trends for Column Chart
    const trendData = data.map(backorder => ({
      name: `Backorder ${backorder.backorderId.slice(-4)}`,
      y: Number(backorder.quantity),
    }));
    setBackorderTrends(trendData);

    // Restock Timeline Over Time
    const timeline = data.map(backorder => ({
      date: new Date(backorder.expectedRestockDate).getTime(),
      name: `Backorder ${backorder.backorderId.slice(-4)}`,
    })).sort((a, b) => a.date - b.date);
    setRestockTimeline(timeline);
  };

  // Highcharts options for Backorder Trends
  const backorderTrendsChartOptions = {
    chart: { type: 'column' },
    title: { text: 'Backorder Quantity Trends' },
    series: [{
      name: 'Quantity',
      data: backorderTrends,
    }],
  };

  // Highcharts options for Restock Timeline
  const restockTimelineChartOptions = {
    chart: { type: 'line' },
    title: { text: 'Expected Restock Timeline' },
    xAxis: { type: 'datetime', title: { text: 'Date' } },
    yAxis: { title: { text: 'Backorders' } },
    series: [{
      name: 'Expected Restock',
      data: restockTimeline.map(item => [item.date, item.name]),
    }],
  };

  return (
    <Container maxWidth="xl" sx={{ paddingTop: 3, paddingBottom: 7 }}>
      <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <Box sx={{ padding: 4 }}>
        <Typography variant="h4" gutterBottom>
          Backorder Dashboard
        </Typography>

        <Grid container spacing={4}>
          {/* KPIs Section */}
          <Grid item xs={12} md={3}>
            <Card>
              <CardContent>
                <Typography variant="h6">Total Backorders</Typography>
                <Typography variant="h4" color="green" sx={{ fontWeight: 'bold' }}>
                  {totalBackorders}
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={3}>
            <Card>
              <CardContent>
                <Typography variant="h6">Total Quantity Backordered</Typography>
                <Typography variant="h4" color="blue" sx={{ fontWeight: 'bold' }}>
                  {totalQuantity}
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={3}>
            <Card>
              <CardContent>
                <Typography variant="h6">Urgent Backorders</Typography>
                <Typography variant="h4" color="red" sx={{ fontWeight: 'bold' }}>
                  {urgentBackorders}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Grid container spacing={4} sx={{ marginTop: 4 }}>
          {/* Backorder Trends Chart */}
          <Grid item xs={12} md={6}>
            <HighchartsReact highcharts={Highcharts} options={backorderTrendsChartOptions} />
          </Grid>

          {/* Restock Timeline Chart */}
          <Grid item xs={12} md={6}>
            <HighchartsReact highcharts={Highcharts} options={restockTimelineChartOptions} />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
