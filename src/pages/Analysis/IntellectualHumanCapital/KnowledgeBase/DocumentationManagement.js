import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { Box, Typography, Grid, Card, CardContent, Container, CircularProgress, Backdrop } from '@mui/material';

export default function DocumentationDashboard({ fetchItems }) {
  const [documentData, setDocumentData] = useState([]);
  const [totalDocuments, setTotalDocuments] = useState(0);
  const [documentTypeDistribution, setDocumentTypeDistribution] = useState([]);
  const [creationTrends, setCreationTrends] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const data = await fetchItems();
      setDocumentData(data);
      processDocumentData(data);
      setLoading(false);
    };

    fetchData();
  }, [fetchItems]);

  const processDocumentData = (data) => {
    // Total Documents
    setTotalDocuments(data.length);

    // Document Type Distribution for Pie Chart
    const typeCounts = data.reduce((acc, document) => {
      acc[document.documentType] = (acc[document.documentType] || 0) + 1;
      return acc;
    }, {});
    setDocumentTypeDistribution(Object.keys(typeCounts).map(key => ({
      name: key.charAt(0).toUpperCase() + key.slice(1),
      y: typeCounts[key],
    })));

    // Creation Trends for Line Chart
    const trendsData = data.map(document => ({
      date: new Date(document.creationDate).getTime(),
      count: 1,
    })).sort((a, b) => a.date - b.date);
    setCreationTrends(trendsData);
  };

  // Highcharts options for Document Type Distribution
  const typeChartOptions = {
    chart: { type: 'pie' },
    title: { text: 'Document Type Distribution' },
    series: [{
      name: 'Type',
      colorByPoint: true,
      data: documentTypeDistribution,
    }],
  };

  // Highcharts options for Creation Trends
  const creationTrendsChartOptions = {
    chart: { type: 'line' },
    title: { text: 'Document Creation Trends' },
    xAxis: { type: 'datetime', title: { text: 'Creation Date' } },
    yAxis: { title: { text: 'Number of Documents Created' } },
    series: [{
      name: 'Documents Created',
      data: creationTrends.map(item => [item.date, item.count]),
    }],
  };

  return (
    <Container maxWidth="xl" sx={{ paddingTop: 3, paddingBottom: 7 }}>
      <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <Box sx={{ padding: 4 }}>
        <Typography variant="h4" gutterBottom>
          Documentation Management Dashboard
        </Typography>

        <Grid container spacing={4}>
          {/* KPIs Section */}
          <Grid item xs={12} md={3}>
            <Card>
              <CardContent>
                <Typography variant="h6">Total Documents</Typography>
                <Typography variant="h4" color="green" sx={{ fontWeight: 'bold' }}>
                  {totalDocuments}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Grid container spacing={4} sx={{ marginTop: 4 }}>
          {/* Document Type Distribution Chart */}
          <Grid item xs={12} md={6}>
            <HighchartsReact highcharts={Highcharts} options={typeChartOptions} />
          </Grid>

          {/* Creation Trends Chart */}
          <Grid item xs={12} md={6}>
            <HighchartsReact highcharts={Highcharts} options={creationTrendsChartOptions} />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
