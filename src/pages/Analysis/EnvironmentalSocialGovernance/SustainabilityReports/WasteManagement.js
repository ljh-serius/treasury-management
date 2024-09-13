import React, { useState, useEffect } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { Card, Grid, Typography, Chip } from '@mui/material';

const WasteManagementAnalytics = ({ fetchItems }) => {
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
  const totalWasteGenerated = data.reduce((sum, record) => sum + record.totalWasteGenerated, 0);
  const totalWasteDisposed = data.reduce((sum, record) => sum + record.wasteDisposed, 0);
  const totalWasteRecycled = data.reduce((sum, record) => sum + record.wasteRecycled, 0);
  const avgReductionTarget = data.reduce((sum, record) => sum + record.reductionTarget, 0) / data.length;
  const avgAchievedReduction = data.reduce((sum, record) => sum + record.achievedReduction, 0) / data.length;

  // Highcharts options for waste generation
  const wasteChartOptions = {
    title: { text: 'Total Waste Generated Over Time (tons)' },
    xAxis: { categories: data.map((record) => record.year) },
    yAxis: { title: { text: 'Waste Generated (tons)' } },
    series: [
      { name: 'Total Waste Generated', data: data.map((record) => record.totalWasteGenerated) },
      { name: 'Waste Disposed', data: data.map((record) => record.wasteDisposed) },
      { name: 'Waste Recycled', data: data.map((record) => record.wasteRecycled) },
    ],
  };

  // Highcharts options for waste reduction target vs achieved reduction
  const reductionChartOptions = {
    title: { text: 'Waste Reduction Target vs Achieved (%)' },
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
          <Typography variant="h6" gutterBottom>Total Waste Generated (tons)</Typography>
          <Typography variant="h4">{totalWasteGenerated.toFixed(2)}</Typography>
        </Card>
      </Grid>
      <Grid item xs={12} md={4}>
        <Card>
          <Typography variant="h6" gutterBottom>Total Waste Disposed (tons)</Typography>
          <Typography variant="h4">{totalWasteDisposed.toFixed(2)}</Typography>
        </Card>
      </Grid>
      <Grid item xs={12} md={4}>
        <Card>
          <Typography variant="h6" gutterBottom>Total Waste Recycled (tons)</Typography>
          <Typography variant="h4">{totalWasteRecycled.toFixed(2)}</Typography>
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
          <HighchartsReact highcharts={Highcharts} options={wasteChartOptions} />
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

export default WasteManagementAnalytics;
