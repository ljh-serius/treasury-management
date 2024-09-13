import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { Box, Typography, Grid, Card, CardContent, Container, CircularProgress, Backdrop } from '@mui/material';

export default function CSRProgramsDashboard({ fetchItems }) {
  const [programs, setPrograms] = useState([]);
  const [totalPrograms, setTotalPrograms] = useState(0);
  const [totalBudget, setTotalBudget] = useState(0);
  const [totalSpent, setTotalSpent] = useState(0);
  const [budgetSpentComparison, setBudgetSpentComparison] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const data = await fetchItems();
      setPrograms(data);
      processProgramData(data);
      setLoading(false);
    };

    fetchData();
  }, [fetchItems]);

  const processProgramData = (data) => {
    let totalBudget = 0;
    let totalSpent = 0;

    const comparisonData = data.map((program) => {
      totalBudget += program.budget;
      totalSpent += program.spentAmount;

      return {
        name: program.programName,
        budget: program.budget,
        spent: program.spentAmount,
      };
    });

    setTotalPrograms(data.length);
    setTotalBudget(totalBudget);
    setTotalSpent(totalSpent);
    setBudgetSpentComparison(comparisonData);
  };

  // Highcharts options for Budget vs Spent Amount
  const budgetSpentChartOptions = {
    chart: { type: 'column' },
    title: { text: 'Budget vs Spent Amount' },
    xAxis: { categories: budgetSpentComparison.map((program) => program.name) },
    yAxis: {
      min: 0,
      title: { text: 'Amount (USD)' },
    },
    series: [
      { name: 'Budget', data: budgetSpentComparison.map((program) => program.budget) },
      { name: 'Spent', data: budgetSpentComparison.map((program) => program.spent) },
    ],
  };

  return (
    <Container maxWidth="xl" sx={{ paddingTop: 3, paddingBottom: 7 }}>
      <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <Box sx={{ padding: 4 }}>
        <Typography variant="h4" gutterBottom>
          CSR Programs Dashboard
        </Typography>

        <Grid container spacing={4}>
          {/* KPIs Section */}
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6">Total Programs</Typography>
                <Typography variant="h4" color="green" sx={{ fontWeight: 'bold' }}>
                  {totalPrograms}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6">Total Budget</Typography>
                <Typography variant="h4" color="blue" sx={{ fontWeight: 'bold' }}>
                  ${totalBudget.toLocaleString()}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6">Total Spent</Typography>
                <Typography variant="h4" color="red" sx={{ fontWeight: 'bold' }}>
                  ${totalSpent.toLocaleString()}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Grid container spacing={4} sx={{ marginTop: 4 }}>
          {/* Budget vs Spent Chart */}
          <Grid item xs={12} md={12}>
            <HighchartsReact highcharts={Highcharts} options={budgetSpentChartOptions} />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
