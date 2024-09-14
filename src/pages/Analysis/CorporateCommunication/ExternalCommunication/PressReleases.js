import React, { useState, useEffect } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { Card, Grid, Typography, Chip } from '@mui/material';

const PressReleasesAnalytics = ({ fetchItems }) => {
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
  const totalPressReleases = data.length;

  // Distribution Channels Analysis
  const channelsCount = data.reduce((acc, record) => {
    if (Array.isArray(record.distributionChannels)) {
      record.distributionChannels.forEach(channel => {
        acc[channel] = (acc[channel] || 0) + 1;
      });
    } else {
      acc[record.distributionChannels] = (acc[record.distributionChannels] || 0) + 1;
    }
    return acc;
  }, {});

  const channelsDistribution = Object.keys(channelsCount).map(channel => ({
    name: channel.charAt(0).toUpperCase() + channel.slice(1).replace(/-/g, ' '),
    y: channelsCount[channel],
  }));

  // Highcharts options for Distribution Channels
  const distributionChannelsChartOptions = {
    chart: { type: 'pie' },
    title: { text: 'Distribution Channels' },
    series: [{
      name: 'Channels',
      colorByPoint: true,
      data: channelsDistribution,
    }],
  };

  // Highcharts options for press release trends over time
  const pressReleasesChartOptions = {
    chart: { type: 'line' },
    title: { text: 'Press Releases Over Time' },
    xAxis: {
      categories: data.map(record => new Date(record.releaseDate).toLocaleDateString()),
      title: { text: 'Release Date' },
    },
    yAxis: { title: { text: 'Number of Releases' } },
    series: [{
      name: 'Releases',
      data: data.map(() => 1), // Each release counts as one
    }],
  };

  return (
    <Grid container spacing={4}>
      {/* KPI Cards */}
      <Grid item xs={12} md={6}>
        <Card>
          <Typography variant="h6" gutterBottom>Total Press Releases</Typography>
          <Typography variant="h4">{totalPressReleases}</Typography>
        </Card>
      </Grid>

      {/* Highcharts */}
      <Grid item xs={12} md={6}>
        <Card>
          <HighchartsReact highcharts={Highcharts} options={distributionChannelsChartOptions} />
        </Card>
      </Grid>
      <Grid item xs={12}>
        <Card>
          <HighchartsReact highcharts={Highcharts} options={pressReleasesChartOptions} />
        </Card>
      </Grid>

      {/* Tags */}
      <Grid item xs={12}>
        <Card>
          <Typography variant="h6" gutterBottom>Tags</Typography>
          {data.map((record, index) => (
            <div key={index}>
              <Typography variant="subtitle1">{record.title}:</Typography>
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

export default PressReleasesAnalytics;
