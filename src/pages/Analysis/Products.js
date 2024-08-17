import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { Box, Typography, Grid, Card, CardContent, Container } from '@mui/material';

export default function ProductAnalysisDashboard({ fetchProducts }) {
  const [productsData, setProductsData] = useState([]);
  const [categoryDistribution, setCategoryDistribution] = useState([]);
  const [supplierDistribution, setSupplierDistribution] = useState([]);
  const [stockLevelDistribution, setStockLevelDistribution] = useState([]);
  const [priceTrendsData, setPriceTrendsData] = useState([]);
  const [overallStockLevel, setOverallStockLevel] = useState(0);
  const [totalInventoryValue, setTotalInventoryValue] = useState(0);
  const [topProducts, setTopProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchProducts();
      setProductsData(data);
      processProductData(data);
    };

    fetchData();
  }, [fetchProducts]);

  const processProductData = (data) => {
    // Category Distribution
    const categoryCounts = data.reduce((acc, product) => {
      acc[product.category] = (acc[product.category] || 0) + 1;
      return acc;
    }, {});

    setCategoryDistribution(Object.keys(categoryCounts).map(key => ({
      name: key,
      y: categoryCounts[key],
      productNames: data.filter(product => product.category === key).map(product => product.name).join(', '),
    })));

    // Supplier Distribution
    const supplierCounts = data.reduce((acc, product) => {
      acc[product.supplier] = (acc[product.supplier] || 0) + 1;
      return acc;
    }, {});

    setSupplierDistribution(Object.keys(supplierCounts).map(key => ({
      name: key,
      y: supplierCounts[key],
      productNames: data.filter(product => product.supplier === key).map(product => product.name).join(', '),
    })));

    // Stock Level Distribution with Binning
    const stockBins = {
      '0-10': 0,
      '11-50': 0,
      '51-100': 0,
      '101-500': 0,
      '501-1000': 0,
      '1001+': 0,
    };

    data.forEach(product => {
      const stock = product.stock;
      if (stock >= 0 && stock <= 10) {
        stockBins['0-10'] += 1;
      } else if (stock >= 11 && stock <= 50) {
        stockBins['11-50'] += 1;
      } else if (stock >= 51 && stock <= 100) {
        stockBins['51-100'] += 1;
      } else if (stock >= 101 && stock <= 500) {
        stockBins['101-500'] += 1;
      } else if (stock >= 501 && stock <= 1000) {
        stockBins['501-1000'] += 1;
      } else if (stock > 1000) {
        stockBins['1001+'] += 1;
      }
    });

    setStockLevelDistribution(Object.keys(stockBins).map(key => ({
      name: key,
      y: stockBins[key],
    })));

    // Price Trends Data (Monthly trends of average price)
    const priceTrends = data.reduce((acc, product) => {
      const month = new Date(product.salesStartDate).getMonth() + 1; // Get month from date
      acc[month] = (acc[month] || { sum: 0, count: 0 });
      acc[month].sum += product.price;
      acc[month].count += 1;
      return acc;
    }, {});

    setPriceTrendsData(Object.keys(priceTrends).map(key => ({
      name: `Month ${key}`,
      y: priceTrends[key].sum / priceTrends[key].count,
    })));

    // Total Inventory Value
    const totalValue = data.reduce((acc, product) => acc + (product.price * product.stock), 0);
    setTotalInventoryValue(totalValue);

    // Overall Stock Level
    const totalStock = data.reduce((acc, product) => acc + product.stock, 0);
    setOverallStockLevel(totalStock);

    // Top 5 Products by Stock Level
    const topProductsList = data
      .sort((a, b) => b.stock - a.stock)
      .slice(0, 5);
    setTopProducts(topProductsList);
  };

  const categoryChartOptions = {
    chart: {
      type: 'pie',
    },
    title: {
      text: 'Product Category Distribution',
    },
    tooltip: {
      pointFormat: '{point.name}: <b>{point.y}</b><br/>Products: {point.productNames}'
    },
    series: [
      {
        name: 'Products',
        colorByPoint: true,
        data: categoryDistribution,
      },
    ],
  };

  const supplierChartOptions = {
    chart: {
      type: 'pie',
    },
    title: {
      text: 'Supplier Distribution',
    },
    tooltip: {
      pointFormat: '{point.name}: <b>{point.y}</b><br/>Products: {point.productNames}'
    },
    series: [
      {
        name: 'Products',
        colorByPoint: true,
        data: supplierDistribution,
      },
    ],
  };

  const stockLevelChartOptions = {
    chart: {
      type: 'column',
    },
    title: {
      text: 'Stock Level Distribution',
    },
    tooltip: {
      pointFormat: '{point.name}: <b>{point.y}</b> products'
    },
    series: [
      {
        name: 'Stock Levels',
        data: stockLevelDistribution,
      },
    ],
  };

  const priceTrendsChartOptions = {
    chart: {
      type: 'line',
    },
    title: {
      text: 'Price Trends Over Time',
    },
    xAxis: {
      categories: priceTrendsData.map(data => data.name),
    },
    series: [
      {
        name: 'Average Price',
        data: priceTrendsData.map(data => data.y),
      },
    ],
  };

  return (
    <Container maxWidth="xl" sx={{ paddingTop: 3, paddingBottom: 7 }}>
      <Box sx={{ padding: 4 }}>
        <Typography variant="h4" gutterBottom>
          Product Analysis Dashboard
        </Typography>
        <Grid container spacing={4}>
          {/* KPI Section */}
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6">Total Inventory Value</Typography>
                <Typography variant="h4" color="blue" sx={{ fontWeight: 'bold' }}>
                  ${totalInventoryValue.toFixed(2)}
                </Typography>
                <Typography variant="body2">
                  This represents the total value of all products in stock.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6">Overall Stock Level</Typography>
                <Typography variant="h4" color="green" sx={{ fontWeight: 'bold' }}>
                  {overallStockLevel}
                </Typography>
                <Typography variant="body2">
                  This represents the total quantity of all products in stock.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6">Top 5 Products by Stock</Typography>
                <ol>
                  {topProducts.map(product => (
                    <li key={product.sku}>
                      <Typography variant="body2">
                        {product.name} - Stock: {product.stock} - Price: ${Number(product.price || 0).toFixed(2)}
                      </Typography>
                    </li>
                  ))}
                </ol>
              </CardContent>
            </Card>
          </Grid>

          {/* Chart Section */}
          <Grid item xs={12} md={6}>
            <HighchartsReact highcharts={Highcharts} options={categoryChartOptions} />
          </Grid>
          <Grid item xs={12} md={6}>
            <HighchartsReact highcharts={Highcharts} options={supplierChartOptions} />
          </Grid>
          <Grid item xs={12} md={12}>
            <HighchartsReact highcharts={Highcharts} options={stockLevelChartOptions} />
          </Grid>
          <Grid item xs={12} md={12}>
            <HighchartsReact highcharts={Highcharts} options={priceTrendsChartOptions} />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
