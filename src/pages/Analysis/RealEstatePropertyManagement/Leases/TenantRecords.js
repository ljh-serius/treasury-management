import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { Box, Typography, Grid, Card, CardContent, Container, CircularProgress, Backdrop } from '@mui/material';

export default function TenantRecordsAnalytics({ fetchItems }) {
  const [tenantData, setTenantData] = useState([]);
  const [totalTenants, setTotalTenants] = useState(0);
  const [expiringLeases, setExpiringLeases] = useState(0);
  const [totalRent, setTotalRent] = useState(0);
  const [tagDistribution, setTagDistribution] = useState([]);
  const [rentTrends, setRentTrends] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const data = await fetchItems();
      setTenantData(data);
      processTenantData(data);
      setLoading(false);
    };

    fetchData();
  }, [fetchItems]);

  const processTenantData = (data) => {
    // Total Tenants
    setTotalTenants(data.length);

    // Count Expiring Leases
    const expiring = data.filter(tenant => new Date(tenant.leaseEndDate) < new Date(new Date().setMonth(new Date().getMonth() + 3))).length;
    setExpiringLeases(expiring);

    // Total Rent Income
    const totalRentIncome = data.reduce((acc, tenant) => acc + Number(tenant.monthlyRent), 0);
    setTotalRent(totalRentIncome);

    // Rent Trends for Line Chart
    const trends = data.map(tenant => ({
      date: new Date(tenant.leaseStartDate).getTime(),
      rent: Number(tenant.monthlyRent),
    }));
    setRentTrends(trends);

    // Tag Distribution for Pie Chart
    const tagCounts = data.reduce((acc, tenant) => {
      if (Array.isArray(tenant.tags)) {
        tenant.tags.forEach(tag => {
          acc[tag] = (acc[tag] || 0) + 1;
        });
      }
      return acc;
    }, {});
    setTagDistribution(Object.keys(tagCounts).map(key => ({
      name: key.charAt(0).toUpperCase() + key.slice(1),
      y: tagCounts[key],
    })));
  };

  // Highcharts options for Rent Trends
  const rentTrendChartOptions = {
    chart: { type: 'line' },
    title: { text: 'Monthly Rent Trends' },
    xAxis: { type: 'datetime', title: { text: 'Lease Start Date' } },
    yAxis: { title: { text: 'Monthly Rent' } },
    series: [{
      name: 'Monthly Rent',
      data: rentTrends.map(item => [item.date, item.rent]),
    }],
  };

  // Highcharts options for Tag Distribution
  const tagChartOptions = {
    chart: { type: 'pie' },
    title: { text: 'Tenant Tags Distribution' },
    series: [{
      name: 'Tags',
      colorByPoint: true,
      data: tagDistribution,
    }],
  };

  return (
    <Container maxWidth="xl" sx={{ paddingTop: 3, paddingBottom: 7 }}>
      <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <Box sx={{ padding: 4 }}>
        <Typography variant="h4" gutterBottom>
          Tenant Records Analytics
        </Typography>

        <Grid container spacing={4}>
          {/* KPIs Section */}
          <Grid item xs={12} md={3}>
            <Card>
              <CardContent>
                <Typography variant="h6">Total Tenants</Typography>
                <Typography variant="h4" color="green" sx={{ fontWeight: 'bold' }}>
                  {totalTenants}
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={3}>
            <Card>
              <CardContent>
                <Typography variant="h6">Expiring Leases (Next 3 Months)</Typography>
                <Typography variant="h4" color="red" sx={{ fontWeight: 'bold' }}>
                  {expiringLeases}
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={3}>
            <Card>
              <CardContent>
                <Typography variant="h6">Total Rent Income</Typography>
                <Typography variant="h4" color="purple" sx={{ fontWeight: 'bold' }}>
                  ${totalRent.toFixed(2)}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Grid container spacing={4} sx={{ marginTop: 4 }}>
          {/* Rent Trends Chart */}
          <Grid item xs={12} md={6}>
            <HighchartsReact highcharts={Highcharts} options={rentTrendChartOptions} />
          </Grid>

          {/* Tag Distribution Chart */}
          <Grid item xs={12} md={6}>
            <HighchartsReact highcharts={Highcharts} options={tagChartOptions} />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
