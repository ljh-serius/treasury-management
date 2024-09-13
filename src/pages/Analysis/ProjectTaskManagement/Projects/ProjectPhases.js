import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { Box, Typography, Grid, Card, CardContent, Container, CircularProgress, Backdrop } from '@mui/material';

export default function ProjectPhasesDashboard({ fetchItems }) {
  const [phaseData, setPhaseData] = useState([]);
  const [totalPhases, setTotalPhases] = useState(0);
  const [ongoingPhases, setOngoingPhases] = useState(0);
  const [phaseStatusDistribution, setPhaseStatusDistribution] = useState([]);
  const [phaseTimeline, setPhaseTimeline] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDataAsync = async () => {
      setLoading(true);
      const data = await fetchItems();
      setPhaseData(data);
      processPhaseData(data);
      setLoading(false);
    };

    fetchDataAsync();
  }, [fetchItems]);

  const processPhaseData = (data) => {
    // Total Phases
    setTotalPhases(data.length);

    // Ongoing Phases
    const ongoing = data.filter(phase => phase.phaseStatus === 'in-progress').length;
    setOngoingPhases(ongoing);

    // Phase Status Distribution for Pie Chart
    const statusCounts = data.reduce((acc, phase) => {
      acc[phase.phaseStatus] = (acc[phase.phaseStatus] || 0) + 1;
      return acc;
    }, {});
    setPhaseStatusDistribution(Object.keys(statusCounts).map(key => ({
      name: key.replace(/-/g, ' ').toUpperCase(),
      y: statusCounts[key],
    })));

    // Phase Timeline for Line Chart
    const timelineData = data.map(phase => ({
      start: new Date(phase.startDate).getTime(),
      end: new Date(phase.endDate).getTime(),
      name: phase.phaseName,
    })).sort((a, b) => a.start - b.start);
    setPhaseTimeline(timelineData);
  };

  // Highcharts options for Phase Status Distribution
  const phaseStatusChartOptions = {
    chart: { type: 'pie' },
    title: { text: 'Phase Status Distribution' },
    series: [{
      name: 'Status',
      colorByPoint: true,
      data: phaseStatusDistribution,
    }],
  };

  // Highcharts options for Phase Timeline
  const phaseTimelineChartOptions = {
    chart: { type: 'line' },
    title: { text: 'Phase Timeline' },
    xAxis: { type: 'datetime', title: { text: 'Start Date' } },
    yAxis: { title: { text: 'End Date' } },
    series: [{
      name: 'Phase Duration',
      data: phaseTimeline.map(item => [item.start, item.end]),
    }],
  };

  return (
    <Container maxWidth="xl" sx={{ paddingTop: 3, paddingBottom: 7 }}>
      <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <Box sx={{ padding: 4 }}>
        <Typography variant="h4" gutterBottom>
          Project Phases Dashboard
        </Typography>

        <Grid container spacing={4}>
          {/* KPIs Section */}
          <Grid item xs={12} md={3}>
            <Card>
              <CardContent>
                <Typography variant="h6">Total Phases</Typography>
                <Typography variant="h4" color="green" sx={{ fontWeight: 'bold' }}>
                  {totalPhases}
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={3}>
            <Card>
              <CardContent>
                <Typography variant="h6">Ongoing Phases</Typography>
                <Typography variant="h4" color="blue" sx={{ fontWeight: 'bold' }}>
                  {ongoingPhases}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Grid container spacing={4} sx={{ marginTop: 4 }}>
          {/* Phase Status Distribution Chart */}
          <Grid item xs={12} md={6}>
            <HighchartsReact highcharts={Highcharts} options={phaseStatusChartOptions} />
          </Grid>

          {/* Phase Timeline Chart */}
          <Grid item xs={12} md={6}>
            <HighchartsReact highcharts={Highcharts} options={phaseTimelineChartOptions} />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
