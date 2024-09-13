import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { Box, Typography, Grid, Card, CardContent, Container } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import Backdrop from '@mui/material/Backdrop';

export default function InsurancePoliciesAnalytics({ fetchItems }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalPolicies, setTotalPolicies] = useState(0);
  const [activePolicies, setActivePolicies] = useState([]);
  const [policyStatusDistribution, setPolicyStatusDistribution] = useState([]);

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
    setTotalPolicies(data.length);

    const active = data.filter((item) => item.status === 'active');
    setActivePolicies(active);
  };

  const generateCharts = (data) => {
    const statusCounts = data.reduce((acc, item) => {
      acc[item.status] = (acc[item.status] || 0) + 1;
      return acc;
    }, {});

    setPolicyStatusDistribution(
      Object.keys(statusCounts).map((key) => ({
        name: key,
        y: statusCounts[key],
      }))
    );
  };

  const policyStatusDistributionChart = {
    chart: { type: 'pie' },
    title: { text: 'Insurance Policy Status Distribution' },
    series: [
      {
        name: 'Status',
        colorByPoint: true,
        data: policyStatusDistribution,
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
          Insurance Policies Analytics
        </Typography>
        <Grid container spacing={4}>
          {/* KPIs */}
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6">Total Policies</Typography>
                <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                  {totalPolicies}
                </Typography>
                <Typography variant="body2">Total number of insurance policies.</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6">Active Policies</Typography>
                <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                  {activePolicies.length}
                </Typography>
                <Typography variant="body2">Currently active insurance policies.</Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Charts */}
          <Grid item xs={12} md={12}>
            <HighchartsReact highcharts={Highcharts} options={policyStatusDistributionChart} />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
