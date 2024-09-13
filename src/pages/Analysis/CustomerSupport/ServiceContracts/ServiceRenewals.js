import React, { useEffect, useState } from 'react';
import { Box, Grid, Typography, Paper } from '@mui/material';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const ServiceRenewalsAnalytics = ({ fetchItems }) => {
  const [data, setData] = useState([]);
  const [kpiData, setKpiData] = useState({
    totalRenewals: 0,
    pending: 0,
    completed: 0,
    failed: 0,
  });

  useEffect(() => {
    fetchItems('service-renewals').then((response) => {
      setData(response);
      calculateKPIs(response);
    });
  }, []);

  const calculateKPIs = (data) => {
    const totalRenewals = data.length;
    const pending = data.filter((item) => item.status === 'pending').length;
    const completed = data.filter((item) => item.status === 'completed').length;
    const failed = data.filter((item) => item.status === 'failed').length;

    setKpiData({
      totalRenewals,
      pending,
      completed,
      failed,
    });
  };

  const chartOptions = {
    chart: {
      type: 'pie',
    },
    title: {
      text: 'Service Renewal Status Distribution',
    },
    series: [
      {
        name: 'Status',
        colorByPoint: true,
        data: [
          {
            name: 'Pending',
            y: kpiData.pending,
          },
          {
            name: 'Completed',
            y: kpiData.completed,
          },
          {
            name: 'Failed',
            y: kpiData.failed,
          },
        ],
      },
    ],
  };

  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom>
        Service Renewals Analytics
      </Typography>

      <Grid container spacing={3}>
        {/* KPIs */}
        <Grid item xs={12} sm={6} md={3}>
          <Paper elevation={3} sx={{ p: 2 }}>
            <Typography variant="h6">Total Renewals</Typography>
            <Typography variant="h4">{kpiData.totalRenewals}</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper elevation={3} sx={{ p: 2 }}>
            <Typography variant="h6">Pending</Typography>
            <Typography variant="h4">{kpiData.pending}</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper elevation={3} sx={{ p: 2 }}>
            <Typography variant="h6">Completed</Typography>
            <Typography variant="h4">{kpiData.completed}</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper elevation={3} sx={{ p: 2 }}>
            <Typography variant="h6">Failed</Typography>
            <Typography variant="h4">{kpiData.failed}</Typography>
          </Paper>
        </Grid>

        {/* Highcharts Graph */}
        <Grid item xs={12}>
          <Paper elevation={3} sx={{ p: 3 }}>
            <HighchartsReact highcharts={Highcharts} options={chartOptions} />
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ServiceRenewalsAnalytics;
