import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { Box, Typography, Grid, Card, CardContent, Container } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import Backdrop from '@mui/material/Backdrop';

export default function ContractObligationsAnalytics({ fetchItems }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalObligations, setTotalObligations] = useState(0);
  const [pendingObligations, setPendingObligations] = useState([]);
  const [obligationStatusDistribution, setObligationStatusDistribution] = useState([]);

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
    setTotalObligations(data.length);

    const pending = data.filter((item) => item.status === 'pending');
    setPendingObligations(pending);
  };

  const generateCharts = (data) => {
    const statusCounts = data.reduce((acc, item) => {
      acc[item.status] = (acc[item.status] || 0) + 1;
      return acc;
    }, {});

    setObligationStatusDistribution(
      Object.keys(statusCounts).map((key) => ({
        name: key,
        y: statusCounts[key],
      }))
    );
  };

  const obligationStatusDistributionChart = {
    chart: { type: 'pie' },
    title: { text: 'Contract Obligation Status Distribution' },
    series: [
      {
        name: 'Status',
        colorByPoint: true,
        data: obligationStatusDistribution,
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
          Contract Obligations Analytics
        </Typography>
        <Grid container spacing={4}>
          {/* KPIs */}
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6">Total Obligations</Typography>
                <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                  {totalObligations}
                </Typography>
                <Typography variant="body2">Total number of contract obligations.</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6">Pending Obligations</Typography>
                <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                  {pendingObligations.length}
                </Typography>
                <Typography variant="body2">Obligations still pending completion.</Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Charts */}
          <Grid item xs={12} md={12}>
            <HighchartsReact highcharts={Highcharts} options={obligationStatusDistributionChart} />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
