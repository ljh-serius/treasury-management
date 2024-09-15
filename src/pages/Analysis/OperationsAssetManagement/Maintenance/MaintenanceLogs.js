import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { Box, Typography, Grid, Card, CardContent, Container } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import Backdrop from '@mui/material/Backdrop';

export default function MaintenanceLogsAnalytics({ fetchItems }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalLogs, setTotalLogs] = useState(0);
  const [emergencyLogs, setEmergencyLogs] = useState([]);
  const [maintenanceTypeDistribution, setMaintenanceTypeDistribution] = useState([]);

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
    setTotalLogs(data.length);

    const emergency = data.filter((item) => item.tags.includes('emergency'));
    setEmergencyLogs(emergency);
  };

  const generateCharts = (data) => {
    const maintenanceTypes = data.reduce((acc, item) => {
      acc[item.maintenanceType] = (acc[item.maintenanceType] || 0) + 1;
      return acc;
    }, {});

    setMaintenanceTypeDistribution(
      Object.keys(maintenanceTypes).map((key) => ({
        name: key,
        y: maintenanceTypes[key],
      }))
    );
  };

  const maintenanceTypeDistributionChart = {
    chart: { type: 'bar' },
    title: { text: 'Maintenance Type Distribution' },
    xAxis: {
      categories: maintenanceTypeDistribution.map((item) => item.name),
      title: { text: 'Maintenance Types' },
    },
    yAxis: { title: { text: 'Number of Logs' } },
    series: [
      {
        name: 'Logs',
        data: maintenanceTypeDistribution.map((item) => item.y),
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
          Maintenance Logs Analytics
        </Typography>
        <Grid container spacing={4}>
          {/* KPIs */}
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6">Total Maintenance Logs</Typography>
                <Typography variant="h4" color="blue" sx={{ fontWeight: 'bold' }}>
                  {totalLogs}
                </Typography>
                <Typography variant="body2">Total number of maintenance logs.</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6">Emergency Logs</Typography>
                <Typography variant="h4" color="green" sx={{ fontWeight: 'bold' }}>
                  {emergencyLogs.length}
                </Typography>
                <Typography variant="body2">Logs tagged as 'Emergency'.</Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Charts */}
          <Grid item xs={12} md={12}>
            <HighchartsReact highcharts={Highcharts} options={maintenanceTypeDistributionChart} />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
