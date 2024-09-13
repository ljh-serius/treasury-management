import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { Box, Typography, Grid, Card, CardContent, Container } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import Backdrop from '@mui/material/Backdrop';

export default function InventoryAgingAnalytics({ fetchItems }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalItems, setTotalItems] = useState(0);
  const [slowMovingItems, setSlowMovingItems] = useState([]);
  const [agingDistribution, setAgingDistribution] = useState([]);

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
    setTotalItems(data.length);

    const slowMoving = data.filter((item) => item.tags.includes('slow_moving'));
    setSlowMovingItems(slowMoving);
  };

  const generateCharts = (data) => {
    const aging = data.reduce((acc, item) => {
      acc[item.agingCategory] = (acc[item.agingCategory] || 0) + 1;
      return acc;
    }, {});

    setAgingDistribution(
      Object.keys(aging).map((key) => ({
        name: key,
        y: aging[key],
      }))
    );
  };

  const agingDistributionChart = {
    chart: { type: 'pie' },
    title: { text: 'Inventory Aging Distribution' },
    series: [
      {
        name: 'Aging Categories',
        colorByPoint: true,
        data: agingDistribution,
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
          Inventory Aging Analytics
        </Typography>
        <Grid container spacing={4}>
          {/* KPIs */}
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6">Total Inventory Items</Typography>
                <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                  {totalItems}
                </Typography>
                <Typography variant="body2">Total number of items in inventory.</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6">Slow Moving Items</Typography>
                <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                  {slowMovingItems.length}
                </Typography>
                <Typography variant="body2">Items tagged as 'Slow Moving'.</Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Charts */}
          <Grid item xs={12} md={12}>
            <HighchartsReact highcharts={Highcharts} options={agingDistributionChart} />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
