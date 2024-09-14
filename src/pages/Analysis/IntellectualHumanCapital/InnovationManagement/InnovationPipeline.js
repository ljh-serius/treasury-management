import React, { useState, useEffect } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { Card, Grid, Typography, Chip } from '@mui/material';

const InnovationPipelineAnalytics = ({ fetchItems }) => {
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
  const totalIdeas = data.length;
  const avgProgress = totalIdeas > 0
    ? data.reduce((sum, record) => sum + (Number(record.progressPercentage) || 0), 0) / totalIdeas
    : 0;

  // Count ideas by stage
  const stageCounts = data.reduce((acc, record) => {
    acc[record.stage] = (acc[record.stage] || 0) + 1;
    return acc;
  }, {});

  const stageDistribution = Object.keys(stageCounts).map(stage => ({
    name: stage.replace(/-/g, ' ').replace(/\b\w/g, char => char.toUpperCase()),
    y: stageCounts[stage],
  }));

  // Highcharts options for stage distribution
  const stageDistributionChartOptions = {
    chart: { type: 'pie' },
    title: { text: 'Stage Distribution in Innovation Pipeline' },
    series: [{
      name: 'Stages',
      colorByPoint: true,
      data: stageDistribution,
    }]
  };

  // Highcharts options for progress tracking
  const progressChartOptions = {
    chart: { type: 'bar' },
    title: { text: 'Progress by Idea' },
    xAxis: { categories: data.map(record => record.ideaTitle || 'Unknown') },
    yAxis: { title: { text: 'Progress (%)' } },
    series: [{
      name: 'Progress (%)',
      data: data.map(record => Number(record.progressPercentage) || 0),
    }]
  };

  return (
    <Grid container spacing={4}>
      {/* KPI Cards */}
      <Grid item xs={12} md={6}>
        <Card>
          <Typography variant="h6" gutterBottom>Total Ideas in Pipeline</Typography>
          <Typography variant="h4">{totalIdeas}</Typography>
        </Card>
      </Grid>
      <Grid item xs={12} md={6}>
        <Card>
          <Typography variant="h6" gutterBottom>Average Progress (%)</Typography>
          <Typography variant="h4">{avgProgress.toFixed(2)}%</Typography>
        </Card>
      </Grid>

      {/* Highcharts */}
      <Grid item xs={12} md={6}>
        <Card>
          <HighchartsReact highcharts={Highcharts} options={stageDistributionChartOptions} />
        </Card>
      </Grid>
      <Grid item xs={12} md={6}>
        <Card>
          <HighchartsReact highcharts={Highcharts} options={progressChartOptions} />
        </Card>
      </Grid>

      {/* Tags */}
      <Grid item xs={12}>
        <Card>
          <Typography variant="h6" gutterBottom>Tags</Typography>
          {data.map((record, index) => (
            <div key={index}>
              <Typography variant="subtitle1">{record.ideaTitle}:</Typography>
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

export default InnovationPipelineAnalytics;
