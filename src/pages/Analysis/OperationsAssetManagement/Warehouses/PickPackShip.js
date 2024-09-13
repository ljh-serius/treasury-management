import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { Box, Typography, Grid, Card, CardContent, Container } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import Backdrop from '@mui/material/Backdrop';

export default function PickPackShipAnalytics({ fetchItems }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalOrders, setTotalOrders] = useState(0);
  const [priorityOrders, setPriorityOrders] = useState([]);
  const [orderStageDistribution, setOrderStageDistribution] = useState([]);

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
    setTotalOrders(data.length);

    const priority = data.filter((item) => item.tags.includes('priority'));
    setPriorityOrders(priority);
  };

  const generateCharts = (data) => {
    const stages = data.reduce((acc, item) => {
      acc[item.stage] = (acc[item.stage] || 0) + 1;
      return acc;
    }, {});

    setOrderStageDistribution(
      Object.keys(stages).map((key) => ({
        name: key,
        y: stages[key],
      }))
    );
  };

  const orderStageDistributionChart = {
    chart: { type: 'column' },
    title: { text: 'Order Stage Distribution' },
    xAxis: {
      categories: orderStageDistribution.map((item) => item.name),
      title: { text: 'Stages' },
    },
    yAxis: { title: { text: 'Number of Orders' } },
    series: [
      {
        name: 'Orders',
        data: orderStageDistribution.map((item) => item.y),
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
          Pick, Pack, and Ship Analytics
        </Typography>
        <Grid container spacing={4}>
          {/* KPIs */}
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6">Total Orders</Typography>
                <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                  {totalOrders}
                </Typography>
                <Typography variant="body2">Total number of orders processed.</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6">Priority Orders</Typography>
                <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                  {priorityOrders.length}
                </Typography>
                <Typography variant="body2">Orders tagged as 'Priority'.</Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Charts */}
          <Grid item xs={12} md={12}>
            <HighchartsReact highcharts={Highcharts} options={orderStageDistributionChart} />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
