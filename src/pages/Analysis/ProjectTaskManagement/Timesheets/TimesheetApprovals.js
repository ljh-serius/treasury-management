import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { Box, Typography, Grid, Card, CardContent, Container, CircularProgress, Backdrop } from '@mui/material';

export default function TimesheetsApprovalsDashboard({ fetchData }) {
  const [approvalData, setApprovalData] = useState([]);
  const [totalApprovals, setTotalApprovals] = useState(0);
  const [approvalStatusDistribution, setApprovalStatusDistribution] = useState([]);
  const [approvalTrends, setApprovalTrends] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDataAsync = async () => {
      setLoading(true);
      const data = await fetchData();
      setApprovalData(data);
      processApprovalData(data);
      setLoading(false);
    };

    fetchDataAsync();
  }, [fetchData]);

  const processApprovalData = (data) => {
    // Total Approvals
    setTotalApprovals(data.length);

    // Approval Status Distribution for Pie Chart
    const statusCounts = data.reduce((acc, approval) => {
      acc[approval.approvalStatus] = (acc[approval.approvalStatus] || 0) + 1;
      return acc;
    }, {});
    setApprovalStatusDistribution(Object.keys(statusCounts).map(key => ({
      name: key.charAt(0).toUpperCase() + key.slice(1),
      y: statusCounts[key],
    })));

    // Approval Trends for Line Chart
    const trendData = data.map(approval => ({
      date: new Date(approval.approvalDate).getTime(),
    })).sort((a, b) => a.date - b.date);
    setApprovalTrends(trendData);
  };

  // Highcharts options for Approval Status Distribution
  const approvalStatusChartOptions = {
    chart: { type: 'pie' },
    title: { text: 'Approval Status Distribution' },
    series: [{
      name: 'Approval Status',
      colorByPoint: true,
      data: approvalStatusDistribution,
    }],
  };

  // Highcharts options for Approval Trends
  const approvalTrendChartOptions = {
    chart: { type: 'line' },
    title: { text: 'Approval Trends Over Time' },
    xAxis: { type: 'datetime', title: { text: 'Approval Date' } },
    yAxis: { title: { text: 'Number of Approvals' } },
    series: [{
      name: 'Approvals',
      data: approvalTrends.map(item => [item.date]),
    }],
  };

  return (
    <Container maxWidth="xl" sx={{ paddingTop: 3, paddingBottom: 7 }}>
      <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <Box sx={{ padding: 4 }}>
        <Typography variant="h4" gutterBottom>
          Timesheets Approvals Dashboard
        </Typography>

        <Grid container spacing={4}>
          {/* KPIs Section */}
          <Grid item xs={12} md={3}>
            <Card>
              <CardContent>
                <Typography variant="h6">Total Approvals</Typography>
                <Typography variant="h4" color="green" sx={{ fontWeight: 'bold' }}>
                  {totalApprovals}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Grid container spacing={4} sx={{ marginTop: 4 }}>
          {/* Approval Status Distribution Chart */}
          <Grid item xs={12} md={6}>
            <HighchartsReact highcharts={Highcharts} options={approvalStatusChartOptions} />
          </Grid>

          {/* Approval Trends Chart */}
          <Grid item xs={12} md={6}>
            <HighchartsReact highcharts={Highcharts} options={approvalTrendChartOptions} />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
