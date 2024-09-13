import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { Box, Typography, Grid, Card, CardContent, Container, CircularProgress, Backdrop } from '@mui/material';

export default function ComplianceAuditsDashboard({ fetchItems }) {
  const [auditData, setAuditData] = useState([]);
  const [totalAudits, setTotalAudits] = useState(0);
  const [complianceDistribution, setComplianceDistribution] = useState([]);
  const [tagsDistribution, setTagsDistribution] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const data = await fetchItems();
      setAuditData(data);
      processAuditData(data);
      setLoading(false);
    };

    fetchData();
  }, [fetchItems]);

  const processAuditData = (data) => {
    setTotalAudits(data.length);

    const complianceMap = {};
    const tagsMap = {};
    data.forEach((item) => {
      const complianceStatus = item.complianceStatus;
      const tags = item.tags;

      complianceMap[complianceStatus] = (complianceMap[complianceStatus] || 0) + 1;
      tags.forEach(tag => {
        tagsMap[tag] = (tagsMap[tag] || 0) + 1;
      });
    });

    const complianceArray = Object.entries(complianceMap).map(([status, count]) => ({
      name: status,
      y: count,
    }));
    const tagsArray = Object.entries(tagsMap).map(([tag, count]) => ({
      name: tag,
      y: count,
    }));
    setComplianceDistribution(complianceArray);
    setTagsDistribution(tagsArray);
  };

  // Highcharts options for Compliance Status Distribution
  const complianceChartOptions = {
    chart: { type: 'pie' },
    title: { text: 'Compliance Status Distribution' },
    series: [
      {
        name: 'Audits',
        colorByPoint: true,
        data: complianceDistribution,
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
          Compliance Audits Dashboard
        </Typography>

        <Grid container spacing={4}>
          {/* KPIs Section */}
          <Grid item xs={12} md={3}>
            <Card>
              <CardContent>
                <Typography variant="h6">Total Audits Conducted</Typography>
                <Typography variant="h4" color="green" sx={{ fontWeight: 'bold' }}>
                  {totalAudits}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Grid container spacing={4} sx={{ marginTop: 4 }}>
          {/* Compliance Status Distribution Chart */}
          <Grid item xs={12} md={6}>
            <HighchartsReact highcharts={Highcharts} options={complianceChartOptions} />
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
