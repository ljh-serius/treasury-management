import React, { useState, useEffect } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { Card, Grid, Typography, Chip } from '@mui/material';

const EnergySavingsAnalytics = ({ fetchItems }) => {
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
  const totalSavings = data.reduce((sum, record) => sum + record.totalSavings, 0);
  const totalCostSavings = data.reduce((sum, record) => sum + record.costSavings, 0);
  const averageReduction = data.reduce((sum, record) => sum + record.achievedReduction, 0) / data.length;

  // Highcharts options for total savings over the years
  const totalSavingsChartOptions = {
    title: { text: 'Total Energy Savings Over the Years' },
    xAxis: { categories: data.map((record) => record.year) },
    yAxis: { title: { text: 'Total Savings (MWh)' } },
    series: [{ name: 'Total Savings (MWh)', data: data.map((record) => record.totalSavings) }],
  };

  // Highcharts options for cost savings over the years
  const costSavingsChartOptions = {
    title: { text: 'Cost Savings Over the Years' },
    xAxis: { categories: data.map((record) => record.year) },
    yAxis: { title: { text: 'Cost Savings' } },
    series: [{ name: 'Cost Savings', data: data.map((record) => record.costSavings) }],
  };

  // Highcharts options for achieved reduction vs target
  const reductionChartOptions = {
    title: { text: 'Achieved Reduction vs Reduction Target' },
    xAxis: { categories: data.map((record) => record.year) },
    yAxis: { title: { text: 'Reduction (%)' } },
    series: [
      { name: 'Reduction Target (%)', data: data.map((record) => record.reductionTarget) },
      { name: 'Achieved Reduction (%)', data: data.map((record) => record.achievedReduction) },
    ],
  };

  return (
    <Grid container spacing={4}>
      {/* KPI Cards */}
      <Grid item xs={12} md={4}>
        <Card>
          <Typography variant="h6" gutterBottom>Total Energy Savings (MWh)</Typography>
          <Typography variant="h4">{totalSavings.toFixed(2)}</Typography>
        </Card>
      </Grid>
      <Grid item xs={12} md={4}>
        <Card>
          <Typography variant="h6" gutterBottom>Total Cost Savings</Typography>
          <Typography variant="h4">${totalCostSavings.toFixed(2)}</Typography>
        </Card>
      </Grid>
      <Grid item xs={12} md={4}>
        <Card>
          <Typography variant="h6" gutterBottom>Average Achieved Reduction (%)</Typography>
          <Typography variant="h4">{averageReduction.toFixed(2)}%</Typography>
        </Card>
      </Grid>

      {/* Highcharts */}
      <Grid item xs={12}>
        <Card>
          <HighchartsReact highcharts={Highcharts} options={totalSavingsChartOptions} />
        </Card>
      </Grid>
      <Grid item xs={12}>
        <Card>
          <HighchartsReact highcharts={Highcharts} options={costSavingsChartOptions} />
        </Card>
      </Grid>
      <Grid item xs={12}>
        <Card>
          <HighchartsReact highcharts={Highcharts} options={reductionChartOptions} />
        </Card>
      </Grid>

      {/* Tags */}
      <Grid item xs={12}>
        <Card>
          <Typography variant="h6" gutterBottom>Tags</Typography>
          {data.map((record, index) => (
            <div key={index}>
              <Typography variant="subtitle1">{record.year}:</Typography>
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

export default EnergySavingsAnalytics;
