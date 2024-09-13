import React, { useEffect, useState } from 'react';
import { Box, Grid, Typography, Card, CardContent } from '@mui/material';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const SustainableSourcingAnalytics = ({ fetchItems }) => {
  const [data, setData] = useState([]);
  const [kpis, setKpis] = useState({
    totalSourcing: 0,
    approvedSourcing: 0,
    pendingSourcing: 0,
    rejectedSourcing: 0,
    totalBudget: 0,
  });

  useEffect(() => {
    const loadData = async () => {
      const sourcingItems = await fetchItems();
      setData(sourcingItems);
      calculateKPIs(sourcingItems);
    };

    loadData();
  }, [fetchItems]);

  const calculateKPIs = (items) => {
    const totalSourcing = items.length;
    const approvedSourcing = items.filter((item) => item.status === 'approved').length;
    const pendingSourcing = items.filter((item) => item.status === 'pending').length;
    const rejectedSourcing = items.filter((item) => item.status === 'rejected').length;
    const totalBudget = items.reduce((sum, item) => sum + item.budget, 0);

    setKpis({
      totalSourcing,
      approvedSourcing,
      pendingSourcing,
      rejectedSourcing,
      totalBudget,
    });
  };

  const statusChart = {
    chart: {
      type: 'pie',
    },
    title: {
      text: 'Sourcing Status Distribution',
    },
    series: [
      {
        name: 'Sourcing',
        colorByPoint: true,
        data: [
          { name: 'Approved', y: kpis.approvedSourcing },
          { name: 'Pending', y: kpis.pendingSourcing },
          { name: 'Rejected', y: kpis.rejectedSourcing },
        ],
      },
    ],
  };

  const budgetChart = {
    chart: {
      type: 'column',
    },
    title: {
      text: 'Budget per Sourcing',
    },
    xAxis: {
      categories: data.map((item) => item.sourcingTitle),
    },
    yAxis: {
      title: {
        text: 'Budget ($)',
      },
    },
    series: [
      {
        name: 'Budget',
        data: data.map((item) => item.budget),
      },
    ],
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Sustainable Sourcing Analytics
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6">Total Sourcing</Typography>
              <Typography variant="h4">{kpis.totalSourcing}</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6">Approved Sourcing</Typography>
              <Typography variant="h4">{kpis.approvedSourcing}</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6">Pending Sourcing</Typography>
              <Typography variant="h4">{kpis.pendingSourcing}</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6">Rejected Sourcing</Typography>
              <Typography variant="h4">{kpis.rejectedSourcing}</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6">Total Budget</Typography>
              <Typography variant="h4">${kpis.totalBudget.toLocaleString()}</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Box mt={4}>
        <HighchartsReact highcharts={Highcharts} options={statusChart} />
      </Box>

      <Box mt={4}>
        <HighchartsReact highcharts={Highcharts} options={budgetChart} />
      </Box>
    </Box>
  );
};

export default SustainableSourcingAnalytics;
