import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { Box, Typography, Grid, Card, CardContent, Container } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import Backdrop from '@mui/material/Backdrop';

export default function TrialBalanceDashboard({ fetchItems }) {
  const [balanceData, setBalanceData] = useState([]);
  const [totalDebit, setTotalDebit] = useState(0);
  const [totalCredit, setTotalCredit] = useState(0);
  const [ecoContributionTotal, setEcoContributionTotal] = useState(0);
  const [currencyDistribution, setCurrencyDistribution] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const data = await fetchItems();
      setBalanceData(data);
      processBalanceData(data);
      setLoading(false);
    };

    fetchData();
  }, [fetchItems]);

  const processBalanceData = (data) => {
    // Total Debit and Credit
    const totals = data.reduce(
      (acc, entry) => {
        acc.debit += Number(entry.debit) || 0;
        acc.credit += Number(entry.credit) || 0;
        acc.ecoContribution += Number(entry.ecoContribution) || 0;
        acc[entry.currency] = (acc[entry.currency] || 0) + 1;
        return acc;
      },
      { debit: 0, credit: 0, ecoContribution: 0 }
    );

    setTotalDebit(totals.debit);
    setTotalCredit(totals.credit);
    setEcoContributionTotal(totals.ecoContribution);

    // Currency Distribution
    const currencyCounts = data.reduce((acc, entry) => {
      acc[entry.currency] = (acc[entry.currency] || 0) + 1;
      return acc;
    }, {});

    setCurrencyDistribution(
      Object.keys(currencyCounts).map(key => ({
        name: key,
        y: currencyCounts[key],
      }))
    );
  };

  const currencyChartOptions = {
    chart: { type: 'pie' },
    title: { text: 'Currency Distribution' },
    series: [{ name: 'Currency', colorByPoint: true, data: currencyDistribution }],
  };

  return (
    <Container maxWidth="xl" sx={{ paddingTop: 3, paddingBottom: 7 }}>
      <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <Box sx={{ padding: 4 }}>
        <Typography variant="h4" gutterBottom>
          Trial Balance Dashboard
        </Typography>
        <Grid container spacing={4}>
          {/* KPI Section */}
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6">Total Debit</Typography>
                <Typography variant="h4" color="green" sx={{ fontWeight: 'bold' }}>
                  ${totalDebit.toFixed(2)}
                </Typography>
                <Typography variant="body2">Total debits recorded in the trial balance.</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6">Total Credit</Typography>
                <Typography variant="h4" color="blue" sx={{ fontWeight: 'bold' }}>
                  ${totalCredit.toFixed(2)}
                </Typography>
                <Typography variant="body2">Total credits recorded in the trial balance.</Typography>
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
        </Grid>
      </Box>
    </Container>
  );
}
