import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { Box, Typography, Grid, Card, CardContent, Container, CircularProgress, Backdrop } from '@mui/material';

export default function InternalAuditsDashboard({ fetchItems }) {
  const [auditsData, setAuditsData] = useState([]);
  const [totalAudits, setTotalAudits] = useState(0);
  const [auditStatusDistribution, setAuditStatusDistribution] = useState([]);
  const [tagsDistribution, setTagsDistribution] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const data = await fetchItems();
      setAuditsData(data);
      processAuditsData(data);
      setLoading(false);
    };

    fetchData();
  }, [fetchItems]);

  const processAuditsData = (data) => {
    setTotalAudits(data.length);

    const statusMap = {};
    const tagsMap = {};

    data.forEach((item) => {
      // Process audit status distribution
      const status = item.auditStatus;
      statusMap[status] = (statusMap[status] || 0) + 1;

      // Process tags distribution
      item.tags.forEach(tag => {
        tagsMap[tag] = (tagsMap[tag] || 0) + 1;
      });
    });

    const statusArray = Object.entries(statusMap).map(([status, count]) => ({
      name: status,
      y: count,
    }));

    const tagsArray = Object.entries(tagsMap).map(([tag, count]) => ({
      name: tag,
      y: count,
    }));

    setAuditStatusDistribution(statusArray);
    setTagsDistribution(tagsArray);
  };

  // Highcharts options for Audit Status Distribution
  const statusChartOptions = {
    chart: { type: 'pie' },
    title: { text: 'Audit Status Distribution' },
    series: [
      {
        name: 'Status',
        colorByPoint: true,
        data: auditStatusDistribution,
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
          Internal Audits Dashboard
        </Typography>

        <Grid container spacing={4}>
          {/* KPIs Section */}
          <Grid item xs={12} md={3}>
            <Card>
              <CardContent>
                <Typography variant="h6">Total Internal Audits</Typography>
                <Typography variant="h4" color="green" sx={{ fontWeight: 'bold' }}>
                  {totalAudits}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Grid container spacing={4} sx={{ marginTop: 4 }}>
          {/* Audit Status Distribution Chart */}
          <Grid item xs={12} md={6}>
            <HighchartsReact highcharts={Highcharts} options={statusChartOptions} />
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
