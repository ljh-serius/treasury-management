import React, { useState, useEffect } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { Card, Grid, Typography, Chip } from '@mui/material';

const SystemsIntegrationAnalytics = ({ fetchItems }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const response = await fetchItems();
      setData(response || []); // Ensure data is an array
      setLoading(false);
    }
    fetchData();
  }, [fetchItems]);

  if (loading) return <Typography>Loading...</Typography>;

  // KPIs
  const totalProgress = data.reduce((sum, record) => sum + Number(record.progress), 0);
  const averageProgress = (totalProgress / data.length).toFixed(2);

  const statusCounts = data.reduce((acc, record) => {
    acc[record.status] = (acc[record.status] || 0) + 1;
    return acc;
  }, {});

  const statusDistribution = Object.keys(statusCounts).map(status => ({
    name: status.charAt(0).toUpperCase() + status.slice(1),
    y: statusCounts[status],
  }));

  // Highcharts options for Progress over Time
  const progressChartOptions = {
    chart: { type: 'line' },
    title: { text: 'Progress Over Time' },
    xAxis: {
      categories: data.map(record => new Date(record.startDate).getFullYear()),
      title: { text: 'Year' }
    },
    yAxis: { title: { text: 'Progress (%)' } },
    series: [{
      name: 'Progress',
      data: data.map(record => record.progress),
    }],
  };

  // Highcharts options for Status Distribution
  const statusChartOptions = {
    chart: { type: 'pie' },
    title: { text: 'Systems Integration Status Distribution' },
    series: [{
      name: 'Status',
      colorByPoint: true,
      data: statusDistribution,
    }],
  };

  return (
    <Grid container spacing={4}>
      {/* KPI Cards */}
      <Grid item xs={12} md={4}>
        <Card>
          <Typography variant="h6" gutterBottom>Average Progress (%)</Typography>
          <Typography variant="h4">{averageProgress}%</Typography>
        </Card>
      </Grid>

      <Grid item xs={12} md={4}>
        <Card>
          <Typography variant="h6" gutterBottom>Total Systems Integrations</Typography>
          <Typography variant="h4">{data.length}</Typography>
        </Card>
      </Grid>

      {/* Highcharts */}
      <Grid item xs={12} md={6}>
        <Card>
          <HighchartsReact highcharts={Highcharts} options={progressChartOptions} />
        </Card>
      </Grid>
      <Grid item xs={12} md={6}>
        <Card>
          <HighchartsReact highcharts={Highcharts} options={statusChartOptions} />
        </Card>
      </Grid>

      {/* Tags */}
      <Grid item xs={12}>
        <Card>
          <Typography variant="h6" gutterBottom>IT Systems Involved</Typography>
          {data.map((record, index) => (
            <div key={index}>
              <Typography variant="subtitle1">{record.itSystemsInvolved}:</Typography>
            </div>
          ))}
        </Card>
      </Grid>
    </Grid>
  );
};

export default SystemsIntegrationAnalytics;
