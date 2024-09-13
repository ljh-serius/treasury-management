import React, { useEffect, useState } from 'react';
import { Box, Grid, Typography, Card, CardContent } from '@mui/material';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const IPLitigationAnalytics = ({ fetchItems }) => {
  const [data, setData] = useState([]);
  const [kpis, setKpis] = useState({
    totalLitigations: 0,
    pendingLitigations: 0,
    inProgressLitigations: 0,
    resolvedLitigations: 0,
  });

  useEffect(() => {
    const loadData = async () => {
      const litigations = await fetchItems();
      setData(litigations);
      calculateKPIs(litigations);
    };

    loadData();
  }, [fetchItems]);

  const calculateKPIs = (items) => {
    const totalLitigations = items.length;
    const pendingLitigations = items.filter((item) => item.status === 'pending').length;
    const inProgressLitigations = items.filter((item) => item.status === 'in-progress').length;
    const resolvedLitigations = items.filter((item) => item.status === 'resolved').length;

    setKpis({
      totalLitigations,
      pendingLitigations,
      inProgressLitigations,
      resolvedLitigations,
    });
  };

  const statusChart = {
    chart: {
      type: 'pie',
    },
    title: {
      text: 'Litigation Status Distribution',
    },
    series: [
      {
        name: 'Litigations',
        colorByPoint: true,
        data: [
          { name: 'Pending', y: kpis.pendingLitigations },
          { name: 'In Progress', y: kpis.inProgressLitigations },
          { name: 'Resolved', y: kpis.resolvedLitigations },
        ],
      },
    ],
  };

  const ipTypeChart = {
    chart: {
      type: 'column',
    },
    title: {
      text: 'Litigations by IP Type',
    },
    xAxis: {
      categories: ['Patent', 'Trademark', 'Copyright'],
    },
    yAxis: {
      title: {
        text: 'Number of Litigations',
      },
    },
    series: [
      {
        name: 'Litigations',
        data: [
          data.filter((item) => item.ipType === 'patent').length,
          data.filter((item) => item.ipType === 'trademark').length,
          data.filter((item) => item.ipType === 'copyright').length,
        ],
      },
    ],
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        IP Litigation Analytics
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6">Total Litigations</Typography>
              <Typography variant="h4">{kpis.totalLitigations}</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6">Pending Litigations</Typography>
              <Typography variant="h4">{kpis.pendingLitigations}</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6">In Progress Litigations</Typography>
              <Typography variant="h4">{kpis.inProgressLitigations}</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6">Resolved Litigations</Typography>
              <Typography variant="h4">{kpis.resolvedLitigations}</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Box mt={4}>
        <HighchartsReact highcharts={Highcharts} options={statusChart} />
      </Box>

      <Box mt={4}>
        <HighchartsReact highcharts={Highcharts} options={ipTypeChart} />
      </Box>
    </Box>
  );
};

export default IPLitigationAnalytics;
