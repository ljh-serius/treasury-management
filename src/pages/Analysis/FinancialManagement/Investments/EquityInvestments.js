import React, { useEffect, useState } from 'react';
import { Box, Grid, Typography, Card, CardContent } from '@mui/material';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const EquityInvestmentsAnalytics = ({ fetchItems }) => {
  const [data, setData] = useState([]);
  const [kpis, setKpis] = useState({
    totalInvestments: 0,
    activeInvestments: 0,
    soldInvestments: 0,
    inactiveInvestments: 0,
    totalShares: 0,
    totalCurrentValue: 0,
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
    const soldInvestments = items.filter((item) => item.status === 'sold').length;
    const inactiveInvestments = items.filter((item) => item.status === 'inactive').length;
    const totalShares = items.reduce((acc, curr) => acc + (curr.sharesHeld || 0), 0);
    const totalCurrentValue = items.reduce((acc, curr) => acc + (parseFloat(curr.currentValue || 0)), 0);

    setKpis({
      totalInvestments,
      activeInvestments,
      soldInvestments,
      inactiveInvestments,
      totalShares,
      totalCurrentValue: totalCurrentValue.toFixed(2),
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
          { name: 'Sold', y: kpis.soldInvestments },
          { name: 'Inactive', y: kpis.inactiveInvestments },
        ],
      },
    ],
  };

  const companyValueChart = {
    chart: {
      type: 'column',
    },
    title: {
      text: 'Current Value by Company',
    },
    xAxis: {
      categories: data.map((item) => item.companyName),
    },
    yAxis: {
      title: {
        text: 'Current Value (USD)',
      },
    },
    series: [
      {
        name: 'Current Value',
        data: data.map((item) => parseFloat(item.currentValue || 0)),
      },
    ],
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Equity Investments Analytics
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
              <Typography variant="h6">Sold Investments</Typography>
              <Typography variant="h4">{kpis.soldInvestments}</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6">Inactive Investments</Typography>
              <Typography variant="h4">{kpis.inactiveInvestments}</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6">Total Shares Held</Typography>
              <Typography variant="h4">{kpis.totalShares}</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6">Total Current Value (USD)</Typography>
              <Typography variant="h4">{kpis.totalCurrentValue}</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Box mt={4}>
        <HighchartsReact highcharts={Highcharts} options={statusChart} />
      </Box>

      <Box mt={4}>
        <HighchartsReact highcharts={Highcharts} options={companyValueChart} />
      </Box>
    </Box>
  );
};

export default EquityInvestmentsAnalytics;
