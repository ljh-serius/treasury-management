import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { Box, Typography, Grid, Card, CardContent, Container, CircularProgress, Backdrop } from '@mui/material';

export default function PurchaseRequisitionsDashboard({ fetchItems }) {
  const [requisitionData, setRequisitionData] = useState([]);
  const [totalRequisitions, setTotalRequisitions] = useState(0);
  const [approvalStatusDistribution, setApprovalStatusDistribution] = useState([]);
  const [totalCostTrends, setTotalCostTrends] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const data = await fetchItems();
      setRequisitionData(data);
      processRequisitionData(data);
      setLoading(false);
    };

    fetchData();
  }, [fetchItems]);

  const processRequisitionData = (data) => {
    // Total Requisitions
    setTotalRequisitions(data.length);
  
    // Approval Status Distribution for Pie Chart
    const statusCounts = data.reduce((acc, requisition) => {
      acc[requisition.approvalStatus] = (acc[requisition.approvalStatus] || 0) + 1;
      return acc;
    }, {});
    setApprovalStatusDistribution(Object.keys(statusCounts).map(key => ({
      name: key.charAt(0).toUpperCase() + key.slice(1),
      y: statusCounts[key],
    })));
  
    // Total Cost Trends for Line Chart
    const trendsData = data.map(requisition => ({
      date: new Date(requisition.requestDate).getTime(), // Convert date to timestamp
      amount: parseFloat(requisition.totalCost), // Ensure totalCost is a number
    })).sort((a, b) => a.date - b.date);
    setTotalCostTrends(trendsData);
  };
  
  // Highcharts options for Total Cost Trends
  const totalCostChartOptions = {
    chart: { type: 'line' },
    title: { text: 'Total Cost Trends Over Time' },
    xAxis: { type: 'datetime', title: { text: 'Request Date' } },
    yAxis: { title: { text: 'Total Cost' } },
    series: [{
      name: 'Total Cost',
      data: totalCostTrends.map(item => [item.date, item.amount]), // Properly formatted date and cost
    }],
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

  return (
    <Container maxWidth="xl" sx={{ paddingTop: 3, paddingBottom: 7 }}>
      <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <Box sx={{ padding: 4 }}>
        <Typography variant="h4" gutterBottom>
          Purchase Requisitions Dashboard
        </Typography>

        <Grid container spacing={4}>
          {/* KPIs Section */}
          <Grid item xs={12} md={3}>
            <Card>
              <CardContent>
                <Typography variant="h6">Total Requisitions</Typography>
                <Typography variant="h4" color="green" sx={{ fontWeight: 'bold' }}>
                  {totalRequisitions}
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

          {/* Total Cost Trends Chart */}
          <Grid item xs={12} md={6}>
            <HighchartsReact highcharts={Highcharts} options={totalCostChartOptions} />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
