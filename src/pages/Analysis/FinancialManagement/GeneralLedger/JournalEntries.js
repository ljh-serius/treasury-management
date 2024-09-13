import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { Box, Typography, Grid, Card, CardContent, Container } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import Backdrop from '@mui/material/Backdrop';

export default function JournalEntriesDashboard({ fetchItems }) {
  const [journalData, setJournalData] = useState([]);
  const [currencyDistribution, setCurrencyDistribution] = useState([]);
  const [debitsOverTime, setDebitsOverTime] = useState([]);
  const [creditsOverTime, setCreditsOverTime] = useState([]);
  const [netBalanceOverTime, setNetBalanceOverTime] = useState([]);
  const [entriesOverTime, setEntriesOverTime] = useState([]);
  const [tagsDistribution, setTagsDistribution] = useState([]);
  const [totalEntries, setTotalEntries] = useState(0);
  const [totalDebit, setTotalDebit] = useState(0);
  const [totalCredit, setTotalCredit] = useState(0);
  const [netBalance, setNetBalance] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const data = await fetchItems();
      setJournalData(data);
      processJournalData(data);
      setLoading(false);
    };

    fetchData();
  }, [fetchItems]);

  const processJournalData = (data) => {
    // Total Number of Journal Entries
    setTotalEntries(data.length);

    // Total Debit and Credit Amounts
    const totals = data.reduce(
      (acc, entry) => {
        acc.debit += Number(entry.debit) || 0;
        acc.credit += Number(entry.credit) || 0;
        return acc;
      },
      { debit: 0, credit: 0 }
    );

    setTotalDebit(totals.debit);
    setTotalCredit(totals.credit);
    setNetBalance(totals.debit - totals.credit);

    // Entries by Currency
    const currencyCounts = data.reduce((acc, entry) => {
      acc[entry.currency] = (acc[entry.currency] || 0) + 1;
      return acc;
    }, {});

    setCurrencyDistribution(Object.keys(currencyCounts).map(key => ({
      name: key,
      y: currencyCounts[key],
    })));

    // Debits and Credits Over Time
    const debitsCreditsOverTime = data.reduce((acc, entry) => {
      const month = new Date(entry.date).getMonth() + 1;
      acc[month] = acc[month] || { debit: 0, credit: 0 };
      acc[month].debit += Number(entry.debit) || 0;
      acc[month].credit += Number(entry.credit) || 0;
      return acc;
    }, {});

    setDebitsOverTime(Object.keys(debitsCreditsOverTime).map(key => ({
      name: `Month ${key}`,
      y: debitsCreditsOverTime[key].debit,
    })));

    setCreditsOverTime(Object.keys(debitsCreditsOverTime).map(key => ({
      name: `Month ${key}`,
      y: debitsCreditsOverTime[key].credit,
    })));

    // Net Balance Over Time
    setNetBalanceOverTime(Object.keys(debitsCreditsOverTime).map(key => ({
      name: `Month ${key}`,
      y: debitsCreditsOverTime[key].debit - debitsCreditsOverTime[key].credit,
    })));

    // Entries Distribution Over Time
    const entriesCounts = data.reduce((acc, entry) => {
      const month = new Date(entry.date).getMonth() + 1;
      acc[month] = (acc[month] || 0) + 1;
      return acc;
    }, {});

    setEntriesOverTime(Object.keys(entriesCounts).map(key => ({
      name: `Month ${key}`,
      y: entriesCounts[key],
    })));

    // Tags Distribution
    const tagsCounts = data.reduce((acc, entry) => {
      entry.tags.forEach(tag => {
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
      text: 'Entries by Currency',
    },
    series: [
      {
        name: 'Currencies',
        colorByPoint: true,
        data: currencyDistribution,
      },
    ],
  };

  const debitsCreditsChartOptions = {
    chart: {
      type: 'column',
    },
    title: {
      text: 'Debits and Credits Over Time',
    },
    xAxis: {
      categories: debitsOverTime.map(data => data.name),
    },
    series: [
      {
        name: 'Debits',
        data: debitsOverTime.map(data => data.y),
      },
      {
        name: 'Credits',
        data: creditsOverTime.map(data => data.y),
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

  const entriesOverTimeChartOptions = {
    chart: {
      type: 'line',
    },
    title: {
      text: 'Entries Distribution Over Time',
    },
    xAxis: {
      categories: entriesOverTime.map(data => data.name),
    },
    series: [
      {
        name: 'Number of Entries',
        data: entriesOverTime.map(data => data.y),
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
          Journal Entries Dashboard
        </Typography>
        <Grid container spacing={4}>
          {/* KPI Section */}
          <Grid item xs={12} md={3}>
            <Card>
              <CardContent>
                <Typography variant="h6">Total Entries</Typography>
                <Typography variant="h4" color="green" sx={{ fontWeight: 'bold' }}>
                  {totalEntries}
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
            <HighchartsReact highcharts={Highcharts} options={debitsCreditsChartOptions} />
          </Grid>
          <Grid item xs={12} md={6}>
            <HighchartsReact highcharts={Highcharts} options={netBalanceChartOptions} />
          </Grid>
          <Grid item xs={12} md={6}>
            <HighchartsReact highcharts={Highcharts} options={entriesOverTimeChartOptions} />
          </Grid>
          <Grid item xs={12} md={12}>
            <HighchartsReact highcharts={Highcharts} options={tagsChartOptions} />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
