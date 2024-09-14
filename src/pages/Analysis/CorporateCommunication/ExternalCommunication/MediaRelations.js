import React, { useState, useEffect } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { Card, Grid, Typography, Chip } from '@mui/material';

const MediaRelationsAnalytics = ({ fetchItems }) => {
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
  const totalRelations = data.length;

  // Communication Method Distribution
  const communicationCount = data.reduce((acc, record) => {
    acc[record.communicationMethod] = (acc[record.communicationMethod] || 0) + 1;
    return acc;
  }, {});

  const communicationMethodDistribution = Object.keys(communicationCount).map(method => ({
    name: method.charAt(0).toUpperCase() + method.slice(1).replace(/-/g, ' '),
    y: communicationCount[method],
  }));

  // Highcharts options for Communication Method Distribution
  const communicationMethodChartOptions = {
    chart: { type: 'pie' },
    title: { text: 'Communication Methods' },
    series: [{
      name: 'Methods',
      colorByPoint: true,
      data: communicationMethodDistribution,
    }],
  };

  // Highcharts options for Communications Over Time
  const communicationTrendsChartOptions = {
    chart: { type: 'line' },
    title: { text: 'Communications Over Time' },
    xAxis: {
      categories: data.map(record => new Date(record.communicationDate).toLocaleDateString()),
      title: { text: 'Date' },
    },
    yAxis: { title: { text: 'Number of Communications' } },
    series: [{
      name: 'Communications',
      data: data.map(() => 1), // Each communication counts as one
    }],
  };

  return (
    <Grid container spacing={4}>
      {/* KPI Cards */}
      <Grid item xs={12} md={6}>
        <Card>
          <Typography variant="h6" gutterBottom>Total Media Relations</Typography>
          <Typography variant="h4">{totalRelations}</Typography>
        </Card>
      </Grid>

      {/* Highcharts */}
      <Grid item xs={12} md={6}>
        <Card>
          <HighchartsReact highcharts={Highcharts} options={communicationMethodChartOptions} />
        </Card>
      </Grid>
      <Grid item xs={12}>
        <Card>
          <HighchartsReact highcharts={Highcharts} options={communicationTrendsChartOptions} />
        </Card>
      </Grid>

      {/* Tags */}
      <Grid item xs={12}>
        <Card>
          <Typography variant="h6" gutterBottom>Tags</Typography>
          {data.map((record, index) => (
            <div key={index}>
              <Typography variant="subtitle1">{record.mediaOutlet}:</Typography>
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

export default MediaRelationsAnalytics;
