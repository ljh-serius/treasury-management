import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { Box, Typography, Grid, Card, CardContent, Container, CircularProgress, Backdrop } from '@mui/material';

export default function ReviewSchedulesDashboard({ fetchItems }) {
  const [reviewData, setReviewData] = useState([]);
  const [totalReviews, setTotalReviews] = useState(0);
  const [averageRating, setAverageRating] = useState(0);
  const [ratingDistribution, setRatingDistribution] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const data = await fetchItems();
      setReviewData(data);
      processReviewData(data);
      setLoading(false);
    };

    fetchData();
  }, [fetchItems]);

  const processReviewData = (data) => {
    setTotalReviews(data.length);

    // Calculate average rating
    const totalRating = data.reduce((acc, review) => acc + review.performanceRating, 0);
    setAverageRating(data.length > 0 ? totalRating / data.length : 0);

    // Calculate rating distribution
    const ratingMap = {};
    data.forEach((item) => {
      const rating = item.performanceRating;
      ratingMap[rating] = (ratingMap[rating] || 0) + 1;
    });
    const ratingArray = Object.entries(ratingMap).map(([rating, count]) => ({
      name: `Rating ${rating}`,
      y: count,
    }));
    setRatingDistribution(ratingArray);
  };

  // Highcharts options for Review Rating Distribution
  const ratingChartOptions = {
    chart: { type: 'column' },
    title: { text: 'Performance Rating Distribution' },
    xAxis: { type: 'category' },
    yAxis: { title: { text: 'Number of Reviews' } },
    series: [
      {
        name: 'Reviews',
        data: ratingDistribution,
      },
    ],
  };

  return (
    <Container maxWidth="xl" sx={{ paddingTop: 3, paddingBottom: 7 }}>
      <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <Box sx={{ padding: 4 }}>
        <Typography variant="h4" gutterBottom>
          Review Schedules Dashboard
        </Typography>

        <Grid container spacing={4}>
          {/* KPIs Section */}
          <Grid item xs={12} md={3}>
            <Card>
              <CardContent>
                <Typography variant="h6">Total Reviews</Typography>
                <Typography variant="h4" color="green" sx={{ fontWeight: 'bold' }}>
                  {totalReviews}
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={3}>
            <Card>
              <CardContent>
                <Typography variant="h6">Average Rating</Typography>
                <Typography variant="h4" color="blue" sx={{ fontWeight: 'bold' }}>
                  {averageRating.toFixed(2)}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Grid container spacing={4} sx={{ marginTop: 4 }}>
          {/* Review Rating Distribution Chart */}
          <Grid item xs={12} md={6}>
            <HighchartsReact highcharts={Highcharts} options={ratingChartOptions} />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
