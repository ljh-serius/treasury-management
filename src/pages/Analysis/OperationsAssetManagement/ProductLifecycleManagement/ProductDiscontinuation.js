import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { Box, Typography, Grid, Card, CardContent, Container } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import Backdrop from '@mui/material/Backdrop';

export default function ProductDiscontinuationDashboard({ fetchItems }) {
  const [discontinuationData, setDiscontinuationData] = useState([]);
  const [tagsDistribution, setTagsDistribution] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const data = await fetchItems();
      setDiscontinuationData(data);
      processDiscontinuationData(data);
      setLoading(false);
    };

    fetchData();
  }, [fetchItems]);

  const processDiscontinuationData = (data) => {
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
  };

  const tagsChartOptions = {
    chart: { type: 'pie' },
    title: { text: 'Reason for Product Discontinuation' },
    series: [{ name: 'Products', colorByPoint: true, data: tagsDistribution }],
  };

  return (
    <Container maxWidth="xl" sx={{ paddingTop: 3, paddingBottom: 7 }}>
      <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <Box sx={{ padding: 4 }}>
        <Typography variant="h4" gutterBottom>
          Product Discontinuation Dashboard
        </Typography>
        <Grid container spacing={4}>
          {/* Total Number of Discontinued Products */}
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6">Total Discontinued Products</Typography>
                <Typography variant="h4" color="blue" sx={{ fontWeight: 'bold' }}>
                  {discontinuationData.length}
                </Typography>
                <Typography variant="body2">Total number of discontinued products.</Typography>
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
