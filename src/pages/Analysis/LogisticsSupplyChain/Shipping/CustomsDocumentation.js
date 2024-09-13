import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { Box, Typography, Grid, Card, CardContent, Container, CircularProgress, Backdrop } from '@mui/material';

export default function CustomsDocumentationDashboard({ fetchItems }) {
  const [documentData, setDocumentData] = useState([]);
  const [totalDocuments, setTotalDocuments] = useState(0);
  const [documentTypeDistribution, setDocumentTypeDistribution] = useState([]);
  const [dateTrends, setDateTrends] = useState([]);
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
    const typeCounts = data.reduce((acc, doc) => {
      acc[doc.documentType] = (acc[doc.documentType] || 0) + 1;
      return acc;
    }, {});
    setDocumentTypeDistribution(Object.keys(typeCounts).map(key => ({
      name: key.replace(/-/g, ' ').toUpperCase(),
      y: typeCounts[key],
    })));

    // Date Trends for Line Chart
    const trendsData = data.map(doc => ({
      date: new Date(doc.issueDate).getTime(),
      count: 1,
    })).sort((a, b) => a.date - b.date);
    setDateTrends(trendsData);
  };

  // Highcharts options for Document Type Distribution
  const documentTypeChartOptions = {
    chart: { type: 'pie' },
    title: { text: 'Document Type Distribution' },
    series: [{
      name: 'Document Types',
      colorByPoint: true,
      data: documentTypeDistribution,
    }],
  };

  // Highcharts options for Date Trends
  const dateChartOptions = {
    chart: { type: 'line' },
    title: { text: 'Issue Date Trends' },
    xAxis: { type: 'datetime', title: { text: 'Issue Date' } },
    yAxis: { title: { text: 'Number of Documents' } },
    series: [{
      name: 'Documents',
      data: dateTrends.map(item => [item.date, item.count]),
    }],
  };

  return (
    <Container maxWidth="xl" sx={{ paddingTop: 3, paddingBottom: 7 }}>
      <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <Box sx={{ padding: 4 }}>
        <Typography variant="h4" gutterBottom>
          Customs Documentation Dashboard
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
            <HighchartsReact highcharts={Highcharts} options={documentTypeChartOptions} />
          </Grid>

          {/* Date Trends Chart */}
          <Grid item xs={12} md={6}>
            <HighchartsReact highcharts={Highcharts} options={dateChartOptions} />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
