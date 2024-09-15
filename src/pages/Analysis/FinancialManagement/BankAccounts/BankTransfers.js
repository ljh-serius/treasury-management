import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { Box, Typography, Grid, Card, CardContent, Container } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import Backdrop from '@mui/material/Backdrop';

export default function CreditManagementAnalysisDashboard({ fetchItems }) {
  const [creditData, setCreditData] = useState([]);
  const [currencyDistribution, setCurrencyDistribution] = useState([]);
  const [riskLevelDistribution, setRiskLevelDistribution] = useState([]);
  const [totalCreditLimit, setTotalCreditLimit] = useState(0);
  const [totalOutstandingBalance, setTotalOutstandingBalance] = useState(0);
  const [totalLateFees, setTotalLateFees] = useState(0);
  const [ecoContributionTotal, setEcoContributionTotal] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const data = await fetchItems();
      setCreditData(data);
      processCreditData(data);
      setLoading(false);
    };

    fetchData();
  }, [fetchItems]);

  const processCreditData = (data) => {
    // Currency Distribution
    const currencyCounts = data.reduce((acc, credit) => {
      acc[credit.currency] = (acc[credit.currency] || 0) + 1;
      return acc;
    }, {});

    setCurrencyDistribution(Object.keys(currencyCounts).map(key => ({
      name: key,
      y: currencyCounts[key],
    })));

    // Risk Level Distribution
    const riskLevelCounts = data.reduce((acc, credit) => {
      acc[credit.riskLevel] = (acc[credit.riskLevel] || 0) + 1;
      return acc;
    }, {});

    setRiskLevelDistribution(Object.keys(riskLevelCounts).map(key => ({
      name: key,
      y: riskLevelCounts[key],
    })));

    // Total Credit Limit, Outstanding Balance, and Late Payment Fees
    const totals = data.reduce(
      (acc, credit) => {
        acc.creditLimit += Number(credit.creditLimit) || 0;
        acc.outstandingBalance += Number(credit.outstandingBalance) || 0;
        acc.lateFees += Number(credit.latePaymentFee) || 0;
        acc.ecoContribution += Number(credit.ecoContribution) || 0;
        return acc;
      },
      { creditLimit: 0, outstandingBalance: 0, lateFees: 0, ecoContribution: 0 }
    );

    setTotalCreditLimit(totals.creditLimit);
    setTotalOutstandingBalance(totals.outstandingBalance);
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

  return (
    <Container maxWidth="xl" sx={{ paddingTop: 3, paddingBottom: 7 }}>
      <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <Box sx={{ padding: 4 }}>
        <Typography variant="h4" gutterBottom>
          Credit Management Analysis Dashboard
        </Typography>
        <Grid container spacing={4}>
          {/* KPI Section */}
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6">Total Credit Limit</Typography>
                <Typography variant="h4" color="green" sx={{ fontWeight: 'bold' }}>
                  ${totalCreditLimit.toFixed(2)}
                </Typography>
                <Typography variant="body2">Total credit limit across all customers.</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6">Total Outstanding Balance</Typography>
                <Typography variant="h4" color="red" sx={{ fontWeight: 'bold' }}>
                  ${totalOutstandingBalance.toFixed(2)}
                </Typography>
                <Typography variant="body2">Total outstanding balance across all customers.</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6">Total Late Payment Fees</Typography>
                <Typography variant="h4" color="orange" sx={{ fontWeight: 'bold' }}>
                  ${totalLateFees.toFixed(2)}
                </Typography>
                <Typography variant="body2">Total late payment fees across all accounts.</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6">Eco Contribution</Typography>
                <Typography variant="h4" color="blue" sx={{ fontWeight: 'bold' }}>
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
        </Grid>
      </Box>
    </Container>
  );
}
