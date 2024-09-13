import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { Box, Typography, Grid, Card, CardContent, Container } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import Backdrop from '@mui/material/Backdrop';

export default function ReconciliationStatementsDashboard({ fetchItems }) {
  const [statementsData, setStatementsData] = useState([]);
  const [statusDistribution, setStatusDistribution] = useState([]);
  const [balanceByCurrency, setBalanceByCurrency] = useState([]);
  const [statementsOverTimeData, setStatementsOverTimeData] = useState([]);
  const [averageBalanceByStatus, setAverageBalanceByStatus] = useState([]);
  const [tagsDistribution, setTagsDistribution] = useState([]);
  const [totalStatements, setTotalStatements] = useState(0);
  const [totalBalance, setTotalBalance] = useState(0);
  const [averageBalance, setAverageBalance] = useState(0);
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
    // Total Number of Reconciliation Statements
    setTotalStatements(data.length);

    // Total Balance
    const totalBalance = data.reduce((acc, statement) => acc + Number(statement.balance), 0);
    setTotalBalance(totalBalance);

    // Average Balance
    setAverageBalance(totalBalance / data.length);

    // Reconciliation Status Distribution
    const statusCounts = data.reduce((acc, statement) => {
      acc[statement.status] = (acc[statement.status] || 0) + 1;
      return acc;
    }, {});

    setStatusDistribution(Object.keys(statusCounts).map(key => ({
      name: key.charAt(0).toUpperCase() + key.slice(1),  // Capitalize status
      y: statusCounts[key],
    })));

    // Total Balance by Currency
    const balanceByCurrency = data.reduce((acc, statement) => {
      acc[statement.currency] = (acc[statement.currency] || 0) + Number(statement.balance);
      return acc;
    }, {});

    setBalanceByCurrency(Object.keys(balanceByCurrency).map(key => ({
      name: key,
      y: balanceByCurrency[key],
    })));

    // Reconciliation Statements Over Time
    const statementsByMonth = data.reduce((acc, statement) => {
      const month = new Date(statement.reconciliationDate).getMonth() + 1;
      acc[month] = (acc[month] || 0) + 1;
      return acc;
    }, {});

    setStatementsOverTimeData(Object.keys(statementsByMonth).map(key => ({
      name: `Month ${key}`,
      y: statementsByMonth[key],
    })));

    // Average Balance by Status
    const balanceByStatus = data.reduce((acc, statement) => {
      acc[statement.status] = acc[statement.status] || { totalBalance: 0, count: 0 };
      acc[statement.status].totalBalance += Number(statement.balance);
      acc[statement.status].count += 1;
      return acc;
    }, {});

    setAverageBalanceByStatus(Object.keys(balanceByStatus).map(key => ({
      name: key.charAt(0).toUpperCase() + key.slice(1),
      y: balanceByStatus[key].totalBalance / balanceByStatus[key].count || 0,
    })));

    // Tags Distribution
    const tagsCounts = data.reduce((acc, statement) => {
      statement.tags.forEach(tag => {
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
  const statusChartOptions = {
    chart: {
      type: 'pie',
    },
    title: {
      text: 'Reconciliation Status Distribution',
    },
    series: [
      {
        name: 'Status',
        colorByPoint: true,
        data: statusDistribution,
      },
    ],
  };

  const balanceByCurrencyChartOptions = {
    chart: {
      type: 'column',
    },
    title: {
      text: 'Total Balance by Currency',
    },
    series: [
      {
        name: 'Balance',
        data: balanceByCurrency,
      },
    ],
  };

  const statementsOverTimeChartOptions = {
    chart: {
      type: 'line',
    },
    title: {
      text: 'Reconciliation Statements Over Time',
    },
    xAxis: {
      categories: statementsOverTimeData.map(data => data.name),
    },
    series: [
      {
        name: 'Number of Statements',
        data: statementsOverTimeData.map(data => data.y),
      },
    ],
  };

  const averageBalanceByStatusChartOptions = {
    chart: {
      type: 'bar',
    },
    title: {
      text: 'Average Balance by Status',
    },
    series: [
      {
        name: 'Average Balance',
        data: averageBalanceByStatus,
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
          Reconciliation Statements Dashboard
        </Typography>
        <Grid container spacing={4}>
          {/* KPI Section */}
          <Grid item xs={12} md={3}>
            <Card>
              <CardContent>
                <Typography variant="h6">Total Statements</Typography>
                <Typography variant="h4" color="green" sx={{ fontWeight: 'bold' }}>
                  {totalStatements}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={3}>
            <Card>
              <CardContent>
                <Typography variant="h6">Total Balance</Typography>
                <Typography variant="h4" color="blue" sx={{ fontWeight: 'bold' }}>
                  ${totalBalance.toFixed(2)}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={3}>
            <Card>
              <CardContent>
                <Typography variant="h6">Average Balance</Typography>
                <Typography variant="h4" color="orange" sx={{ fontWeight: 'bold' }}>
                  ${averageBalance.toFixed(2)}
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Chart Section */}
          <Grid item xs={12} md={6}>
            <HighchartsReact highcharts={Highcharts} options={statusChartOptions} />
          </Grid>
          <Grid item xs={12} md={6}>
            <HighchartsReact highcharts={Highcharts} options={balanceByCurrencyChartOptions} />
          </Grid>
          <Grid item xs={12} md={6}>
            <HighchartsReact highcharts={Highcharts} options={statementsOverTimeChartOptions} />
          </Grid>
          <Grid item xs={12} md={6}>
            <HighchartsReact highcharts={Highcharts} options={averageBalanceByStatusChartOptions} />
          </Grid>
          <Grid item xs={12} md={12}>
            <HighchartsReact highcharts={Highcharts} options={tagsChartOptions} />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
