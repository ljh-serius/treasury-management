import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { Box, Typography, Grid, Card, CardContent, Container } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import Backdrop from '@mui/material/Backdrop';

export default function RegulatoryUpdatesAnalytics({ fetchItems }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalUpdates, setTotalUpdates] = useState(0);
  const [pendingReviewUpdates, setPendingReviewUpdates] = useState([]);
  const [updateStatusDistribution, setUpdateStatusDistribution] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const fetchedData = await fetchItems();
      setData(fetchedData);
      calculateKpis(fetchedData);
      generateCharts(fetchedData);
      setLoading(false);
    };

    fetchData();
  }, [fetchItems]);

  const calculateKpis = (data) => {
    setTotalUpdates(data.length);

    const pendingReview = data.filter((item) => item.status === 'pending_review');
    setPendingReviewUpdates(pendingReview);
  };

  const generateCharts = (data) => {
    const statusCounts = data.reduce((acc, item) => {
      acc[item.status] = (acc[item.status] || 0) + 1;
      return acc;
    }, {});

    setUpdateStatusDistribution(
      Object.keys(statusCounts).map((key) => ({
        name: key,
        y: statusCounts[key],
      }))
    );
  };

  const updateStatusDistributionChart = {
    chart: { type: 'pie' },
    title: { text: 'Regulatory Update Status Distribution' },
    series: [
      {
        name: 'Status',
        colorByPoint: true,
        data: updateStatusDistribution,
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
          Regulatory Updates Analytics
        </Typography>
        <Grid container spacing={4}>
          {/* KPIs */}
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6">Total Updates</Typography>
                <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                  {totalUpdates}
                </Typography>
                <Typography variant="body2">Total number of regulatory updates issued.</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6">Pending Review Updates</Typography>
                <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                  {pendingReviewUpdates.length}
                </Typography>
                <Typography variant="body2">Updates pending review.</Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Charts */}
          <Grid item xs={12} md={12}>
            <HighchartsReact highcharts={Highcharts} options={updateStatusDistributionChart} />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
