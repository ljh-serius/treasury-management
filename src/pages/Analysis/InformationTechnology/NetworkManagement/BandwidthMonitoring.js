import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { Box, Typography, Grid, Card, CardContent, Container, CircularProgress, Backdrop } from '@mui/material';

export default function BandwidthMonitoringAnalytics({ fetchItems }) {
  const [monitoringData, setMonitoringData] = useState([]);
  const [totalMonitoredNetworks, setTotalMonitoredNetworks] = useState(0);
  const [criticalNetworks, setCriticalNetworks] = useState(0);
  const [averageUsageTrends, setAverageUsageTrends] = useState([]);
  const [peakUsageDistribution, setPeakUsageDistribution] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const data = await fetchItems();
      setMonitoringData(data);
      processMonitoringData(data);
      setLoading(false);
    };

    fetchData();
  }, [fetchItems]);

  const processMonitoringData = (data) => {
    // Total Monitored Networks
    setTotalMonitoredNetworks(data.length);

    // Count Critical Networks (ensure tags exists and is an array)
    const critical = data.filter(network => Array.isArray(network.tags) && network.tags.includes('critical')).length;
    setCriticalNetworks(critical);

    // Average Usage Trends for Line Chart
    const usageTrends = data.map(network => ({
      date: new Date(network.monitoredDate).getTime(),
      usage: Number(network.averageUsage),
    }));
    setAverageUsageTrends(usageTrends);

    // Peak Usage Distribution for Pie Chart
    const peakUsageCounts = data.reduce((acc, network) => {
      const range = network.peakUsage < 50 ? '<50 Mbps' :
                    network.peakUsage < 100 ? '50-100 Mbps' : '>100 Mbps';
      acc[range] = (acc[range] || 0) + 1;
      return acc;
    }, {});
    setPeakUsageDistribution(Object.keys(peakUsageCounts).map(key => ({
      name: key,
      y: peakUsageCounts[key],
    })));
  };

  // Highcharts options for Average Usage Trends
  const averageUsageChartOptions = {
    chart: { type: 'line' },
    title: { text: 'Average Bandwidth Usage Trends' },
    xAxis: { type: 'datetime', title: { text: 'Monitored Date' } },
    yAxis: { title: { text: 'Average Usage (Mbps)' } },
    series: [{
      name: 'Average Usage',
      data: averageUsageTrends.map(item => [item.date, item.usage]),
    }],
  };

  // Highcharts options for Peak Usage Distribution
  const peakUsageChartOptions = {
    chart: { type: 'pie' },
    title: { text: 'Peak Bandwidth Usage Distribution' },
    series: [{
      name: 'Peak Usage',
      colorByPoint: true,
      data: peakUsageDistribution,
    }],
  };

  return (
    <Container maxWidth="xl" sx={{ paddingTop: 3, paddingBottom: 7 }}>
      <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <Box sx={{ padding: 4 }}>
        <Typography variant="h4" gutterBottom>
          Bandwidth Monitoring Analytics
        </Typography>

        <Grid container spacing={4}>
          {/* KPIs Section */}
          <Grid item xs={12} md={3}>
            <Card>
              <CardContent>
                <Typography variant="h6">Total Monitored Networks</Typography>
                <Typography variant="h4" color="green" sx={{ fontWeight: 'bold' }}>
                  {totalMonitoredNetworks}
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={3}>
            <Card>
              <CardContent>
                <Typography variant="h6">Critical Networks</Typography>
                <Typography variant="h4" color="red" sx={{ fontWeight: 'bold' }}>
                  {criticalNetworks}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Grid container spacing={4} sx={{ marginTop: 4 }}>
          {/* Average Usage Trends Chart */}
          <Grid item xs={12} md={6}>
            <HighchartsReact highcharts={Highcharts} options={averageUsageChartOptions} />
          </Grid>

          {/* Peak Usage Distribution Chart */}
          <Grid item xs={12} md={6}>
            <HighchartsReact highcharts={Highcharts} options={peakUsageChartOptions} />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
