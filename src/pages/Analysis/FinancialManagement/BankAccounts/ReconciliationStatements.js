import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { Box, Typography, Grid, Card, CardContent, Container } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import Backdrop from '@mui/material/Backdrop';

export default function ReconciliationStatementsAnalysisDashboard({ fetchItems }) {
  const [statementsData, setStatementsData] = useState([]);
  const [currencyDistribution, setCurrencyDistribution] = useState([]);
  const [statusDistribution, setStatusDistribution] = useState([]);
  const [totalBalance, setTotalBalance] = useState(0);
  const [totalLateFees, setTotalLateFees] = useState(0);
  const [ecoContributionTotal, setEcoContributionTotal] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const data = await fetchItems();
      setStatementsData(data);
      processStatementsData(data);
      setLoading(false);
    };

    fetchData();
  }, [fetchItems]);

  const processStatementsData = (data) => {
    // Currency Distribution
    const currencyCounts = data.reduce((acc, statement) => {
      acc[statement.currency] = (acc[statement.currency] || 0) + 1;
      return acc;
    }, {});

    setCurrencyDistribution(Object.keys(currencyCounts).map(key => ({
      name: key,
      y: currencyCounts[key],
    })));

    // Status Distribution
    const statusCounts = data.reduce((acc, statement) => {
      acc[statement.status] = (acc[statement.status] || 0) + 1;
      return acc;
    }, {});

    setStatusDistribution(Object.keys(statusCounts).map(key => ({
      name: key,
      y: statusCounts[key],
    })));

    // Total Balance, Late Payment Fees, and Eco Contribution
    const totals = data.reduce(
      (acc, statement) => {
        acc.balance += Number(statement.balance) || 0;
        acc.lateFees += Number(statement.latePaymentFee) || 0;
        acc.ecoContribution += Number(statement.ecoContribution) || 0;
        return acc;
      },
      { balance: 0, lateFees: 0, ecoContribution: 0 }
    );

    setTotalBalance(totals.balance);
    setTotalLateFees(totals.lateFees);
    setEcoContributionTotal(totals.ecoContribution);
  };

  const currencyChartOptions = {
    chart: { type: 'pie' },
    title: { text: 'Currency Distribution' },
    series: [{ name: 'Currencies', colorByPoint: true, data: currencyDistribution }],
  };

  const statusChartOptions = {
    chart: { type: 'column' },
    title: { text: 'Statement Status Distribution' },
    series: [{ name: 'Status', data: statusDistribution }],
  };

  return (
    <Container maxWidth="xl" sx={{ paddingTop: 3, paddingBottom: 7 }}>
      <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <Box sx={{ padding: 4 }}>
        <Typography variant="h4" gutterBottom>
          Reconciliation Statements Analysis Dashboard
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
                <Typography variant="body2">Total balance across all reconciliation statements.</Typography>
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
                <Typography variant="body2">Total late payment fees across all statements.</Typography>
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
            <HighchartsReact highcharts={Highcharts} options={statusChartOptions} />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
