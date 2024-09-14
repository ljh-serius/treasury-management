import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { Box, Typography, Grid, Card, CardContent, Container, CircularProgress, Backdrop } from '@mui/material';

export default function WasteManagementDashboard({ fetchItems }) {
  const [wasteData, setWasteData] = useState([]);
  const [totalWaste, setTotalWaste] = useState(0);
  const [wasteTypeDistribution, setWasteTypeDistribution] = useState([]);
  const [reductionTrends, setReductionTrends] = useState([]);
  const [recyclingTrends, setRecyclingTrends] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDataAsync = async () => {
      setLoading(true);
      const data = await fetchItems();
      setWasteData(data);
      processWasteData(data);
      setLoading(false);
    };

    fetchDataAsync();
  }, [fetchItems]);

  const processWasteData = (data) => {
    // Total Waste Generated
    const totalGenerated = data.reduce((acc, record) => acc + Number(record.totalWasteGenerated), 0);
    setTotalWaste(totalGenerated);

    // Waste Type Distribution for Pie Chart
    const wasteTypeCounts = data.reduce((acc, record) => {
      acc[record.wasteType] = (acc[record.wasteType] || 0) + 1;
      return acc;
    }, {});
    setWasteTypeDistribution(Object.keys(wasteTypeCounts).map(key => ({
      name: key.charAt(0).toUpperCase() + key.slice(1),
      y: wasteTypeCounts[key],
    })));

    // Reduction Trends for Line Chart (Achieved vs Target)
    const reductionData = data.map(record => ({
      date: new Date(record.year).getTime(),
      target: Number(record.reductionTarget),
      achieved: Number(record.achievedReduction),
    }));
    setReductionTrends(reductionData);

    // Recycling Trends for Line Chart (Waste Recycled)
    const recyclingData = data.map(record => ({
      date: new Date(record.year).getTime(),
      recycled: Number(record.wasteRecycled),
    }));
    setRecyclingTrends(recyclingData);
  };

  // Highcharts options for Waste Type Distribution
  const wasteTypeChartOptions = {
    chart: { type: 'pie' },
    title: { text: 'Waste Type Distribution' },
    series: [{
      name: 'Waste Types',
      colorByPoint: true,
      data: wasteTypeDistribution,
    }],
  };

  // Highcharts options for Reduction Trends (Achieved vs Target)
  const reductionTrendChartOptions = {
    chart: { type: 'line' },
    title: { text: 'Waste Reduction Target vs Achieved' },
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

  // Highcharts options for Recycling Trends
  const recyclingTrendChartOptions = {
    chart: { type: 'line' },
    title: { text: 'Waste Recycling Trends (tons)' },
    xAxis: { type: 'datetime', title: { text: 'Year' } },
    yAxis: { title: { text: 'Recycled Waste (tons)' } },
    series: [{
      name: 'Waste Recycled',
      data: recyclingTrends.map(item => [item.date, item.recycled]),
    }],
  };

  return (
    <Container maxWidth="xl" sx={{ paddingTop: 3, paddingBottom: 7 }}>
      <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <Box sx={{ padding: 4 }}>
        <Typography variant="h4" gutterBottom>
          Waste Management Dashboard
        </Typography>

        <Grid container spacing={4}>
          {/* KPIs Section */}
          <Grid item xs={12} md={3}>
            <Card>
              <CardContent>
                <Typography variant="h6">Total Waste Generated (tons)</Typography>
                <Typography variant="h4" color="green" sx={{ fontWeight: 'bold' }}>
                  {totalWaste.toFixed(2)}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Grid container spacing={4} sx={{ marginTop: 4 }}>
          {/* Waste Type Distribution Chart */}
          <Grid item xs={12} md={6}>
            <HighchartsReact highcharts={Highcharts} options={wasteTypeChartOptions} />
          </Grid>

          {/* Reduction Trends Chart */}
          <Grid item xs={12} md={6}>
            <HighchartsReact highcharts={Highcharts} options={reductionTrendChartOptions} />
          </Grid>

          {/* Recycling Trends Chart */}
          <Grid item xs={12} md={12} sx={{ marginTop: 4 }}>
            <HighchartsReact highcharts={Highcharts} options={recyclingTrendChartOptions} />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
