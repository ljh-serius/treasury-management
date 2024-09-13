import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { Box, Typography, Grid, Card, CardContent, Container, CircularProgress, Backdrop } from '@mui/material';

export default function ComplianceDashboard({ fetchItems }) {
  const [complianceData, setComplianceData] = useState([]);
  const [totalRecords, setTotalRecords] = useState(0);
  const [statusDistribution, setStatusDistribution] = useState([]);
  const [complianceTrends, setComplianceTrends] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const data = await fetchItems();
      setComplianceData(data);
      processComplianceData(data);
      setLoading(false);
    };

    fetchData();
  }, [fetchItems]);

  const processComplianceData = (data) => {
    // Total Compliance Records
    setTotalRecords(data.length);

    // Compliance Status Distribution for Pie Chart
    const statusCounts = data.reduce((acc, record) => {
      acc[record.complianceStatus] = (acc[record.complianceStatus] || 0) + 1;
      return acc;
    }, {});
    setStatusDistribution(Object.keys(statusCounts).map(key => ({
      name: key.charAt(0).toUpperCase() + key.slice(1),
      y: statusCounts[key],
    })));

    // Compliance Date Trends for Line Chart
    const trendsData = data.map(record => ({
      date: new Date(record.complianceDate).getTime(),
      count: 1,
    })).sort((a, b) => a.date - b.date);
    setComplianceTrends(trendsData);
  };

  // Highcharts options for Compliance Status Distribution
  const statusChartOptions = {
    chart: { type: 'pie' },
    title: { text: 'Compliance Status Distribution' },
    series: [{
      name: 'Status',
      colorByPoint: true,
      data: statusDistribution,
    }],
  };

  // Highcharts options for Compliance Date Trends
  const complianceDateChartOptions = {
    chart: { type: 'line' },
    title: { text: 'Compliance Date Trends' },
    xAxis: { type: 'datetime', title: { text: 'Compliance Date' } },
    yAxis: { title: { text: 'Number of Records' } },
    series: [{
      name: 'Records',
      data: complianceTrends.map(item => [item.date, item.count]),
    }],
  };

  return (
    <Container maxWidth="xl" sx={{ paddingTop: 3, paddingBottom: 7 }}>
      <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <Box sx={{ padding: 4 }}>
        <Typography variant="h4" gutterBottom>
          Contract Compliance Dashboard
        </Typography>

        <Grid container spacing={4}>
          {/* KPIs Section */}
          <Grid item xs={12} md={3}>
            <Card>
              <CardContent>
                <Typography variant="h6">Total Compliance Records</Typography>
                <Typography variant="h4" color="green" sx={{ fontWeight: 'bold' }}>
                  {totalRecords}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Grid container spacing={4} sx={{ marginTop: 4 }}>
          {/* Compliance Status Distribution Chart */}
          <Grid item xs={12} md={6}>
            <HighchartsReact highcharts={Highcharts} options={statusChartOptions} />
          </Grid>

          {/* Compliance Date Trends Chart */}
          <Grid item xs={12} md={6}>
            <HighchartsReact highcharts={Highcharts} options={complianceDateChartOptions} />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
