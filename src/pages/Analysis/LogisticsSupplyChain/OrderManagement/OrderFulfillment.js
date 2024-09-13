import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { Box, Typography, Grid, Card, CardContent, Container, CircularProgress, Backdrop } from '@mui/material';

export default function OrderFulfillmentDashboard({ fetchItems }) {
  const [fulfillmentData, setFulfillmentData] = useState([]);
  const [totalFulfillments, setTotalFulfillments] = useState(0);
  const [statusDistribution, setStatusDistribution] = useState([]);
  const [fulfillmentTrends, setFulfillmentTrends] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const data = await fetchItems();
      setFulfillmentData(data);
      processFulfillmentData(data);
      setLoading(false);
    };

    fetchData();
  }, [fetchItems]);

  const processFulfillmentData = (data) => {
    // Total Fulfillments
    setTotalFulfillments(data.length);

    // Status Distribution for Pie Chart
    const statusCounts = data.reduce((acc, fulfillment) => {
      acc[fulfillment.status] = (acc[fulfillment.status] || 0) + 1;
      return acc;
    }, {});
    setStatusDistribution(Object.keys(statusCounts).map(key => ({
      name: key.charAt(0).toUpperCase() + key.slice(1),
      y: statusCounts[key],
    })));

    // Fulfillment Trends for Line Chart
    const trendsData = data.map(fulfillment => ({
      date: new Date(fulfillment.fulfillmentDate).getTime(),
      count: 1,
    })).reduce((acc, curr) => {
      const existing = acc.find(item => item.date === curr.date);
      if (existing) {
        existing.count += 1;
      } else {
        acc.push(curr);
      }
      return acc;
    }, []).sort((a, b) => a.date - b.date);
    setFulfillmentTrends(trendsData);
  };

  // Highcharts options for Status Distribution
  const statusChartOptions = {
    chart: { type: 'pie' },
    title: { text: 'Order Fulfillment Status Distribution' },
    series: [{
      name: 'Status',
      colorByPoint: true,
      data: statusDistribution,
    }],
  };

  // Highcharts options for Fulfillment Trends
  const fulfillmentTrendsChartOptions = {
    chart: { type: 'line' },
    title: { text: 'Fulfillment Trends Over Time' },
    xAxis: { type: 'datetime', title: { text: 'Fulfillment Date' } },
    yAxis: { title: { text: 'Number of Fulfillments' } },
    series: [{
      name: 'Fulfillments',
      data: fulfillmentTrends.map(item => [item.date, item.count]),
    }],
  };

  return (
    <Container maxWidth="xl" sx={{ paddingTop: 3, paddingBottom: 7 }}>
      <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <Box sx={{ padding: 4 }}>
        <Typography variant="h4" gutterBottom>
          Order Fulfillment Dashboard
        </Typography>

        <Grid container spacing={4}>
          {/* KPIs Section */}
          <Grid item xs={12} md={3}>
            <Card>
              <CardContent>
                <Typography variant="h6">Total Fulfillments</Typography>
                <Typography variant="h4" color="green" sx={{ fontWeight: 'bold' }}>
                  {totalFulfillments}
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

          {/* Fulfillment Trends Chart */}
          <Grid item xs={12} md={6}>
            <HighchartsReact highcharts={Highcharts} options={fulfillmentTrendsChartOptions} />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
