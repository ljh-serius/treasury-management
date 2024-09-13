import React, { useEffect, useState } from 'react';
import { Box, Grid, Typography, Card, CardContent } from '@mui/material';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const JointVenturesAnalytics = ({ fetchItems }) => {
  const [data, setData] = useState([]);
  const [kpis, setKpis] = useState({
    totalVentures: 0,
    activeVentures: 0,
    closedVentures: 0,
    dissolvedVentures: 0,
    totalCapitalInvested: 0,
  });

  useEffect(() => {
    const loadData = async () => {
      const ventures = await fetchItems();
      setData(ventures);
      calculateKPIs(ventures);
    };

    loadData();
  }, [fetchItems]);

  const calculateKPIs = (items) => {
    const totalVentures = items.length;
    const activeVentures = items.filter((item) => item.status === 'active').length;
    const closedVentures = items.filter((item) => item.status === 'closed').length;
    const dissolvedVentures = items.filter((item) => item.status === 'dissolved').length;
    const totalCapitalInvested = items.reduce((sum, item) => sum + item.capitalInvested, 0);

    setKpis({
      totalVentures,
      activeVentures,
      closedVentures,
      dissolvedVentures,
      totalCapitalInvested,
    });
  };

  const statusChart = {
    chart: {
      type: 'pie',
    },
    title: {
      text: 'Venture Status Distribution',
    },
    series: [
      {
        name: 'Ventures',
        colorByPoint: true,
        data: [
          { name: 'Active', y: kpis.activeVentures },
          { name: 'Closed', y: kpis.closedVentures },
          { name: 'Dissolved', y: kpis.dissolvedVentures },
        ],
      },
    ],
  };

  const capitalChart = {
    chart: {
      type: 'column',
    },
    title: {
      text: 'Capital Invested per Venture',
    },
    xAxis: {
      categories: data.map((item) => item.ventureName),
    },
    yAxis: {
      title: {
        text: 'Capital Invested ($)',
      },
    },
    series: [
      {
        name: 'Capital Invested',
        data: data.map((item) => item.capitalInvested),
      },
    ],
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Joint Ventures Analytics
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6">Total Ventures</Typography>
              <Typography variant="h4">{kpis.totalVentures}</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6">Active Ventures</Typography>
              <Typography variant="h4">{kpis.activeVentures}</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6">Closed Ventures</Typography>
              <Typography variant="h4">{kpis.closedVentures}</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6">Dissolved Ventures</Typography>
              <Typography variant="h4">{kpis.dissolvedVentures}</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6">Total Capital Invested</Typography>
              <Typography variant="h4">${kpis.totalCapitalInvested.toLocaleString()}</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Box mt={4}>
        <HighchartsReact highcharts={Highcharts} options={statusChart} />
      </Box>

      <Box mt={4}>
        <HighchartsReact highcharts={Highcharts} options={capitalChart} />
      </Box>
    </Box>
  );
};

export default JointVenturesAnalytics;
