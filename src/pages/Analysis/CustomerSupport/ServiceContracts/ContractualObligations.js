import React, { useState, useEffect } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { Card, Grid, Typography, Chip } from '@mui/material';

const ObligationsAnalytics = ({ fetchItems }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const response = await fetchItems();
      setData(response);
      setLoading(false);
    }
    fetchData();
  }, [fetchItems]);

  if (loading) return <Typography>Loading...</Typography>;

  // KPI Calculations
  const totalObligations = data.length;
  const pendingObligations = data.filter((item) => item.status === 'pending').length;
  const fulfilledObligations = data.filter((item) => item.status === 'fulfilled').length;
  const overdueObligations = data.filter((item) => item.status === 'overdue').length;

  // Highcharts options for obligations status distribution
  const obligationsStatusOptions = {
    chart: { type: 'column' },
    title: { text: 'Obligation Status Distribution' },
    xAxis: {
      categories: ['Pending', 'Fulfilled', 'Overdue'],
      crosshair: true,
    },
    yAxis: {
      min: 0,
      title: { text: 'Number of Obligations' },
    },
    series: [
      {
        name: 'Obligations',
        data: [pendingObligations, fulfilledObligations, overdueObligations],
      },
    ],
  };

  return (
    <Grid container spacing={4}>
      {/* KPI Cards */}
      <Grid item xs={12} md={3}>
        <Card>
          <Typography variant="h6" gutterBottom>Total Obligations</Typography>
          <Typography variant="h4">{totalObligations}</Typography>
        </Card>
      </Grid>
      <Grid item xs={12} md={3}>
        <Card>
          <Typography variant="h6" gutterBottom>Pending</Typography>
          <Typography variant="h4">{pendingObligations}</Typography>
        </Card>
      </Grid>
      <Grid item xs={12} md={3}>
        <Card>
          <Typography variant="h6" gutterBottom>Fulfilled</Typography>
          <Typography variant="h4">{fulfilledObligations}</Typography>
        </Card>
      </Grid>
      <Grid item xs={12} md={3}>
        <Card>
          <Typography variant="h6" gutterBottom>Overdue</Typography>
          <Typography variant="h4">{overdueObligations}</Typography>
        </Card>
      </Grid>

      {/* Highcharts */}
      <Grid item xs={12} md={12}>
        <Card>
          <HighchartsReact highcharts={Highcharts} options={obligationsStatusOptions} />
        </Card>
      </Grid>

      {/* Tags */}
      <Grid item xs={12}>
        <Card>
          <Typography variant="h6" gutterBottom>Tags</Typography>
          {data.map((record, index) => (
            <div key={index}>
              <Typography variant="subtitle1">{`Obligation ${index + 1}:`}</Typography>
              {record.tags.map((tag) => (
                <Chip key={tag.id} label={tag.label} style={{ margin: '5px' }} />
              ))}
            </div>
          ))}
        </Card>
      </Grid>
    </Grid>
  );
};

export default ObligationsAnalytics;
