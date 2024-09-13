import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { Box, Typography, Grid, Card, CardContent, Container } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import Backdrop from '@mui/material/Backdrop';

export default function SettlementAgreementsAnalytics({ fetchItems }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalAgreements, setTotalAgreements] = useState(0);
  const [pendingAgreements, setPendingAgreements] = useState([]);
  const [agreementStatusDistribution, setAgreementStatusDistribution] = useState([]);

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
    setTotalAgreements(data.length);

    const pending = data.filter((item) => item.status === 'pending');
    setPendingAgreements(pending);
  };

  const generateCharts = (data) => {
    const statusCounts = data.reduce((acc, item) => {
      acc[item.status] = (acc[item.status] || 0) + 1;
      return acc;
    }, {});

    setAgreementStatusDistribution(
      Object.keys(statusCounts).map((key) => ({
        name: key,
        y: statusCounts[key],
      }))
    );
  };

  const agreementStatusDistributionChart = {
    chart: { type: 'pie' },
    title: { text: 'Settlement Agreement Status Distribution' },
    series: [
      {
        name: 'Status',
        colorByPoint: true,
        data: agreementStatusDistribution,
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
          Settlement Agreements Analytics
        </Typography>
        <Grid container spacing={4}>
          {/* KPIs */}
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6">Total Agreements</Typography>
                <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                  {totalAgreements}
                </Typography>
                <Typography variant="body2">Total number of settlement agreements tracked.</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6">Pending Agreements</Typography>
                <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                  {pendingAgreements.length}
                </Typography>
                <Typography variant="body2">Agreements that are pending completion.</Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Charts */}
          <Grid item xs={12} md={12}>
            <HighchartsReact highcharts={Highcharts} options={agreementStatusDistributionChart} />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
