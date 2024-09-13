import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { Box, Typography, Grid, Card, CardContent, Container, CircularProgress, Backdrop } from '@mui/material';

export default function SoftwareLicensesDashboard({ fetchItems }) {
  const [licenseData, setLicenseData] = useState([]);
  const [totalLicenses, setTotalLicenses] = useState(0);
  const [statusDistribution, setStatusDistribution] = useState([]);
  const [assignedDistribution, setAssignedDistribution] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const data = await fetchItems();
      setLicenseData(data);
      processLicenseData(data);
      setLoading(false);
    };

    fetchData();
  }, [fetchItems]);

  const processLicenseData = (data) => {
    // Total Licenses
    setTotalLicenses(data.length);

    // Status Distribution
    const statusCounts = data.reduce((acc, license) => {
      acc[license.status] = (acc[license.status] || 0) + 1;
      return acc;
    }, {});
    setStatusDistribution(Object.keys(statusCounts).map(key => ({
      name: key.charAt(0).toUpperCase() + key.slice(1),
      y: statusCounts[key],
    })));

    // Assigned Distribution
    const assignedCounts = data.reduce((acc, license) => {
      acc[license.assignedTo] = (acc[license.assignedTo] || 0) + 1;
      return acc;
    }, {});
    setAssignedDistribution(Object.keys(assignedCounts).map(key => ({
      name: key,
      y: assignedCounts[key],
    })));
  };

  // Highcharts options for Status Distribution
  const statusChartOptions = {
    chart: { type: 'pie' },
    title: { text: 'License Status Distribution' },
    series: [{
      name: 'Licenses',
      colorByPoint: true,
      data: statusDistribution,
    }],
  };

  // Highcharts options for Assigned Distribution
  const assignedChartOptions = {
    chart: { type: 'column' },
    title: { text: 'Assigned Licenses Distribution' },
    xAxis: { type: 'category', title: { text: 'Assigned To' } },
    yAxis: { title: { text: 'Number of Licenses' } },
    series: [{
      name: 'Assigned Licenses',
      data: assignedDistribution,
    }],
  };

  return (
    <Container maxWidth="xl" sx={{ paddingTop: 3, paddingBottom: 7 }}>
      <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <Box sx={{ padding: 4 }}>
        <Typography variant="h4" gutterBottom>
          Software Licenses Dashboard
        </Typography>

        <Grid container spacing={4}>
          {/* KPIs Section */}
          <Grid item xs={12} md={3}>
            <Card>
              <CardContent>
                <Typography variant="h6">Total Licenses</Typography>
                <Typography variant="h4" color="green" sx={{ fontWeight: 'bold' }}>
                  {totalLicenses}
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

          {/* Assigned Distribution Chart */}
          <Grid item xs={12} md={6}>
            <HighchartsReact highcharts={Highcharts} options={assignedChartOptions} />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
