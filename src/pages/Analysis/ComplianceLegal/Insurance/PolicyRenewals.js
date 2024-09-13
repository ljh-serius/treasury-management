import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { Box, Typography, Grid, Card, CardContent, Container } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import Backdrop from '@mui/material/Backdrop';

export default function PolicyRenewalsAnalytics({ fetchItems }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalRenewals, setTotalRenewals] = useState(0);
  const [pendingRenewals, setPendingRenewals] = useState([]);
  const [renewalStatusDistribution, setRenewalStatusDistribution] = useState([]);

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
    setTotalRenewals(data.length);

    const pending = data.filter((item) => item.status === 'pending');
    setPendingRenewals(pending);
  };

  const generateCharts = (data) => {
    const statusCounts = data.reduce((acc, item) => {
      acc[item.status] = (acc[item.status] || 0) + 1;
      return acc;
    }, {});

    setRenewalStatusDistribution(
      Object.keys(statusCounts).map((key) => ({
        name: key,
        y: statusCounts[key],
      }))
    );
  };

  const renewalStatusDistributionChart = {
    chart: { type: 'pie' },
    title: { text: 'Policy Renewal Status Distribution' },
    series: [
      {
        name: 'Status',
        colorByPoint: true,
        data: renewalStatusDistribution,
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
          Policy Renewals Analytics
        </Typography>
        <Grid container spacing={4}>
          {/* KPIs */}
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6">Total Renewals</Typography>
                <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                  {totalRenewals}
                </Typography>
                <Typography variant="body2">Total number of policy renewals.</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6">Pending Renewals</Typography>
                <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                  {pendingRenewals.length}
                </Typography>
                <Typography variant="body2">Renewals still pending approval.</Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Charts */}
          <Grid item xs={12} md={12}>
            <HighchartsReact highcharts={Highcharts} options={renewalStatusDistributionChart} />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
