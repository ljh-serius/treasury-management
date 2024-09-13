import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { Box, Typography, Grid, Card, CardContent, Container } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import Backdrop from '@mui/material/Backdrop';

export default function ChartOfAccountsDashboard({ fetchItems }) {
  const [accountsData, setAccountsData] = useState([]);
  const [accountTypeDistribution, setAccountTypeDistribution] = useState([]);
  const [balanceByAccountType, setBalanceByAccountType] = useState([]);
  const [currencyDistribution, setCurrencyDistribution] = useState([]);
  const [averageBalanceByAccountType, setAverageBalanceByAccountType] = useState([]);
  const [tagsDistribution, setTagsDistribution] = useState([]);
  const [totalAccounts, setTotalAccounts] = useState(0);
  const [totalBalance, setTotalBalance] = useState(0);
  const [averageAccountBalance, setAverageAccountBalance] = useState(0);
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
    // Total Number of Accounts
    setTotalAccounts(data.length);

    // Total Balance
    const totalBalance = data.reduce((acc, account) => acc + Number(account.balance), 0);
    setTotalBalance(totalBalance);

    // Average Account Balance
    setAverageAccountBalance(totalBalance / data.length);

    // Accounts by Type
    const accountTypeCounts = data.reduce((acc, account) => {
      acc[account.accountType] = (acc[account.accountType] || 0) + 1;
      return acc;
    }, {});

    setAccountTypeDistribution(Object.keys(accountTypeCounts).map(key => ({
      name: key.charAt(0).toUpperCase() + key.slice(1),  // Capitalize account type
      y: accountTypeCounts[key],
    })));

    // Total Balance by Account Type
    const balanceByType = data.reduce((acc, account) => {
      acc[account.accountType] = (acc[account.accountType] || 0) + Number(account.balance);
      return acc;
    }, {});

    setBalanceByAccountType(Object.keys(balanceByType).map(key => ({
      name: key.charAt(0).toUpperCase() + key.slice(1),  // Capitalize account type
      y: balanceByType[key],
    })));

    // Average Balance by Account Type
    const accountCounts = Object.values(accountTypeCounts);
    setAverageBalanceByAccountType(Object.keys(balanceByType).map((key, index) => ({
      name: key.charAt(0).toUpperCase() + key.slice(1),
      y: balanceByType[key] / accountCounts[index],
    })));

    // Accounts by Currency
    const currencyCounts = data.reduce((acc, account) => {
      acc[account.currency] = (acc[account.currency] || 0) + 1;
      return acc;
    }, {});

    setCurrencyDistribution(Object.keys(currencyCounts).map(key => ({
      name: key,
      y: currencyCounts[key],
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
  const accountTypeChartOptions = {
    chart: {
      type: 'pie',
    },
    title: {
      text: 'Accounts by Type',
    },
    series: [
      {
        name: 'Account Types',
        colorByPoint: true,
        data: accountTypeDistribution,
      },
    ],
  };

  const balanceByAccountTypeChartOptions = {
    chart: {
      type: 'column',
    },
    title: {
      text: 'Total Balance by Account Type',
    },
    series: [
      {
        name: 'Total Balance',
        data: balanceByAccountType,
      },
    ],
  };

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

  const averageBalanceByAccountTypeChartOptions = {
    chart: {
      type: 'bar',
    },
    title: {
      text: 'Average Balance by Account Type',
    },
    series: [
      {
        name: 'Average Balance',
        data: averageBalanceByAccountType,
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
          Chart Of Accounts Dashboard
        </Typography>
        <Grid container spacing={4}>
          {/* KPI Section */}
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6">Total Accounts</Typography>
                <Typography variant="h4" color="green" sx={{ fontWeight: 'bold' }}>
                  {totalAccounts}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6">Total Balance</Typography>
                <Typography variant="h4" color="blue" sx={{ fontWeight: 'bold' }}>
                  ${totalBalance.toFixed(2)}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6">Average Account Balance</Typography>
                <Typography variant="h4" color="orange" sx={{ fontWeight: 'bold' }}>
                  ${averageAccountBalance.toFixed(2)}
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Chart Section */}
          <Grid item xs={12} md={6}>
            <HighchartsReact highcharts={Highcharts} options={accountTypeChartOptions} />
          </Grid>
          <Grid item xs={12} md={6}>
            <HighchartsReact highcharts={Highcharts} options={balanceByAccountTypeChartOptions} />
          </Grid>
          <Grid item xs={12} md={6}>
            <HighchartsReact highcharts={Highcharts} options={currencyChartOptions} />
          </Grid>
          <Grid item xs={12} md={6}>
            <HighchartsReact highcharts={Highcharts} options={averageBalanceByAccountTypeChartOptions} />
          </Grid>
          <Grid item xs={12} md={12}>
            <HighchartsReact highcharts={Highcharts} options={tagsChartOptions} />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
