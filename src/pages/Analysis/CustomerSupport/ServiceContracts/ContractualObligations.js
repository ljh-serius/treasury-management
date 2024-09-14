import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { Box, Typography, Grid, Card, CardContent, Container, CircularProgress, Backdrop } from '@mui/material';

export default function ContractualObligationsDashboard({ fetchItems }) {
  const [obligationData, setObligationData] = useState([]);
  const [totalObligations, setTotalObligations] = useState(0);
  const [statusDistribution, setStatusDistribution] = useState([]);
  const [dueDates, setDueDates] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const data = await fetchItems();
      setObligationData(data);
      processObligationData(data);
      setLoading(false);
    };

    fetchData();
  }, [fetchItems]);

  const processObligationData = (data) => {
    // Total Obligations
    setTotalObligations(data.length);

    // Status Distribution for Pie Chart
    const statusCounts = data.reduce((acc, obligation) => {
      acc[obligation.status] = (acc[obligation.status] || 0) + 1;
      return acc;
    }, {});
    setStatusDistribution(Object.keys(statusCounts).map(key => ({
      name: key.charAt(0).toUpperCase() + key.slice(1),
      y: statusCounts[key],
    })));

    // Due Date Distribution for Line Chart
    const dueDateData = data.map(obligation => ({
      date: new Date(obligation.dueDate).getTime(),
      label: `Obligation ${obligation.obligationId.slice(-4)}`,
    })).sort((a, b) => a.date - b.date);
    setDueDates(dueDateData);
  };

  // Highcharts options for Status Distribution
  const statusChartOptions = {
    chart: { type: 'pie' },
    title: { text: 'Status Distribution' },
    series: [{
      name: 'Status',
      colorByPoint: true,
      data: statusDistribution,
    }],
  };

  // Highcharts options for Due Date Timeline
  const dueDateChartOptions = {
    chart: { type: 'line' },
    title: { text: 'Obligations Due Over Time' },
    xAxis: { type: 'datetime', title: { text: 'Due Date' } },
    yAxis: { title: { text: 'Obligations' } },
    series: [{
      name: 'Obligations Due',
      data: dueDates.map(item => [item.date, 1]), // Y-axis is constant (1) since we're counting the occurrences
    }],
  };

  return (
    <Container maxWidth="xl" sx={{ paddingTop: 3, paddingBottom: 7 }}>
      <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <Box sx={{ padding: 4 }}>
        <Typography variant="h4" gutterBottom>
          Contractual Obligations Dashboard
        </Typography>

        <Grid container spacing={4}>
          {/* KPIs Section */}
          <Grid item xs={12} md={3}>
            <Card>
              <CardContent>
                <Typography variant="h6">Total Obligations</Typography>
                <Typography variant="h4" color="green" sx={{ fontWeight: 'bold' }}>
                  {totalObligations}
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

          {/* Due Date Timeline Chart */}
          <Grid item xs={12} md={6}>
            <HighchartsReact highcharts={Highcharts} options={dueDateChartOptions} />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
