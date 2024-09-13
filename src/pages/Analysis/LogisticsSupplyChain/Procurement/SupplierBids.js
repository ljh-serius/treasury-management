import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { Box, Typography, Grid, Card, CardContent, Container, CircularProgress, Backdrop } from '@mui/material';

export default function SupplierBidsDashboard({ fetchItems }) {
  const [bidData, setBidData] = useState([]);
  const [totalBids, setTotalBids] = useState(0);
  const [statusDistribution, setStatusDistribution] = useState([]);
  const [bidAmountTrends, setBidAmountTrends] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const data = await fetchItems();
      setBidData(data);
      processBidData(data);
      setLoading(false);
    };

    fetchData();
  }, [fetchItems]);

  const processBidData = (data) => {
    // Total Bids
    setTotalBids(data.length);

    // Status Distribution for Pie Chart
    const statusCounts = data.reduce((acc, bid) => {
      acc[bid.status] = (acc[bid.status] || 0) + 1;
      return acc;
    }, {});
    setStatusDistribution(Object.keys(statusCounts).map(key => ({
      name: key.charAt(0).toUpperCase() + key.slice(1),
      y: statusCounts[key],
    })));

    // Bid Amount Trends for Line Chart
    const trendsData = data.map(bid => ({
      date: new Date(bid.submissionDate).getTime(),
      amount: bid.bidAmount,
    })).sort((a, b) => a.date - b.date);
    setBidAmountTrends(trendsData);
  };

  // Highcharts options for Status Distribution
  const statusChartOptions = {
    chart: { type: 'pie' },
    title: { text: 'Bid Status Distribution' },
    series: [{
      name: 'Status',
      colorByPoint: true,
      data: statusDistribution,
    }],
  };

  // Highcharts options for Bid Amount Trends
  const bidAmountChartOptions = {
    chart: { type: 'line' },
    title: { text: 'Bid Amount Trends Over Time' },
    xAxis: { type: 'datetime', title: { text: 'Submission Date' } },
    yAxis: { title: { text: 'Bid Amount' } },
    series: [{
      name: 'Bid Amount',
      data: bidAmountTrends.map(item => [item.date, item.amount]),
    }],
  };

  return (
    <Container maxWidth="xl" sx={{ paddingTop: 3, paddingBottom: 7 }}>
      <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <Box sx={{ padding: 4 }}>
        <Typography variant="h4" gutterBottom>
          Supplier Bids Dashboard
        </Typography>

        <Grid container spacing={4}>
          {/* KPIs Section */}
          <Grid item xs={12} md={3}>
            <Card>
              <CardContent>
                <Typography variant="h6">Total Bids</Typography>
                <Typography variant="h4" color="green" sx={{ fontWeight: 'bold' }}>
                  {totalBids}
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

          {/* Bid Amount Trends Chart */}
          <Grid item xs={12} md={6}>
            <HighchartsReact highcharts={Highcharts} options={bidAmountChartOptions} />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
