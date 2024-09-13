import React, { useState, useEffect } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { Card, Grid, Typography, Chip } from '@mui/material';

const EnergyConsumptionAnalytics = ({ fetchItems }) => {
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
  const totalConsumption = data.reduce((sum, record) => sum + record.totalConsumption, 0);
  const totalCost = data.reduce((sum, record) => sum + record.cost, 0);
  const avgReductionTarget = data.reduce((sum, record) => sum + record.reductionTarget, 0) / data.length;
  const avgAchievedReduction = data.reduce((sum, record) => sum + record.achievedReduction, 0) / data.length;

  // Highcharts options for energy consumption over time
  const consumptionChartOptions = {
    title: { text: 'Energy Consumption Over Time (MWh)' },
    xAxis: { categories: data.map((record) => record.year) },
    yAxis: { title: { text: 'Consumption (MWh)' } },
    series: [
      { name: 'Total Consumption', data: data.map((record) => record.totalConsumption) },
    ],
  };

  // Highcharts options for cost of energy over time
  const costChartOptions = {
    title: { text: 'Energy Cost Over Time ($)' },
    xAxis: { categories: data.map((record) => record.year) },
    yAxis: { title: { text: 'Cost ($)' } },
    series: [
      { name: 'Total Cost', data: data.map((record) => record.cost) },
    ],
  };

  // Highcharts options for achieved vs target reduction
  const reductionChartOptions = {
    title: { text: 'Reduction Target vs Achieved Reduction (%)' },
    xAxis: { categories: data.map((record) => record.year) },
    yAxis: { title: { text: 'Reduction (%)' } },
    series: [
      { name: 'Reduction Target', data: data.map((record) => record.reductionTarget) },
      { name: 'Achieved Reduction', data: data.map((record) => record.achievedReduction) },
    ],
  };

  return (
    <Grid container spacing={4}>
      {/* KPI Cards */}
      <Grid item xs={12} md={4}>
        <Card>
          <Typography variant="h6" gutterBottom>Total Consumption (MWh)</Typography>
          <Typography variant="h4">{totalConsumption.toFixed(2)}</Typography>
        </Card>
      </Grid>
      <Grid item xs={12} md={4}>
        <Card>
          <Typography variant="h6" gutterBottom>Total Cost ($)</Typography>
          <Typography variant="h4">{totalCost.toFixed(2)}</Typography>
        </Card>
      </Grid>
      <Grid item xs={12} md={4}>
        <Card>
          <Typography variant="h6" gutterBottom>Average Reduction Target (%)</Typography>
          <Typography variant="h4">{avgReductionTarget.toFixed(2)}</Typography>
        </Card>
      </Grid>
      <Grid item xs={12} md={4}>
        <Card>
          <Typography variant="h6" gutterBottom>Average Achieved Reduction (%)</Typography>
          <Typography variant="h4">{avgAchievedReduction.toFixed(2)}</Typography>
        </Card>
      </Grid>

      {/* Highcharts */}
      <Grid item xs={12}>
        <Card>
          <HighchartsReact highcharts={Highcharts} options={consumptionChartOptions} />
        </Card>
      </Grid>
      <Grid item xs={12}>
        <Card>
          <HighchartsReact highcharts={Highcharts} options={costChartOptions} />
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

export default EnergyConsumptionAnalytics;
