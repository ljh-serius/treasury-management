import React, { useEffect, useState } from 'react';
import { Box, Grid, Typography, Card, CardContent } from '@mui/material';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const FixedIncomeInvestmentsAnalytics = ({ fetchItems }) => {
  const [data, setData] = useState([]);
  const [kpis, setKpis] = useState({
    totalInvestments: 0,
    activeInvestments: 0,
    maturedInvestments: 0,
    soldInvestments: 0,
    averageInterestRate: 0,
  });

  useEffect(() => {
    const loadData = async () => {
      const investments = await fetchItems();
      setData(investments);
      calculateKPIs(investments);
    };

    loadData();
  }, [fetchItems]);

  const calculateKPIs = (items) => {
    const totalInvestments = items.length;
    const activeInvestments = items.filter((item) => item.status === 'active').length;
    const maturedInvestments = items.filter((item) => item.status === 'matured').length;
    const soldInvestments = items.filter((item) => item.status === 'sold').length;
    const averageInterestRate = (
      items.reduce((acc, curr) => acc + parseFloat(curr.interestRate || 0), 0) / totalInvestments
    ).toFixed(2);

    setKpis({
      totalInvestments,
      activeInvestments,
      maturedInvestments,
      soldInvestments,
      averageInterestRate,
    });
  };

  const statusChart = {
    chart: {
      type: 'pie',
    },
    title: {
      text: 'Investment Status Distribution',
    },
    series: [
      {
        name: 'Investments',
        colorByPoint: true,
        data: [
          { name: 'Active', y: kpis.activeInvestments },
          { name: 'Matured', y: kpis.maturedInvestments },
          { name: 'Sold', y: kpis.soldInvestments },
        ],
      },
    ],
  };

  const interestRateChart = {
    chart: {
      type: 'column',
    },
    title: {
      text: 'Interest Rate by Issuer',
    },
    xAxis: {
      categories: data.map((item) => item.issuerName),
    },
    yAxis: {
      title: {
        text: 'Interest Rate (%)',
      },
    },
    series: [
      {
        name: 'Interest Rate',
        data: data.map((item) => parseFloat(item.interestRate || 0)),
      },
    ],
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Fixed Income Investments Analytics
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6">Total Investments</Typography>
              <Typography variant="h4">{kpis.totalInvestments}</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6">Active Investments</Typography>
              <Typography variant="h4">{kpis.activeInvestments}</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6">Matured Investments</Typography>
              <Typography variant="h4">{kpis.maturedInvestments}</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6">Sold Investments</Typography>
              <Typography variant="h4">{kpis.soldInvestments}</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Grid container spacing={3} mt={4}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6">Average Interest Rate (%)</Typography>
              <Typography variant="h4">{kpis.averageInterestRate}</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Box mt={4}>
        <HighchartsReact highcharts={Highcharts} options={statusChart} />
      </Box>

      <Box mt={4}>
        <HighchartsReact highcharts={Highcharts} options={interestRateChart} />
      </Box>
    </Box>
  );
};

export default FixedIncomeInvestmentsAnalytics;
