import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { Box, Typography, Grid, Card, CardContent, Container } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import Backdrop from '@mui/material/Backdrop';

export default function ReorderPointsDashboard({ fetchItems }) {
  const [reorderData, setReorderData] = useState([]);
  const [tagsDistribution, setTagsDistribution] = useState([]);
  const [totalReorderQuantity, setTotalReorderQuantity] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const data = await fetchItems();
      setReorderData(data);
      processReorderData(data);
      setLoading(false);
    };

    fetchData();
  }, [fetchItems]);

  const processReorderData = (data) => {
    // Tags Distribution
    const tagCounts = data.reduce((acc, item) => {
      item.tags.forEach(tag => {
        acc[tag] = (acc[tag] || 0) + 1;
      });
      return acc;
    }, {});

    setTagsDistribution(Object.keys(tagCounts).map(key => ({
      name: key,
      y: tagCounts[key],
    })));

    // Total Reorder Quantity
    const totalQuantity = data.reduce((acc, item) => {
      acc += Number(item.reorderQuantity) || 0;
      return acc;
    }, 0);

    setTotalReorderQuantity(totalQuantity);
  };

  const tagsChartOptions = {
    chart: { type: 'pie' },
    title: { text: 'Reorder Tags Distribution' },
    series: [{ name: 'Reorders', colorByPoint: true, data: tagsDistribution }],
  };

  return (
    <Container maxWidth="xl" sx={{ paddingTop: 3, paddingBottom: 7 }}>
      <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <Box sx={{ padding: 4 }}>
        <Typography variant="h4" gutterBottom>
          Reorder Points Dashboard
        </Typography>
        <Grid container spacing={4}>
          {/* Total Number of Reorder Points */}
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6">Total Reorder Points</Typography>
                <Typography variant="h4" color="blue" sx={{ fontWeight: 'bold' }}>
                  {reorderData.length}
                </Typography>
                <Typography variant="body2">Total number of reorder points in the system.</Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* KPI Section */}
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6">Total Reorder Quantity</Typography>
                <Typography variant="h4" color="green" sx={{ fontWeight: 'bold' }}>
                  {totalReorderQuantity}
                </Typography>
                <Typography variant="body2">Total quantity to be reordered.</Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Chart Section */}
          <Grid item xs={12} md={6}>
            <HighchartsReact highcharts={Highcharts} options={tagsChartOptions} />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
