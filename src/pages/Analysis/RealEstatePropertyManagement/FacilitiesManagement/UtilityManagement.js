import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { Box, Typography, Grid, Card, CardContent, Container, CircularProgress, Backdrop } from '@mui/material';

export default function UtilityManagementDashboard({ fetchData }) {
  const [utilityData, setUtilityData] = useState([]);
  const [totalConsumption, setTotalConsumption] = useState(0);
  const [overduePayments, setOverduePayments] = useState(0);
  const [utilityTypeDistribution, setUtilityTypeDistribution] = useState([]);
  const [paymentTimeline, setPaymentTimeline] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDataAsync = async () => {
      setLoading(true);
      const data = await fetchData();
      setUtilityData(data);
      processUtilityData(data);
      setLoading(false);
    };

    fetchDataAsync();
  }, [fetchData]);

  const processUtilityData = (data) => {
    // Total Consumption
    const totalUsage = data.reduce((acc, utility) => acc + Number(utility.consumptionAmount), 0);
    setTotalConsumption(totalUsage);

    // Count Overdue Payments
    const overdue = data.filter(utility => utility.paymentStatus === 'overdue').length;
    setOverduePayments(overdue);

    // Utility Type Distribution for Pie Chart
    const typeCounts = data.reduce((acc, utility) => {
      acc[utility.utilityType] = (acc[utility.utilityType] || 0) + 1;
      return acc;
    }, {});
    setUtilityTypeDistribution(Object.keys(typeCounts).map(key => ({
      name: key.charAt(0).toUpperCase() + key.slice(1),
      y: typeCounts[key],
    })));

    // Payment Timeline for Line Chart
    const timeline = data.map(utility => ({
      billing: new Date(utility.billingDate).getTime(),
      due: new Date(utility.dueDate).getTime(),
      name: utility.utilityType,
    })).sort((a, b) => a.billing - b.billing);
    setPaymentTimeline(timeline);
  };

  // Highcharts options for Utility Type Distribution
  const utilityTypeChartOptions = {
    chart: { type: 'pie' },
    title: { text: 'Utility Type Distribution' },
    series: [{
      name: 'Type',
      colorByPoint: true,
      data: utilityTypeDistribution,
    }],
  };

  // Highcharts options for Payment Timeline
  const paymentTimelineChartOptions = {
    chart: { type: 'line' },
    title: { text: 'Payment Timeline' },
    xAxis: { type: 'datetime', title: { text: 'Billing Date' } },
    yAxis: { title: { text: 'Due Date' } },
    series: [{
      name: 'Payment Period',
      data: paymentTimeline.map(item => [item.billing, item.due]),
    }],
  };

  return (
    <Container maxWidth="xl" sx={{ paddingTop: 3, paddingBottom: 7 }}>
      <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <Box sx={{ padding: 4 }}>
        <Typography variant="h4" gutterBottom>
          Utility Management Dashboard
        </Typography>

        <Grid container spacing={4}>
          {/* KPIs Section */}
          <Grid item xs={12} md={3}>
            <Card>
              <CardContent>
                <Typography variant="h6">Total Utility Consumption</Typography>
                <Typography variant="h4" color="green" sx={{ fontWeight: 'bold' }}>
                  {totalConsumption.toFixed(2)}
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={3}>
            <Card>
              <CardContent>
                <Typography variant="h6">Overdue Payments</Typography>
                <Typography variant="h4" color="red" sx={{ fontWeight: 'bold' }}>
                  {overduePayments}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Grid container spacing={4} sx={{ marginTop: 4 }}>
          {/* Utility Type Distribution Chart */}
          <Grid item xs={12} md={6}>
            <HighchartsReact highcharts={Highcharts} options={utilityTypeChartOptions} />
          </Grid>

          {/* Payment Timeline Chart */}
          <Grid item xs={12} md={6}>
            <HighchartsReact highcharts={Highcharts} options={paymentTimelineChartOptions} />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
