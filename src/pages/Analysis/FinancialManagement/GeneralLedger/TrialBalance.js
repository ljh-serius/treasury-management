import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { Box, Typography, Grid, Card, CardContent, Container } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import Backdrop from '@mui/material/Backdrop';

export default function TrialBalanceDashboard({ fetchItems }) {
  const [trialBalanceData, setTrialBalanceData] = useState([]);
  const [currencyDistribution, setCurrencyDistribution] = useState([]);
  const [debitsVsCredits, setDebitsVsCredits] = useState([]);
  const [netBalanceOverTime, setNetBalanceOverTime] = useState([]);
  const [tagsDistribution, setTagsDistribution] = useState([]);
  const [totalAccounts, setTotalAccounts] = useState(0);
  const [totalDebit, setTotalDebit] = useState(0);
  const [totalCredit, setTotalCredit] = useState(0);
  const [netBalance, setNetBalance] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const data = await fetchItems();
      setTrialBalanceData(data);
      processTrialBalanceData(data);
      setLoading(false);
    };

    fetchData();
  }, [fetchItems]);

  const processTrialBalanceData = (data) => {
    // Total Number of Accounts
    setTotalAccounts(data.length);

    // Total Debit and Credit
    const totals = data.reduce(
      (acc, account) => {
        acc.debit += Number(account.debit) || 0;
        acc.credit += Number(account.credit) || 0;
        return acc;
      },
      { debit: 0, credit: 0 }
    );

    setTotalDebit(totals.debit);
    setTotalCredit(totals.credit);
    setNetBalance(totals.debit - totals.credit);

    // Accounts by Currency
    const currencyCounts = data.reduce((acc, account) => {
      acc[account.currency] = (acc[account.currency] || 0) + 1;
      return acc;
    }, {});

    setCurrencyDistribution(Object.keys(currencyCounts).map(key => ({
      name: key,
      y: currencyCounts[key],
    })));

    // Debits vs. Credits by Account
    const debitsCredits = data.map(account => ({
      name: account.accountId,
      debit: Number(account.debit) || 0,
      credit: Number(account.credit) || 0,
    }));

    setDebitsVsCredits(debitsCredits);

    // Net Balance Over Time
    const balanceOverTime = data.reduce((acc, account) => {
      const month = new Date(account.createdDate).getMonth() + 1;
      acc[month] = (acc[month] || 0) + (Number(account.debit) - Number(account.credit));
      return acc;
    }, {});

    setNetBalanceOverTime(Object.keys(balanceOverTime).map(key => ({
      name: `Month ${key}`,
      y: balanceOverTime[key],
    })));

    // Tags Distribution
    const tagsCounts = data.reduce((acc, account) => {
      account.tags.forEach(tag => {
        acc[tag] = (acc[tag] || 0) + 1;
      });
      return acc;
    }, {});

    setTagsDistribution(Object.keys(tagsCounts).map(key => ({
      name: key,
      y: tagsCounts[key],
    })));
  };

  // Chart options for each chart
  const currencyChartOptions = {
    chart: {
      type: 'pie',
    },
    title: {
      text: 'Accounts by Currency',
    },
    series: [
      {
        name: 'Currencies',
        colorByPoint: true,
        data: currencyDistribution,
      },
    ],
  };

  const debitsVsCreditsChartOptions = {
    chart: {
      type: 'column',
    },
    title: {
      text: 'Total Debit and Credit',
    },
    xAxis: {
      categories: ['Debit', 'Credit'],
    },
    series: [
      {
        name: 'Amount',
        data: [totalDebit, totalCredit],
      },
    ],
  };

  const netBalanceChartOptions = {
    chart: {
      type: 'line',
    },
    title: {
      text: 'Net Balance Over Time',
    },
    xAxis: {
      categories: netBalanceOverTime.map(data => data.name),
    },
    series: [
      {
        name: 'Net Balance',
        data: netBalanceOverTime.map(data => data.y),
      },
    ],
  };

  const debitsCreditsByAccountChartOptions = {
    chart: {
      type: 'column',
    },
    title: {
      text: 'Debits vs. Credits by Account',
    },
    xAxis: {
      categories: debitsVsCredits.map(data => data.name),
    },
    series: [
      {
        name: 'Debits',
        data: debitsVsCredits.map(data => data.debit),
      },
      {
        name: 'Credits',
        data: debitsVsCredits.map(data => data.credit),
      },
    ],
  };

  const tagsChartOptions = {
    chart: {
      type: 'column',
    },
    title: {
      text: 'Tags Distribution',
    },
    series: [
      {
        name: 'Tags',
        data: tagsDistribution,
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
          Trial Balance Dashboard
        </Typography>
        <Grid container spacing={4}>
          {/* KPI Section */}
          <Grid item xs={12} md={3}>
            <Card>
              <CardContent>
                <Typography variant="h6">Total Accounts</Typography>
                <Typography variant="h4" color="green" sx={{ fontWeight: 'bold' }}>
                  {totalAccounts}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={3}>
            <Card>
              <CardContent>
                <Typography variant="h6">Total Debit</Typography>
                <Typography variant="h4" color="blue" sx={{ fontWeight: 'bold' }}>
                  ${totalDebit.toFixed(2)}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={3}>
            <Card>
              <CardContent>
                <Typography variant="h6">Total Credit</Typography>
                <Typography variant="h4" color="orange" sx={{ fontWeight: 'bold' }}>
                  ${totalCredit.toFixed(2)}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={3}>
            <Card>
              <CardContent>
                <Typography variant="h6">Net Balance</Typography>
                <Typography variant="h4" color="purple" sx={{ fontWeight: 'bold' }}>
                  ${netBalance.toFixed(2)}
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Chart Section */}
          <Grid item xs={12} md={6}>
            <HighchartsReact highcharts={Highcharts} options={currencyChartOptions} />
          </Grid>
          <Grid item xs={12} md={6}>
            <HighchartsReact highcharts={Highcharts} options={debitsVsCreditsChartOptions} />
          </Grid>
          <Grid item xs={12} md={6}>
            <HighchartsReact highcharts={Highcharts} options={netBalanceChartOptions} />
          </Grid>
          <Grid item xs={12} md={6}>
            <HighchartsReact highcharts={Highcharts} options={debitsCreditsByAccountChartOptions} />
          </Grid>
          <Grid item xs={12} md={12}>
            <HighchartsReact highcharts={Highcharts} options={tagsChartOptions} />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
