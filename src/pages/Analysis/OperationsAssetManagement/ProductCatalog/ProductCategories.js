import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { Box, Typography, Grid, Card, CardContent, Container } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import Backdrop from '@mui/material/Backdrop';

export default function ProductCategoriesAnalytics({ fetchItems }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalCategories, setTotalCategories] = useState(0);
  const [popularCategories, setPopularCategories] = useState([]);
  const [categoryDistribution, setCategoryDistribution] = useState([]);

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
    setTotalCategories(data.length);

    const popular = data.filter((item) => item.tags.includes('popular'));
    setPopularCategories(popular);
  };

  const generateCharts = (data) => {
    const categories = data.reduce((acc, item) => {
      acc[item.categoryName] = (acc[item.categoryName] || 0) + 1;
      return acc;
    }, {});

    setCategoryDistribution(
      Object.keys(categories).map((key) => ({
        name: key,
        y: categories[key],
      }))
    );
  };

  const categoryDistributionChart = {
    chart: { type: 'pie' },
    title: { text: 'Category Distribution' },
    series: [
      {
        name: 'Categories',
        colorByPoint: true,
        data: categoryDistribution,
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
          Product Categories Analytics
        </Typography>
        <Grid container spacing={4}>
          {/* KPIs */}
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6">Total Categories</Typography>
                <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                  {totalCategories}
                </Typography>
                <Typography variant="body2">Total number of product categories available.</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6">Popular Categories</Typography>
                <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                  {popularCategories.length}
                </Typography>
                <Typography variant="body2">Categories tagged as 'Popular'.</Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Charts */}
          <Grid item xs={12} md={6}>
            <HighchartsReact highcharts={Highcharts} options={categoryDistributionChart} />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
    