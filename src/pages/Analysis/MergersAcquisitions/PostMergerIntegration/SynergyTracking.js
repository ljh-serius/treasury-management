import React, { useState, useEffect } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { Card, Grid, Typography, Chip } from '@mui/material';

const SynergyTrackingAnalytics = ({ fetchItems }) => {
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
  const totalSynergyValue = data.reduce((sum, record) => sum + Number(record.synergyValue || 0), 0);
  const averageSynergyValue = (totalSynergyValue / (data.length || 1)).toFixed(2);

  const statusCounts = data.reduce((acc, record) => {
    acc[record.status] = (acc[record.status] || 0) + 1;
    return acc;
  }, {});

  const statusDistribution = Object.keys(statusCounts).map(status => ({
    name: status.charAt(0).toUpperCase() + status.slice(1),
    y: statusCounts[status],
  }));

  // Highcharts options for Synergy Value Over Time
  const synergyValueChartOptions = {
    chart: { type: 'line' },
    title: { text: 'Synergy Value Over Time' },
    xAxis: {
      categories: data.map(record => new Date(record.trackingDate).getFullYear()),
      title: { text: 'Year' }
    },
    yAxis: { title: { text: 'Synergy Value (USD)' } },
    series: [{
      name: 'Synergy Value',
      data: data.map(record => record.synergyValue || 0),
    }],
  };

  // Highcharts options for Status Distribution
  const statusChartOptions = {
    chart: { type: 'pie' },
    title: { text: 'Synergy Status Distribution' },
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
          <Typography variant="h6" gutterBottom>Total Synergy Value (USD)</Typography>
          <Typography variant="h4">${totalSynergyValue.toFixed(2)}</Typography>
        </Card>
      </Grid>

      <Grid item xs={12} md={4}>
        <Card>
          <Typography variant="h6" gutterBottom>Average Synergy Value (USD)</Typography>
          <Typography variant="h4">${averageSynergyValue}</Typography>
        </Card>
      </Grid>

      <Grid item xs={12} md={4}>
        <Card>
          <Typography variant="h6" gutterBottom>Total Synergies Tracked</Typography>
          <Typography variant="h4">{data.length}</Typography>
        </Card>
      </Grid>

      {/* Highcharts */}
      <Grid item xs={12} md={6}>
        <Card>
          <HighchartsReact highcharts={Highcharts} options={synergyValueChartOptions} />
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
          <Typography variant="h6" gutterBottom>Synergy Tags</Typography>
          {data.map((record, index) => (
            <div key={index}>
              <Typography variant="subtitle1">{record.expectedSynergies}:</Typography>
              {(record.tags || []).map((tag, idx) => (
                <Chip key={idx} label={tag.label || tag} style={{ margin: '5px' }} />
              ))}
            </div>
          ))}
        </Card>
      </Grid>
    </Grid>
  );
};

export default SynergyTrackingAnalytics;
