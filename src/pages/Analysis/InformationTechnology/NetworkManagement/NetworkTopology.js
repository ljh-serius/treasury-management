import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { Box, Typography, Grid, Card, CardContent, Container, CircularProgress, Backdrop } from '@mui/material';

export default function NetworkTopologyDashboard({ fetchItems }) {
  const [topologyData, setTopologyData] = useState([]);
  const [totalTopologies, setTotalTopologies] = useState(0);
  const [topologyTypeData, setTopologyTypeData] = useState([]);
  const [deviceCountData, setDeviceCountData] = useState([]);
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
    setTotalTopologies(data.length);

    // Aggregate Topology Types
    const topologyMap = {};
    data.forEach((item) => {
      const type = item.topologyType;
      topologyMap[type] = (topologyMap[type] || 0) + 1;
    });
    const topologyArray = Object.entries(topologyMap).map(([type, count]) => ({
      name: type,
      y: count,
    }));
    setTopologyTypeData(topologyArray);

    // Aggregate Device Counts
    setDeviceCountData(
      data.map((item) => ({
        name: item.networkName,
        y: item.deviceCount,
      }))
    );
  };

  // Highcharts options for Topology Types
  const topologyTypeChartOptions = {
    chart: { type: 'pie' },
    title: { text: 'Network Topology Types Distribution' },
    series: [
      {
        name: 'Topologies',
        data: topologyTypeData,
      },
    ],
  };

  // Highcharts options for Device Count
  const deviceCountChartOptions = {
    chart: { type: 'bar' },
    title: { text: 'Device Count by Network' },
    xAxis: { type: 'category', title: { text: 'Network Name' } },
    yAxis: { title: { text: 'Device Count' } },
    series: [
      {
        name: 'Devices',
        data: deviceCountData,
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
          Network Topology Dashboard
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
        </Grid>

        <Grid container spacing={4} sx={{ marginTop: 4 }}>
          {/* Topology Types Chart */}
          <Grid item xs={12} md={6}>
            <HighchartsReact highcharts={Highcharts} options={topologyTypeChartOptions} />
          </Grid>

          {/* Device Count Chart */}
          <Grid item xs={12} md={6}>
            <HighchartsReact highcharts={Highcharts} options={deviceCountChartOptions} />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
