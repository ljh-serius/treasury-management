import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { Box, Typography, Grid, Card, CardContent, Container, CircularProgress, Backdrop } from '@mui/material';

export default function BenchmarkingDashboard({ fetchItems }) {
  const [benchmarkData, setBenchmarkData] = useState([]);
  const [totalBenchmarks, setTotalBenchmarks] = useState(0);
  const [industryStandardDistribution, setIndustryStandardDistribution] = useState([]);
  const [tagsDistribution, setTagsDistribution] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const data = await fetchItems();
      setBenchmarkData(data);
      processBenchmarkData(data);
      setLoading(false);
    };

    fetchData();
  }, [fetchItems]);

  const processBenchmarkData = (data) => {
    setTotalBenchmarks(data.length);

    const industryMap = {};
    const tagsMap = {};

    data.forEach((item) => {
      // Process industry standard distribution
      const industry = item.industryStandard;
      industryMap[industry] = (industryMap[industry] || 0) + 1;

      // Process tags distribution
      item.tags.forEach(tag => {
        tagsMap[tag] = (tagsMap[tag] || 0) + 1;
      });
    });

    const industryArray = Object.entries(industryMap).map(([industry, count]) => ({
      name: industry,
      y: count,
    }));

    const tagsArray = Object.entries(tagsMap).map(([tag, count]) => ({
      name: tag,
      y: count,
    }));

    setIndustryStandardDistribution(industryArray);
    setTagsDistribution(tagsArray);
  };

  // Highcharts options for Industry Standard Distribution
  const industryChartOptions = {
    chart: { type: 'pie' },
    title: { text: 'Industry Standard Distribution' },
    series: [
      {
        name: 'Industry Standard',
        colorByPoint: true,
        data: industryStandardDistribution,
      },
    ],
  };

  // Highcharts options for Tags Distribution
  const tagsChartOptions = {
    chart: { type: 'pie' },
    title: { text: 'Tags Distribution' },
    series: [
      {
        name: 'Tags',
        colorByPoint: true,
        data: tagsDistribution,
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
          Benchmarking Dashboard
        </Typography>

        <Grid container spacing={4}>
          {/* KPIs Section */}
          <Grid item xs={12} md={3}>
            <Card>
              <CardContent>
                <Typography variant="h6">Total Benchmarks</Typography>
                <Typography variant="h4" color="green" sx={{ fontWeight: 'bold' }}>
                  {totalBenchmarks}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Grid container spacing={4} sx={{ marginTop: 4 }}>
          {/* Industry Standard Distribution Chart */}
          <Grid item xs={12} md={6}>
            <HighchartsReact highcharts={Highcharts} options={industryChartOptions} />
          </Grid>

          {/* Tags Distribution Chart */}
          <Grid item xs={12} md={6}>
            <HighchartsReact highcharts={Highcharts} options={tagsChartOptions} />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
