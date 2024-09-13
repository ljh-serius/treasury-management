import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { Box, Typography, Grid, Card, CardContent, Container } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import Backdrop from '@mui/material/Backdrop';

export default function ReorderPointsAnalytics({ fetchItems }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalReorders, setTotalReorders] = useState(0);
  const [criticalReorders, setCriticalReorders] = useState([]);
  const [reorderDistribution, setReorderDistribution] = useState([]);

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
    setTotalReorders(data.length);

    const critical = data.filter((item) => item.tags.includes('critical'));
    setCriticalReorders(critical);
  };

  const generateCharts = (data) => {
    const reorders = data.reduce((acc, item) => {
      acc[item.productName] = (acc[item.productName] || 0) + item.reorderQuantity;
      return acc;
    }, {});

    setReorderDistribution(
      Object.keys(reorders).map((key) => ({
        name: key,
        y: reorders[key],
      }))
    );
  };

  const reorderDistributionChart = {
    chart: { type: 'bar' },
    title: { text: 'Reorder Quantities by Product' },
    xAxis: {
      categories: reorderDistribution.map((item) => item.name),
      title: { text: 'Products' },
    },
    yAxis: { title: { text: 'Reorder Quantity' } },
    series: [
      {
        name: 'Reorder Quantities',
        data: reorderDistribution.map((item) => item.y),
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
          Reorder Points Analytics
        </Typography>
        <Grid container spacing={4}>
          {/* KPIs */}
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6">Total Reorders</Typography>
                <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                  {totalReorders}
                </Typography>
                <Typography variant="body2">Total number of reorders made.</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6">Critical Reorders</Typography>
                <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                  {criticalReorders.length}
                </Typography>
                <Typography variant="body2">Reorders tagged as 'Critical'.</Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Charts */}
          <Grid item xs={12} md={12}>
            <HighchartsReact highcharts={Highcharts} options={reorderDistributionChart} />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
