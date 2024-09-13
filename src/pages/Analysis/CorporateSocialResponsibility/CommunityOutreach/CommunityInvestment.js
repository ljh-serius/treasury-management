import React, { useEffect, useState } from 'react';
import { Box, Grid, Typography, Card, CardContent } from '@mui/material';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const CommunityInvestmentAnalytics = ({ fetchItems }) => {
  const [data, setData] = useState([]);
  const [kpis, setKpis] = useState({
    totalInvestments: 0,
    totalAmount: 0,
    completedProjects: 0,
    ongoingProjects: 0,
    plannedProjects: 0,
  });

  useEffect(() => {
    const loadData = async () => {
      const investments = await fetchItems();
      setData(investments);
      calculateKPIs(investments);
    };

    loadData();
  }, [fetchItems]);

  const calculateKPIs = (investments) => {
    const totalInvestments = investments.length;
    const totalAmount = investments.reduce((sum, item) => sum + item.investmentAmount, 0);
    const completedProjects = investments.filter((inv) => inv.status === 'completed').length;
    const ongoingProjects = investments.filter((inv) => inv.status === 'ongoing').length;
    const plannedProjects = investments.filter((inv) => inv.status === 'planned').length;

    setKpis({
      totalInvestments,
      totalAmount,
      completedProjects,
      ongoingProjects,
      plannedProjects,
    });
  };

  const investmentStatusChart = {
    chart: {
      type: 'pie',
    },
    title: {
      text: 'Investment Status Distribution',
    },
    series: [
      {
        name: 'Projects',
        colorByPoint: true,
        data: [
          { name: 'Completed', y: kpis.completedProjects },
          { name: 'Ongoing', y: kpis.ongoingProjects },
          { name: 'Planned', y: kpis.plannedProjects },
        ],
      },
    ],
  };

  const investmentAmountChart = {
    chart: {
      type: 'column',
    },
    title: {
      text: 'Investment Amount by Project',
    },
    xAxis: {
      categories: data.map((item) => item.projectName),
    },
    yAxis: {
      title: {
        text: 'Investment Amount (USD)',
      },
    },
    series: [
      {
        name: 'Investment Amount',
        data: data.map((item) => item.investmentAmount),
      },
    ],
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Community Investment Analytics
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
              <Typography variant="h6">Total Investment Amount</Typography>
              <Typography variant="h4">${kpis.totalAmount.toFixed(2)}</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6">Completed Projects</Typography>
              <Typography variant="h4">{kpis.completedProjects}</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6">Ongoing Projects</Typography>
              <Typography variant="h4">{kpis.ongoingProjects}</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6">Planned Projects</Typography>
              <Typography variant="h4">{kpis.plannedProjects}</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Box mt={4}>
        <HighchartsReact highcharts={Highcharts} options={investmentStatusChart} />
      </Box>

      <Box mt={4}>
        <HighchartsReact highcharts={Highcharts} options={investmentAmountChart} />
      </Box>
    </Box>
  );
};

export default CommunityInvestmentAnalytics;
