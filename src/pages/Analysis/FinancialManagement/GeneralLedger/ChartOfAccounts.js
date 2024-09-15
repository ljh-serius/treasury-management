import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { Box, Typography, Grid, Card, CardContent, Container } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import Backdrop from '@mui/material/Backdrop';

export default function ChartOfAccountsDashboard({ fetchItems }) {
  const [accountsData, setAccountsData] = useState([]);
  const [accountTypeDistribution, setAccountTypeDistribution] = useState([]);
  const [totalBalance, setTotalBalance] = useState(0);
  const [ecoContributionTotal, setEcoContributionTotal] = useState(0);
  const [totalLateFees, setTotalLateFees] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const data = await fetchItems();
      setAccountsData(data);
      processAccountsData(data);
      setLoading(false);
    };

    fetchData();
  }, [fetchItems]);

  const processAccountsData = (data) => {
    // Account Type Distribution
    const accountTypeCounts = data.reduce((acc, account) => {
      acc[account.accountType] = (acc[account.accountType] || 0) + 1;
      return acc;
    }, {});

    setAccountTypeDistribution(Object.keys(accountTypeCounts).map(key => ({
      name: key,
      y: accountTypeCounts[key],
    })));

    // Total Balance, Late Payment Fees, and Eco Contribution
    const totals = data.reduce(
      (acc, account) => {
        acc.balance += Number(account.balance) || 0;
        acc.ecoContribution += Number(account.ecoContribution) || 0;
        acc.lateFees += Number(account.latePaymentFee) || 0;
        return acc;
      },
      { balance: 0, ecoContribution: 0, lateFees: 0 }
    );

    setTotalBalance(totals.balance);
    setEcoContributionTotal(totals.ecoContribution);
    setTotalLateFees(totals.lateFees);
  };

  const accountTypeChartOptions = {
    chart: { type: 'pie' },
    title: { text: 'Account Type Distribution' },
    series: [{ name: 'Account Types', colorByPoint: true, data: accountTypeDistribution }],
  };

  return (
    <Container maxWidth="xl" sx={{ paddingTop: 3, paddingBottom: 7 }}>
      <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <Box sx={{ padding: 4 }}>
        <Typography variant="h4" gutterBottom>
          Chart of Accounts Dashboard
        </Typography>
        <Grid container spacing={4}>
          {/* KPI Section */}
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6">Total Balance</Typography>
                <Typography variant="h4" color="green" sx={{ fontWeight: 'bold' }}>
                  ${totalBalance.toFixed(2)}
                </Typography>
                <Typography variant="body2">Total balance across all accounts.</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6">Total Eco Contribution</Typography>
                <Typography variant="h4" color="orange" sx={{ fontWeight: 'bold' }}>
                  ${ecoContributionTotal.toFixed(2)}
                </Typography>
                <Typography variant="body2">Total eco-tax contributions (French-specific).</Typography>
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
                <Typography variant="body2">Total late payment fees across all accounts.</Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Chart Section */}
          <Grid item xs={12} md={6}>
            <HighchartsReact highcharts={Highcharts} options={accountTypeChartOptions} />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
