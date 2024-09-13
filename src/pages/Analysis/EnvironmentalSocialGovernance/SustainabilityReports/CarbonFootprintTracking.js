import React, { useState, useEffect } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { Card, Grid, Typography, Chip } from '@mui/material';

const CarbonFootprintAnalytics = ({ fetchItems }) => {
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
  const totalEmissions = data.reduce((sum, record) => sum + record.totalEmissions, 0);
  const totalScope1 = data.reduce((sum, record) => sum + record.scope1Emissions, 0);
  const totalScope2 = data.reduce((sum, record) => sum + record.scope2Emissions, 0);
  const totalScope3 = data.reduce((sum, record) => sum + record.scope3Emissions, 0);
  const avgReductionTarget = data.reduce((sum, record) => sum + record.reductionTarget, 0) / data.length;
  const avgAchievedReduction = data.reduce((sum, record) => sum + record.achievedReduction, 0) / data.length;

  // Highcharts options for total emissions over time
  const emissionsChartOptions = {
    title: { text: 'Total Emissions Over Time (tons CO2e)' },
    xAxis: { categories: data.map((record) => record.year) },
    yAxis: { title: { text: 'Emissions (tons CO2e)' } },
    series: [
      { name: 'Total Emissions', data: data.map((record) => record.totalEmissions) },
      { name: 'Scope 1 Emissions', data: data.map((record) => record.scope1Emissions) },
      { name: 'Scope 2 Emissions', data: data.map((record) => record.scope2Emissions) },
      { name: 'Scope 3 Emissions', data: data.map((record) => record.scope3Emissions) },
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
          <Typography variant="h6" gutterBottom>Total Emissions (tons CO2e)</Typography>
          <Typography variant="h4">{totalEmissions.toFixed(2)}</Typography>
        </Card>
      </Grid>
      <Grid item xs={12} md={4}>
        <Card>
          <Typography variant="h6" gutterBottom>Total Scope 1 Emissions (tons CO2e)</Typography>
          <Typography variant="h4">{totalScope1.toFixed(2)}</Typography>
        </Card>
      </Grid>
      <Grid item xs={12} md={4}>
        <Card>
          <Typography variant="h6" gutterBottom>Total Scope 2 Emissions (tons CO2e)</Typography>
          <Typography variant="h4">{totalScope2.toFixed(2)}</Typography>
        </Card>
      </Grid>
      <Grid item xs={12} md={4}>
        <Card>
          <Typography variant="h6" gutterBottom>Total Scope 3 Emissions (tons CO2e)</Typography>
          <Typography variant="h4">{totalScope3.toFixed(2)}</Typography>
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
          <HighchartsReact highcharts={Highcharts} options={emissionsChartOptions} />
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

export default CarbonFootprintAnalytics;
