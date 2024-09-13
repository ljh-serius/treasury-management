import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { Box, Typography, Grid, Card, CardContent, Container, CircularProgress, Backdrop } from '@mui/material';

export default function MaintenanceDashboard({ fetchItems }) {
  const [maintenanceData, setMaintenanceData] = useState([]);
  const [totalMaintenance, setTotalMaintenance] = useState(0);
  const [totalCost, setTotalCost] = useState(0);
  const [pendingMaintenance, setPendingMaintenance] = useState(0);
  const [maintenanceTypeDistribution, setMaintenanceTypeDistribution] = useState([]);
  const [statusDistribution, setStatusDistribution] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDataAsync = async () => {
      setLoading(true);
      const data = await fetchItems();
      setMaintenanceData(data);
      processMaintenanceData(data);
      setLoading(false);
    };

    fetchDataAsync();
  }, [fetchItems]);

  const processMaintenanceData = (data) => {
    // Total Maintenance
    setTotalMaintenance(data.length);

    // Total Maintenance Cost
    const totalMaintenanceCost = data.reduce((acc, maintenance) => acc + Number(maintenance.cost), 0);
    setTotalCost(totalMaintenanceCost);

    // Count Pending Maintenance
    const pending = data.filter(maintenance => maintenance.status === 'pending').length;
    setPendingMaintenance(pending);

    // Maintenance Type Distribution for Pie Chart
    const typeCounts = data.reduce((acc, maintenance) => {
      acc[maintenance.maintenanceType] = (acc[maintenance.maintenanceType] || 0) + 1;
      return acc;
    }, {});
    setMaintenanceTypeDistribution(Object.keys(typeCounts).map(key => ({
      name: key.charAt(0).toUpperCase() + key.slice(1),
      y: typeCounts[key],
    })));

    // Status Distribution for Pie Chart
    const statusCounts = data.reduce((acc, maintenance) => {
      acc[maintenance.status] = (acc[maintenance.status] || 0) + 1;
      return acc;
    }, {});
    setStatusDistribution(Object.keys(statusCounts).map(key => ({
      name: key.replace('_', ' ').toUpperCase(),
      y: statusCounts[key],
    })));
  };

  // Highcharts options for Maintenance Type Distribution
  const maintenanceTypeChartOptions = {
    chart: { type: 'pie' },
    title: { text: 'Maintenance Type Distribution' },
    series: [{
      name: 'Maintenance Type',
      colorByPoint: true,
      data: maintenanceTypeDistribution,
    }],
  };

  // Highcharts options for Status Distribution
  const statusChartOptions = {
    chart: { type: 'pie' },
    title: { text: 'Maintenance Status Distribution' },
    series: [{
      name: 'Status',
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
          Preventive Maintenance Dashboard
        </Typography>

        <Grid container spacing={4}>
          {/* KPIs Section */}
          <Grid item xs={12} md={3}>
            <Card>
              <CardContent>
                <Typography variant="h6">Total Maintenance Tasks</Typography>
                <Typography variant="h4" color="green" sx={{ fontWeight: 'bold' }}>
                  {totalMaintenance}
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={3}>
            <Card>
              <CardContent>
                <Typography variant="h6">Total Maintenance Cost</Typography>
                <Typography variant="h4" color="blue" sx={{ fontWeight: 'bold' }}>
                  ${totalCost.toFixed(2)}
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={3}>
            <Card>
              <CardContent>
                <Typography variant="h6">Pending Maintenance</Typography>
                <Typography variant="h4" color="orange" sx={{ fontWeight: 'bold' }}>
                  {pendingMaintenance}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Grid container spacing={4} sx={{ marginTop: 4 }}>
          {/* Maintenance Type Distribution Chart */}
          <Grid item xs={12} md={6}>
            <HighchartsReact highcharts={Highcharts} options={maintenanceTypeChartOptions} />
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
