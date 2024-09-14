import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { Box, Typography, Grid, Card, CardContent, Container, CircularProgress, Backdrop } from '@mui/material';

export default function NetworkTopologyAnalytics({ fetchItems }) {
  const [topologyData, setTopologyData] = useState([]);
  const [totalTopologies, setTotalTopologies] = useState(0);
  const [criticalTopologies, setCriticalTopologies] = useState(0);
  const [topologyTypeDistribution, setTopologyTypeDistribution] = useState([]);
  const [deviceCountDistribution, setDeviceCountDistribution] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const data = await fetchItems();
      setTopologyData(data);
      processTopologyData(data);
      setLoading(false);
    };

    fetchData();
  }, [fetchItems]);

  const processTopologyData = (data) => {
    // Total Topologies
    setTotalTopologies(data.length);
  
    // Count Critical Topologies (ensure tags exists and is an array)
    const critical = data.filter(topology => Array.isArray(topology.tags) && topology.tags.includes('critical')).length;
    setCriticalTopologies(critical);
  
    // Topology Type Distribution for Pie Chart
    const typeCounts = data.reduce((acc, topology) => {
      acc[topology.topologyType] = (acc[topology.topologyType] || 0) + 1;
      return acc;
    }, {});
    setTopologyTypeDistribution(Object.keys(typeCounts).map(key => ({
      name: key.charAt(0).toUpperCase() + key.slice(1),
      y: typeCounts[key],
    })));
  
    // Device Count Distribution for Bar Chart
    const deviceCounts = data.map(topology => ({
      name: topology.networkName,
      y: Number(topology.deviceCount),
    }));
    setDeviceCountDistribution(deviceCounts);
  };

  // Highcharts options for Topology Type Distribution
  const topologyTypeChartOptions = {
    chart: { type: 'pie' },
    title: { text: 'Network Topology Types Distribution' },
    series: [{
      name: 'Topologies',
      colorByPoint: true,
      data: topologyTypeDistribution,
    }],
  };

  // Highcharts options for Device Count Distribution
  const deviceCountChartOptions = {
    chart: { type: 'bar' },
    title: { text: 'Device Count by Network' },
    xAxis: { type: 'category', title: { text: 'Network Name' } },
    yAxis: { title: { text: 'Device Count' } },
    series: [{
      name: 'Devices',
      data: deviceCountDistribution,
    }],
  };

  return (
    <Container maxWidth="xl" sx={{ paddingTop: 3, paddingBottom: 7 }}>
      <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <Box sx={{ padding: 4 }}>
        <Typography variant="h4" gutterBottom>
          Network Topology Analytics
        </Typography>

        <Grid container spacing={4}>
          {/* KPIs Section */}
          <Grid item xs={12} md={3}>
            <Card>
              <CardContent>
                <Typography variant="h6">Total Network Topologies</Typography>
                <Typography variant="h4" color="green" sx={{ fontWeight: 'bold' }}>
                  {totalTopologies}
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={3}>
            <Card>
              <CardContent>
                <Typography variant="h6">Critical Topologies</Typography>
                <Typography variant="h4" color="red" sx={{ fontWeight: 'bold' }}>
                  {criticalTopologies}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Grid container spacing={4} sx={{ marginTop: 4 }}>
          {/* Topology Type Distribution Chart */}
          <Grid item xs={12} md={6}>
            <HighchartsReact highcharts={Highcharts} options={topologyTypeChartOptions} />
          </Grid>

          {/* Device Count Distribution Chart */}
          <Grid item xs={12} md={6}>
            <HighchartsReact highcharts={Highcharts} options={deviceCountChartOptions} />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
