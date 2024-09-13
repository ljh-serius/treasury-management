import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { Box, Typography, Grid, Card, CardContent, Container, CircularProgress, Backdrop } from '@mui/material';

export default function NGOPartnershipsDashboard({ fetchItems }) {
  const [partnerships, setPartnerships] = useState([]);
  const [totalPartnerships, setTotalPartnerships] = useState(0);
  const [totalBudget, setTotalBudget] = useState(0);
  const [budgetOutcomeComparison, setBudgetOutcomeComparison] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const data = await fetchItems();
      setPartnerships(data);
      processPartnershipData(data);
      setLoading(false);
    };

    fetchData();
  }, [fetchItems]);

  const processPartnershipData = (data) => {
    let totalBudget = 0;

    const comparisonData = data.map((partnership) => {
      totalBudget += partnership.budget;

      return {
        name: partnership.ngoName,
        budget: partnership.budget,
        outcome: partnership.outcome.length, // Assuming outcome is qualitative, you could calculate it based on length or complexity
      };
    });

    setTotalPartnerships(data.length);
    setTotalBudget(totalBudget);
    setBudgetOutcomeComparison(comparisonData);
  };

  // Highcharts options for Budget vs Outcome
  const budgetOutcomeChartOptions = {
    chart: { type: 'column' },
    title: { text: 'Budget vs Outcome' },
    xAxis: { categories: budgetOutcomeComparison.map((partnership) => partnership.name) },
    yAxis: {
      min: 0,
      title: { text: 'Budget (USD) vs Outcome' },
    },
    series: [
      { name: 'Budget', data: budgetOutcomeComparison.map((partnership) => partnership.budget) },
      { name: 'Outcome (Complexity)', data: budgetOutcomeComparison.map((partnership) => partnership.outcome) },
    ],
  };

  return (
    <Container maxWidth="xl" sx={{ paddingTop: 3, paddingBottom: 7 }}>
      <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <Box sx={{ padding: 4 }}>
        <Typography variant="h4" gutterBottom>
          NGO Partnerships Dashboard
        </Typography>

        <Grid container spacing={4}>
          {/* KPIs Section */}
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6">Total Partnerships</Typography>
                <Typography variant="h4" color="green" sx={{ fontWeight: 'bold' }}>
                  {totalPartnerships}
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
        </Grid>

        <Grid container spacing={4} sx={{ marginTop: 4 }}>
          {/* Budget vs Outcome Chart */}
          <Grid item xs={12} md={12}>
            <HighchartsReact highcharts={Highcharts} options={budgetOutcomeChartOptions} />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
