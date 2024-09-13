import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { Box, Typography, Grid, Card, CardContent, Container, CircularProgress, Backdrop } from '@mui/material';

export default function CustomerHistoryDashboard({ fetchData }) {
  const [historyData, setHistoryData] = useState([]);
  const [interactionTypeDistribution, setInteractionTypeDistribution] = useState([]);
  const [statusDistribution, setStatusDistribution] = useState([]);
  const [totalInteractions, setTotalInteractions] = useState(0);
  const [pendingFollowUps, setPendingFollowUps] = useState(0);
  const [resolvedCases, setResolvedCases] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDataAsync = async () => {
      setLoading(true);
      const data = await fetchData();
      setHistoryData(data);
      processHistoryData(data);
      setLoading(false);
    };

    fetchDataAsync();
  }, [fetchData]);

  const processHistoryData = (data) => {
    // Total Interactions
    setTotalInteractions(data.length);

    // Count Pending Follow-Ups
    const followUps = data.filter(history => history.tags.includes('follow-up') && !history.tags.includes('resolved'));
    setPendingFollowUps(followUps.length);

    // Count Resolved Cases
    const resolved = data.filter(history => history.tags.includes('resolved'));
    setResolvedCases(resolved.length);

    // Interaction Type Distribution
    const interactionTypeCounts = data.reduce((acc, history) => {
      acc[history.interactionType] = (acc[history.interactionType] || 0) + 1;
      return acc;
    }, {});

    setInteractionTypeDistribution(Object.keys(interactionTypeCounts).map(key => ({
      name: key,
      y: interactionTypeCounts[key],
    })));

    // Status Distribution (resolved, pending, etc.)
    const statusCounts = {
      resolved: resolved.length,
      pending: followUps.length,
      others: data.length - resolved.length - followUps.length,
    };

    setStatusDistribution(Object.keys(statusCounts).map(key => ({
      name: key.charAt(0).toUpperCase() + key.slice(1),
      y: statusCounts[key],
    })));
  };

  // Highcharts Options
  const interactionTypeChartOptions = {
    chart: { type: 'pie' },
    title: { text: 'Interaction Type Distribution' },
    series: [{
      name: 'Interaction Types',
      colorByPoint: true,
      data: interactionTypeDistribution,
    }],
  };

  const statusChartOptions = {
    chart: { type: 'pie' },
    title: { text: 'Status Distribution' },
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
          Customer History Dashboard
        </Typography>

        <Grid container spacing={4}>
          {/* KPIs Section */}
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6">Total Interactions</Typography>
                <Typography variant="h4" color="green" sx={{ fontWeight: 'bold' }}>
                  {totalInteractions}
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6">Pending Follow-Ups</Typography>
                <Typography variant="h4" color="orange" sx={{ fontWeight: 'bold' }}>
                  {pendingFollowUps}
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6">Resolved Cases</Typography>
                <Typography variant="h4" color="blue" sx={{ fontWeight: 'bold' }}>
                  {resolvedCases}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Grid container spacing={4} sx={{ marginTop: 4 }}>
          {/* Interaction Type Chart */}
          <Grid item xs={12} md={6}>
            <HighchartsReact highcharts={Highcharts} options={interactionTypeChartOptions} />
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
