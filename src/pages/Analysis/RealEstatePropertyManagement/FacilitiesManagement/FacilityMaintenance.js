import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { Box, Typography, Grid, Card, CardContent, Container, CircularProgress, Backdrop } from '@mui/material';

export default function FacilityMaintenanceDashboard({ fetchData }) {
  const [maintenanceData, setMaintenanceData] = useState([]);
  const [totalMaintenanceCost, setTotalMaintenanceCost] = useState(0);
  const [upcomingMaintenance, setUpcomingMaintenance] = useState(0);
  const [maintenanceTypeDistribution, setMaintenanceTypeDistribution] = useState([]);
  const [completionTimeline, setCompletionTimeline] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDataAsync = async () => {
      setLoading(true);
      const data = await fetchData();
      setMaintenanceData(data);
      processMaintenanceData(data);
      setLoading(false);
    };

    fetchDataAsync();
  }, [fetchData]);

  const processMaintenanceData = (data) => {
    // Total Maintenance Cost
    const totalCost = data.reduce((acc, maintenance) => acc + Number(maintenance.cost), 0);
    setTotalMaintenanceCost(totalCost);

    // Count Upcoming Maintenance
    const upcoming = data.filter(maintenance => new Date(maintenance.scheduledDate) > new Date()).length;
    setUpcomingMaintenance(upcoming);

    // Maintenance Type Distribution for Pie Chart
    const typeCounts = data.reduce((acc, maintenance) => {
      acc[maintenance.maintenanceType] = (acc[maintenance.maintenanceType] || 0) + 1;
      return acc;
    }, {});
    setMaintenanceTypeDistribution(Object.keys(typeCounts).map(key => ({
      name: key.charAt(0).toUpperCase() + key.slice(1),
      y: typeCounts[key],
    })));

    // Completion Timeline for Line Chart
    const timeline = data.map(maintenance => ({
      scheduled: new Date(maintenance.scheduledDate).getTime(),
      completed: new Date(maintenance.completionDate).getTime(),
      name: maintenance.maintenanceType,
    })).sort((a, b) => a.scheduled - b.scheduled);
    setCompletionTimeline(timeline);
  };

  // Highcharts options for Maintenance Type Distribution
  const maintenanceTypeChartOptions = {
    chart: { type: 'pie' },
    title: { text: 'Maintenance Type Distribution' },
    series: [{
      name: 'Type',
      colorByPoint: true,
      data: maintenanceTypeDistribution,
    }],
  };

  // Highcharts options for Completion Timeline
  const completionTimelineChartOptions = {
    chart: { type: 'line' },
    title: { text: 'Maintenance Completion Timeline' },
    xAxis: { type: 'datetime', title: { text: 'Scheduled Date' } },
    yAxis: { title: { text: 'Completion Date' } },
    series: [{
      name: 'Maintenance Timeline',
      data: completionTimeline.map(item => [item.scheduled, item.completed]),
    }],
  };

  return (
    <Container maxWidth="xl" sx={{ paddingTop: 3, paddingBottom: 7 }}>
      <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <Box sx={{ padding: 4 }}>
        <Typography variant="h4" gutterBottom>
          Facility Maintenance Dashboard
        </Typography>

        <Grid container spacing={4}>
          {/* KPIs Section */}
          <Grid item xs={12} md={3}>
            <Card>
              <CardContent>
                <Typography variant="h6">Total Maintenance Cost</Typography>
                <Typography variant="h4" color="blue" sx={{ fontWeight: 'bold' }}>
                  ${totalMaintenanceCost.toFixed(2)}
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={3}>
            <Card>
              <CardContent>
                <Typography variant="h6">Upcoming Maintenance</Typography>
                <Typography variant="h4" color="green" sx={{ fontWeight: 'bold' }}>
                  {upcomingMaintenance}
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

          {/* Completion Timeline Chart */}
          <Grid item xs={12} md={6}>
            <HighchartsReact highcharts={Highcharts} options={completionTimelineChartOptions} />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
