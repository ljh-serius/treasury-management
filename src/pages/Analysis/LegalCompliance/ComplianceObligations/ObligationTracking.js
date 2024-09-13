import React, { useEffect, useState } from 'react';
import { Box, Grid, Typography, Card, CardContent } from '@mui/material';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const ObligationTrackingAnalytics = ({ fetchItems }) => {
  const [data, setData] = useState([]);
  const [kpis, setKpis] = useState({
    totalObligations: 0,
    pendingObligations: 0,
    fulfilledObligations: 0,
    overdueObligations: 0,
  });

  useEffect(() => {
    const loadData = async () => {
      const obligations = await fetchItems();
      setData(obligations);
      calculateKPIs(obligations);
    };

    loadData();
  }, [fetchItems]);

  const calculateKPIs = (items) => {
    const totalObligations = items.length;
    const pendingObligations = items.filter((item) => item.status === 'pending').length;
    const fulfilledObligations = items.filter((item) => item.status === 'fulfilled').length;
    const overdueObligations = items.filter((item) => item.status === 'overdue').length;

    setKpis({
      totalObligations,
      pendingObligations,
      fulfilledObligations,
      overdueObligations,
    });
  };

  const statusChart = {
    chart: {
      type: 'pie',
    },
    title: {
      text: 'Obligation Status Distribution',
    },
    series: [
      {
        name: 'Obligations',
        colorByPoint: true,
        data: [
          { name: 'Pending', y: kpis.pendingObligations },
          { name: 'Fulfilled', y: kpis.fulfilledObligations },
          { name: 'Overdue', y: kpis.overdueObligations },
        ],
      },
    ],
  };

  const obligationTypeChart = {
    chart: {
      type: 'column',
    },
    title: {
      text: 'Obligations by Type',
    },
    xAxis: {
      categories: ['Regulatory', 'Contractual', 'Legal'],
    },
    yAxis: {
      title: {
        text: 'Number of Obligations',
      },
    },
    series: [
      {
        name: 'Obligations',
        data: [
          data.filter((item) => item.obligationType === 'regulatory').length,
          data.filter((item) => item.obligationType === 'contractual').length,
          data.filter((item) => item.obligationType === 'legal').length,
        ],
      },
    ],
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Obligation Tracking Analytics
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6">Total Obligations</Typography>
              <Typography variant="h4">{kpis.totalObligations}</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6">Pending Obligations</Typography>
              <Typography variant="h4">{kpis.pendingObligations}</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6">Fulfilled Obligations</Typography>
              <Typography variant="h4">{kpis.fulfilledObligations}</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6">Overdue Obligations</Typography>
              <Typography variant="h4">{kpis.overdueObligations}</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Box mt={4}>
        <HighchartsReact highcharts={Highcharts} options={statusChart} />
      </Box>

      <Box mt={4}>
        <HighchartsReact highcharts={Highcharts} options={obligationTypeChart} />
      </Box>
    </Box>
  );
};

export default ObligationTrackingAnalytics;
