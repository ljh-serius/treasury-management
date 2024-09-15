import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { Box, Typography, Grid, Card, CardContent, Container } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import Backdrop from '@mui/material/Backdrop';

export default function CreditorsLedgerAnalysisDashboard({ fetchItems }) {
  const [ledgerData, setLedgerData] = useState([]);
  const [currencyDistribution, setCurrencyDistribution] = useState([]);
  const [transactionTypeDistribution, setTransactionTypeDistribution] = useState([]);
  const [overdueStatusDistribution, setOverdueStatusDistribution] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [totalBalance, setTotalBalance] = useState(0);
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
    // Currency Distribution
    const currencyCounts = data.reduce((acc, ledger) => {
      acc[ledger.currency] = (acc[ledger.currency] || 0) + 1;
      return acc;
    }, {});

    setCurrencyDistribution(Object.keys(currencyCounts).map(key => ({
      name: key,
      y: currencyCounts[key],
    })));

    // Transaction Type Distribution
    const transactionTypeCounts = data.reduce((acc, ledger) => {
      acc[ledger.transactionType] = (acc[ledger.transactionType] || 0) + 1;
      return acc;
    }, {});

    setTransactionTypeDistribution(Object.keys(transactionTypeCounts).map(key => ({
      name: key,
      y: transactionTypeCounts[key],
    })));

    // Overdue Status Distribution
    const overdueStatusCounts = data.reduce((acc, ledger) => {
      acc[ledger.overdueStatus] = (acc[ledger.overdueStatus] || 0) + 1;
      return acc;
    }, {});

    setOverdueStatusDistribution(Object.keys(overdueStatusCounts).map(key => ({
      name: key === 'yes' ? 'Overdue' : 'Not Overdue',
      y: overdueStatusCounts[key],
    })));

    // Total Amounts and Balances
    const totals = data.reduce(
      (acc, ledger) => {
        acc.amount += Number(ledger.amount) || 0;
        acc.balance += Number(ledger.balance) || 0;
        return acc;
      },
      { amount: 0, balance: 0 }
    );

    setTotalAmount(totals.amount);
    setTotalBalance(totals.balance);
  };

  const currencyChartOptions = {
    chart: { type: 'pie' },
    title: { text: 'Currency Distribution' },
    series: [{ name: 'Currencies', colorByPoint: true, data: currencyDistribution }],
  };

  const transactionTypeChartOptions = {
    chart: { type: 'column' },
    title: { text: 'Transaction Type Distribution' },
    series: [{ name: 'Transaction Types', data: transactionTypeDistribution }],
  };

  const overdueStatusChartOptions = {
    chart: { type: 'pie' },
    title: { text: 'Overdue Status Distribution' },
    series: [{ name: 'Overdue Status', colorByPoint: true, data: overdueStatusDistribution }],
  };

  return (
    <Container maxWidth="xl" sx={{ paddingTop: 3, paddingBottom: 7 }}>
      <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <Box sx={{ padding: 4 }}>
        <Typography variant="h4" gutterBottom>
          Creditors Ledger Analysis Dashboard
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
                  Total amount across all ledger transactions.
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
                <Typography variant="body2">
                  Total outstanding balance across all ledger transactions.
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Chart Section */}
          <Grid item xs={12} md={6}>
            <HighchartsReact highcharts={Highcharts} options={currencyChartOptions} />
          </Grid>
          <Grid item xs={12} md={6}>
            <HighchartsReact highcharts={Highcharts} options={transactionTypeChartOptions} />
          </Grid>
          <Grid item xs={12} md={6}>
            <HighchartsReact highcharts={Highcharts} options={overdueStatusChartOptions} />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
