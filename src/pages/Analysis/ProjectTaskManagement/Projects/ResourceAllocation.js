import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { Box, Typography, Grid, Card, CardContent, Container, CircularProgress, Backdrop } from '@mui/material';

export default function ResourceAllocationsDashboard({ fetchItems }) {
  const [allocationData, setAllocationData] = useState([]);
  const [totalAllocations, setTotalAllocations] = useState(0);
  const [urgentAllocations, setUrgentAllocations] = useState(0);
  const [roleDistribution, setRoleDistribution] = useState([]);
  const [allocationTrends, setAllocationTrends] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDataAsync = async () => {
      setLoading(true);
      const data = await fetchItems();
      setAllocationData(data);
      processAllocationData(data);
      setLoading(false);
    };

    fetchDataAsync();
  }, [fetchItems]);

  const processAllocationData = (data) => {
    // Total Allocations
    setTotalAllocations(data.length);

    // Urgent Allocations
    const urgent = data.filter(allocation => allocation.tags.includes('urgent')).length;
    setUrgentAllocations(urgent);

    // Role Distribution for Pie Chart
    const roleCounts = data.reduce((acc, allocation) => {
      acc[allocation.role] = (acc[allocation.role] || 0) + 1;
      return acc;
    }, {});
    setRoleDistribution(Object.keys(roleCounts).map(key => ({
      name: key.charAt(0).toUpperCase() + key.slice(1),
      y: roleCounts[key],
    })));

    // Allocation Trends for Line Chart
    const trendData = data.map(allocation => ({
      start: new Date(allocation.startDate).getTime(),
      end: new Date(allocation.endDate).getTime(),
      name: allocation.role,
    })).sort((a, b) => a.start - b.start);
    setAllocationTrends(trendData);
  };

  // Highcharts options for Role Distribution
  const roleChartOptions = {
    chart: { type: 'pie' },
    title: { text: 'Role Distribution in Resource Allocations' },
    series: [{
      name: 'Roles',
      colorByPoint: true,
      data: roleDistribution,
    }],
  };

  // Highcharts options for Allocation Trends
  const allocationTrendChartOptions = {
    chart: { type: 'line' },
    title: { text: 'Resource Allocation Trends' },
    xAxis: { type: 'datetime', title: { text: 'Start Date' } },
    yAxis: { title: { text: 'End Date' } },
    series: [{
      name: 'Allocation Duration',
      data: allocationTrends.map(item => [item.start, item.end]),
    }],
  };

  return (
    <Container maxWidth="xl" sx={{ paddingTop: 3, paddingBottom: 7 }}>
      <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <Box sx={{ padding: 4 }}>
        <Typography variant="h4" gutterBottom>
          Resource Allocations Dashboard
        </Typography>

        <Grid container spacing={4}>
          {/* KPIs Section */}
          <Grid item xs={12} md={3}>
            <Card>
              <CardContent>
                <Typography variant="h6">Total Allocations</Typography>
                <Typography variant="h4" color="green" sx={{ fontWeight: 'bold' }}>
                  {totalAllocations}
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={3}>
            <Card>
              <CardContent>
                <Typography variant="h6">Urgent Allocations</Typography>
                <Typography variant="h4" color="red" sx={{ fontWeight: 'bold' }}>
                  {urgentAllocations}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Grid container spacing={4} sx={{ marginTop: 4 }}>
          {/* Role Distribution Chart */}
          <Grid item xs={12} md={6}>
            <HighchartsReact highcharts={Highcharts} options={roleChartOptions} />
          </Grid>

          {/* Allocation Trends Chart */}
          <Grid item xs={12} md={6}>
            <HighchartsReact highcharts={Highcharts} options={allocationTrendChartOptions} />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
