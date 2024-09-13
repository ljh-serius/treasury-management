import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { Box, Typography, Grid, Card, CardContent, Container, CircularProgress, Backdrop } from '@mui/material';

export default function SynergyTrackingDashboard({ fetchItems }) {
  const [synergyData, setSynergyData] = useState([]);
  const [totalSynergies, setTotalSynergies] = useState(0);
  const [statusDistribution, setStatusDistribution] = useState([]);
  const [synergyValueTrends, setSynergyValueTrends] = useState([]);
  const [achievedSynergiesTrends, setAchievedSynergiesTrends] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const data = await fetchItems();
      setSynergyData(data);
      processSynergyData(data);
      setLoading(false);
    };

    fetchData();
  }, [fetchItems]);

  const processSynergyData = (data) => {
    // Total Synergies
    setTotalSynergies(data.length);

    // Status Distribution for Pie Chart
    const statusCounts = data.reduce((acc, synergy) => {
      acc[synergy.status] = (acc[synergy.status] || 0) + 1;
      return acc;
    }, {});
    setStatusDistribution(Object.keys(statusCounts).map(key => ({
      name: key.charAt(0).toUpperCase() + key.slice(1),
      y: statusCounts[key],
    })));

    // Synergy Value Trends for Line Chart
    const valueData = data.map(synergy => ({
      date: new Date(synergy.trackingDate).getTime(),
      value: synergy.synergyValue,
    })).sort((a, b) => a.date - b.date);
    setSynergyValueTrends(valueData);

    // Achieved Synergies Trends for Line Chart
    const achievedData = data.map(synergy => ({
      date: new Date(synergy.trackingDate).getTime(),
      achieved: synergy.achievedSynergies.length,
    })).sort((a, b) => a.date - b.date);
    setAchievedSynergiesTrends(achievedData);
  };

  // Highcharts options for Status Distribution
  const statusChartOptions = {
    chart: { type: 'pie' },
    title: { text: 'Synergy Status Distribution' },
    series: [{
      name: 'Status',
      colorByPoint: true,
      data: statusDistribution,
    }],
  };

  // Highcharts options for Synergy Value Trends
  const synergyValueChartOptions = {
    chart: { type: 'line' },
    title: { text: 'Synergy Value Trends Over Time' },
    xAxis: { type: 'datetime', title: { text: 'Tracking Date' } },
    yAxis: { title: { text: 'Synergy Value' } },
    series: [{
      name: 'Synergy Value',
      data: synergyValueTrends.map(item => [item.date, item.value]),
    }],
  };

  // Highcharts options for Achieved Synergies Trends
  const achievedSynergiesChartOptions = {
    chart: { type: 'line' },
    title: { text: 'Achieved Synergies Trends Over Time' },
    xAxis: { type: 'datetime', title: { text: 'Tracking Date' } },
    yAxis: { title: { text: 'Achieved Synergies' } },
    series: [{
      name: 'Achieved Synergies',
      data: achievedSynergiesTrends.map(item => [item.date, item.achieved]),
    }],
  };

  return (
    <Container maxWidth="xl" sx={{ paddingTop: 3, paddingBottom: 7 }}>
      <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <Box sx={{ padding: 4 }}>
        <Typography variant="h4" gutterBottom>
          Synergy Tracking Dashboard
        </Typography>

        <Grid container spacing={4}>
          {/* KPIs Section */}
          <Grid item xs={12} md={3}>
            <Card>
              <CardContent>
                <Typography variant="h6">Total Synergies</Typography>
                <Typography variant="h4" color="green" sx={{ fontWeight: 'bold' }}>
                  {totalSynergies}
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

          {/* Synergy Value Trends Chart */}
          <Grid item xs={12} md={6}>
            <HighchartsReact highcharts={Highcharts} options={synergyValueChartOptions} />
          </Grid>

          {/* Achieved Synergies Trends Chart */}
          <Grid item xs={12} md={6} sx={{ marginTop: 4 }}>
            <HighchartsReact highcharts={Highcharts} options={achievedSynergiesChartOptions} />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
