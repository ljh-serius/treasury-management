import React, { useEffect, useState } from 'react';
import { Box, Grid, Typography, Card, CardContent } from '@mui/material';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const CourtAppearancesAnalytics = ({ fetchItems }) => {
  const [data, setData] = useState([]);
  const [kpis, setKpis] = useState({
    totalAppearances: 0,
    scheduledAppearances: 0,
    completedAppearances: 0,
    postponedAppearances: 0,
  });

  useEffect(() => {
    const loadData = async () => {
      const appearances = await fetchItems();
      setData(appearances);
      calculateKPIs(appearances);
    };

    loadData();
  }, [fetchItems]);

  const calculateKPIs = (items) => {
    const totalAppearances = items.length;
    const scheduledAppearances = items.filter((item) => item.status === 'scheduled').length;
    const completedAppearances = items.filter((item) => item.status === 'completed').length;
    const postponedAppearances = items.filter((item) => item.status === 'postponed').length;

    setKpis({
      totalAppearances,
      scheduledAppearances,
      completedAppearances,
      postponedAppearances,
    });
  };

  const statusChart = {
    chart: {
      type: 'pie',
    },
    title: {
      text: 'Appearance Status Distribution',
    },
    series: [
      {
        name: 'Appearances',
        colorByPoint: true,
        data: [
          { name: 'Scheduled', y: kpis.scheduledAppearances },
          { name: 'Completed', y: kpis.completedAppearances },
          { name: 'Postponed', y: kpis.postponedAppearances },
        ],
      },
    ],
  };

  const courtChart = {
    chart: {
      type: 'column',
    },
    title: {
      text: 'Appearances by Court',
    },
    xAxis: {
      categories: data.map((item) => item.court),
    },
    yAxis: {
      title: {
        text: 'Number of Appearances',
      },
    },
    series: [
      {
        name: 'Appearances',
        data: data.reduce((acc, curr) => {
          acc[curr.court] = (acc[curr.court] || 0) + 1;
          return acc;
        }, {}),
      },
    ],
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Court Appearances Analytics
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6">Total Appearances</Typography>
              <Typography variant="h4">{kpis.totalAppearances}</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6">Scheduled Appearances</Typography>
              <Typography variant="h4">{kpis.scheduledAppearances}</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6">Completed Appearances</Typography>
              <Typography variant="h4">{kpis.completedAppearances}</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6">Postponed Appearances</Typography>
              <Typography variant="h4">{kpis.postponedAppearances}</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Box mt={4}>
        <HighchartsReact highcharts={Highcharts} options={statusChart} />
      </Box>

      <Box mt={4}>
        <HighchartsReact highcharts={Highcharts} options={courtChart} />
      </Box>
    </Box>
  );
};

export default CourtAppearancesAnalytics;
