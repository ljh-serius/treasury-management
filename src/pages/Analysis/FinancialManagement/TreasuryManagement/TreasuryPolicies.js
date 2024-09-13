import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { Box, Typography, Grid, Card, CardContent, Container } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import Backdrop from '@mui/material/Backdrop';

export default function TreasuryPoliciesAnalytics({ fetchItems }) {
  const [policiesData, setPoliciesData] = useState([]);
  const [activePolicies, setActivePolicies] = useState(0);
  const [statusDistribution, setStatusDistribution] = useState([]);
  const [tagsDistribution, setTagsDistribution] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const data = await fetchItems();
      setPoliciesData(data);
      processPoliciesData(data);
      setLoading(false);
    };

    fetchData();
  }, [fetchItems]);

  const processPoliciesData = (data) => {
    // Active Policies Count
    const activeCount = data.filter(policy => policy.status === 'active').length;
    setActivePolicies(activeCount);

    // Status Distribution
    const statusCounts = data.reduce((acc, policy) => {
      acc[policy.status] = (acc[policy.status] || 0) + 1;
      return acc;
    }, {});

    setStatusDistribution(Object.keys(statusCounts).map(key => ({
      name: key,
      y: statusCounts[key],
    })));

    // Tags Distribution
    const tagsCounts = data.reduce((acc, item) => {
      item.tags.forEach(tag => {
        acc[tag] = (acc[tag] || 0) + 1;
      });
      return acc;
    }, {});

    setTagsDistribution(Object.keys(tagsCounts).map(tag => ({
      name: tag,
      y: tagsCounts[tag],
    })));
  };

  const statusChartOptions = {
    chart: { type: 'pie' },
    title: { text: 'Policy Status Distribution' },
    series: [{ name: 'Policies', colorByPoint: true, data: statusDistribution }],
  };

  const tagsChartOptions = {
    chart: { type: 'pie' },
    title: { text: 'Tags Distribution' },
    series: [{ name: 'Tags', colorByPoint: true, data: tagsDistribution }],
  };

  return (
    <Container maxWidth="xl" sx={{ paddingTop: 3, paddingBottom: 7 }}>
      <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <Box sx={{ padding: 4 }}>
        <Typography variant="h4" gutterBottom>Treasury Policies Analytics</Typography>
        <Grid container spacing={4}>
          {/* KPI Section */}
          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Typography variant="h6">Active Policies</Typography>
                <Typography variant="h4" color="green" sx={{ fontWeight: 'bold' }}>
                  {activePolicies}
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Charts Section */}
          <Grid item xs={12} md={6}>
            <HighchartsReact highcharts={Highcharts} options={statusChartOptions} />
          </Grid>
          <Grid item xs={12} md={6}>
            <HighchartsReact highcharts={Highcharts} options={tagsChartOptions} />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
