import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { Box, Typography, Grid, Card, CardContent, Container } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import Backdrop from '@mui/material/Backdrop';

export default function InventoryLocationsAnalytics({ fetchItems }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalLocations, setTotalLocations] = useState(0);
  const [criticalStockLocations, setCriticalStockLocations] = useState([]);
  const [locationDistribution, setLocationDistribution] = useState([]);

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
    setTotalLocations(data.length);

    const criticalStock = data.filter((item) => item.tags.includes('critical_stock'));
    setCriticalStockLocations(criticalStock);
  };

  const generateCharts = (data) => {
    const aisles = data.reduce((acc, item) => {
      acc[item.aisle] = (acc[item.aisle] || 0) + 1;
      return acc;
    }, {});

    setLocationDistribution(
      Object.keys(aisles).map((key) => ({
        name: `Aisle ${key}`,
        y: aisles[key],
      }))
    );
  };

  const locationDistributionChart = {
    chart: { type: 'bar' },
    title: { text: 'Inventory Location Distribution by Aisle' },
    xAxis: {
      categories: locationDistribution.map((item) => item.name),
      title: { text: 'Aisles' },
    },
    yAxis: { title: { text: 'Number of Locations' } },
    series: [
      {
        name: 'Locations',
        data: locationDistribution.map((item) => item.y),
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
          Inventory Locations Analytics
        </Typography>
        <Grid container spacing={4}>
          {/* KPIs */}
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6">Total Inventory Locations</Typography>
                <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                  {totalLocations}
                </Typography>
                <Typography variant="body2">Total number of inventory locations tracked.</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6">Critical Stock Locations</Typography>
                <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                  {criticalStockLocations.length}
                </Typography>
                <Typography variant="body2">Locations tagged as 'Critical Stock'.</Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Charts */}
          <Grid item xs={12} md={12}>
            <HighchartsReact highcharts={Highcharts} options={locationDistributionChart} />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
