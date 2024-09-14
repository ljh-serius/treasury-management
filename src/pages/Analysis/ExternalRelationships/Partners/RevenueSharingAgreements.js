import React, { useState, useEffect } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { Card, Grid, Typography, Chip } from '@mui/material';

const RevenueSharingAgreementsAnalytics = ({ fetchItems }) => {
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
  const totalAgreements = data.length;
  const avgRevenueShare = totalAgreements > 0
    ? data.reduce((sum, record) => sum + (Number(record.revenueShare) || 0), 0) / totalAgreements
    : 0;
  const avgDuration = totalAgreements > 0
    ? data.reduce((sum, record) => sum + (Number(record.duration) || 0), 0) / totalAgreements
    : 0;

  // Count agreements by status
  const statusCounts = data.reduce((acc, record) => {
    acc[record.status] = (acc[record.status] || 0) + 1;
    return acc;
  }, {});

  const statusDistribution = Object.keys(statusCounts).map(status => ({
    name: status.charAt(0).toUpperCase() + status.slice(1),
    y: statusCounts[status],
  }));

  // Highcharts options for status distribution
  const statusDistributionChartOptions = {
    chart: { type: 'pie' },
    title: { text: 'Status Distribution of Agreements' },
    series: [{
      name: 'Statuses',
      colorByPoint: true,
      data: statusDistribution,
    }]
  };

  // Highcharts options for revenue share tracking
  const revenueShareChartOptions = {
    chart: { type: 'bar' },
    title: { text: 'Revenue Share by Partner' },
    xAxis: { categories: data.map(record => record.partnerName || 'Unknown') },
    yAxis: { title: { text: 'Revenue Share (%)' } },
    series: [{
      name: 'Revenue Share (%)',
      data: data.map(record => Number(record.revenueShare) || 0),
    }]
  };

  return (
    <Grid container spacing={4}>
      {/* KPI Cards */}
      <Grid item xs={12} md={4}>
        <Card>
          <Typography variant="h6" gutterBottom>Total Agreements</Typography>
          <Typography variant="h4">{totalAgreements}</Typography>
        </Card>
      </Grid>
      <Grid item xs={12} md={4}>
        <Card>
          <Typography variant="h6" gutterBottom>Average Revenue Share (%)</Typography>
          <Typography variant="h4">{avgRevenueShare.toFixed(2)}%</Typography>
        </Card>
      </Grid>
      <Grid item xs={12} md={4}>
        <Card>
          <Typography variant="h6" gutterBottom>Average Duration (years)</Typography>
          <Typography variant="h4">{avgDuration.toFixed(2)}</Typography>
        </Card>
      </Grid>

      {/* Highcharts */}
      <Grid item xs={12} md={6}>
        <Card>
          <HighchartsReact highcharts={Highcharts} options={statusDistributionChartOptions} />
        </Card>
      </Grid>
      <Grid item xs={12} md={6}>
        <Card>
          <HighchartsReact highcharts={Highcharts} options={revenueShareChartOptions} />
        </Card>
      </Grid>

      {/* Tags */}
      <Grid item xs={12}>
        <Card>
          <Typography variant="h6" gutterBottom>Tags</Typography>
          {data.map((record, index) => (
            <div key={index}>
              <Typography variant="subtitle1">{record.partnerName}:</Typography>
              {Array.isArray(record.tags) ? record.tags.map((tag, tagIndex) => (
                <Chip key={tagIndex} label={tag.label} style={{ margin: '5px' }} />
              )) : 'No Tags'}
            </div>
          ))}
        </Card>
      </Grid>
    </Grid>
  );
};

export default RevenueSharingAgreementsAnalytics;
