import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { Box, Typography, Grid, Card, CardContent, Container } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import Backdrop from '@mui/material/Backdrop';

export default function ProductDetailsDashboard({ fetchItems }) {
  const [productData, setProductData] = useState([]);
  const [statusDistribution, setStatusDistribution] = useState([]);
  const [totalStock, setTotalStock] = useState(0);
  const [ecoContributionTotal, setEcoContributionTotal] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const data = await fetchItems();
      setProductData(data);
      processProductData(data);
      setLoading(false);
    };

    fetchData();
  }, [fetchItems]);

  const processProductData = (data) => {
    // Status Distribution
    const statusCounts = data.reduce((acc, product) => {
      acc[product.status] = (acc[product.status] || 0) + 1;
      return acc;
    }, {});

    setStatusDistribution(Object.keys(statusCounts).map(key => ({
      name: key,
      y: statusCounts[key],
    })));

    // Total Stock Quantity and Eco Contribution
    const totals = data.reduce(
      (acc, product) => {
        acc.totalStock += Number(product.stockQuantity) || 0;
        acc.ecoContribution += Number(product.ecoContribution) || 0;
        return acc;
      },
      { totalStock: 0, ecoContribution: 0 }
    );

    setTotalStock(totals.totalStock);
    setEcoContributionTotal(totals.ecoContribution);
  };

  const statusChartOptions = {
    chart: { type: 'pie' },
    title: { text: 'Product Status Distribution' },
    series: [{ name: 'Products', colorByPoint: true, data: statusDistribution }],
  };

  return (
    <Container maxWidth="xl" sx={{ paddingTop: 3, paddingBottom: 7 }}>
      <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <Box sx={{ padding: 4 }}>
        <Typography variant="h4" gutterBottom>
          Product Details Dashboard
        </Typography>
        <Grid container spacing={4}>
          {/* Total Number of Products */}
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6">Total Products</Typography>
                <Typography variant="h4" color="blue" sx={{ fontWeight: 'bold' }}>
                  {productData.length}
                </Typography>
                <Typography variant="body2">Total number of products in the inventory.</Typography>
              </CardContent>
            </Card>
          </Grid>
          {/* KPI Section */}
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6">Total Stock Quantity</Typography>
                <Typography variant="h4" color="green" sx={{ fontWeight: 'bold' }}>
                  {totalStock}
                </Typography>
                <Typography variant="body2">Total stock quantity across all products.</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6">Eco Contribution</Typography>
                <Typography variant="h4" color="orange" sx={{ fontWeight: 'bold' }}>
                  ${ecoContributionTotal.toFixed(2)}
                </Typography>
                <Typography variant="body2">Total eco-tax contributions (French-specific).</Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Chart Section */}
          <Grid item xs={12} md={6}>
            <HighchartsReact highcharts={Highcharts} options={statusChartOptions} />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
