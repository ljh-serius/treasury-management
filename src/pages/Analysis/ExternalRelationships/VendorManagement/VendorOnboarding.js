import React, { useEffect, useState } from 'react';
import { Box, Grid, Typography, Card, CardContent } from '@mui/material';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const VendorOnboardingAnalytics = ({ fetchItems }) => {
  const [data, setData] = useState([]);
  const [kpis, setKpis] = useState({
    totalOnboardings: 0,
    completedOnboardings: 0,
    inProgressOnboardings: 0,
    onHoldOnboardings: 0,
  });

  useEffect(() => {
    const loadData = async () => {
      const onboardings = await fetchItems();
      setData(onboardings);
      calculateKPIs(onboardings);
    };

    loadData();
  }, [fetchItems]);

  const calculateKPIs = (items) => {
    const totalOnboardings = items.length;
    const completedOnboardings = items.filter((item) => item.status === 'completed').length;
    const inProgressOnboardings = items.filter((item) => item.status === 'in-progress').length;
    const onHoldOnboardings = items.filter((item) => item.status === 'on-hold').length;

    setKpis({
      totalOnboardings,
      completedOnboardings,
      inProgressOnboardings,
      onHoldOnboardings,
    });
  };

  const statusChart = {
    chart: {
      type: 'pie',
    },
    title: {
      text: 'Onboarding Status Distribution',
    },
    series: [
      {
        name: 'Onboardings',
        colorByPoint: true,
        data: [
          { name: 'Completed', y: kpis.completedOnboardings },
          { name: 'In Progress', y: kpis.inProgressOnboardings },
          { name: 'On Hold', y: kpis.onHoldOnboardings },
        ],
      },
    ],
  };

  const vendorOnboardingChart = {
    chart: {
      type: 'bar',
    },
    title: {
      text: 'Vendor Onboarding Progress',
    },
    xAxis: {
      categories: data.map((item) => item.vendorName),
    },
    yAxis: {
      title: {
        text: 'Onboarding Status',
      },
    },
    series: [
      {
        name: 'Status',
        data: data.map((item) => ({
          name: item.vendorName,
          y: item.status === 'completed' ? 1 : item.status === 'in-progress' ? 0.5 : 0,
        })),
      },
    ],
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Vendor Onboarding Analytics
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6">Total Onboardings</Typography>
              <Typography variant="h4">{kpis.totalOnboardings}</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6">Completed Onboardings</Typography>
              <Typography variant="h4">{kpis.completedOnboardings}</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6">In Progress Onboardings</Typography>
              <Typography variant="h4">{kpis.inProgressOnboardings}</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6">On Hold Onboardings</Typography>
              <Typography variant="h4">{kpis.onHoldOnboardings}</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Box mt={4}>
        <HighchartsReact highcharts={Highcharts} options={statusChart} />
      </Box>

      <Box mt={4}>
        <HighchartsReact highcharts={Highcharts} options={vendorOnboardingChart} />
      </Box>
    </Box>
  );
};

export default VendorOnboardingAnalytics;
