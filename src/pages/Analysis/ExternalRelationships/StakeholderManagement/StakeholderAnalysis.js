import React, { useEffect, useState } from 'react';
import { Box, Grid, Typography, Card, CardContent } from '@mui/material';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const StakeholderAnalysisAnalytics = ({ fetchItems }) => {
  const [data, setData] = useState([]);
  const [kpis, setKpis] = useState({
    totalStakeholders: 0,
    highInfluence: 0,
    mediumInfluence: 0,
    lowInfluence: 0,
    averageInterestLevel: 0,
  });

  useEffect(() => {
    const loadData = async () => {
      const stakeholders = await fetchItems();
      setData(stakeholders);
      calculateKPIs(stakeholders);
    };

    loadData();
  }, [fetchItems]);

  const calculateKPIs = (items) => {
    const totalStakeholders = items.length;
    const highInfluence = items.filter((item) => item.influenceLevel === 'high').length;
    const mediumInfluence = items.filter((item) => item.influenceLevel === 'medium').length;
    const lowInfluence = items.filter((item) => item.influenceLevel === 'low').length;
    const averageInterestLevel =
      items.reduce((acc, curr) => {
        if (curr.interestLevel === 'high') return acc + 3;
        if (curr.interestLevel === 'medium') return acc + 2;
        return acc + 1;
      }, 0) / totalStakeholders;

    setKpis({
      totalStakeholders,
      highInfluence,
      mediumInfluence,
      lowInfluence,
      averageInterestLevel: averageInterestLevel.toFixed(2),
    });
  };

  const influenceChart = {
    chart: {
      type: 'pie',
    },
    title: {
      text: 'Influence Level Distribution',
    },
    series: [
      {
        name: 'Influence Level',
        colorByPoint: true,
        data: [
          { name: 'High', y: kpis.highInfluence },
          { name: 'Medium', y: kpis.mediumInfluence },
          { name: 'Low', y: kpis.lowInfluence },
        ],
      },
    ],
  };

  const interestLevelChart = {
    chart: {
      type: 'column',
    },
    title: {
      text: 'Interest Level by Stakeholder',
    },
    xAxis: {
      categories: data.map((item) => item.stakeholderName),
    },
    yAxis: {
      title: {
        text: 'Interest Level',
      },
    },
    series: [
      {
        name: 'Interest Level',
        data: data.map((item) =>
          item.interestLevel === 'high' ? 3 : item.interestLevel === 'medium' ? 2 : 1
        ),
      },
    ],
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Stakeholder Analysis Analytics
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6">Total Stakeholders</Typography>
              <Typography variant="h4">{kpis.totalStakeholders}</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6">High Influence</Typography>
              <Typography variant="h4">{kpis.highInfluence}</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6">Medium Influence</Typography>
              <Typography variant="h4">{kpis.mediumInfluence}</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6">Low Influence</Typography>
              <Typography variant="h4">{kpis.lowInfluence}</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Grid container spacing={3} mt={4}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6">Average Interest Level</Typography>
              <Typography variant="h4">{kpis.averageInterestLevel}</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Box mt={4}>
        <HighchartsReact highcharts={Highcharts} options={influenceChart} />
      </Box>

      <Box mt={4}>
        <HighchartsReact highcharts={Highcharts} options={interestLevelChart} />
      </Box>
    </Box>
  );
};

export default StakeholderAnalysisAnalytics;
