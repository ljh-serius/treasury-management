import React, { useState, useEffect } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { Card, Grid, Typography, Chip } from '@mui/material';

const PublicStatementsAnalytics = ({ fetchItems }) => {
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
  const totalStatements = data.length;

  // Audience Distribution
  const audienceCount = data.reduce((acc, record) => {
    acc[record.audience] = (acc[record.audience] || 0) + 1;
    return acc;
  }, {});

  const audienceDistribution = Object.keys(audienceCount).map(audience => ({
    name: audience.charAt(0).toUpperCase() + audience.slice(1),
    y: audienceCount[audience],
  }));

  // Distribution Channels
  const channelCount = data.reduce((acc, record) => {
    acc[record.distributionChannels] = (acc[record.distributionChannels] || 0) + 1;
    return acc;
  }, {});

  const distributionChannelData = Object.keys(channelCount).map(channel => ({
    name: channel.charAt(0).toUpperCase() + channel.slice(1).replace(/-/g, ' '),
    y: channelCount[channel],
  }));

  // Highcharts options for Audience Distribution
  const audienceChartOptions = {
    chart: { type: 'pie' },
    title: { text: 'Audience Distribution' },
    series: [{
      name: 'Audience',
      colorByPoint: true,
      data: audienceDistribution,
    }],
  };

  // Highcharts options for Distribution Channels
  const distributionChannelsChartOptions = {
    chart: { type: 'pie' },
    title: { text: 'Distribution Channels' },
    series: [{
      name: 'Channels',
      colorByPoint: true,
      data: distributionChannelData,
    }],
  };

  return (
    <Grid container spacing={4}>
      {/* KPI Cards */}
      <Grid item xs={12} md={6}>
        <Card>
          <Typography variant="h6" gutterBottom>Total Public Statements</Typography>
          <Typography variant="h4">{totalStatements}</Typography>
        </Card>
      </Grid>

      {/* Highcharts */}
      <Grid item xs={12} md={6}>
        <Card>
          <HighchartsReact highcharts={Highcharts} options={audienceChartOptions} />
        </Card>
      </Grid>
      <Grid item xs={12} md={6}>
        <Card>
          <HighchartsReact highcharts={Highcharts} options={distributionChannelsChartOptions} />
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

export default PublicStatementsAnalytics;
