import React, { useState, useEffect } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { Card, Grid, Typography, Chip } from '@mui/material';

const NPSAnalytics = ({ fetchItems }) => {
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

  // KPIs
  const totalResponses = data.length;
  const promoters = data.filter((item) => item.score >= 9).length;
  const passives = data.filter((item) => item.score >= 7 && item.score <= 8).length;
  const detractors = data.filter((item) => item.score <= 6).length;

  // Calculate NPS
  const npsScore = ((promoters - detractors) / totalResponses) * 100;

  // Highcharts options for NPS distribution
  const npsDistributionOptions = {
    chart: { type: 'column' },
    title: { text: 'NPS Score Distribution' },
    xAxis: {
      categories: ['Promoters (9-10)', 'Passives (7-8)', 'Detractors (0-6)'],
      crosshair: true,
    },
    yAxis: {
      min: 0,
      title: { text: 'Number of Responses' },
    },
    series: [
      {
        name: 'Responses',
        data: [promoters, passives, detractors],
      },
    ],
  };

  return (
    <Grid container spacing={4}>
      {/* KPI Cards */}
      <Grid item xs={12} md={3}>
        <Card>
          <Typography variant="h6" gutterBottom>Total Responses</Typography>
          <Typography variant="h4">{totalResponses}</Typography>
        </Card>
      </Grid>
      <Grid item xs={12} md={3}>
        <Card>
          <Typography variant="h6" gutterBottom>Promoters</Typography>
          <Typography variant="h4">{promoters}</Typography>
        </Card>
      </Grid>
      <Grid item xs={12} md={3}>
        <Card>
          <Typography variant="h6" gutterBottom>Passives</Typography>
          <Typography variant="h4">{passives}</Typography>
        </Card>
      </Grid>
      <Grid item xs={12} md={3}>
        <Card>
          <Typography variant="h6" gutterBottom>Detractors</Typography>
          <Typography variant="h4">{detractors}</Typography>
        </Card>
      </Grid>
      <Grid item xs={12} md={3}>
        <Card>
          <Typography variant="h6" gutterBottom>NPS Score</Typography>
          <Typography variant="h4">{npsScore.toFixed(2)}</Typography>
        </Card>
      </Grid>

      {/* Highcharts */}
      <Grid item xs={12} md={12}>
        <Card>
          <HighchartsReact highcharts={Highcharts} options={npsDistributionOptions} />
        </Card>
      </Grid>

      {/* Tags */}
      <Grid item xs={12}>
        <Card>
          <Typography variant="h6" gutterBottom>Tags</Typography>
          {data.map((record, index) => (
            <div key={index}>
              <Typography variant="subtitle1">{`Response ${index + 1}:`}</Typography>
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

export default NPSAnalytics;
