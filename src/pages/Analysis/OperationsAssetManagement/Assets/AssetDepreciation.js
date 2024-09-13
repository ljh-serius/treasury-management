import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { Box, Typography, Grid, Card, CardContent, Container, CircularProgress, Backdrop } from '@mui/material';

export default function AssetDepreciationDashboard({ fetchItems }) {
  const [assetData, setAssetData] = useState([]);
  const [totalAssets, setTotalAssets] = useState(0);
  const [totalDepreciation, setTotalDepreciation] = useState(0);
  const [currentAssetValue, setCurrentAssetValue] = useState(0);
  const [activeAssets, setActiveAssets] = useState(0);
  const [depreciationTrends, setDepreciationTrends] = useState([]);
  const [statusDistribution, setStatusDistribution] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDataAsync = async () => {
      setLoading(true);
      const data = await fetchItems();
      setAssetData(data);
      processAssetData(data);
      setLoading(false);
    };

    fetchDataAsync();
  }, [fetchItems]);

  const processAssetData = (data) => {
    // Total Assets
    setTotalAssets(data.length);

    // Total Depreciation and Current Value
    const totalDepreciationValue = data.reduce((acc, asset) => acc + (Number(asset.purchasePrice) - Number(asset.currentValue)), 0);
    setTotalDepreciation(totalDepreciationValue);
    const totalCurrentValue = data.reduce((acc, asset) => acc + Number(asset.currentValue), 0);
    setCurrentAssetValue(totalCurrentValue);

    // Count Active Assets
    const active = data.filter(asset => asset.status === 'active').length;
    setActiveAssets(active);

    // Depreciation Trends for Line Chart
    const trendData = data.map(asset => ({
      date: new Date(asset.lastModifiedDate).getTime(),
      value: Number(asset.currentValue),
    })).sort((a, b) => a.date - b.date);
    setDepreciationTrends(trendData);

    // Status Distribution for Pie Chart
    const statusCounts = data.reduce((acc, asset) => {
      acc[asset.status] = (acc[asset.status] || 0) + 1;
      return acc;
    }, {});
    setStatusDistribution(Object.keys(statusCounts).map(key => ({
      name: key.charAt(0).toUpperCase() + key.slice(1),
      y: statusCounts[key],
    })));
  };

  // Highcharts options for Depreciation Trends
  const depreciationChartOptions = {
    chart: { type: 'line' },
    title: { text: 'Asset Depreciation Trends' },
    xAxis: { type: 'datetime', title: { text: 'Date' } },
    yAxis: { title: { text: 'Current Value' } },
    series: [{
      name: 'Current Value',
      data: depreciationTrends.map(item => [item.date, item.value]),
    }],
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

  return (
    <Container maxWidth="xl" sx={{ paddingTop: 3, paddingBottom: 7 }}>
      <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <Box sx={{ padding: 4 }}>
        <Typography variant="h4" gutterBottom>
          Assets Depreciation Dashboard
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

          <Grid item xs={12} md={3}>
            <Card>
              <CardContent>
                <Typography variant="h6">Total Depreciation</Typography>
                <Typography variant="h4" color="orange" sx={{ fontWeight: 'bold' }}>
                  ${totalDepreciation.toFixed(2)}
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={3}>
            <Card>
              <CardContent>
                <Typography variant="h6">Current Asset Value</Typography>
                <Typography variant="h4" color="blue" sx={{ fontWeight: 'bold' }}>
                  ${currentAssetValue.toFixed(2)}
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={3}>
            <Card>
              <CardContent>
                <Typography variant="h6">Active Assets</Typography>
                <Typography variant="h4" color="green" sx={{ fontWeight: 'bold' }}>
                  {activeAssets}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Grid container spacing={4} sx={{ marginTop: 4 }}>
          {/* Depreciation Trends Chart */}
          <Grid item xs={12} md={6}>
            <HighchartsReact highcharts={Highcharts} options={depreciationChartOptions} />
          </Grid>

          {/* Status Distribution Chart */}
          <Grid item xs={12} md={6}>
            <HighchartsReact highcharts={Highcharts} options={statusChartOptions} />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
