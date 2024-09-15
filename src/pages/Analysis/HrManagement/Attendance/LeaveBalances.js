import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { Box, Typography, Grid, Card, CardContent, Container, CircularProgress, Backdrop } from '@mui/material';

export default function LeaveBalancesDashboard({ fetchItems }) {
  const [leaveData, setLeaveData] = useState([]);
  const [totalEmployees, setTotalEmployees] = useState(0);
  const [leaveTypeDistribution, setLeaveTypeDistribution] = useState([]);
  const [usedLeavesChartData, setUsedLeavesChartData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const data = await fetchItems();
      setLeaveData(data);
      processLeaveData(data);
      setLoading(false);
    };

    fetchData();
  }, [fetchItems]);

  const processLeaveData = (data) => {
    setTotalEmployees(data.length);

    // Aggregate Leave Types
    const leaveTypeMap = {};
    data.forEach((item) => {
      const type = item.leaveType;
      leaveTypeMap[type] = (leaveTypeMap[type] || 0) + 1;
    });
    const leaveTypeArray = Object.entries(leaveTypeMap).map(([type, count]) => ({
      name: type,
      y: count,
    }));
    setLeaveTypeDistribution(leaveTypeArray);

    // Prepare chart data for used and remaining leaves
    setUsedLeavesChartData(
      data.map((item) => ({
        name: `Employee ${item.employeeId}`,
        used: item.usedLeaves,
        remaining: item.remainingLeaves,
      }))
    );
  };

  // Highcharts options for Leave Type Distribution
  const leaveTypeChartOptions = {
    chart: { type: 'pie' },
    title: { text: 'Leave Type Distribution' },
    series: [
      {
        name: 'Leave Types',
        data: leaveTypeDistribution,
      },
    ],
  };

  // Highcharts options for Used vs Remaining Leaves
  const usedLeavesChartOptions = {
    chart: { type: 'column' },
    title: { text: 'Used vs Remaining Leaves by Employee' },
    xAxis: { type: 'category', title: { text: 'Employees' } },
    yAxis: { title: { text: 'Number of Leaves' } },
    series: [
      {
        name: 'Used Leaves',
        data: usedLeavesChartData.map((item) => [item.name, item.used]),
      },
      {
        name: 'Remaining Leaves',
        data: usedLeavesChartData.map((item) => [item.name, item.remaining]),
      },
    ],
  };

  return (
    <Container maxWidth="xl" sx={{ paddingTop: 3, paddingBottom: 7 }}>
      <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <Box sx={{ padding: 4 }}>
        <Typography variant="h4" gutterBottom>
          Leave Balances Dashboard
        </Typography>

        <Grid container spacing={4}>
          {/* KPIs Section */}
          <Grid item xs={12} md={3}>
            <Card>
              <CardContent>
                <Typography variant="h6">Total Employees</Typography>
                <Typography variant="h4" color="blue" sx={{ fontWeight: 'bold' }}>
                  {totalEmployees}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Grid container spacing={4} sx={{ marginTop: 4 }}>
          {/* Leave Type Distribution Chart */}
          <Grid item xs={12} md={6}>
            <HighchartsReact highcharts={Highcharts} options={leaveTypeChartOptions} />
          </Grid>

          {/* Used vs Remaining Leaves Chart */}
          <Grid item xs={12} md={6}>
            <HighchartsReact highcharts={Highcharts} options={usedLeavesChartOptions} />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
