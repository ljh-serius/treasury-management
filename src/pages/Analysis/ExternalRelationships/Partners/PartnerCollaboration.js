import React, { useEffect, useState } from 'react';
import { Box, Grid, Typography, Card, CardContent } from '@mui/material';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const PartnerCollaborationAnalytics = ({ fetchItems }) => {
  const [data, setData] = useState([]);
  const [kpis, setKpis] = useState({
    totalCollaborations: 0,
    activeCollaborations: 0,
    completedCollaborations: 0,
    terminatedCollaborations: 0,
  });

  useEffect(() => {
    const loadData = async () => {
      const collaborations = await fetchItems();
      setData(collaborations);
      calculateKPIs(collaborations);
    };

    loadData();
  }, [fetchItems]);

  const calculateKPIs = (items) => {
    const totalCollaborations = items.length;
    const activeCollaborations = items.filter((item) => item.status === 'active').length;
    const completedCollaborations = items.filter((item) => item.status === 'completed').length;
    const terminatedCollaborations = items.filter((item) => item.status === 'terminated').length;

    setKpis({
      totalCollaborations,
      activeCollaborations,
      completedCollaborations,
      terminatedCollaborations,
    });
  };

  const statusChart = {
    chart: {
      type: 'pie',
    },
    title: {
      text: 'Collaboration Status Distribution',
    },
    series: [
      {
        name: 'Collaborations',
        colorByPoint: true,
        data: [
          { name: 'Active', y: kpis.activeCollaborations },
          { name: 'Completed', y: kpis.completedCollaborations },
          { name: 'Terminated', y: kpis.terminatedCollaborations },
        ],
      },
    ],
  };

  const timelineChart = {
    chart: {
      type: 'column',
    },
    title: {
      text: 'Collaboration Timelines',
    },
    xAxis: {
      categories: data.map((item) => item.projectTitle),
    },
    yAxis: {
      title: {
        text: 'Duration (days)',
      },
    },
    series: [
      {
        name: 'Collaboration Duration',
        data: data.map((item) => {
          const startDate = new Date(item.startDate);
          const endDate = new Date(item.endDate);
          return (endDate - startDate) / (1000 * 3600 * 24); // Convert duration to days
        }),
      },
    ],
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Partner Collaboration Analytics
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6">Total Collaborations</Typography>
              <Typography variant="h4">{kpis.totalCollaborations}</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6">Active Collaborations</Typography>
              <Typography variant="h4">{kpis.activeCollaborations}</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6">Completed Collaborations</Typography>
              <Typography variant="h4">{kpis.completedCollaborations}</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6">Terminated Collaborations</Typography>
              <Typography variant="h4">{kpis.terminatedCollaborations}</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Box mt={4}>
        <HighchartsReact highcharts={Highcharts} options={statusChart} />
      </Box>

      <Box mt={4}>
        <HighchartsReact highcharts={Highcharts} options={timelineChart} />
      </Box>
    </Box>
  );
};

export default PartnerCollaborationAnalytics;
