import React, { useState, useEffect } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { Card, Grid, Typography, Chip } from '@mui/material';

const AnnouncementsAnalytics = ({ fetchItems }) => {
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
  const totalAnnouncements = data.length;

  // Grouping announcements by audience
  const audienceCounts = data.reduce((acc, record) => {
    acc[record.audience] = (acc[record.audience] || 0) + 1;
    return acc;
  }, {});

  const audienceDistribution = Object.keys(audienceCounts).map(audience => ({
    name: audience.charAt(0).toUpperCase() + audience.slice(1).replace(/-/g, ' '),
    y: audienceCounts[audience],
  }));

  // Highcharts options for audience distribution
  const audienceChartOptions = {
    chart: { type: 'pie' },
    title: { text: 'Audience Distribution of Announcements' },
    series: [{
      name: 'Audience',
      colorByPoint: true,
      data: audienceDistribution,
    }],
  };

  // Highcharts options for announcement frequency over time
  const announcementDateChartOptions = {
    chart: { type: 'line' },
    title: { text: 'Announcements Over Time' },
    xAxis: {
      categories: data.map(record => new Date(record.announcementDate).toLocaleDateString()),
      title: { text: 'Announcement Date' },
    },
    yAxis: { title: { text: 'Number of Announcements' } },
    series: [{
      name: 'Announcements',
      data: data.map(() => 1), // Each announcement counts as one
    }],
  };

  return (
    <Grid container spacing={4}>
      {/* KPI Cards */}
      <Grid item xs={12} md={6}>
        <Card>
          <Typography variant="h6" gutterBottom>Total Announcements</Typography>
          <Typography variant="h4">{totalAnnouncements}</Typography>
        </Card>
      </Grid>

      {/* Highcharts */}
      <Grid item xs={12} md={6}>
        <Card>
          <HighchartsReact highcharts={Highcharts} options={audienceChartOptions} />
        </Card>
      </Grid>
      <Grid item xs={12} md={12}>
        <Card>
          <HighchartsReact highcharts={Highcharts} options={announcementDateChartOptions} />
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

export default AnnouncementsAnalytics;
