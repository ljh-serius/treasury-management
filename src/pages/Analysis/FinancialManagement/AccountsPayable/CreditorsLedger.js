import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { Box, Typography, Grid, Card, CardContent, Container } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import Backdrop from '@mui/material/Backdrop';

export default function CreditorsLedgerDashboard({ fetchItems }) {
  const [ledgerData, setLedgerData] = useState([]);
  const [currencyDistribution, setCurrencyDistribution] = useState([]);
  const [amountDistribution, setAmountDistribution] = useState([]);
  const [monthlyTrendsData, setMonthlyTrendsData] = useState([]);
  const [balanceTrendsData, setBalanceTrendsData] = useState([]);
  const [tagsDistribution, setTagsDistribution] = useState([]);
  const [totalTransactions, setTotalTransactions] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [totalBalance, setTotalBalance] = useState(0);
  const [averageTransactionAmount, setAverageTransactionAmount] = useState(0);
  const [recentTransactions, setRecentTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const data = await fetchItems();
      setLedgerData(data);
      processLedgerData(data);
      setLoading(false);
    };

    fetchData();
  }, [fetchItems]);

  const processLedgerData = (data) => {
    // Total Number of Transactions
    setTotalTransactions(data.length);

    // Total Amount and Balance
    const totalAmounts = data.reduce(
      (acc, ledger) => {
        acc.amount += Number(ledger.amount) || 0;
        acc.balance += Number(ledger.balance) || 0;
        return acc;
      },
      { amount: 0, balance: 0 }
    );

    setTotalAmount(totalAmounts.amount);
    setTotalBalance(totalAmounts.balance);
    setAverageTransactionAmount(totalAmounts.amount / data.length);

    // Transactions by Currency
    const currencyCounts = data.reduce((acc, ledger) => {
      acc[ledger.currency] = (acc[ledger.currency] || 0) + 1;
      return acc;
    }, {});

    setCurrencyDistribution(Object.keys(currencyCounts).map(key => ({
      name: key,
      y: currencyCounts[key],
    })));

    // Transactions by Tags
    const tagsCounts = data.reduce((acc, ledger) => {
      ledger.tags.forEach(tag => {
        acc[tag] = (acc[tag] || 0) + 1;
      });
      return acc;
    }, {});

    setTagsDistribution(Object.keys(tagsCounts).map(key => ({
      name: key,
      y: tagsCounts[key],
    })));

    // Transaction Amount Distribution
    const amountRanges = data.reduce((acc, ledger) => {
      const amount = Number(ledger.amount) || 0;
      const range = amount <= 100 ? '0-100' :
                    amount <= 500 ? '101-500' :
                    amount <= 1000 ? '501-1000' : '1001+';
      acc[range] = (acc[range] || 0) + 1;
      return acc;
    }, {});

    setAmountDistribution(Object.keys(amountRanges).map(key => ({
      name: key,
      y: amountRanges[key],
    })));

    // Monthly Transactions Trend
    const transactionCounts = data.reduce((acc, ledger) => {
      const month = new Date(ledger.transactionDate).getMonth() + 1;
      acc[month] = (acc[month] || 0) + 1;
      return acc;
    }, {});

    setMonthlyTrendsData(Object.keys(transactionCounts).map(key => ({
      name: `Month ${key}`,
      y: transactionCounts[key],
    })));

    // Balance Over Time
    const balanceOverTime = data.reduce((acc, ledger) => {
      const month = new Date(ledger.transactionDate).getMonth() + 1;
      acc[month] = (acc[month] || 0) + Number(ledger.balance);
      return acc;
    }, {});

    setBalanceTrendsData(Object.keys(balanceOverTime).map(key => ({
      name: `Month ${key}`,
      y: balanceOverTime[key],
    })));

    // Recent Transactions
    const recentTransactionsList = data
      .sort((a, b) => new Date(b.transactionDate) - new Date(a.transactionDate))
      .slice(0, 5);
    setRecentTransactions(recentTransactionsList);
  };

  // Chart options for each chart
  const currencyChartOptions = {
    chart: {
      type: 'pie',
    },
    title: {
      text: 'Transactions by Currency',
    },
    series: [
      {
        name: 'Currencies',
        colorByPoint: true,
        data: currencyDistribution,
      },
    ],
  };

  const amountChartOptions = {
    chart: {
      type: 'column',
    },
    title: {
      text: 'Transaction Amount Distribution',
    },
    series: [
      {
        name: 'Amount Range',
        data: amountDistribution,
      },
    ],
  };

  const monthlyTrendsChartOptions = {
    chart: {
      type: 'line',
    },
    title: {
      text: 'Monthly Transactions Trend',
    },
    xAxis: {
      categories: monthlyTrendsData.map(data => data.name),
    },
    series: [
      {
        name: 'Number of Transactions',
        data: monthlyTrendsData.map(data => data.y),
      },
    ],
  };

  const balanceTrendsChartOptions = {
    chart: {
      type: 'line',
    },
    title: {
      text: 'Balance Over Time',
    },
    xAxis: {
      categories: balanceTrendsData.map(data => data.name),
    },
    series: [
      {
        name: 'Balance',
        data: balanceTrendsData.map(data => data.y),
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
          Creditors Ledger Dashboard
        </Typography>
        <Grid container spacing={4}>
          {/* KPI Section */}
          <Grid item xs={12} md={3}>
            <Card>
              <CardContent>
                <Typography variant="h6">Total Transactions</Typography>
                <Typography variant="h4" color="green" sx={{ fontWeight: 'bold' }}>
                  {totalTransactions}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={3}>
            <Card>
              <CardContent>
                <Typography variant="h6">Total Amount</Typography>
                <Typography variant="h4" color="blue" sx={{ fontWeight: 'bold' }}>
                  ${totalAmount.toFixed(2)}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={3}>
            <Card>
              <CardContent>
                <Typography variant="h6">Total Balance</Typography>
                <Typography variant="h4" color="orange" sx={{ fontWeight: 'bold' }}>
                  ${totalBalance.toFixed(2)}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={3}>
            <Card>
              <CardContent>
                <Typography variant="h6">Average Transaction Amount</Typography>
                <Typography variant="h4" color="purple" sx={{ fontWeight: 'bold' }}>
                  ${averageTransactionAmount.toFixed(2)}
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Chart Section */}
          <Grid item xs={12} md={6}>
            <HighchartsReact highcharts={Highcharts} options={currencyChartOptions} />
          </Grid>
          <Grid item xs={12} md={6}>
            <HighchartsReact highcharts={Highcharts} options={amountChartOptions} />
          </Grid>
          <Grid item xs={12} md={6}>
            <HighchartsReact highcharts={Highcharts} options={monthlyTrendsChartOptions} />
          </Grid>
          <Grid item xs={12} md={6}>
            <HighchartsReact highcharts={Highcharts} options={balanceTrendsChartOptions} />
          </Grid>
          <Grid item xs={12} md={12}>
            <HighchartsReact highcharts={Highcharts} options={tagsChartOptions} />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
