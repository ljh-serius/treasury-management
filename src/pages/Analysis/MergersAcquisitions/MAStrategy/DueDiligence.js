import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { Box, Typography, Grid, Card, CardContent, Container, CircularProgress, Backdrop } from '@mui/material';

export default function DueDiligenceDashboard({ fetchData }) {
  const [dueDiligenceData, setDueDiligenceData] = useState([]);
  const [totalProcesses, setTotalProcesses] = useState(0);
  const [statusDistribution, setStatusDistribution] = useState([]);
  const [timelineTrends, setTimelineTrends] = useState([]);
  const [riskAssessmentDistribution, setRiskAssessmentDistribution] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDataAsync = async () => {
      setLoading(true);
      const data = await fetchData();
      setDueDiligenceData(data);
      processDueDiligenceData(data);
      setLoading(false);
    };

    fetchDataAsync();
  }, [fetchData]);

  const processDueDiligenceData = (data) => {
    // Total Processes
    setTotalProcesses(data.length);

    // Status Distribution for Pie Chart
    const statusCounts = data.reduce((acc, item) => {
      acc[item.status] = (acc[item.status] || 0) + 1;
      return acc;
    }, {});
    setStatusDistribution(Object.keys(statusCounts).map(key => ({
      name: key.charAt(0).toUpperCase() + key.slice(1),
      y: statusCounts[key],
    })));

    // Review Timelines for Line Chart
    const trendData = data.map(item => ({
      start: new Date(item.startDate).getTime(),
      end: new Date(item.endDate).getTime(),
    })).sort((a, b) => a.start - b.start);
    setTimelineTrends(trendData);

    // Risk Assessment Distribution for Pie Chart
    const riskCounts = data.reduce((acc, item) => {
      const riskLevel = item.riskAssessment.includes('high') ? 'High Risk' : 'Low Risk';
      acc[riskLevel] = (acc[riskLevel] || 0) + 1;
      return acc;
    }, {});
    setRiskAssessmentDistribution(Object.keys(riskCounts).map(key => ({
      name: key,
      y: riskCounts[key],
    })));
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

  // Highcharts options for Due Diligence Timeline Trends
  const timelineChartOptions = {
    chart: { type: 'line' },
    title: { text: 'Due Diligence Timelines' },
    xAxis: { type: 'datetime', title: { text: 'Start Date' } },
    yAxis: { title: { text: 'End Date' } },
    series: [{
      name: 'Duration',
      data: timelineTrends.map(item => [item.start, item.end]),
    }],
  };

  // Highcharts options for Risk Assessment Distribution
  const riskAssessmentChartOptions = {
    chart: { type: 'pie' },
    title: { text: 'Risk Assessment Distribution' },
    series: [{
      name: 'Risk Level',
      colorByPoint: true,
      data: riskAssessmentDistribution,
    }],
  };

  return (
    <Container maxWidth="xl" sx={{ paddingTop: 3, paddingBottom: 7 }}>
      <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <Box sx={{ padding: 4 }}>
        <Typography variant="h4" gutterBottom>
          Due Diligence Dashboard
        </Typography>

        <Grid container spacing={4}>
          {/* KPIs Section */}
          <Grid item xs={12} md={3}>
            <Card>
              <CardContent>
                <Typography variant="h6">Total Processes</Typography>
                <Typography variant="h4" color="green" sx={{ fontWeight: 'bold' }}>
                  {totalProcesses}
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

          {/* Due Diligence Timeline Trends Chart */}
          <Grid item xs={12} md={6}>
            <HighchartsReact highcharts={Highcharts} options={timelineChartOptions} />
          </Grid>

          {/* Risk Assessment Distribution Chart */}
          <Grid item xs={12} md={6} sx={{ marginTop: 4 }}>
            <HighchartsReact highcharts={Highcharts} options={riskAssessmentChartOptions} />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
