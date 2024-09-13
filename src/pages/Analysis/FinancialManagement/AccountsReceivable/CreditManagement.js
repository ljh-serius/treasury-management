import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { Box, Typography, Grid, Card, CardContent, Container } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import Backdrop from '@mui/material/Backdrop';

export default function CreditManagementDashboard({ fetchItems }) {
  const [creditData, setCreditData] = useState([]);
  const [currencyDistribution, setCurrencyDistribution] = useState([]);
  const [riskLevelDistribution, setRiskLevelDistribution] = useState([]);
  const [creditLimitTrendsData, setCreditLimitTrendsData] = useState([]);
  const [outstandingBalanceTrendsData, setOutstandingBalanceTrendsData] = useState([]);
  const [tagsDistribution, setTagsDistribution] = useState([]);
  const [totalCredits, setTotalCredits] = useState(0);
  const [totalCreditLimit, setTotalCreditLimit] = useState(0);
  const [totalOutstandingBalance, setTotalOutstandingBalance] = useState(0);
  const [averageCreditLimit, setAverageCreditLimit] = useState(0);
  const [averageOutstandingBalance, setAverageOutstandingBalance] = useState(0);
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
    // Total Number of Credits
    setTotalCredits(data.length);

    // Total Credit Limit and Outstanding Balance
    const totals = data.reduce(
      (acc, credit) => {
        acc.creditLimit += Number(credit.creditLimit) || 0;
        acc.outstandingBalance += Number(credit.outstandingBalance) || 0;
        return acc;
      },
      { creditLimit: 0, outstandingBalance: 0 }
    );

    setTotalCreditLimit(totals.creditLimit);
    setTotalOutstandingBalance(totals.outstandingBalance);
    setAverageCreditLimit(totals.creditLimit / data.length);
    setAverageOutstandingBalance(totals.outstandingBalance / data.length);

    // Credits by Currency
    const currencyCounts = data.reduce((acc, credit) => {
      acc[credit.currency] = (acc[credit.currency] || 0) + 1;
      return acc;
    }, {});

    setCurrencyDistribution(Object.keys(currencyCounts).map(key => ({
      name: key,
      y: currencyCounts[key],
    })));

    // Credits by Risk Level
    const riskLevelCounts = data.reduce((acc, credit) => {
      acc[credit.riskLevel] = (acc[credit.riskLevel] || 0) + 1;
      return acc;
    }, {});

    setRiskLevelDistribution(Object.keys(riskLevelCounts).map(key => ({
      name: key.charAt(0).toUpperCase() + key.slice(1),  // Capitalize risk level
      y: riskLevelCounts[key],
    })));

    // Tags Distribution
    const tagsCounts = data.reduce((acc, credit) => {
      credit.tags.forEach(tag => {
        acc[tag] = (acc[tag] || 0) + 1;
      });
      return acc;
    }, {});

    setTagsDistribution(Object.keys(tagsCounts).map(key => ({
      name: key,
      y: tagsCounts[key],
    })));

    // Credit Limits Over Time
    const creditLimitTrends = data.reduce((acc, credit) => {
      const month = new Date(credit.createdDate).getMonth() + 1;
      acc[month] = (acc[month] || 0) + Number(credit.creditLimit);
      return acc;
    }, {});

    setCreditLimitTrendsData(Object.keys(creditLimitTrends).map(key => ({
      name: `Month ${key}`,
      y: creditLimitTrends[key],
    })));

    // Outstanding Balances Over Time
    const outstandingBalanceTrends = data.reduce((acc, credit) => {
      const month = new Date(credit.createdDate).getMonth() + 1;
      acc[month] = (acc[month] || 0) + Number(credit.outstandingBalance);
      return acc;
    }, {});

    setOutstandingBalanceTrendsData(Object.keys(outstandingBalanceTrends).map(key => ({
      name: `Month ${key}`,
      y: outstandingBalanceTrends[key],
    })));
  };

  // Chart options for each chart
  const currencyChartOptions = {
    chart: {
      type: 'pie',
    },
    title: {
      text: 'Credits by Currency',
    },
    series: [
      {
        name: 'Currencies',
        colorByPoint: true,
        data: currencyDistribution,
      },
    ],
  };

  const riskLevelChartOptions = {
    chart: {
      type: 'column',
    },
    title: {
      text: 'Credits by Risk Level',
    },
    series: [
      {
        name: 'Risk Levels',
        data: riskLevelDistribution,
      },
    ],
  };

  const creditLimitTrendsChartOptions = {
    chart: {
      type: 'line',
    },
    title: {
      text: 'Credit Limits Over Time',
    },
    xAxis: {
      categories: creditLimitTrendsData.map(data => data.name),
    },
    series: [
      {
        name: 'Credit Limit',
        data: creditLimitTrendsData.map(data => data.y),
      },
    ],
  };

  const outstandingBalanceTrendsChartOptions = {
    chart: {
      type: 'line',
    },
    title: {
      text: 'Outstanding Balances Over Time',
    },
    xAxis: {
      categories: outstandingBalanceTrendsData.map(data => data.name),
    },
    series: [
      {
        name: 'Outstanding Balance',
        data: outstandingBalanceTrendsData.map(data => data.y),
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
          Credit Management Dashboard
        </Typography>
        <Grid container spacing={4}>
          {/* KPI Section */}
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6">Total Credits</Typography>
                <Typography variant="h4" color="green" sx={{ fontWeight: 'bold' }}>
                  {totalCredits}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6">Total Credit Limit</Typography>
                <Typography variant="h4" color="blue" sx={{ fontWeight: 'bold' }}>
                  ${totalCreditLimit.toFixed(2)}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6">Total Outstanding Balance</Typography>
                <Typography variant="h4" color="orange" sx={{ fontWeight: 'bold' }}>
                  ${totalOutstandingBalance.toFixed(2)}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6">Average Credit Limit</Typography>
                <Typography variant="h4" color="purple" sx={{ fontWeight: 'bold' }}>
                  ${averageCreditLimit.toFixed(2)}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6">Average Outstanding Balance</Typography>
                <Typography variant="h4" color="red" sx={{ fontWeight: 'bold' }}>
                  ${averageOutstandingBalance.toFixed(2)}
                </Typography>
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
          <Grid item xs={12} md={6}>
            <HighchartsReact highcharts={Highcharts} options={creditLimitTrendsChartOptions} />
          </Grid>
          <Grid item xs={12} md={6}>
            <HighchartsReact highcharts={Highcharts} options={outstandingBalanceTrendsChartOptions} />
          </Grid>
          <Grid item xs={12} md={12}>
            <HighchartsReact highcharts={Highcharts} options={tagsChartOptions} />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
