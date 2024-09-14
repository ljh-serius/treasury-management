import React, { useState, useEffect } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { Card, Grid, Typography, Chip } from '@mui/material';

const CommunityInvestmentAnalytics = ({ fetchItems }) => {
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
  const totalInvestment = data.reduce((sum, record) => sum + Number(record.investmentAmount), 0);
  const ongoingProjects = data.filter((record) => record.status === 'ongoing').length;
  const completedProjects = data.filter((record) => record.status === 'completed').length;

  // Community Benefited Distribution
  const communityMap = data.reduce((acc, record) => {
    acc[record.communityBenefited] = (acc[record.communityBenefited] || 0) + 1;
    return acc;
  }, {});

  const communityDistribution = Object.keys(communityMap).map(community => ({
    name: community,
    y: communityMap[community],
  }));

  // Highcharts options for Community Benefited Distribution
  const communityChartOptions = {
    chart: { type: 'pie' },
    title: { text: 'Community Benefited Distribution' },
    series: [{
      name: 'Communities',
      colorByPoint: true,
      data: communityDistribution,
    }],
  };

  // Highcharts options for Investment over Time
  const investmentChartOptions = {
    chart: { type: 'line' },
    title: { text: 'Investment Over Time' },
    xAxis: {
      categories: data.map(record => new Date(record.startDate).getFullYear()),
      title: { text: 'Year' }
    },
    yAxis: { title: { text: 'Investment Amount' } },
    series: [{
      name: 'Investment Amount',
      data: data.map(record => record.investmentAmount),
    }],
  };

  return (
    <Grid container spacing={4}>
      {/* KPI Cards */}
      <Grid item xs={12} md={4}>
        <Card>
          <Typography variant="h6" gutterBottom>Total Investment Amount</Typography>
          <Typography variant="h4">${totalInvestment.toFixed(2)}</Typography>
        </Card>
      </Grid>
      <Grid item xs={12} md={4}>
        <Card>
          <Typography variant="h6" gutterBottom>Ongoing Projects</Typography>
          <Typography variant="h4">{ongoingProjects}</Typography>
        </Card>
      </Grid>
      <Grid item xs={12} md={4}>
        <Card>
          <Typography variant="h6" gutterBottom>Completed Projects</Typography>
          <Typography variant="h4">{completedProjects}</Typography>
        </Card>
      </Grid>

      {/* Highcharts */}
      <Grid item xs={12} md={6}>
        <Card>
          <HighchartsReact highcharts={Highcharts} options={communityChartOptions} />
        </Card>
      </Grid>
      <Grid item xs={12} md={6}>
        <Card>
          <HighchartsReact highcharts={Highcharts} options={investmentChartOptions} />
        </Card>
      </Grid>

      {/* Tags */}
      <Grid item xs={12}>
        <Card>
          <Typography variant="h6" gutterBottom>Tags</Typography>
          {data.map((record, index) => (
            <div key={index}>
              <Typography variant="subtitle1">{record.projectName}:</Typography>
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

export default CommunityInvestmentAnalytics;
