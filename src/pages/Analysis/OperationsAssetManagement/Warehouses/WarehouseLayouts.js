import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { Box, Typography, Grid, Card, CardContent, Container } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import Backdrop from '@mui/material/Backdrop';

export default function WarehouseLayoutsAnalytics({ fetchItems }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalLayouts, setTotalLayouts] = useState(0);
  const [highUtilizationLayouts, setHighUtilizationLayouts] = useState([]);
  const [layoutTypeDistribution, setLayoutTypeDistribution] = useState([]);

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
    setTotalLayouts(data.length);

    const highUtilization = data.filter((item) => item.tags.includes('high_utilization'));
    setHighUtilizationLayouts(highUtilization);
  };

  const generateCharts = (data) => {
    const layoutTypes = data.reduce((acc, item) => {
      acc[item.layoutType] = (acc[item.layoutType] || 0) + 1;
      return acc;
    }, {});

    setLayoutTypeDistribution(
      Object.keys(layoutTypes).map((key) => ({
        name: key,
        y: layoutTypes[key],
      }))
    );
  };

  const layoutTypeDistributionChart = {
    chart: { type: 'pie' },
    title: { text: 'Warehouse Layout Type Distribution' },
    series: [
      {
        name: 'Layout Types',
        colorByPoint: true,
        data: layoutTypeDistribution,
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
          Warehouse Layouts Analytics
        </Typography>
        <Grid container spacing={4}>
          {/* KPIs */}
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6">Total Layouts</Typography>
                <Typography variant="h4" color="blue" sx={{ fontWeight: 'bold' }}>
                  {totalLayouts}
                </Typography>
                <Typography variant="body2">Total number of warehouse layouts.</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6">High Utilization Layouts</Typography>
                <Typography variant="h4" color="green" sx={{ fontWeight: 'bold' }}>
                  {highUtilizationLayouts.length}
                </Typography>
                <Typography variant="body2">Layouts tagged as 'High Utilization'.</Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Charts */}
          <Grid item xs={12} md={6}>
            <HighchartsReact highcharts={Highcharts} options={layoutTypeDistributionChart} />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
