import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { Box, Typography, Grid, Card, CardContent, Container, CircularProgress, Backdrop } from '@mui/material';

export default function LeaseTermsDashboard({ fetchData }) {
  const [leaseData, setLeaseData] = useState([]);
  const [totalLeases, setTotalLeases] = useState(0);
  const [upcomingExpirations, setUpcomingExpirations] = useState(0);
  const [rentTrends, setRentTrends] = useState([]);
  const [tagDistribution, setTagDistribution] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDataAsync = async () => {
      setLoading(true);
      const data = await fetchData();
      setLeaseData(data);
      processLeaseData(data);
      setLoading(false);
    };

    fetchDataAsync();
  }, [fetchData]);

  const processLeaseData = (data) => {
    // Total Leases
    setTotalLeases(data.length);

    // Count Upcoming Expirations
    const upcoming = data.filter(lease => new Date(lease.leaseEndDate) > new Date()).length;
    setUpcomingExpirations(upcoming);

    // Rent Trends for Line Chart
    const trendData = data.map(lease => ({
      date: new Date(lease.leaseStartDate).getTime(),
      rent: Number(lease.monthlyRent),
    }));
    setRentTrends(trendData);

    // Tag Distribution for Pie Chart
    const tagCounts = data.reduce((acc, lease) => {
      lease.tags.forEach(tag => {
        acc[tag] = (acc[tag] || 0) + 1;
      });
      return acc;
    }, {});
    setTagDistribution(Object.keys(tagCounts).map(key => ({
      name: key.charAt(0).toUpperCase() + key.slice(1),
      y: tagCounts[key],
    })));
  };

  // Highcharts options for Rent Trends
  const rentTrendChartOptions = {
    chart: { type: 'line' },
    title: { text: 'Monthly Rent Trends' },
    xAxis: { type: 'datetime', title: { text: 'Date' } },
    yAxis: { title: { text: 'Monthly Rent' } },
    series: [{
      name: 'Monthly Rent',
      data: rentTrends.map(item => [item.date, item.rent]),
    }],
  };

  // Highcharts options for Tag Distribution
  const tagChartOptions = {
    chart: { type: 'pie' },
    title: { text: 'Lease Term Tags Distribution' },
    series: [{
      name: 'Tags',
      colorByPoint: true,
      data: tagDistribution,
    }],
  };

  return (
    <Container maxWidth="xl" sx={{ paddingTop: 3, paddingBottom: 7 }}>
      <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <Box sx={{ padding: 4 }}>
        <Typography variant="h4" gutterBottom>
          Lease Terms Dashboard
        </Typography>

        <Grid container spacing={4}>
          {/* KPIs Section */}
          <Grid item xs={12} md={3}>
            <Card>
              <CardContent>
                <Typography variant="h6">Total Leases</Typography>
                <Typography variant="h4" color="green" sx={{ fontWeight: 'bold' }}>
                  {totalLeases}
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={3}>
            <Card>
              <CardContent>
                <Typography variant="h6">Upcoming Expirations</Typography>
                <Typography variant="h4" color="blue" sx={{ fontWeight: 'bold' }}>
                  {upcomingExpirations}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Grid container spacing={4} sx={{ marginTop: 4 }}>
          {/* Rent Trends Chart */}
          <Grid item xs={12} md={6}>
            <HighchartsReact highcharts={Highcharts} options={rentTrendChartOptions} />
          </Grid>

          {/* Tag Distribution Chart */}
          <Grid item xs={12} md={6}>
            <HighchartsReact highcharts={Highcharts} options={tagChartOptions} />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
