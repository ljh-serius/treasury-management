import React, { useEffect, useState } from 'react';
import { Box, Grid, Typography, Card, CardContent } from '@mui/material';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const PenaltiesManagementAnalytics = ({ fetchItems }) => {
  const [data, setData] = useState([]);
  const [kpis, setKpis] = useState({
    totalPenalties: 0,
    pendingPenalties: 0,
    paidPenalties: 0,
    overduePenalties: 0,
    totalAmount: 0,
  });

  useEffect(() => {
    const loadData = async () => {
      const penalties = await fetchItems();
      setData(penalties);
      calculateKPIs(penalties);
    };

    loadData();
  }, [fetchItems]);

  const calculateKPIs = (items) => {
    const totalPenalties = items.length;
    const pendingPenalties = items.filter((item) => item.status === 'pending').length;
    const paidPenalties = items.filter((item) => item.status === 'paid').length;
    const overduePenalties = items.filter((item) => item.status === 'overdue').length;
    const totalAmount = items.reduce((acc, curr) => acc + parseFloat(curr.amount || 0), 0);

    setKpis({
      totalPenalties,
      pendingPenalties,
      paidPenalties,
      overduePenalties,
      totalAmount: totalAmount.toFixed(2),
    });
  };

  const statusChart = {
    chart: {
      type: 'pie',
    },
    title: {
      text: 'Penalty Status Distribution',
    },
    series: [
      {
        name: 'Penalties',
        colorByPoint: true,
        data: [
          { name: 'Pending', y: kpis.pendingPenalties },
          { name: 'Paid', y: kpis.paidPenalties },
          { name: 'Overdue', y: kpis.overduePenalties },
        ],
      },
    ],
  };

  const penaltyTypeChart = {
    chart: {
      type: 'column',
    },
    title: {
      text: 'Penalties by Type',
    },
    xAxis: {
      categories: ['Financial', 'Regulatory', 'Legal'],
    },
    yAxis: {
      title: {
        text: 'Number of Penalties',
      },
    },
    series: [
      {
        name: 'Penalties',
        data: [
          data.filter((item) => item.penaltyType === 'financial').length,
          data.filter((item) => item.penaltyType === 'regulatory').length,
          data.filter((item) => item.penaltyType === 'legal').length,
        ],
      },
    ],
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Penalties Management Analytics
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6">Total Penalties</Typography>
              <Typography variant="h4">{kpis.totalPenalties}</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6">Pending Penalties</Typography>
              <Typography variant="h4">{kpis.pendingPenalties}</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6">Paid Penalties</Typography>
              <Typography variant="h4">{kpis.paidPenalties}</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6">Overdue Penalties</Typography>
              <Typography variant="h4">{kpis.overduePenalties}</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Grid container spacing={3} mt={4}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6">Total Amount (USD)</Typography>
              <Typography variant="h4">{kpis.totalAmount}</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Box mt={4}>
        <HighchartsReact highcharts={Highcharts} options={statusChart} />
      </Box>

      <Box mt={4}>
        <HighchartsReact highcharts={Highcharts} options={penaltyTypeChart} />
      </Box>
    </Box>
  );
};

export default PenaltiesManagementAnalytics;
