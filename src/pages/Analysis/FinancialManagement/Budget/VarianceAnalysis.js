import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { Box, Typography, Grid, Card, CardContent, Container } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import Backdrop from '@mui/material/Backdrop';

export default function VarianceAnalysisDashboard({ fetchItems }) {
  const [varianceData, setVarianceData] = useState([]);
  const [varianceDistribution, setVarianceDistribution] = useState([]);
  const [totalBudgetedAmount, setTotalBudgetedAmount] = useState(0);
  const [totalActualAmount, setTotalActualAmount] = useState(0);
  const [totalVarianceAmount, setTotalVarianceAmount] = useState(0);
  const [variancePercentage, setVariancePercentage] = useState(0);
  const [ecoContributionTotal, setEcoContributionTotal] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const data = await fetchItems();
      setVarianceData(data);
      processVarianceData(data);
      setLoading(false);
    };

    fetchData();
  }, [fetchItems]);

  const processVarianceData = (data) => {
    // Variance Distribution
    const varianceCounts = data.reduce((acc, variance) => {
      const varianceAmt = Number(variance.varianceAmount);
      acc[varianceAmt] = (acc[varianceAmt] || 0) + 1;
      return acc;
    }, {});

    setVarianceDistribution(Object.keys(varianceCounts).map(key => ({
      name: `Variance: ${key}`,
      y: varianceCounts[key],
    })));

    // Total Budgeted, Actual, and Variance Amounts
    const totals = data.reduce(
      (acc, variance) => {
        acc.budgetedAmount += Number(variance.budgetedAmount) || 0;
        acc.actualAmount += Number(variance.actualAmount) || 0;
        acc.varianceAmount += Number(variance.varianceAmount) || 0;
        acc.ecoContribution += Number(variance.ecoContribution) || 0;
        acc.variancePercentage += Number(variance.variancePercentage) || 0;
        return acc;
      },
      { budgetedAmount: 0, actualAmount: 0, varianceAmount: 0, ecoContribution: 0, variancePercentage: 0 }
    );

    setTotalBudgetedAmount(totals.budgetedAmount);
    setTotalActualAmount(totals.actualAmount);
    setTotalVarianceAmount(totals.varianceAmount);
    setVariancePercentage(totals.variancePercentage / data.length);
    setEcoContributionTotal(totals.ecoContribution);
  };

  const varianceChartOptions = {
    chart: { type: 'column' },
    title: { text: 'Variance Distribution' },
    series: [{ name: 'Variance Amount', data: varianceDistribution }],
  };

  return (
    <Container maxWidth="xl" sx={{ paddingTop: 3, paddingBottom: 7 }}>
      <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <Box sx={{ padding: 4 }}>
        <Typography variant="h4" gutterBottom>
          Variance Analysis Dashboard
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
                <Typography variant="body2">Total budgeted amount across all departments.</Typography>
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
                <Typography variant="body2">Total actual amount across all departments.</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6">Total Variance Amount</Typography>
                <Typography variant="h4" color="red" sx={{ fontWeight: 'bold' }}>
                  ${totalVarianceAmount.toFixed(2)}
                </Typography>
                <Typography variant="body2">Total variance across all departments.</Typography>
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
          <Grid item xs={12} md={12}>
            <HighchartsReact highcharts={Highcharts} options={varianceChartOptions} />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
