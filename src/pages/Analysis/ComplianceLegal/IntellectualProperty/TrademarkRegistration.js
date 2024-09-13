import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { Box, Typography, Grid, Card, CardContent, Container } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import Backdrop from '@mui/material/Backdrop';

export default function TrademarkRegistrationsAnalytics({ fetchItems }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalRegistrations, setTotalRegistrations] = useState(0);
  const [approvedRegistrations, setApprovedRegistrations] = useState([]);
  const [registrationStatusDistribution, setRegistrationStatusDistribution] = useState([]);

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
    setTotalRegistrations(data.length);

    const approved = data.filter((item) => item.status === 'approved');
    setApprovedRegistrations(approved);
  };

  const generateCharts = (data) => {
    const statusCounts = data.reduce((acc, item) => {
      acc[item.status] = (acc[item.status] || 0) + 1;
      return acc;
    }, {});

    setRegistrationStatusDistribution(
      Object.keys(statusCounts).map((key) => ({
        name: key,
        y: statusCounts[key],
      }))
    );
  };

  const registrationStatusDistributionChart = {
    chart: { type: 'pie' },
    title: { text: 'Trademark Registration Status Distribution' },
    series: [
      {
        name: 'Status',
        colorByPoint: true,
        data: registrationStatusDistribution,
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
          Trademark Registrations Analytics
        </Typography>
        <Grid container spacing={4}>
          {/* KPIs */}
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6">Total Registrations</Typography>
                <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                  {totalRegistrations}
                </Typography>
                <Typography variant="body2">Total number of trademark registrations.</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6">Approved Registrations</Typography>
                <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                  {approvedRegistrations.length}
                </Typography>
                <Typography variant="body2">Registrations that have been approved.</Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Charts */}
          <Grid item xs={12} md={12}>
            <HighchartsReact highcharts={Highcharts} options={registrationStatusDistributionChart} />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
