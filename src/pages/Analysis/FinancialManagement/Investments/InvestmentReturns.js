import React, { useEffect, useState } from 'react';
import { Box, Grid, Typography, Card, CardContent } from '@mui/material';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const InvestmentReturnsAnalytics = ({ fetchItems }) => {
  const [data, setData] = useState([]);
  const [kpis, setKpis] = useState({
    totalReturns: 0,
    totalROI: 0,
    receivedReturns: 0,
    pendingReturns: 0,
  });

  useEffect(() => {
    const loadData = async () => {
      const returns = await fetchItems();
      setData(returns);
      calculateKPIs(returns);
    };

    loadData();
  }, [fetchItems]);

  const calculateKPIs = (items) => {
    const totalReturns = items.reduce((acc, curr) => acc + parseFloat(curr.returnAmount || 0), 0);
    const totalROI = (
      items.reduce((acc, curr) => acc + parseFloat(curr.roi || 0), 0) / items.length
    ).toFixed(2);
    const receivedReturns = items.filter((item) => item.status === 'received').length;
    const pendingReturns = items.filter((item) => item.status === 'pending').length;

    setKpis({
      totalReturns,
      totalROI,
      receivedReturns,
      pendingReturns,
    });
  };

  const statusChart = {
    chart: {
      type: 'pie',
    },
    title: {
      text: 'Return Status Distribution',
    },
    series: [
      {
        name: 'Returns',
        colorByPoint: true,
        data: [
          { name: 'Received', y: kpis.receivedReturns },
          { name: 'Pending', y: kpis.pendingReturns },
        ],
      },
    ],
  };

  const roiChart = {
    chart: {
      type: 'column',
    },
    title: {
      text: 'Return on Investment (ROI) by Investment Type',
    },
    xAxis: {
      categories: data.map((item) => item.investmentType),
    },
    yAxis: {
      title: {
        text: 'ROI (%)',
      },
    },
    series: [
      {
        name: 'ROI',
        data: data.map((item) => parseFloat(item.roi || 0)),
      },
    ],
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Investment Returns Analytics
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6">Total Returns ($)</Typography>
              <Typography variant="h4">{kpis.totalReturns}</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6">Average ROI (%)</Typography>
              <Typography variant="h4">{kpis.totalROI}</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6">Received Returns</Typography>
              <Typography variant="h4">{kpis.receivedReturns}</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6">Pending Returns</Typography>
              <Typography variant="h4">{kpis.pendingReturns}</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Box mt={4}>
        <HighchartsReact highcharts={Highcharts} options={statusChart} />
      </Box>

      <Box mt={4}>
        <HighchartsReact highcharts={Highcharts} options={roiChart} />
      </Box>
    </Box>
  );
};

export default InvestmentReturnsAnalytics;
