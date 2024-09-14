import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { Box, Typography, Grid, Card, CardContent, Container, CircularProgress, Backdrop } from '@mui/material';

export default function RenewableEnergyInitiativesDashboard({ fetchItems }) {
  const [initiativeData, setInitiativeData] = useState([]);
  const [totalEnergyGenerated, setTotalEnergyGenerated] = useState(0);
  const [totalCostSavings, setTotalCostSavings] = useState(0);
  const [totalCarbonReduction, setTotalCarbonReduction] = useState(0);
  const [tagsDistribution, setTagsDistribution] = useState([]);
  const [energyGeneratedTrends, setEnergyGeneratedTrends] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDataAsync = async () => {
      setLoading(true);
      const data = await fetchItems();
      setInitiativeData(data);
      processInitiativeData(data);
      setLoading(false);
    };

    fetchDataAsync();
  }, [fetchItems]);

  const processInitiativeData = (data) => {
    // Total Energy Generated, Cost Savings, and Carbon Reduction
    const totalEnergy = data.reduce((acc, item) => acc + Number(item.energyGenerated), 0);
    const totalSavings = data.reduce((acc, item) => acc + Number(item.costSavings), 0);
    const totalCarbon = data.reduce((acc, item) => acc + Number(item.carbonReduction), 0);

    setTotalEnergyGenerated(totalEnergy);
    setTotalCostSavings(totalSavings);
    setTotalCarbonReduction(totalCarbon);

    // Tag Distribution for Pie Chart
    const tagCounts = data.reduce((acc, initiative) => {
      if (initiative.tags) {
        initiative.tags.forEach(tag => {
          acc[tag] = (acc[tag] || 0) + 1;
        });
      }
      return acc;
    }, {});
    setTagsDistribution(Object.keys(tagCounts).map(key => ({
      name: key.charAt(0).toUpperCase() + key.slice(1),
      y: tagCounts[key],
    })));

    // Energy Generated Trends for Line Chart
    const trendData = data.map(initiative => ({
      date: new Date(initiative.startDate).getTime(),
      energy: Number(initiative.energyGenerated),
    })).sort((a, b) => a.date - b.date);
    setEnergyGeneratedTrends(trendData);
  };

  // Highcharts options for Energy Generated Trends
  const energyGeneratedChartOptions = {
    chart: { type: 'line' },
    title: { text: 'Energy Generated Trends (MWh)' },
    xAxis: { type: 'datetime', title: { text: 'Start Date' } },
    yAxis: { title: { text: 'Energy Generated (MWh)' } },
    series: [{
      name: 'Energy Generated',
      data: energyGeneratedTrends.map(item => [item.date, item.energy]),
    }],
  };

  // Highcharts options for Tag Distribution
  const tagChartOptions = {
    chart: { type: 'pie' },
    title: { text: 'Initiative Tags Distribution' },
    series: [{
      name: 'Tags',
      colorByPoint: true,
      data: tagsDistribution,
    }],
  };

  return (
    <Container maxWidth="xl" sx={{ paddingTop: 3, paddingBottom: 7 }}>
      <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <Box sx={{ padding: 4 }}>
        <Typography variant="h4" gutterBottom>
          Renewable Energy Initiatives Dashboard
        </Typography>

        <Grid container spacing={4}>
          {/* KPIs Section */}
          <Grid item xs={12} md={3}>
            <Card>
              <CardContent>
                <Typography variant="h6">Total Energy Generated</Typography>
                <Typography variant="h4" color="green" sx={{ fontWeight: 'bold' }}>
                  {totalEnergyGenerated.toFixed(2)} MWh
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={3}>
            <Card>
              <CardContent>
                <Typography variant="h6">Total Cost Savings</Typography>
                <Typography variant="h4" color="blue" sx={{ fontWeight: 'bold' }}>
                  ${totalCostSavings.toFixed(2)}
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={3}>
            <Card>
              <CardContent>
                <Typography variant="h6">Total Carbon Reduction</Typography>
                <Typography variant="h4" color="orange" sx={{ fontWeight: 'bold' }}>
                  {totalCarbonReduction.toFixed(2)} tons CO2e
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Grid container spacing={4} sx={{ marginTop: 4 }}>
          {/* Energy Generated Trends Chart */}
          <Grid item xs={12} md={6}>
            <HighchartsReact highcharts={Highcharts} options={energyGeneratedChartOptions} />
          </Grid>

          {/* Tag Distribution Chart */}
          <Grid item xs={12} md={6}>
            <HighchartsReact highcharts={Highcharts} options={tagChartOptions} />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
