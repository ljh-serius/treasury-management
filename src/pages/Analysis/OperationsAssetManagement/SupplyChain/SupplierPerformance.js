import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { Box, Typography, Grid, Card, CardContent, Container } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import Backdrop from '@mui/material/Backdrop';

export default function SupplierPerformanceAnalytics({ fetchItems }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalSuppliers, setTotalSuppliers] = useState(0);
  const [preferredSuppliers, setPreferredSuppliers] = useState([]);
  const [performanceDistribution, setPerformanceDistribution] = useState([]);

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
    setTotalSuppliers(data.length);

    const preferred = data.filter((item) => item.tags.includes('preferred'));
    setPreferredSuppliers(preferred);
  };

  const generateCharts = (data) => {
    const deliveryRatings = data.reduce((acc, item) => {
      acc[item.deliveryTimeRating] = (acc[item.deliveryTimeRating] || 0) + 1;
      return acc;
    }, {});

    setPerformanceDistribution(
      Object.keys(deliveryRatings).map((key) => ({
        name: `${key} Stars`,
        y: deliveryRatings[key],
      }))
    );
  };

  const performanceDistributionChart = {
    chart: { type: 'column' },
    title: { text: 'Supplier Delivery Time Ratings' },
    xAxis: {
      categories: performanceDistribution.map((item) => item.name),
      title: { text: 'Rating' },
    },
    yAxis: { title: { text: 'Number of Suppliers' } },
    series: [
      {
        name: 'Suppliers',
        data: performanceDistribution.map((item) => item.y),
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
          Supplier Performance Analytics
        </Typography>
        <Grid container spacing={4}>
          {/* KPIs */}
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6">Total Suppliers</Typography>
                <Typography variant="h4" color="blue" sx={{ fontWeight: 'bold' }}>
                  {totalSuppliers}
                </Typography>
                <Typography variant="body2">Total number of suppliers evaluated.</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6">Preferred Suppliers</Typography>
                <Typography variant="h4"  color="green" sx={{ fontWeight: 'bold' }}>
                  {preferredSuppliers.length}
                </Typography>
                <Typography variant="body2">Suppliers tagged as 'Preferred'.</Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Charts */}
          <Grid item xs={12} md={12}>
            <HighchartsReact highcharts={Highcharts} options={performanceDistributionChart} />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
