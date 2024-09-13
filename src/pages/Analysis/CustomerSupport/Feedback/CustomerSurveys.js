import React, { useState, useEffect } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { Card, Grid, Typography, Chip } from '@mui/material';

const CustomerSurveysAnalytics = ({ fetchItems }) => {
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

  // Calculate KPIs
  const totalSurveys = data.length;
  const averageSatisfactionScore = (
    data.reduce((sum, record) => sum + parseInt(record.satisfactionScore, 10), 0) / totalSurveys
  ).toFixed(2);

  // Highcharts options for satisfaction score distribution
  const satisfactionScoreOptions = {
    chart: { type: 'column' },
    title: { text: 'Satisfaction Score Distribution' },
    xAxis: {
      categories: ['1', '2', '3', '4', '5'],
      title: { text: 'Score' },
    },
    yAxis: {
      min: 0,
      title: { text: 'Number of Responses' },
    },
    series: [
      {
        name: 'Responses',
        data: [1, 2, 3, 4, 5].map(
          (score) => data.filter((record) => record.satisfactionScore === String(score)).length
        ),
      },
    ],
  };

  return (
    <Grid container spacing={4}>
      {/* KPI Cards */}
      <Grid item xs={12} md={4}>
        <Card>
          <Typography variant="h6" gutterBottom>Total Surveys</Typography>
          <Typography variant="h4">{totalSurveys}</Typography>
        </Card>
      </Grid>
      <Grid item xs={12} md={4}>
        <Card>
          <Typography variant="h6" gutterBottom>Average Satisfaction Score</Typography>
          <Typography variant="h4">{averageSatisfactionScore}</Typography>
        </Card>
      </Grid>

      {/* Highcharts */}
      <Grid item xs={12}>
        <Card>
          <HighchartsReact highcharts={Highcharts} options={satisfactionScoreOptions} />
        </Card>
      </Grid>

      {/* Tags */}
      <Grid item xs={12}>
        <Card>
          <Typography variant="h6" gutterBottom>Tags</Typography>
          {data.map((record, index) => (
            <div key={index}>
              <Typography variant="subtitle1">{`Survey ${index + 1}:`}</Typography>
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

export default CustomerSurveysAnalytics;
