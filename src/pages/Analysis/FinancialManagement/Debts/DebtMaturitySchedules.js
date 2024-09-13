import React, { useEffect, useState } from 'react';
import { Box, Grid, Typography, Card, CardContent } from '@mui/material';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const DebtMaturitySchedulesAnalytics = ({ fetchItems }) => {
  const [data, setData] = useState([]);
  const [kpis, setKpis] = useState({
    totalSchedules: 0,
    dueSchedules: 0,
    paidSchedules: 0,
    defaultedSchedules: 0,
  });

  useEffect(() => {
    const loadData = async () => {
      const schedules = await fetchItems();
      setData(schedules);
      calculateKPIs(schedules);
    };

    loadData();
  }, [fetchItems]);

  const calculateKPIs = (items) => {
    const totalSchedules = items.length;
    const dueSchedules = items.filter((item) => item.status === 'due').length;
    const paidSchedules = items.filter((item) => item.status === 'paid').length;
    const defaultedSchedules = items.filter((item) => item.status === 'defaulted').length;

    setKpis({
      totalSchedules,
      dueSchedules,
      paidSchedules,
      defaultedSchedules,
    });
  };

  const statusChart = {
    chart: { type: 'pie' },
    title: { text: 'Schedule Status Distribution' },
    series: [
      {
        name: 'Schedules',
        colorByPoint: true,
        data: [
          { name: 'Due', y: kpis.dueSchedules },
          { name: 'Paid', y: kpis.paidSchedules },
          { name: 'Defaulted', y: kpis.defaultedSchedules },
        ],
      },
    ],
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Debt Maturity Schedules Analytics
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6">Total Schedules</Typography>
              <Typography variant="h4">{kpis.totalSchedules}</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6">Due Schedules</Typography>
              <Typography variant="h4">{kpis.dueSchedules}</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6">Paid Schedules</Typography>
              <Typography variant="h4">{kpis.paidSchedules}</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6">Defaulted Schedules</Typography>
              <Typography variant="h4">{kpis.defaultedSchedules}</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Box mt={4}>
        <HighchartsReact highcharts={Highcharts} options={statusChart} />
      </Box>
    </Box>
  );
};

export default DebtMaturitySchedulesAnalytics;
