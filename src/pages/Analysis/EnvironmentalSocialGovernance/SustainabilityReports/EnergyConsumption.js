import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { Box, Typography, Grid, Card, CardContent, Container, CircularProgress, Backdrop } from '@mui/material';

export default function EnergyConsumptionDashboard({ fetchItems }) {
  const [energyData, setEnergyData] = useState([]);
  const [totalConsumption, setTotalConsumption] = useState(0);
  const [totalCost, setTotalCost] = useState(0);
  const [energyTypeDistribution, setEnergyTypeDistribution] = useState([]);
  const [reductionTrends, setReductionTrends] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDataAsync = async () => {
      setLoading(true);
      const data = await fetchItems();
      setEnergyData(data);
      processEnergyData(data);
      setLoading(false);
    };

    fetchDataAsync();
  }, [fetchItems]);

  const processEnergyData = (data) => {
    // Total Energy Consumption and Cost
    const totalEnergy = data.reduce((acc, record) => acc + Number(record.totalConsumption), 0);
    const totalCostAmount = data.reduce((acc, record) => acc + Number(record.cost), 0);
    setTotalConsumption(totalEnergy);
    setTotalCost(totalCostAmount);

    // Energy Type Distribution for Pie Chart
    const energyTypeCounts = data.reduce((acc, record) => {
      acc[record.energyType] = (acc[record.energyType] || 0) + 1;
      return acc;
    }, {});
    setEnergyTypeDistribution(Object.keys(energyTypeCounts).map(key => ({
      name: key.charAt(0).toUpperCase() + key.slice(1),
      y: energyTypeCounts[key],
    })));

    // Reduction Trends (Achieved vs Target) for Line Chart
    const reductionData = data.map(record => ({
      date: new Date(record.year).getTime(),
      target: Number(record.reductionTarget),
      achieved: Number(record.achievedReduction),
    }));
    setReductionTrends(reductionData);
  };

  // Highcharts options for Energy Type Distribution
  const energyTypeChartOptions = {
    chart: { type: 'pie' },
    title: { text: 'Energy Type Distribution' },
    series: [{
      name: 'Energy Types',
      colorByPoint: true,
      data: energyTypeDistribution,
    }],
  };

  // Highcharts options for Reduction Trends (Achieved vs Target)
  const reductionTrendChartOptions = {
    chart: { type: 'line' },
    title: { text: 'Reduction Target vs Achieved' },
    xAxis: { type: 'datetime', title: { text: 'Year' } },
    yAxis: { title: { text: 'Reduction (%)' } },
    series: [
      {
        name: 'Target Reduction (%)',
        data: reductionTrends.map(item => [item.date, item.target]),
      },
      {
        name: 'Achieved Reduction (%)',
        data: reductionTrends.map(item => [item.date, item.achieved]),
      },
    ],
  };

  return (
    <Container maxWidth="xl" sx={{ paddingTop: 3, paddingBottom: 7 }}>
      <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <Box sx={{ padding: 4 }}>
        <Typography variant="h4" gutterBottom>
          Energy Consumption Dashboard
        </Typography>

        <Grid container spacing={4}>
          {/* KPIs Section */}
          <Grid item xs={12} md={3}>
            <Card>
              <CardContent>
                <Typography variant="h6">Total Consumption (MWh)</Typography>
                <Typography variant="h4" color="green" sx={{ fontWeight: 'bold' }}>
                  {totalConsumption.toFixed(2)}
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={3}>
            <Card>
              <CardContent>
                <Typography variant="h6">Total Cost ($)</Typography>
                <Typography variant="h4" color="blue" sx={{ fontWeight: 'bold' }}>
                  {totalCost.toFixed(2)}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Grid container spacing={4} sx={{ marginTop: 4 }}>
          {/* Energy Type Distribution Chart */}
          <Grid item xs={12} md={6}>
            <HighchartsReact highcharts={Highcharts} options={energyTypeChartOptions} />
          </Grid>

          {/* Reduction Trends Chart */}
          <Grid item xs={12} md={6}>
            <HighchartsReact highcharts={Highcharts} options={reductionTrendChartOptions} />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
