import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { Box, Typography, Grid, Card, CardContent, Container, CircularProgress, Backdrop } from '@mui/material';

export default function LeadScoringDashboard({ fetchData }) {
  const [leadData, setLeadData] = useState([]);
  const [totalLeads, setTotalLeads] = useState(0);
  const [averageScore, setAverageScore] = useState(0);
  const [highValueLeads, setHighValueLeads] = useState(0);
  const [mediumValueLeads, setMediumValueLeads] = useState(0);
  const [lowValueLeads, setLowValueLeads] = useState(0);
  const [scoreDistribution, setScoreDistribution] = useState([]);
  const [scoreTrends, setScoreTrends] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDataAsync = async () => {
      setLoading(true);
      const data = await fetchData();
      setLeadData(data);
      processLeadData(data);
      setLoading(false);
    };

    fetchDataAsync();
  }, [fetchData]);

  const processLeadData = (data) => {
    // Total Leads
    setTotalLeads(data.length);

    // Average Score
    const totalScore = data.reduce((acc, lead) => acc + Number(lead.score), 0);
    setAverageScore(totalScore / data.length);

    // Count High, Medium, and Low Value Leads
    const highValue = data.filter(lead => lead.score >= 80).length;
    const mediumValue = data.filter(lead => lead.score >= 50 && lead.score < 80).length;
    const lowValue = data.filter(lead => lead.score < 50).length;
    setHighValueLeads(highValue);
    setMediumValueLeads(mediumValue);
    setLowValueLeads(lowValue);

    // Score Distribution for Pie Chart
    const scoreCounts = data.reduce((acc, lead) => {
      const scoreRange = Math.floor(lead.score / 10) * 10; // Group by 10%
      acc[scoreRange] = (acc[scoreRange] || 0) + 1;
      return acc;
    }, {});
    setScoreDistribution(Object.keys(scoreCounts).map(key => ({
      name: `${key}-${parseInt(key) + 9}`,
      y: scoreCounts[key],
    })));

    // Score Trends Over Time
    const trends = data.map(lead => ({
      date: new Date(lead.createdDate).getTime(),
      score: lead.score,
    })).sort((a, b) => a.date - b.date);
    setScoreTrends(trends);
  };

  // Highcharts options for Score Distribution
  const scoreDistributionChartOptions = {
    chart: { type: 'pie' },
    title: { text: 'Score Distribution' },
    series: [{
      name: 'Leads',
      colorByPoint: true,
      data: scoreDistribution,
    }],
  };

  // Highcharts options for Score Trends Over Time
  const scoreTrendsChartOptions = {
    chart: { type: 'line' },
    title: { text: 'Score Trends Over Time' },
    xAxis: { type: 'datetime', title: { text: 'Date' } },
    yAxis: { title: { text: 'Score' } },
    series: [{
      name: 'Lead Score',
      data: scoreTrends.map(item => [item.date, item.score]),
    }],
  };

  return (
    <Container maxWidth="xl" sx={{ paddingTop: 3, paddingBottom: 7 }}>
      <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <Box sx={{ padding: 4 }}>
        <Typography variant="h4" gutterBottom>
          Lead Scoring Dashboard
        </Typography>

        <Grid container spacing={4}>
          {/* KPIs Section */}
          <Grid item xs={12} md={3}>
            <Card>
              <CardContent>
                <Typography variant="h6">Total Leads</Typography>
                <Typography variant="h4" color="green" sx={{ fontWeight: 'bold' }}>
                  {totalLeads}
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={3}>
            <Card>
              <CardContent>
                <Typography variant="h6">Average Score</Typography>
                <Typography variant="h4" color="blue" sx={{ fontWeight: 'bold' }}>
                  {averageScore.toFixed(2)}
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={3}>
            <Card>
              <CardContent>
                <Typography variant="h6">High Value Leads</Typography>
                <Typography variant="h4" color="purple" sx={{ fontWeight: 'bold' }}>
                  {highValueLeads}
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={3}>
            <Card>
              <CardContent>
                <Typography variant="h6">Low Value Leads</Typography>
                <Typography variant="h4" color="red" sx={{ fontWeight: 'bold' }}>
                  {lowValueLeads}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Grid container spacing={4} sx={{ marginTop: 4 }}>
          {/* Score Distribution Chart */}
          <Grid item xs={12} md={6}>
            <HighchartsReact highcharts={Highcharts} options={scoreDistributionChartOptions} />
          </Grid>

          {/* Score Trends Over Time Chart */}
          <Grid item xs={12} md={6}>
            <HighchartsReact highcharts={Highcharts} options={scoreTrendsChartOptions} />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
