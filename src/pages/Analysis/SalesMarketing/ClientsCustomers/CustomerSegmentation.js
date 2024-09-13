import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { Box, Typography, Grid, Card, CardContent, Container, CircularProgress, Backdrop } from '@mui/material';

export default function CustomerSegmentationDashboard({ fetchData }) {
  const [segmentData, setSegmentData] = useState([]);
  const [revenueDistribution, setRevenueDistribution] = useState([]);
  const [customerCountDistribution, setCustomerCountDistribution] = useState([]);
  const [growthSegments, setGrowthSegments] = useState(0);
  const [declineSegments, setDeclineSegments] = useState(0);
  const [totalSegments, setTotalSegments] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDataAsync = async () => {
      setLoading(true);
      const data = await fetchData();
      setSegmentData(data);
      processSegmentData(data);
      setLoading(false);
    };

    fetchDataAsync();
  }, [fetchData]);

  const processSegmentData = (data) => {
    // Total Segments
    setTotalSegments(data.length);

    // Count Growth and Decline Segments
    const growth = data.filter(segment => segment.tags.includes('growth-segment')).length;
    const decline = data.filter(segment => segment.tags.includes('decline-segment')).length;
    setGrowthSegments(growth);
    setDeclineSegments(decline);

    // Revenue Distribution by Segment
    const revenueData = data.map(segment => ({
      name: segment.segmentName,
      y: Number(segment.revenueContribution),
    }));
    setRevenueDistribution(revenueData);

    // Customer Count Distribution by Segment
    const customerCountData = data.map(segment => ({
      name: segment.segmentName,
      y: Number(segment.customerCount),
    }));
    setCustomerCountDistribution(customerCountData);
  };

  // Highcharts options
  const revenueChartOptions = {
    chart: { type: 'column' },
    title: { text: 'Revenue Contribution by Segment' },
    series: [{
      name: 'Revenue',
      data: revenueDistribution,
    }],
  };

  const customerCountChartOptions = {
    chart: { type: 'column' },
    title: { text: 'Customer Count by Segment' },
    series: [{
      name: 'Customer Count',
      data: customerCountDistribution,
    }],
  };

  return (
    <Container maxWidth="xl" sx={{ paddingTop: 3, paddingBottom: 7 }}>
      <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <Box sx={{ padding: 4 }}>
        <Typography variant="h4" gutterBottom>
          Customer Segmentation Dashboard
        </Typography>

        <Grid container spacing={4}>
          {/* KPIs Section */}
          <Grid item xs={12} md={3}>
            <Card>
              <CardContent>
                <Typography variant="h6">Total Segments</Typography>
                <Typography variant="h4" color="green" sx={{ fontWeight: 'bold' }}>
                  {totalSegments}
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={3}>
            <Card>
              <CardContent>
                <Typography variant="h6">Growth Segments</Typography>
                <Typography variant="h4" color="blue" sx={{ fontWeight: 'bold' }}>
                  {growthSegments}
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={3}>
            <Card>
              <CardContent>
                <Typography variant="h6">Decline Segments</Typography>
                <Typography variant="h4" color="red" sx={{ fontWeight: 'bold' }}>
                  {declineSegments}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Grid container spacing={4} sx={{ marginTop: 4 }}>
          {/* Revenue Contribution Chart */}
          <Grid item xs={12} md={6}>
            <HighchartsReact highcharts={Highcharts} options={revenueChartOptions} />
          </Grid>

          {/* Customer Count Distribution Chart */}
          <Grid item xs={12} md={6}>
            <HighchartsReact highcharts={Highcharts} options={customerCountChartOptions} />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
