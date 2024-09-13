import React, { useState, useEffect } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { Card, Grid, Typography, Chip } from '@mui/material';

const EnergyAuditAnalytics = ({ fetchItems }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const response = await fetchItems();
      setData(response);
      setLoading(false);
    }
    fetchData();
  }, []);

  if (loading) return <Typography>Loading...</Typography>;

  // Calculate KPIs
  const totalAudits = data.length;
  const totalFindings = data.reduce((sum, audit) => sum + audit.findings.split(' ').length, 0);
  const totalRecommendations = data.reduce((sum, audit) => sum + audit.recommendations.split(' ').length, 0);

  // Highcharts options
  const auditTimelineOptions = {
    title: { text: 'Audits Over Time' },
    xAxis: { categories: data.map((audit) => audit.auditDate) },
    yAxis: { title: { text: 'Number of Findings' } },
    series: [{ name: 'Findings', data: data.map((audit) => audit.findings.split(' ').length) }],
  };

  const recommendationChartOptions = {
    title: { text: 'Recommendations Over Time' },
    xAxis: { categories: data.map((audit) => audit.auditDate) },
    yAxis: { title: { text: 'Number of Recommendations' } },
    series: [{ name: 'Recommendations', data: data.map((audit) => audit.recommendations.split(' ').length) }],
  };

  return (
    <Grid container spacing={4}>
      {/* KPI Cards */}
      <Grid item xs={12} md={4}>
        <Card>
          <Typography variant="h6" gutterBottom>Total Audits</Typography>
          <Typography variant="h4">{totalAudits}</Typography>
        </Card>
      </Grid>
      <Grid item xs={12} md={4}>
        <Card>
          <Typography variant="h6" gutterBottom>Total Findings</Typography>
          <Typography variant="h4">{totalFindings}</Typography>
        </Card>
      </Grid>
      <Grid item xs={12} md={4}>
        <Card>
          <Typography variant="h6" gutterBottom>Total Recommendations</Typography>
          <Typography variant="h4">{totalRecommendations}</Typography>
        </Card>
      </Grid>

      {/* Highcharts */}
      <Grid item xs={12}>
        <Card>
          <HighchartsReact highcharts={Highcharts} options={auditTimelineOptions} />
        </Card>
      </Grid>
      <Grid item xs={12}>
        <Card>
          <HighchartsReact highcharts={Highcharts} options={recommendationChartOptions} />
        </Card>
      </Grid>

      {/* Tags */}
      <Grid item xs={12}>
        <Card>
          <Typography variant="h6" gutterBottom>Tags</Typography>
          {data.map((audit, index) => (
            <div key={index}>
              <Typography variant="subtitle1">{audit.auditDate}:</Typography>
              {audit.tags.map((tag) => (
                <Chip key={tag.id} label={tag.label} style={{ margin: '5px' }} />
              ))}
            </div>
          ))}
        </Card>
      </Grid>
    </Grid>
  );
};

export default EnergyAuditAnalytics;
