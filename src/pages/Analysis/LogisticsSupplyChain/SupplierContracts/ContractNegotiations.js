import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { Box, Typography, Grid, Card, CardContent, Container, CircularProgress, Backdrop } from '@mui/material';

export default function NegotiationDashboard({ fetchItems }) {
  const [negotiationData, setNegotiationData] = useState([]);
  const [totalNegotiations, setTotalNegotiations] = useState(0);
  const [statusDistribution, setStatusDistribution] = useState([]);
  const [timelineData, setTimelineData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const data = await fetchItems();
      setNegotiationData(data);
      processNegotiationData(data);
      setLoading(false);
    };

    fetchData();
  }, [fetchItems]);

  const processNegotiationData = (data) => {
    // Total Negotiations
    setTotalNegotiations(data.length);

    // Negotiation Status Distribution for Pie Chart
    const statusCounts = data.reduce((acc, negotiation) => {
      acc[negotiation.status] = (acc[negotiation.status] || 0) + 1;
      return acc;
    }, {});
    setStatusDistribution(Object.keys(statusCounts).map(key => ({
      name: key.charAt(0).toUpperCase() + key.slice(1),
      y: statusCounts[key],
    })));

    // Negotiation Timelines for Line Chart
    const timelines = data.map(negotiation => ({
      start: new Date(negotiation.startDate).getTime(),
      end: new Date(negotiation.endDate).getTime(),
    })).sort((a, b) => a.start - b.start);
    setTimelineData(timelines);
  };

  // Highcharts options for Negotiation Status Distribution
  const statusChartOptions = {
    chart: { type: 'pie' },
    title: { text: 'Negotiation Status Distribution' },
    series: [{
      name: 'Status',
      colorByPoint: true,
      data: statusDistribution,
    }],
  };

  // Highcharts options for Negotiation Timelines
  const timelineChartOptions = {
    chart: { type: 'line' },
    title: { text: 'Negotiation Timelines' },
    xAxis: { type: 'datetime', title: { text: 'Time' } },
    yAxis: { title: { text: 'Negotiations' } },
    series: [{
      name: 'Negotiation Periods',
      data: timelineData.map(item => [item.start, item.end]),
    }],
  };

  return (
    <Container maxWidth="xl" sx={{ paddingTop: 3, paddingBottom: 7 }}>
      <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <Box sx={{ padding: 4 }}>
        <Typography variant="h4" gutterBottom>
          Contract Negotiations Dashboard
        </Typography>

        <Grid container spacing={4}>
          {/* KPIs Section */}
          <Grid item xs={12} md={3}>
            <Card>
              <CardContent>
                <Typography variant="h6">Total Negotiations</Typography>
                <Typography variant="h4" color="green" sx={{ fontWeight: 'bold' }}>
                  {totalNegotiations}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Grid container spacing={4} sx={{ marginTop: 4 }}>
          {/* Negotiation Status Distribution Chart */}
          <Grid item xs={12} md={6}>
            <HighchartsReact highcharts={Highcharts} options={statusChartOptions} />
          </Grid>

          {/* Negotiation Timelines Chart */}
          <Grid item xs={12} md={6}>
            <HighchartsReact highcharts={Highcharts} options={timelineChartOptions} />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
