import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { Box, Typography, Grid, Card, CardContent, Container } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import Backdrop from '@mui/material/Backdrop';

export default function WorkOrdersAnalytics({ fetchItems }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalWorkOrders, setTotalWorkOrders] = useState(0);
  const [urgentOrders, setUrgentOrders] = useState([]);
  const [priorityDistribution, setPriorityDistribution] = useState([]);

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
    setTotalWorkOrders(data.length);

    const urgent = data.filter((item) => item.tags.includes('urgent'));
    setUrgentOrders(urgent);
  };

  const generateCharts = (data) => {
    const priorities = data.reduce((acc, item) => {
      acc[item.priority] = (acc[item.priority] || 0) + 1;
      return acc;
    }, {});

    setPriorityDistribution(
      Object.keys(priorities).map((key) => ({
        name: key,
        y: priorities[key],
      }))
    );
  };

  const priorityDistributionChart = {
    chart: { type: 'pie' },
    title: { text: 'Work Order Priority Distribution' },
    series: [
      {
        name: 'Priorities',
        colorByPoint: true,
        data: priorityDistribution,
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
          Work Orders Analytics
        </Typography>
        <Grid container spacing={4}>
          {/* KPIs */}
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6">Total Work Orders</Typography>
                <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                  {totalWorkOrders}
                </Typography>
                <Typography variant="body2">Total number of work orders.</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6">Urgent Work Orders</Typography>
                <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                  {urgentOrders.length}
                </Typography>
                <Typography variant="body2">Work orders tagged as 'Urgent'.</Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Charts */}
          <Grid item xs={12} md={6}>
            <HighchartsReact highcharts={Highcharts} options={priorityDistributionChart} />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
