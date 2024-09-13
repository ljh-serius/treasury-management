import React, { useEffect, useState } from 'react';
import { Box, Grid, Typography, Card, CardContent } from '@mui/material';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const EmployeeVolunteeringAnalytics = ({ fetchItems }) => {
  const [data, setData] = useState([]);
  const [kpis, setKpis] = useState({
    totalActivities: 0,
    totalHours: 0,
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
    const totalHours = activities.reduce((sum, activity) => sum + activity.hoursContributed, 0);
    const completedActivities = activities.filter((act) => act.status === 'completed').length;
    const ongoingActivities = activities.filter((act) => act.status === 'ongoing').length;
    const plannedActivities = activities.filter((act) => act.status === 'planned').length;

    setKpis({
      totalActivities,
      totalHours,
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

  const hoursContributedChart = {
    chart: {
      type: 'column',
    },
    title: {
      text: 'Hours Contributed by Activity',
    },
    xAxis: {
      categories: data.map((activity) => activity.activityTitle),
    },
    yAxis: {
      title: {
        text: 'Hours Contributed',
      },
    },
    series: [
      {
        name: 'Hours Contributed',
        data: data.map((activity) => activity.hoursContributed),
      },
    ],
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Employee Volunteering Analytics
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
              <Typography variant="h6">Total Hours Contributed</Typography>
              <Typography variant="h4">{kpis.totalHours}</Typography>
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
        <HighchartsReact highcharts={Highcharts} options={hoursContributedChart} />
      </Box>
    </Box>
  );
};

export default EmployeeVolunteeringAnalytics;
