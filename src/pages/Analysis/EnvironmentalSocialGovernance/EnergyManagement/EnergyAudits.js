import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { Box, Typography, Grid, Card, CardContent, Container, CircularProgress, Backdrop } from '@mui/material';

export default function EnergyAuditsDashboard({ fetchItems }) {
  const [auditData, setAuditData] = useState([]);
  const [totalAudits, setTotalAudits] = useState(0);
  const [tagsDistribution, setTagsDistribution] = useState([]);
  const [auditFindingsTrends, setAuditFindingsTrends] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDataAsync = async () => {
      setLoading(true);
      const data = await fetchItems();
      setAuditData(data);
      processAuditData(data);
      setLoading(false);
    };

    fetchDataAsync();
  }, [fetchItems]);

  const processAuditData = (data) => {
    // Total Audits
    setTotalAudits(data.length);

    // Tag Distribution for Pie Chart
    const tagCounts = data.reduce((acc, audit) => {
      if (audit.tags) {
        audit.tags.forEach(tag => {
          acc[tag] = (acc[tag] || 0) + 1;
        });
      }
      return acc;
    }, {});
    setTagsDistribution(Object.keys(tagCounts).map(key => ({
      name: key.charAt(0).toUpperCase() + key.slice(1),
      y: tagCounts[key],
    })));

    // Audit Findings Trends for Line Chart
    const findingsTrends = data.map(audit => ({
      date: new Date(audit.auditDate).getTime(),
      findings: audit.findings.split(' ').length, // Counting number of words in findings
    })).sort((a, b) => a.date - b.date);
    setAuditFindingsTrends(findingsTrends);
  };

  // Highcharts options for Tag Distribution
  const tagChartOptions = {
    chart: { type: 'pie' },
    title: { text: 'Audit Tags Distribution' },
    series: [{
      name: 'Tags',
      colorByPoint: true,
      data: tagsDistribution,
    }],
  };

  // Highcharts options for Audit Findings Trends
  const findingsTrendChartOptions = {
    chart: { type: 'line' },
    title: { text: 'Audit Findings Trends' },
    xAxis: { type: 'datetime', title: { text: 'Audit Date' } },
    yAxis: { title: { text: 'Number of Words in Findings' } },
    series: [{
      name: 'Findings',
      data: auditFindingsTrends.map(item => [item.date, item.findings]),
    }],
  };

  return (
    <Container maxWidth="xl" sx={{ paddingTop: 3, paddingBottom: 7 }}>
      <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <Box sx={{ padding: 4 }}>
        <Typography variant="h4" gutterBottom>
          Energy Audits Dashboard
        </Typography>

        <Grid container spacing={4}>
          {/* KPIs Section */}
          <Grid item xs={12} md={3}>
            <Card>
              <CardContent>
                <Typography variant="h6">Total Audits</Typography>
                <Typography variant="h4" color="green" sx={{ fontWeight: 'bold' }}>
                  {totalAudits}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Grid container spacing={4} sx={{ marginTop: 4 }}>
          {/* Tag Distribution Chart */}
          <Grid item xs={12} md={6}>
            <HighchartsReact highcharts={Highcharts} options={tagChartOptions} />
          </Grid>

          {/* Audit Findings Trends Chart */}
          <Grid item xs={12} md={6}>
            <HighchartsReact highcharts={Highcharts} options={findingsTrendChartOptions} />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
