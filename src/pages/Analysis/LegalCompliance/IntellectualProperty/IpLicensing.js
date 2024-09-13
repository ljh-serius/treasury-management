import React, { useEffect, useState } from 'react';
import { Box, Grid, Typography, Card, CardContent } from '@mui/material';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const IPLicensingAnalytics = ({ fetchItems }) => {
  const [data, setData] = useState([]);
  const [kpis, setKpis] = useState({
    totalLicenses: 0,
    activeLicenses: 0,
    expiredLicenses: 0,
    terminatedLicenses: 0,
  });

  useEffect(() => {
    const loadData = async () => {
      const licenses = await fetchItems();
      setData(licenses);
      calculateKPIs(licenses);
    };

    loadData();
  }, [fetchItems]);

  const calculateKPIs = (items) => {
    const totalLicenses = items.length;
    const activeLicenses = items.filter((item) => item.status === 'active').length;
    const expiredLicenses = items.filter((item) => item.status === 'expired').length;
    const terminatedLicenses = items.filter((item) => item.status === 'terminated').length;

    setKpis({
      totalLicenses,
      activeLicenses,
      expiredLicenses,
      terminatedLicenses,
    });
  };

  const statusChart = {
    chart: {
      type: 'pie',
    },
    title: {
      text: 'License Status Distribution',
    },
    series: [
      {
        name: 'Licenses',
        colorByPoint: true,
        data: [
          { name: 'Active', y: kpis.activeLicenses },
          { name: 'Expired', y: kpis.expiredLicenses },
          { name: 'Terminated', y: kpis.terminatedLicenses },
        ],
      },
    ],
  };

  const ipTypeChart = {
    chart: {
      type: 'column',
    },
    title: {
      text: 'Licenses by IP Type',
    },
    xAxis: {
      categories: ['Patent', 'Trademark', 'Copyright'],
    },
    yAxis: {
      title: {
        text: 'Number of Licenses',
      },
    },
    series: [
      {
        name: 'Licenses',
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
        IP Licensing Analytics
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6">Total Licenses</Typography>
              <Typography variant="h4">{kpis.totalLicenses}</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6">Active Licenses</Typography>
              <Typography variant="h4">{kpis.activeLicenses}</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6">Expired Licenses</Typography>
              <Typography variant="h4">{kpis.expiredLicenses}</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6">Terminated Licenses</Typography>
              <Typography variant="h4">{kpis.terminatedLicenses}</Typography>
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

export default IPLicensingAnalytics;
