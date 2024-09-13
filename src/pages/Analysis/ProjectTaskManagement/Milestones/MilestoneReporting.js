import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { Box, Typography, Grid, Card, CardContent, Container, CircularProgress, Backdrop } from '@mui/material';

export default function MilestoneReportingDashboard({ fetchItems }) {
  const [reportData, setReportData] = useState([]);
  const [totalReports, setTotalReports] = useState(0);
  const [urgentReports, setUrgentReports] = useState(0);
  const [reportTrends, setReportTrends] = useState([]);
  const [tagDistribution, setTagDistribution] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDataAsync = async () => {
      setLoading(true);
      const data = await fetchItems();
      setReportData(data);
      processReportData(data);
      setLoading(false);
    };

    fetchDataAsync();
  }, [fetchItems]);

  const processReportData = (data) => {
    // Total Reports
    setTotalReports(data.length);

    // Count Urgent Reports
    const urgent = data.filter(report => report.tags.includes('urgent')).length;
    setUrgentReports(urgent);

    // Report Trends for Line Chart
    const trendData = data.map(report => ({
      date: new Date(report.reportingDate).getTime(),
    })).sort((a, b) => a.date - b.date);
    setReportTrends(trendData);

    // Tag Distribution for Pie Chart
    const tagCounts = data.reduce((acc, report) => {
      report.tags.forEach(tag => {
        acc[tag] = (acc[tag] || 0) + 1;
      });
      return acc;
    }, {});
    setTagDistribution(Object.keys(tagCounts).map(key => ({
      name: key.charAt(0).toUpperCase() + key.slice(1),
      y: tagCounts[key],
    })));
  };

  // Highcharts options for Report Trends
  const reportTrendChartOptions = {
    chart: { type: 'line' },
    title: { text: 'Reporting Trends Over Time' },
    xAxis: { type: 'datetime', title: { text: 'Date' } },
    yAxis: { title: { text: 'Number of Reports' } },
    series: [{
      name: 'Reports',
      data: reportTrends.map(item => [item.date]),
    }],
  };

  // Highcharts options for Tag Distribution
  const tagChartOptions = {
    chart: { type: 'pie' },
    title: { text: 'Tag Distribution in Reports' },
    series: [{
      name: 'Tags',
      colorByPoint: true,
      data: tagDistribution,
    }],
  };

  return (
    <Container maxWidth="xl" sx={{ paddingTop: 3, paddingBottom: 7 }}>
      <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <Box sx={{ padding: 4 }}>
        <Typography variant="h4" gutterBottom>
          Milestone Reporting Dashboard
        </Typography>

        <Grid container spacing={4}>
          {/* KPIs Section */}
          <Grid item xs={12} md={3}>
            <Card>
              <CardContent>
                <Typography variant="h6">Total Reports</Typography>
                <Typography variant="h4" color="green" sx={{ fontWeight: 'bold' }}>
                  {totalReports}
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={3}>
            <Card>
              <CardContent>
                <Typography variant="h6">Urgent Reports</Typography>
                <Typography variant="h4" color="red" sx={{ fontWeight: 'bold' }}>
                  {urgentReports}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Grid container spacing={4} sx={{ marginTop: 4 }}>
          {/* Report Trends Chart */}
          <Grid item xs={12} md={6}>
            <HighchartsReact highcharts={Highcharts} options={reportTrendChartOptions} />
          </Grid>

          {/* Tag Distribution Chart */}
          <Grid item xs={12} md={6}>
            <HighchartsReact highcharts={Highcharts} options={tagChartOptions} />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
