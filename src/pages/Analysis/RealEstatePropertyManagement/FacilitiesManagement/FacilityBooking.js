import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { Box, Typography, Grid, Card, CardContent, Container, CircularProgress, Backdrop } from '@mui/material';

export default function FacilityBookingDashboard({ fetchItems }) {
  const [bookingData, setBookingData] = useState([]);
  const [totalBookings, setTotalBookings] = useState(0);
  const [upcomingBookings, setUpcomingBookings] = useState(0);
  const [purposeDistribution, setPurposeDistribution] = useState([]);
  const [bookingTimeline, setBookingTimeline] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDataAsync = async () => {
      setLoading(true);
      const data = await fetchItems();
      setBookingData(data);
      processBookingData(data);
      setLoading(false);
    };

    fetchDataAsync();
  }, [fetchItems]);

  const processBookingData = (data) => {
    // Total Bookings
    setTotalBookings(data.length);

    // Upcoming Bookings
    const upcoming = data.filter(booking => new Date(booking.startDate) > new Date()).length;
    setUpcomingBookings(upcoming);

    // Purpose Distribution for Pie Chart
    const purposeCounts = data.reduce((acc, booking) => {
      acc[booking.purpose] = (acc[booking.purpose] || 0) + 1;
      return acc;
    }, {});
    setPurposeDistribution(Object.keys(purposeCounts).map(key => ({
      name: key.charAt(0).toUpperCase() + key.slice(1),
      y: purposeCounts[key],
    })));

    // Booking Timeline for Line Chart
    const timeline = data.map(booking => ({
      start: new Date(booking.startDate).getTime(),
      end: new Date(booking.endDate).getTime(),
      name: booking.purpose,
    })).sort((a, b) => a.start - b.start);
    setBookingTimeline(timeline);
  };

  // Highcharts options for Purpose Distribution
  const purposeChartOptions = {
    chart: { type: 'pie' },
    title: { text: 'Purpose of Facility Bookings' },
    series: [{
      name: 'Purpose',
      colorByPoint: true,
      data: purposeDistribution,
    }],
  };

  // Highcharts options for Booking Timeline
  const bookingTimelineChartOptions = {
    chart: { type: 'line' },
    title: { text: 'Booking Timeline' },
    xAxis: { type: 'datetime', title: { text: 'Date' } },
    yAxis: { title: { text: 'Booking Duration' } },
    series: [{
      name: 'Booking Period',
      data: bookingTimeline.map(item => [item.start, item.end]),
    }],
  };

  return (
    <Container maxWidth="xl" sx={{ paddingTop: 3, paddingBottom: 7 }}>
      <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <Box sx={{ padding: 4 }}>
        <Typography variant="h4" gutterBottom>
          Facility Booking Dashboard
        </Typography>

        <Grid container spacing={4}>
          {/* KPIs Section */}
          <Grid item xs={12} md={3}>
            <Card>
              <CardContent>
                <Typography variant="h6">Total Bookings</Typography>
                <Typography variant="h4" color="green" sx={{ fontWeight: 'bold' }}>
                  {totalBookings}
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={3}>
            <Card>
              <CardContent>
                <Typography variant="h6">Upcoming Bookings</Typography>
                <Typography variant="h4" color="blue" sx={{ fontWeight: 'bold' }}>
                  {upcomingBookings}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Grid container spacing={4} sx={{ marginTop: 4 }}>
          {/* Purpose Distribution Chart */}
          <Grid item xs={12} md={6}>
            <HighchartsReact highcharts={Highcharts} options={purposeChartOptions} />
          </Grid>

          {/* Booking Timeline Chart */}
          <Grid item xs={12} md={6}>
            <HighchartsReact highcharts={Highcharts} options={bookingTimelineChartOptions} />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
