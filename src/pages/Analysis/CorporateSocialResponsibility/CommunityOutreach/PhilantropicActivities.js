import React, { useEffect, useState } from 'react';
import { Box, Grid, Typography, Card, CardContent } from '@mui/material';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const PhilanthropicActivitiesAnalytics = ({ fetchItems }) => {
  const [data, setData] = useState([]);
  const [kpis, setKpis] = useState({
    totalActivities: 0,
    totalAmountDonated: 0,
    completedActivities: 0,
    ongoingActivities: 0,
    plannedActivities: 0,
  });

  useEffect(() => {
    const loadData = async () => {
      const activities = await fetchItems();
      setData(activities);
      calculateKPIs(activities);
    };

    loadData();
  }, [fetchItems]);

  const calculateKPIs = (activities) => {
    const totalActivities = activities.length;
    const totalAmountDonated = activities.reduce((sum, activity) => sum + activity.amountDonated, 0);
    const completedActivities = activities.filter((act) => act.status === 'completed').length;
    const ongoingActivities = activities.filter((act) => act.status === 'ongoing').length;
    const plannedActivities = activities.filter((act) => act.status === 'planned').length;

    setKpis({
      totalActivities,
      totalAmountDonated,
      completedActivities,
      ongoingActivities,
      plannedActivities,
    });
  };

  const activityStatusChart = {
    chart: {
      type: 'pie',
    },
    title: {
      text: 'Activity Status Distribution',
    },
    series: [
      {
        name: 'Activities',
        colorByPoint: true,
        data: [
          { name: 'Completed', y: kpis.completedActivities },
          { name: 'Ongoing', y: kpis.ongoingActivities },
          { name: 'Planned', y: kpis.plannedActivities },
        ],
      },
    ],
  };

  const amountDonatedChart = {
    chart: {
      type: 'column',
    },
    title: {
      text: 'Amount Donated by Activity',
    },
    xAxis: {
      categories: data.map((activity) => activity.activityTitle),
    },
    yAxis: {
      title: {
        text: 'Amount Donated',
      },
    },
    series: [
      {
        name: 'Amount Donated',
        data: data.map((activity) => activity.amountDonated),
      },
    ],
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Philanthropic Activities Analytics
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6">Total Activities</Typography>
              <Typography variant="h4">{kpis.totalActivities}</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6">Total Amount Donated</Typography>
              <Typography variant="h4">${kpis.totalAmountDonated.toLocaleString()}</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6">Completed Activities</Typography>
              <Typography variant="h4">{kpis.completedActivities}</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6">Ongoing Activities</Typography>
              <Typography variant="h4">{kpis.ongoingActivities}</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6">Planned Activities</Typography>
              <Typography variant="h4">{kpis.plannedActivities}</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Box mt={4}>
        <HighchartsReact highcharts={Highcharts} options={activityStatusChart} />
      </Box>

      <Box mt={4}>
        <HighchartsReact highcharts={Highcharts} options={amountDonatedChart} />
      </Box>
    </Box>
  );
};

export default PhilanthropicActivitiesAnalytics;
