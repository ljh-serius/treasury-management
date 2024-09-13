import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { Box, Typography, Grid, Card, CardContent, Container, CircularProgress, Backdrop } from '@mui/material';

export default function PerformanceDashboard({ fetchItems }) {
  const [dashboardData, setDashboardData] = useState([]);
  const [totalDashboards, setTotalDashboards] = useState(0);
  const [kpiMetricsDistribution, setKpiMetricsDistribution] = useState([]);
  const [tagsDistribution, setTagsDistribution] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const data = await fetchItems();
      setDashboardData(data);
      processDashboardData(data);
      setLoading(false);
    };

    fetchData();
  }, [fetchItems]);

  const processDashboardData = (data) => {
    setTotalDashboards(data.length);

    const kpiMap = {};
    const tagsMap = {};

    data.forEach((item) => {
      // Process KPI metrics
      const kpis = item.kpiMetrics.split(',').map(kpi => kpi.trim());
      kpis.forEach(kpi => {
        kpiMap[kpi] = (kpiMap[kpi] || 0) + 1;
      });

      // Process tags distribution
      item.tags.forEach(tag => {
        tagsMap[tag] = (tagsMap[tag] || 0) + 1;
      });
    });

    const kpiArray = Object.entries(kpiMap).map(([kpi, count]) => ({
      name: kpi,
      y: count,
    }));

    const tagsArray = Object.entries(tagsMap).map(([tag, count]) => ({
      name: tag,
      y: count,
    }));

    setKpiMetricsDistribution(kpiArray);
    setTagsDistribution(tagsArray);
  };

  // Highcharts options for KPI Metrics Distribution
  const kpiChartOptions = {
    chart: { type: 'pie' },
    title: { text: 'KPI Metrics Distribution' },
    series: [
      {
        name: 'KPI Metrics',
        colorByPoint: true,
        data: kpiMetricsDistribution,
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
          Performance Dashboards
        </Typography>

        <Grid container spacing={4}>
          {/* KPIs Section */}
          <Grid item xs={12} md={3}>
            <Card>
              <CardContent>
                <Typography variant="h6">Total Dashboards</Typography>
                <Typography variant="h4" color="green" sx={{ fontWeight: 'bold' }}>
                  {totalDashboards}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Grid container spacing={4} sx={{ marginTop: 4 }}>
          {/* KPI Metrics Distribution Chart */}
          <Grid item xs={12} md={6}>
            <HighchartsReact highcharts={Highcharts} options={kpiChartOptions} />
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
