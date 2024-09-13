import React, { useEffect, useState } from 'react';
import { Box, Grid, Typography, Card, CardContent } from '@mui/material';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const GreenInitiativesAnalytics = ({ fetchItems }) => {
  const [data, setData] = useState([]);
  const [kpis, setKpis] = useState({
    totalInitiatives: 0,
    totalBudget: 0,
    ongoingInitiatives: 0,
    completedInitiatives: 0,
    plannedInitiatives: 0,
  });

  useEffect(() => {
    const loadData = async () => {
      const initiatives = await fetchItems();
      setData(initiatives);
      calculateKPIs(initiatives);
    };

    loadData();
  }, [fetchItems]);

  const calculateKPIs = (initiatives) => {
    const totalInitiatives = initiatives.length;
    const totalBudget = initiatives.reduce((sum, initiative) => sum + initiative.budget, 0);
    const ongoingInitiatives = initiatives.filter((init) => init.status === 'ongoing').length;
    const completedInitiatives = initiatives.filter((init) => init.status === 'completed').length;
    const plannedInitiatives = initiatives.filter((init) => init.status === 'planned').length;

    setKpis({
      totalInitiatives,
      totalBudget,
      ongoingInitiatives,
      completedInitiatives,
      plannedInitiatives,
    });
  };

  const initiativeStatusChart = {
    chart: {
      type: 'pie',
    },
    title: {
      text: 'Initiative Status Distribution',
    },
    series: [
      {
        name: 'Initiatives',
        colorByPoint: true,
        data: [
          { name: 'Ongoing', y: kpis.ongoingInitiatives },
          { name: 'Completed', y: kpis.completedInitiatives },
          { name: 'Planned', y: kpis.plannedInitiatives },
        ],
      },
    ],
  };

  const budgetChart = {
    chart: {
      type: 'column',
    },
    title: {
      text: 'Budget Allocation per Initiative',
    },
    xAxis: {
      categories: data.map((initiative) => initiative.initiativeTitle),
    },
    yAxis: {
      title: {
        text: 'Budget ($)',
      },
    },
    series: [
      {
        name: 'Budget',
        data: data.map((initiative) => initiative.budget),
      },
    ],
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Green Initiatives Analytics
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6">Total Initiatives</Typography>
              <Typography variant="h4">{kpis.totalInitiatives}</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6">Total Budget</Typography>
              <Typography variant="h4">${kpis.totalBudget.toLocaleString()}</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6">Ongoing Initiatives</Typography>
              <Typography variant="h4">{kpis.ongoingInitiatives}</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6">Completed Initiatives</Typography>
              <Typography variant="h4">{kpis.completedInitiatives}</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6">Planned Initiatives</Typography>
              <Typography variant="h4">{kpis.plannedInitiatives}</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Box mt={4}>
        <HighchartsReact highcharts={Highcharts} options={initiativeStatusChart} />
      </Box>

      <Box mt={4}>
        <HighchartsReact highcharts={Highcharts} options={budgetChart} />
      </Box>
    </Box>
  );
};

export default GreenInitiativesAnalytics;
