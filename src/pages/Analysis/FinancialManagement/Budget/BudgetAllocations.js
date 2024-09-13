import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { Box, Typography, Grid, Card, CardContent, Container } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import Backdrop from '@mui/material/Backdrop';

export default function BudgetAllocationsAnalytics({ fetchItems }) {
  const [allocationsData, setAllocationsData] = useState([]);
  const [statusDistribution, setStatusDistribution] = useState([]);
  const [budgetVsActual, setBudgetVsActual] = useState([]);
  const [totalBudgetedAmount, setTotalBudgetedAmount] = useState(0);
  const [totalActualAmount, setTotalActualAmount] = useState(0);
  const [topDepartments, setTopDepartments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const data = await fetchItems();
      setAllocationsData(data);
      processAllocationData(data);
      setLoading(false);
    };

    fetchData();
  }, [fetchItems]);

  const processAllocationData = (data) => {
    // Status Distribution
    const statusCounts = data.reduce((acc, allocation) => {
      acc[allocation.status] = (acc[allocation.status] || 0) + 1;
      return acc;
    }, {});

    setStatusDistribution(Object.keys(statusCounts).map(key => ({
      name: key,
      y: statusCounts[key],
    })));

    // Budget vs Actual
    const budgetData = data.map(allocation => ({
      budgeted: Number(allocation.budgetedAmount),
      actual: Number(allocation.actualAmount),
    }));

    setBudgetVsActual(budgetData);

    // Total Amounts
    const totals = data.reduce(
      (acc, allocation) => {
        acc.budgeted += Number(allocation.budgetedAmount) || 0;
        acc.actual += Number(allocation.actualAmount) || 0;
        return acc;
      },
      { budgeted: 0, actual: 0 }
    );

    setTotalBudgetedAmount(totals.budgeted);
    setTotalActualAmount(totals.actual);

    // Top 5 Departments by Budgeted Amount
    const topDepartmentsList = data
      .sort((a, b) => Number(b.budgetedAmount) - Number(a.budgetedAmount))
      .slice(0, 5);
    setTopDepartments(topDepartmentsList);
  };

  const statusChartOptions = {
    chart: {
      type: 'pie',
    },
    title: {
      text: 'Status Distribution',
    },
    series: [
      {
        name: 'Statuses',
        colorByPoint: true,
        data: statusDistribution,
      },
    ],
  };

  const budgetVsActualChartOptions = {
    chart: {
      type: 'column',
    },
    title: {
      text: 'Budget vs Actual Amounts',
    },
    series: [
      {
        name: 'Budgeted Amount',
        data: budgetVsActual.map(data => data.budgeted),
      },
      {
        name: 'Actual Amount',
        data: budgetVsActual.map(data => data.actual),
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
          Budget Allocations Analytics
        </Typography>
        <Grid container spacing={4}>
          {/* KPI Section */}
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6">Total Budgeted Amount</Typography>
                <Typography variant="h4" color="green" sx={{ fontWeight: 'bold' }}>
                  ${totalBudgetedAmount.toFixed(2)}
                </Typography>
                <Typography variant="body2">
                  This represents the total budgeted amount across all allocations.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6">Total Actual Amount</Typography>
                <Typography variant="h4" color="blue" sx={{ fontWeight: 'bold' }}>
                  ${totalActualAmount.toFixed(2)}
                </Typography>
                <Typography variant="body2">
                  This represents the total actual spending across all allocations.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6">Top 5 Departments by Budgeted Amount</Typography>
                <ol>
                  {topDepartments.map(allocation => (
                    <li key={allocation.allocationId}>
                      <Typography variant="body2">
                        {allocation.department} - Budgeted: ${Number(allocation.budgetedAmount).toFixed(2)}
                      </Typography>
                    </li>
                  ))}
                </ol>
              </CardContent>
            </Card>
          </Grid>

          {/* Chart Section */}
          <Grid item xs={12} md={6}>
            <HighchartsReact highcharts={Highcharts} options={statusChartOptions} />
          </Grid>
          <Grid item xs={12} md={6}>
            <HighchartsReact highcharts={Highcharts} options={budgetVsActualChartOptions} />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
