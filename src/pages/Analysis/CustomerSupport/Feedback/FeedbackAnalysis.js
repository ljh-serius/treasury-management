import React, { useState, useEffect } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { Card, Grid, Typography, Chip } from '@mui/material';

const FeedbackAnalysis = ({ fetchItems }) => {
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
  const totalFeedback = data.length;
  const positiveFeedback = data.filter((item) => item.feedbackType === 'positive').length;
  const negativeFeedback = data.filter((item) => item.feedbackType === 'negative').length;
  const neutralFeedback = data.filter((item) => item.feedbackType === 'neutral').length;
  const resolvedFeedback = data.filter((item) => item.resolutionStatus === 'resolved').length;

  // Highcharts options for feedback type distribution
  const feedbackTypeOptions = {
    chart: { type: 'pie' },
    title: { text: 'Feedback Type Distribution' },
    series: [
      {
        name: 'Feedback',
        colorByPoint: true,
        data: [
          { name: 'Positive', y: positiveFeedback },
          { name: 'Neutral', y: neutralFeedback },
          { name: 'Negative', y: negativeFeedback },
        ],
      },
    ],
  };

  // Highcharts options for resolution status distribution
  const resolutionStatusOptions = {
    chart: { type: 'pie' },
    title: { text: 'Resolution Status Distribution' },
    series: [
      {
        name: 'Resolution Status',
        colorByPoint: true,
        data: [
          { name: 'Resolved', y: resolvedFeedback },
          { name: 'Unresolved', y: totalFeedback - resolvedFeedback },
        ],
      },
    ],
  };

  return (
    <Grid container spacing={4}>
      {/* KPI Cards */}
      <Grid item xs={12} md={3}>
        <Card>
          <Typography variant="h6" gutterBottom>Total Feedback</Typography>
          <Typography variant="h4">{totalFeedback}</Typography>
        </Card>
      </Grid>
      <Grid item xs={12} md={3}>
        <Card>
          <Typography variant="h6" gutterBottom>Positive Feedback</Typography>
          <Typography variant="h4">{positiveFeedback}</Typography>
        </Card>
      </Grid>
      <Grid item xs={12} md={3}>
        <Card>
          <Typography variant="h6" gutterBottom>Negative Feedback</Typography>
          <Typography variant="h4">{negativeFeedback}</Typography>
        </Card>
      </Grid>
      <Grid item xs={12} md={3}>
        <Card>
          <Typography variant="h6" gutterBottom>Resolved Feedback</Typography>
          <Typography variant="h4">{resolvedFeedback}</Typography>
        </Card>
      </Grid>

      {/* Highcharts */}
      <Grid item xs={12} md={6}>
        <Card>
          <HighchartsReact highcharts={Highcharts} options={feedbackTypeOptions} />
        </Card>
      </Grid>
      <Grid item xs={12} md={6}>
        <Card>
          <HighchartsReact highcharts={Highcharts} options={resolutionStatusOptions} />
        </Card>
      </Grid>

      {/* Tags */}
      <Grid item xs={12}>
        <Card>
          <Typography variant="h6" gutterBottom>Tags</Typography>
          {data.map((record, index) => (
            <div key={index}>
              <Typography variant="subtitle1">{`Feedback ${index + 1}:`}</Typography>
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

export default FeedbackAnalysis;
