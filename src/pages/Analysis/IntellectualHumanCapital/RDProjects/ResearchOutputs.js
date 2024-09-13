import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { Box, Typography, Grid, Card, CardContent, Container, CircularProgress, Backdrop } from '@mui/material';

export default function ResearchOutputsDashboard({ fetchItems }) {
  const [outputData, setOutputData] = useState([]);
  const [totalOutputs, setTotalOutputs] = useState(0);
  const [outputTypeDistribution, setOutputTypeDistribution] = useState([]);
  const [completionTrends, setCompletionTrends] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const data = await fetchItems();
      setOutputData(data);
      processOutputData(data);
      setLoading(false);
    };

    fetchData();
  }, [fetchItems]);

  const processOutputData = (data) => {
    // Total Outputs
    setTotalOutputs(data.length);

    // Output Type Distribution for Pie Chart
    const typeCounts = data.reduce((acc, output) => {
      acc[output.outputType] = (acc[output.outputType] || 0) + 1;
      return acc;
    }, {});
    setOutputTypeDistribution(Object.keys(typeCounts).map(key => ({
      name: key.charAt(0).toUpperCase() + key.slice(1),
      y: typeCounts[key],
    })));

    // Completion Trends for Line Chart
    const trendsData = data.map(output => ({
      date: new Date(output.completionDate).getTime(),
      count: 1,
    })).sort((a, b) => a.date - b.date);
    setCompletionTrends(trendsData);
  };

  // Highcharts options for Output Type Distribution
  const typeChartOptions = {
    chart: { type: 'pie' },
    title: { text: 'Output Type Distribution' },
    series: [{
      name: 'Output Type',
      colorByPoint: true,
      data: outputTypeDistribution,
    }],
  };

  // Highcharts options for Completion Trends
  const completionTrendsChartOptions = {
    chart: { type: 'line' },
    title: { text: 'Completion Trends' },
    xAxis: { type: 'datetime', title: { text: 'Completion Date' } },
    yAxis: { title: { text: 'Number of Outputs Completed' } },
    series: [{
      name: 'Outputs Completed',
      data: completionTrends.map(item => [item.date, item.count]),
    }],
  };

  return (
    <Container maxWidth="xl" sx={{ paddingTop: 3, paddingBottom: 7 }}>
      <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <Box sx={{ padding: 4 }}>
        <Typography variant="h4" gutterBottom>
          Research Outputs Dashboard
        </Typography>

        <Grid container spacing={4}>
          {/* KPIs Section */}
          <Grid item xs={12} md={3}>
            <Card>
              <CardContent>
                <Typography variant="h6">Total Outputs</Typography>
                <Typography variant="h4" color="green" sx={{ fontWeight: 'bold' }}>
                  {totalOutputs}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Grid container spacing={4} sx={{ marginTop: 4 }}>
          {/* Output Type Distribution Chart */}
          <Grid item xs={12} md={6}>
            <HighchartsReact highcharts={Highcharts} options={typeChartOptions} />
          </Grid>

          {/* Completion Trends Chart */}
          <Grid item xs={12} md={6}>
            <HighchartsReact highcharts={Highcharts} options={completionTrendsChartOptions} />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
