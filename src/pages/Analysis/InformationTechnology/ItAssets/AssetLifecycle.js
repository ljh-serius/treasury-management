import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { Box, Typography, Grid, Card, CardContent, Container, CircularProgress, Backdrop } from '@mui/material';

export default function AssetLifecycleDashboard({ fetchItems }) {
  const [assetData, setAssetData] = useState([]);
  const [totalAssets, setTotalAssets] = useState(0);
  const [statusDistribution, setStatusDistribution] = useState([]);
  const [assetTypeDistribution, setAssetTypeDistribution] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const data = await fetchItems();
      setAssetData(data);
      processAssetData(data);
      setLoading(false);
    };

    fetchData();
  }, [fetchItems]);

  const processAssetData = (data) => {
    // Total Assets
    setTotalAssets(data.length);

    // Status Distribution
    const statusCounts = data.reduce((acc, asset) => {
      acc[asset.status] = (acc[asset.status] || 0) + 1;
      return acc;
    }, {});
    setStatusDistribution(Object.keys(statusCounts).map(key => ({
      name: key.charAt(0).toUpperCase() + key.slice(1),
      y: statusCounts[key],
    })));

    // Asset Type Distribution
    const assetTypeCounts = data.reduce((acc, asset) => {
      acc[asset.assetType] = (acc[asset.assetType] || 0) + 1;
      return acc;
    }, {});
    setAssetTypeDistribution(Object.keys(assetTypeCounts).map(key => ({
      name: key.charAt(0).toUpperCase() + key.slice(1),
      y: assetTypeCounts[key],
    })));
  };

  // Highcharts options for Status Distribution
  const statusChartOptions = {
    chart: { type: 'pie' },
    title: { text: 'Asset Status Distribution' },
    series: [{
      name: 'Assets',
      colorByPoint: true,
      data: statusDistribution,
    }],
  };

  // Highcharts options for Asset Type Distribution
  const assetTypeChartOptions = {
    chart: { type: 'column' },
    title: { text: 'Asset Type Distribution' },
    xAxis: { type: 'category', title: { text: 'Asset Type' } },
    yAxis: { title: { text: 'Number of Assets' } },
    series: [{
      name: 'Asset Types',
      data: assetTypeDistribution,
    }],
  };

  return (
    <Container maxWidth="xl" sx={{ paddingTop: 3, paddingBottom: 7 }}>
      <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <Box sx={{ padding: 4 }}>
        <Typography variant="h4" gutterBottom>
          Asset Lifecycle Dashboard
        </Typography>

        <Grid container spacing={4}>
          {/* KPIs Section */}
          <Grid item xs={12} md={3}>
            <Card>
              <CardContent>
                <Typography variant="h6">Total Assets</Typography>
                <Typography variant="h4" color="green" sx={{ fontWeight: 'bold' }}>
                  {totalAssets}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Grid container spacing={4} sx={{ marginTop: 4 }}>
          {/* Status Distribution Chart */}
          <Grid item xs={12} md={6}>
            <HighchartsReact highcharts={Highcharts} options={statusChartOptions} />
          </Grid>

          {/* Asset Type Distribution Chart */}
          <Grid item xs={12} md={6}>
            <HighchartsReact highcharts={Highcharts} options={assetTypeChartOptions} />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
