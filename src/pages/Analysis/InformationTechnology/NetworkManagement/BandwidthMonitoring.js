import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { Box, Typography, Grid, Card, CardContent, Container, CircularProgress, Backdrop } from '@mui/material';

export default function BandwidthMonitoringDashboard({ fetchItems }) {
  const [monitoringData, setMonitoringData] = useState([]);
  const [totalMonitored, setTotalMonitored] = useState(0);
  const [averageUsageData, setAverageUsageData] = useState([]);
  const [peakUsageData, setPeakUsageData] = useState([]);
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
    // Total Monitored
    setTotalMonitored(data.length);

    // Process Average Usage Data
    setAverageUsageData(
      data.map(item => ({
        name: item.networkName,
        y: item.averageUsage,
      }))
    );

    // Process Peak Usage Data
    setPeakUsageData(
      data.map(item => ({
        name: item.networkName,
        y: item.peakUsage,
      }))
    );
  };

  // Highcharts options for Average Usage
  const averageUsageChartOptions = {
    chart: { type: 'bar' },
    title: { text: 'Average Bandwidth Usage (Mbps)' },
    xAxis: { type: 'category', title: { text: 'Network Name' } },
    yAxis: { title: { text: 'Mbps' } },
    series: [{
      name: 'Average Usage',
      data: averageUsageData,
    }],
  };

  // Highcharts options for Peak Usage
  const peakUsageChartOptions = {
    chart: { type: 'column' },
    title: { text: 'Peak Bandwidth Usage (Mbps)' },
    xAxis: { type: 'category', title: { text: 'Network Name' } },
    yAxis: { title: { text: 'Mbps' } },
    series: [{
      name: 'Peak Usage',
      data: peakUsageData,
    }],
  };

  return (
    <Container maxWidth="xl" sx={{ paddingTop: 3, paddingBottom: 7 }}>
      <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <Box sx={{ padding: 4 }}>
        <Typography variant="h4" gutterBottom>
          Bandwidth Monitoring Dashboard
        </Typography>

        <Grid container spacing={4}>
          {/* KPIs Section */}
          <Grid item xs={12} md={3}>
            <Card>
              <CardContent>
                <Typography variant="h6">Total Networks Monitored</Typography>
                <Typography variant="h4" color="green" sx={{ fontWeight: 'bold' }}>
                  {totalMonitored}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Grid container spacing={4} sx={{ marginTop: 4 }}>
          {/* Average Usage Chart */}
          <Grid item xs={12} md={6}>
            <HighchartsReact highcharts={Highcharts} options={averageUsageChartOptions} />
          </Grid>

          {/* Peak Usage Chart */}
          <Grid item xs={12} md={6}>
            <HighchartsReact highcharts={Highcharts} options={peakUsageChartOptions} />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
