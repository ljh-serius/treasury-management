import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { Box, Typography, Grid, Card, CardContent, Container } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import Backdrop from '@mui/material/Backdrop';

export default function ClaimsManagementAnalytics({ fetchItems }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalClaims, setTotalClaims] = useState(0);
  const [approvedClaims, setApprovedClaims] = useState([]);
  const [claimStatusDistribution, setClaimStatusDistribution] = useState([]);

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
    setTotalClaims(data.length);

    const approved = data.filter((item) => item.status === 'approved');
    setApprovedClaims(approved);
  };

  const generateCharts = (data) => {
    const statusCounts = data.reduce((acc, item) => {
      acc[item.status] = (acc[item.status] || 0) + 1;
      return acc;
    }, {});

    setClaimStatusDistribution(
      Object.keys(statusCounts).map((key) => ({
        name: key,
        y: statusCounts[key],
      }))
    );
  };

  const claimStatusDistributionChart = {
    chart: { type: 'pie' },
    title: { text: 'Claims Status Distribution' },
    series: [
      {
        name: 'Status',
        colorByPoint: true,
        data: claimStatusDistribution,
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
          Claims Management Analytics
        </Typography>
        <Grid container spacing={4}>
          {/* KPIs */}
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6">Total Claims</Typography>
                <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                  {totalClaims}
                </Typography>
                <Typography variant="body2">Total number of claims filed.</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6">Approved Claims</Typography>
                <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                  {approvedClaims.length}
                </Typography>
                <Typography variant="body2">Claims approved so far.</Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Charts */}
          <Grid item xs={12} md={12}>
            <HighchartsReact highcharts={Highcharts} options={claimStatusDistributionChart} />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
