import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { Box, Typography, Grid, Card, CardContent, Container } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import Backdrop from '@mui/material/Backdrop';

export default function BudgetAllocationsAnalysisDashboard({ fetchItems }) {
  const [allocationsData, setAllocationsData] = useState([]);
  const [statusDistribution, setStatusDistribution] = useState([]);
  const [varianceData, setVarianceData] = useState([]);
  const [totalBudgetedAmount, setTotalBudgetedAmount] = useState(0);
  const [totalActualAmount, setTotalActualAmount] = useState(0);
  const [totalLateFees, setTotalLateFees] = useState(0);
  const [ecoContributionTotal, setEcoContributionTotal] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const data = await fetchItems();
      setAllocationsData(data);
      processAllocationsData(data);
      setLoading(false);
    };

    fetchData();
  }, [fetchItems]);

  const processAllocationsData = (data) => {
    // Status Distribution
    const statusCounts = data.reduce((acc, allocation) => {
      acc[allocation.status] = (acc[allocation.status] || 0) + 1;
      return acc;
    }, {});

    setStatusDistribution(Object.keys(statusCounts).map(key => ({
      name: key,
      y: statusCounts[key],
    })));

    // Variance Data
    const varianceCounts = data.reduce((acc, allocation) => {
      const variance = Number(allocation.actualAmount) - Number(allocation.budgetedAmount);
      acc[variance] = (acc[variance] || 0) + 1;
      return acc;
    }, {});

    setVarianceData(Object.keys(varianceCounts).map(key => ({
      name: `Variance: ${key}`,
      y: varianceCounts[key],
    })));

    // Total Budgeted and Actual Amounts
    const totals = data.reduce(
      (acc, allocation) => {
        acc.budgetedAmount += Number(allocation.budgetedAmount) || 0;
        acc.actualAmount += Number(allocation.actualAmount) || 0;
        acc.lateFees += Number(allocation.latePaymentFee) || 0;
        acc.ecoContribution += Number(allocation.ecoContribution) || 0;
        return acc;
      },
      { budgetedAmount: 0, actualAmount: 0, lateFees: 0, ecoContribution: 0 }
    );

    setTotalBudgetedAmount(totals.budgetedAmount);
    setTotalActualAmount(totals.actualAmount);
    setTotalLateFees(totals.lateFees);
    setEcoContributionTotal(totals.ecoContribution);
  };

  const statusChartOptions = {
    chart: { type: 'pie' },
    title: { text: 'Status Distribution' },
    series: [{ name: 'Status', colorByPoint: true, data: statusDistribution }],
  };

  const varianceChartOptions = {
    chart: { type: 'column' },
    title: { text: 'Budget vs Actual Variance' },
    series: [{ name: 'Variance', data: varianceData }],
  };

  return (
    <Container maxWidth="xl" sx={{ paddingTop: 3, paddingBottom: 7 }}>
      <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <Box sx={{ padding: 4 }}>
        <Typography variant="h4" gutterBottom>
          Budget Allocations Analysis Dashboard
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
                <Typography variant="body2">Total budgeted amount across all allocations.</Typography>
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
                <Typography variant="body2">Total actual amount spent across all allocations.</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6">Total Late Payment Fees</Typography>
                <Typography variant="h4" color="red" sx={{ fontWeight: 'bold' }}>
                  ${totalLateFees.toFixed(2)}
                </Typography>
                <Typography variant="body2">Total late payment fees across all allocations.</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6">Eco Contribution</Typography>
                <Typography variant="h4" color="orange" sx={{ fontWeight: 'bold' }}>
                  ${ecoContributionTotal.toFixed(2)}
                </Typography>
                <Typography variant="body2">Total eco-tax contributions (French-specific).</Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Chart Section */}
          <Grid item xs={12} md={6}>
            <HighchartsReact highcharts={Highcharts} options={statusChartOptions} />
          </Grid>
          <Grid item xs={12} md={6}>
            <HighchartsReact highcharts={Highcharts} options={varianceChartOptions} />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
