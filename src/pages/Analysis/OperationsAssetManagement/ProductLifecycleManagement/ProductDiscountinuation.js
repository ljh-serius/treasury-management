import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { Box, Typography, Grid, Card, CardContent, Container } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import Backdrop from '@mui/material/Backdrop';

export default function ProductDiscontinuationAnalytics({ fetchItems }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalDiscontinuedProducts, setTotalDiscontinuedProducts] = useState(0);
  const [replacedProducts, setReplacedProducts] = useState([]);
  const [discontinuationReasons, setDiscontinuationReasons] = useState([]);

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
    setTotalDiscontinuedProducts(data.length);

    const replaced = data.filter((item) => item.tags.includes('replaced'));
    setReplacedProducts(replaced);
  };

  const generateCharts = (data) => {
    const reasons = data.reduce((acc, item) => {
      acc[item.reasonForDiscontinuation] = (acc[item.reasonForDiscontinuation] || 0) + 1;
      return acc;
    }, {});

    setDiscontinuationReasons(
      Object.keys(reasons).map((key) => ({
        name: key,
        y: reasons[key],
      }))
    );
  };

  const discontinuationReasonChart = {
    chart: { type: 'pie' },
    title: { text: 'Reasons for Discontinuation' },
    series: [
      {
        name: 'Reasons',
        colorByPoint: true,
        data: discontinuationReasons,
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
          Product Discontinuation Analytics
        </Typography>
        <Grid container spacing={4}>
          {/* KPIs */}
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6">Total Discontinued Products</Typography>
                <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                  {totalDiscontinuedProducts}
                </Typography>
                <Typography variant="body2">Total number of discontinued products.</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6">Replaced Products</Typography>
                <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                  {replacedProducts.length}
                </Typography>
                <Typography variant="body2">Products replaced with new models.</Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Charts */}
          <Grid item xs={12} md={6}>
            <HighchartsReact highcharts={Highcharts} options={discontinuationReasonChart} />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
