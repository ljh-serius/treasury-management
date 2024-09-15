import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { Box, Typography, Grid, Card, CardContent, Container } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import Backdrop from '@mui/material/Backdrop';

export default function DebtorAgingAnalysisDashboard({ fetchItems }) {
  const [debtorData, setDebtorData] = useState([]);
  const [currencyDistribution, setCurrencyDistribution] = useState([]);
  const [riskLevelDistribution, setRiskLevelDistribution] = useState([]);
  const [overdueDaysData, setOverdueDaysData] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [totalLateFees, setTotalLateFees] = useState(0);
  const [ecoContributionTotal, setEcoContributionTotal] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const data = await fetchItems();
      setDebtorData(data);
      processDebtorData(data);
      setLoading(false);
    };

    fetchData();
  }, [fetchItems]);

  const processDebtorData = (data) => {
    // Currency Distribution
    const currencyCounts = data.reduce((acc, debtor) => {
      acc[debtor.currency] = (acc[debtor.currency] || 0) + 1;
      return acc;
    }, {});

    setCurrencyDistribution(Object.keys(currencyCounts).map(key => ({
      name: key,
      y: currencyCounts[key],
    })));

    // Risk Level Distribution
    const riskLevelCounts = data.reduce((acc, debtor) => {
      acc[debtor.riskLevel] = (acc[debtor.riskLevel] || 0) + 1;
      return acc;
    }, {});

    setRiskLevelDistribution(Object.keys(riskLevelCounts).map(key => ({
      name: key,
      y: riskLevelCounts[key],
    })));

    // Overdue Days Data
    const overdueCounts = data.reduce((acc, debtor) => {
      acc[debtor.overdueDays] = (acc[debtor.overdueDays] || 0) + 1;
      return acc;
    }, {});

    setOverdueDaysData(Object.keys(overdueCounts).map(key => ({
      name: `${key} days`,
      y: overdueCounts[key],
    })));

    // Total Amount and Late Payment Fees
    const totals = data.reduce(
      (acc, debtor) => {
        acc.amount += Number(debtor.amount) || 0;
        acc.lateFees += Number(debtor.latePaymentFee) || 0;
        acc.ecoContribution += Number(debtor.ecoContribution) || 0;
        return acc;
      },
      { amount: 0, lateFees: 0, ecoContribution: 0 }
    );

    setTotalAmount(totals.amount);
    setTotalLateFees(totals.lateFees);
    setEcoContributionTotal(totals.ecoContribution);
  };

  const currencyChartOptions = {
    chart: { type: 'pie' },
    title: { text: 'Currency Distribution' },
    series: [{ name: 'Currencies', colorByPoint: true, data: currencyDistribution }],
  };

  const riskLevelChartOptions = {
    chart: { type: 'column' },
    title: { text: 'Risk Level Distribution' },
    series: [{ name: 'Risk Levels', data: riskLevelDistribution }],
  };

  const overdueDaysChartOptions = {
    chart: { type: 'line' },
    title: { text: 'Overdue Days Trend' },
    series: [{ name: 'Overdue Days', data: overdueDaysData }],
  };

  return (
    <Container maxWidth="xl" sx={{ paddingTop: 3, paddingBottom: 7 }}>
      <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <Box sx={{ padding: 4 }}>
        <Typography variant="h4" gutterBottom>
          Debtor Aging Analysis Dashboard
        </Typography>
        <Grid container spacing={4}>
          {/* KPI Section */}
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6">Total Amount</Typography>
                <Typography variant="h4" color="green" sx={{ fontWeight: 'bold' }}>
                  ${totalAmount.toFixed(2)}
                </Typography>
                <Typography variant="body2">
                  Total amount due across all debtors.
                </Typography>
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
                <Typography variant="body2">Total late payment fees.</Typography>
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
            <HighchartsReact highcharts={Highcharts} options={currencyChartOptions} />
          </Grid>
          <Grid item xs={12} md={6}>
            <HighchartsReact highcharts={Highcharts} options={riskLevelChartOptions} />
          </Grid>
          <Grid item xs={12} md={12}>
            <HighchartsReact highcharts={Highcharts} options={overdueDaysChartOptions} />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
