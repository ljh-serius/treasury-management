import React, { useState, useEffect } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { Card, Grid, Typography, Chip } from '@mui/material';

const TargetIdentificationAnalytics = ({ fetchItems }) => {
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
  const totalMarketValue = data.reduce((sum, record) => sum + Number(record.marketValue), 0);
  const totalRevenue = data.reduce((sum, record) => sum + Number(record.revenue), 0);
  const totalEmployeeCount = data.reduce((sum, record) => sum + Number(record.employeeCount), 0);

  // Industry Distribution
  const industryMap = data.reduce((acc, record) => {
    acc[record.industry] = (acc[record.industry] || 0) + 1;
    return acc;
  }, {});

  const industryDistribution = Object.keys(industryMap).map(industry => ({
    name: industry,
    y: industryMap[industry],
  }));

  // Highcharts options for Industry Distribution
  const industryChartOptions = {
    chart: { type: 'pie' },
    title: { text: 'Industry Distribution' },
    series: [{
      name: 'Industries',
      colorByPoint: true,
      data: industryDistribution,
    }],
  };

  // Highcharts options for Market Value over Time
  const marketValueChartOptions = {
    chart: { type: 'line' },
    title: { text: 'Market Value Over Time' },
    xAxis: {
      categories: data.map(record => new Date(record.identificationDate).getFullYear()),
      title: { text: 'Year' }
    },
    yAxis: { title: { text: 'Market Value' } },
    series: [{
      name: 'Market Value',
      data: data.map(record => record.marketValue),
    }],
  };

  return (
    <Grid container spacing={4}>
      {/* KPI Cards */}
      <Grid item xs={12} md={4}>
        <Card>
          <Typography variant="h6" gutterBottom>Total Market Value</Typography>
          <Typography variant="h4">${totalMarketValue.toFixed(2)}</Typography>
        </Card>
      </Grid>
      <Grid item xs={12} md={4}>
        <Card>
          <Typography variant="h6" gutterBottom>Total Revenue</Typography>
          <Typography variant="h4">${totalRevenue.toFixed(2)}</Typography>
        </Card>
      </Grid>
      <Grid item xs={12} md={4}>
        <Card>
          <Typography variant="h6" gutterBottom>Total Employee Count</Typography>
          <Typography variant="h4">{totalEmployeeCount}</Typography>
        </Card>
      </Grid>

      {/* Highcharts */}
      <Grid item xs={12} md={6}>
        <Card>
          <HighchartsReact highcharts={Highcharts} options={industryChartOptions} />
        </Card>
      </Grid>
      <Grid item xs={12} md={6}>
        <Card>
          <HighchartsReact highcharts={Highcharts} options={marketValueChartOptions} />
        </Card>
      </Grid>

      {/* Tags */}
      <Grid item xs={12}>
        <Card>
          <Typography variant="h6" gutterBottom>Tags</Typography>
          {data.map((record, index) => (
            <div key={index}>
              <Typography variant="subtitle1">{record.companyName}:</Typography>
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

export default TargetIdentificationAnalytics;
