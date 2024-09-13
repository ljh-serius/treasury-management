import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { Box, Typography, Grid, Card, CardContent, Container, CircularProgress, Backdrop } from '@mui/material';

export default function CostAnalysisDashboard({ fetchItems }) {
  const [costData, setCostData] = useState([]);
  const [totalCost, setTotalCost] = useState(0);
  const [costBreakdown, setCostBreakdown] = useState('');
  const [costTrends, setCostTrends] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const data = await fetchItems();
      setCostData(data);
      processCostData(data);
      setLoading(false);
    };

    fetchData();
  }, [fetchItems]);

  const processCostData = (data) => {
    // Total Cost
    const total = data.reduce((acc, item) => acc + Number(item.totalCost), 0);
    setTotalCost(total);

    // Cost Breakdown (latest analysis)
    if (data.length > 0) {
      setCostBreakdown(data[data.length - 1].costBreakdown);
    }

    // Cost Trends for Line Chart
    const trendsData = data.map(item => ({
      date: new Date(item.analysisDate).getTime(),
      cost: item.totalCost,
    })).sort((a, b) => a.date - b.date);
    setCostTrends(trendsData);
  };

  // Highcharts options for Cost Trends
  const costChartOptions = {
    chart: { type: 'line' },
    title: { text: 'Cost Trends Over Time' },
    xAxis: { type: 'datetime', title: { text: 'Analysis Date' } },
    yAxis: { title: { text: 'Total Cost' } },
    series: [{
      name: 'Total Cost',
      data: costTrends.map(item => [item.date, item.cost]),
    }],
  };

  return (
    <Container maxWidth="xl" sx={{ paddingTop: 3, paddingBottom: 7 }}>
      <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <Box sx={{ padding: 4 }}>
        <Typography variant="h4" gutterBottom>
          Cost Analysis Dashboard
        </Typography>

        <Grid container spacing={4}>
          {/* KPIs Section */}
          <Grid item xs={12} md={3}>
            <Card>
              <CardContent>
                <Typography variant="h6">Total Cost</Typography>
                <Typography variant="h4" color="green" sx={{ fontWeight: 'bold' }}>
                  ${totalCost.toFixed(2)}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Grid container spacing={4} sx={{ marginTop: 4 }}>
          {/* Cost Breakdown */}
          <Grid item xs={12} md={12}>
            <Card>
              <CardContent>
                <Typography variant="h6">Cost Breakdown (Latest)</Typography>
                <Typography variant="body1">{costBreakdown}</Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Cost Trends Chart */}
          <Grid item xs={12} md={12} sx={{ marginTop: 4 }}>
            <HighchartsReact highcharts={Highcharts} options={costChartOptions} />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
