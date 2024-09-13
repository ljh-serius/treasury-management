import React, { useState, useEffect } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { Card, Grid, Typography, Chip } from '@mui/material';

const RenewableEnergyAnalytics = ({ fetchItems }) => {
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
  const totalEnergyGenerated = data.reduce((sum, record) => sum + record.energyGenerated, 0);
  const totalCostSavings = data.reduce((sum, record) => sum + record.costSavings, 0);
  const totalCarbonReduction = data.reduce((sum, record) => sum + record.carbonReduction, 0);

  // Highcharts options for energy generated over time
  const energyGeneratedChartOptions = {
    title: { text: 'Energy Generated Over Time (MWh)' },
    xAxis: { categories: data.map((record) => record.initiativeName) },
    yAxis: { title: { text: 'Energy Generated (MWh)' } },
    series: [{ name: 'Energy Generated', data: data.map((record) => record.energyGenerated) }],
  };

  // Highcharts options for cost savings over time
  const costSavingsChartOptions = {
    title: { text: 'Cost Savings Over Time' },
    xAxis: { categories: data.map((record) => record.initiativeName) },
    yAxis: { title: { text: 'Cost Savings' } },
    series: [{ name: 'Cost Savings', data: data.map((record) => record.costSavings) }],
  };

  // Highcharts options for carbon reduction over time
  const carbonReductionChartOptions = {
    title: { text: 'Carbon Reduction Over Time (tons CO2e)' },
    xAxis: { categories: data.map((record) => record.initiativeName) },
    yAxis: { title: { text: 'Carbon Reduction (tons CO2e)' } },
    series: [{ name: 'Carbon Reduction', data: data.map((record) => record.carbonReduction) }],
  };

  return (
    <Grid container spacing={4}>
      {/* KPI Cards */}
      <Grid item xs={12} md={4}>
        <Card>
          <Typography variant="h6" gutterBottom>Total Energy Generated (MWh)</Typography>
          <Typography variant="h4">{totalEnergyGenerated.toFixed(2)}</Typography>
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
          <Typography variant="h6" gutterBottom>Total Carbon Reduction (tons CO2e)</Typography>
          <Typography variant="h4">{totalCarbonReduction.toFixed(2)} tons</Typography>
        </Card>
      </Grid>

      {/* Highcharts */}
      <Grid item xs={12}>
        <Card>
          <HighchartsReact highcharts={Highcharts} options={energyGeneratedChartOptions} />
        </Card>
      </Grid>
      <Grid item xs={12}>
        <Card>
          <HighchartsReact highcharts={Highcharts} options={costSavingsChartOptions} />
        </Card>
      </Grid>
      <Grid item xs={12}>
        <Card>
          <HighchartsReact highcharts={Highcharts} options={carbonReductionChartOptions} />
        </Card>
      </Grid>

      {/* Tags */}
      <Grid item xs={12}>
        <Card>
          <Typography variant="h6" gutterBottom>Tags</Typography>
          {data.map((record, index) => (
            <div key={index}>
              <Typography variant="subtitle1">{record.initiativeName}:</Typography>
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

export default RenewableEnergyAnalytics;
