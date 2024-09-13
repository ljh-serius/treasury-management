import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { Box, Typography, Grid, Card, CardContent, Container, CircularProgress, Backdrop } from '@mui/material';

export default function MarketAnalysisDashboard({ fetchItems }) {
  const [analysisData, setAnalysisData] = useState([]);
  const [totalAnalyses, setTotalAnalyses] = useState(0);
  const [marketSegmentDistribution, setMarketSegmentDistribution] = useState([]);
  const [tagsDistribution, setTagsDistribution] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const data = await fetchItems();
      setAnalysisData(data);
      processAnalysisData(data);
      setLoading(false);
    };

    fetchData();
  }, [fetchItems]);

  const processAnalysisData = (data) => {
    setTotalAnalyses(data.length);

    const segmentMap = {};
    const tagsMap = {};
    data.forEach((item) => {
      const segment = item.marketSegment;
      const tags = item.tags;

      segmentMap[segment] = (segmentMap[segment] || 0) + 1;
      tags.forEach(tag => {
        tagsMap[tag] = (tagsMap[tag] || 0) + 1;
      });
    });

    const segmentArray = Object.entries(segmentMap).map(([segment, count]) => ({
      name: segment,
      y: count,
    }));
    const tagsArray = Object.entries(tagsMap).map(([tag, count]) => ({
      name: tag,
      y: count,
    }));
    setMarketSegmentDistribution(segmentArray);
    setTagsDistribution(tagsArray);
  };

  // Highcharts options for Market Segment Distribution
  const segmentChartOptions = {
    chart: { type: 'pie' },
    title: { text: 'Market Segment Distribution' },
    series: [
      {
        name: 'Market Segments',
        colorByPoint: true,
        data: marketSegmentDistribution,
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
          Market Analysis Dashboard
        </Typography>

        <Grid container spacing={4}>
          {/* KPIs Section */}
          <Grid item xs={12} md={3}>
            <Card>
              <CardContent>
                <Typography variant="h6">Total Market Analyses Conducted</Typography>
                <Typography variant="h4" color="green" sx={{ fontWeight: 'bold' }}>
                  {totalAnalyses}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Grid container spacing={4} sx={{ marginTop: 4 }}>
          {/* Market Segment Distribution Chart */}
          <Grid item xs={12} md={6}>
            <HighchartsReact highcharts={Highcharts} options={segmentChartOptions} />
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
