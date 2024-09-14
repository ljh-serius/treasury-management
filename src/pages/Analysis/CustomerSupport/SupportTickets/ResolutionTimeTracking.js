import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { Box, Typography, Grid, Card, CardContent, Container, CircularProgress, Backdrop } from '@mui/material';

export default function ResolutionTimeTrackingAnalytics({ fetchItems }) {
  const [ticketData, setTicketData] = useState([]);
  const [totalTickets, setTotalTickets] = useState(0);
  const [averageResolutionTime, setAverageResolutionTime] = useState(0);
  const [issueTypeDistribution, setIssueTypeDistribution] = useState([]);
  const [priorityDistribution, setPriorityDistribution] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const data = await fetchItems();
      setTicketData(data);
      processTicketData(data);
      setLoading(false);
    };

    fetchData();
  }, [fetchItems]);

  const processTicketData = (data) => {
    // Total Tickets
    setTotalTickets(data.length);

    // Average Resolution Time
    const avgResolutionTime = data.reduce((acc, ticket) => acc + Number(ticket.resolutionTime), 0) / data.length;
    setAverageResolutionTime(avgResolutionTime.toFixed(2));

    // Issue Type Distribution for Pie Chart
    const issueTypeCounts = data.reduce((acc, ticket) => {
      acc[ticket.issueType] = (acc[ticket.issueType] || 0) + 1;
      return acc;
    }, {});
    setIssueTypeDistribution(Object.keys(issueTypeCounts).map(key => ({
      name: key,
      y: issueTypeCounts[key],
    })));

    // Priority Distribution for Pie Chart
    const priorityCounts = data.reduce((acc, ticket) => {
      acc[ticket.priority] = (acc[ticket.priority] || 0) + 1;
      return acc;
    }, {});
    setPriorityDistribution(Object.keys(priorityCounts).map(key => ({
      name: key.charAt(0).toUpperCase() + key.slice(1),
      y: priorityCounts[key],
    })));
  };

  // Highcharts options for Issue Type Distribution
  const issueTypeChartOptions = {
    chart: { type: 'pie' },
    title: { text: 'Issue Type Distribution' },
    series: [{
      name: 'Issue Types',
      colorByPoint: true,
      data: issueTypeDistribution,
    }],
  };

  // Highcharts options for Priority Distribution
  const priorityChartOptions = {
    chart: { type: 'pie' },
    title: { text: 'Priority Distribution' },
    series: [{
      name: 'Priorities',
      colorByPoint: true,
      data: priorityDistribution,
    }],
  };

  return (
    <Container maxWidth="xl" sx={{ paddingTop: 3, paddingBottom: 7 }}>
      <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <Box sx={{ padding: 4 }}>
        <Typography variant="h4" gutterBottom>
          Resolution Time Tracking Analytics
        </Typography>

        <Grid container spacing={4}>
          {/* KPIs Section */}
          <Grid item xs={12} md={3}>
            <Card>
              <CardContent>
                <Typography variant="h6">Total Tickets</Typography>
                <Typography variant="h4" color="green" sx={{ fontWeight: 'bold' }}>
                  {totalTickets}
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={3}>
            <Card>
              <CardContent>
                <Typography variant="h6">Average Resolution Time (hours)</Typography>
                <Typography variant="h4" color="blue" sx={{ fontWeight: 'bold' }}>
                  {averageResolutionTime}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Grid container spacing={4} sx={{ marginTop: 4 }}>
          {/* Issue Type Distribution Chart */}
          <Grid item xs={12} md={6}>
            <HighchartsReact highcharts={Highcharts} options={issueTypeChartOptions} />
          </Grid>

          {/* Priority Distribution Chart */}
          <Grid item xs={12} md={6}>
            <HighchartsReact highcharts={Highcharts} options={priorityChartOptions} />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
