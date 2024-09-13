import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { Box, Typography, Grid, Card, CardContent, Container } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import Backdrop from '@mui/material/Backdrop';

export default function CorrectiveActionsAnalytics({ fetchItems }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalActions, setTotalActions] = useState(0);
  const [overdueActions, setOverdueActions] = useState([]);
  const [actionStatusDistribution, setActionStatusDistribution] = useState([]);

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
    setTotalActions(data.length);

    const overdue = data.filter((item) => item.status === 'overdue');
    setOverdueActions(overdue);
  };

  const generateCharts = (data) => {
    const statusCounts = data.reduce((acc, item) => {
      acc[item.status] = (acc[item.status] || 0) + 1;
      return acc;
    }, {});

    setActionStatusDistribution(
      Object.keys(statusCounts).map((key) => ({
        name: key,
        y: statusCounts[key],
      }))
    );
  };

  const actionStatusDistributionChart = {
    chart: { type: 'pie' },
    title: { text: 'Corrective Action Status Distribution' },
    series: [
      {
        name: 'Statuses',
        colorByPoint: true,
        data: actionStatusDistribution,
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
          Corrective Actions Analytics
        </Typography>
        <Grid container spacing={4}>
          {/* KPIs */}
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6">Total Corrective Actions</Typography>
                <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                  {totalActions}
                </Typography>
                <Typography variant="body2">Total number of corrective actions taken.</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6">Overdue Actions</Typography>
                <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                  {overdueActions.length}
                </Typography>
                <Typography variant="body2">Actions that are overdue.</Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Charts */}
          <Grid item xs={12} md={12}>
            <HighchartsReact highcharts={Highcharts} options={actionStatusDistributionChart} />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
    