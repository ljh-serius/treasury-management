import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { Box, Typography, Grid, Card, CardContent, Container, CircularProgress, Backdrop } from '@mui/material';

export default function WinLossAnalysisDashboard({ fetchData }) {
  const [analysisData, setAnalysisData] = useState([]);
  const [totalAnalyses, setTotalAnalyses] = useState(0);
  const [totalWins, setTotalWins] = useState(0);
  const [totalLosses, setTotalLosses] = useState(0);
  const [reasonDistribution, setReasonDistribution] = useState([]);
  const [winLossTrends, setWinLossTrends] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDataAsync = async () => {
      setLoading(true);
      const data = await fetchData();
      setAnalysisData(data);
      processAnalysisData(data);
      setLoading(false);
    };

    fetchDataAsync();
  }, [fetchData]);

  const processAnalysisData = (data) => {
    // Total Analyses
    setTotalAnalyses(data.length);

    // Total Wins and Losses
    const wins = data.filter(analysis => analysis.result === 'won').length;
    const losses = data.filter(analysis => analysis.result === 'lost').length;
    setTotalWins(wins);
    setTotalLosses(losses);

    // Reason Distribution for Pie Chart
    const reasonCounts = data.reduce((acc, analysis) => {
      analysis.tags.forEach(tag => {
        acc[tag] = (acc[tag] || 0) + 1;
      });
      return acc;
    }, {});
    setReasonDistribution(Object.keys(reasonCounts).map(key => ({
      name: key.charAt(0).toUpperCase() + key.slice(1),
      y: reasonCounts[key],
    })));

    // Win/Loss Trends Over Time
    const trends = data.map(analysis => ({
      date: new Date(analysis.analysisDate).getTime(),
      result: analysis.result === 'won' ? 1 : 0,
    })).sort((a, b) => a.date - b.date);
    setWinLossTrends(trends);
  };

  // Highcharts options for Reason Distribution
  const reasonChartOptions = {
    chart: { type: 'pie' },
    title: { text: 'Reasons for Losses/Win' },
    series: [{
      name: 'Occurrences',
      colorByPoint: true,
      data: reasonDistribution,
    }],
  };

  // Highcharts options for Win/Loss Trends Over Time
  const winLossTrendsChartOptions = {
    chart: { type: 'line' },
    title: { text: 'Win/Loss Trends Over Time' },
    xAxis: { type: 'datetime', title: { text: 'Date' } },
    yAxis: { title: { text: 'Wins/Losses' } },
    series: [{
      name: 'Win/Loss',
      data: winLossTrends.map(item => [item.date, item.result]),
    }],
  };

  return (
    <Container maxWidth="xl" sx={{ paddingTop: 3, paddingBottom: 7 }}>
      <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <Box sx={{ padding: 4 }}>
        <Typography variant="h4" gutterBottom>
          Win/Loss Analysis Dashboard
        </Typography>

        <Grid container spacing={4}>
          {/* KPIs Section */}
          <Grid item xs={12} md={3}>
            <Card>
              <CardContent>
                <Typography variant="h6">Total Analyses</Typography>
                <Typography variant="h4" color="green" sx={{ fontWeight: 'bold' }}>
                  {totalAnalyses}
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={3}>
            <Card>
              <CardContent>
                <Typography variant="h6">Total Wins</Typography>
                <Typography variant="h4" color="blue" sx={{ fontWeight: 'bold' }}>
                  {totalWins}
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={3}>
            <Card>
              <CardContent>
                <Typography variant="h6">Total Losses</Typography>
                <Typography variant="h4" color="red" sx={{ fontWeight: 'bold' }}>
                  {totalLosses}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Grid container spacing={4} sx={{ marginTop: 4 }}>
          {/* Reason Distribution Chart */}
          <Grid item xs={12} md={6}>
            <HighchartsReact highcharts={Highcharts} options={reasonChartOptions} />
          </Grid>

          {/* Win/Loss Trends Chart */}
          <Grid item xs={12} md={6}>
            <HighchartsReact highcharts={Highcharts} options={winLossTrendsChartOptions} />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
