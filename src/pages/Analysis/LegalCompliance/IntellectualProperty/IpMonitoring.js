import React, { useEffect, useState } from 'react';
import { Box, Grid, Typography, Card, CardContent } from '@mui/material';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const IPMonitoringAnalytics = ({ fetchItems }) => {
  const [data, setData] = useState([]);
  const [kpis, setKpis] = useState({
    totalAssets: 0,
    activeMonitoring: 0,
    inactiveMonitoring: 0,
  });

  useEffect(() => {
    const loadData = async () => {
      const monitoringItems = await fetchItems();
      setData(monitoringItems);
      calculateKPIs(monitoringItems);
    };

    loadData();
  }, [fetchItems]);

  const calculateKPIs = (items) => {
    const totalAssets = items.length;
    const activeMonitoring = items.filter((item) => item.status === 'active').length;
    const inactiveMonitoring = items.filter((item) => item.status === 'inactive').length;

    setKpis({
      totalAssets,
      activeMonitoring,
      inactiveMonitoring,
    });
  };

  const statusChart = {
    chart: {
      type: 'pie',
    },
    title: {
      text: 'Monitoring Status Distribution',
    },
    series: [
      {
        name: 'Status',
        colorByPoint: true,
        data: [
          { name: 'Active', y: kpis.activeMonitoring },
          { name: 'Inactive', y: kpis.inactiveMonitoring },
        ],
      },
    ],
  };

  const ipTypeChart = {
    chart: {
      type: 'column',
    },
    title: {
      text: 'IP Assets by Type',
    },
    xAxis: {
      categories: ['Patent', 'Trademark', 'Copyright'],
    },
    yAxis: {
      title: {
        text: 'Number of Assets',
      },
    },
    series: [
      {
        name: 'Assets',
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
        IP Monitoring Analytics
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6">Total Assets</Typography>
              <Typography variant="h4">{kpis.totalAssets}</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6">Active Monitoring</Typography>
              <Typography variant="h4">{kpis.activeMonitoring}</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6">Inactive Monitoring</Typography>
              <Typography variant="h4">{kpis.inactiveMonitoring}</Typography>
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

export default IPMonitoringAnalytics;
