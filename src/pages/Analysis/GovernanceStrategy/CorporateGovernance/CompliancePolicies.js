import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { Box, Typography, Grid, Card, CardContent, Container, CircularProgress, Backdrop } from '@mui/material';

export default function CompliancePoliciesDashboard({ fetchItems }) {
  const [policiesData, setPoliciesData] = useState([]);
  const [totalPolicies, setTotalPolicies] = useState(0);
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
    setTotalPolicies(data.length);

    const tagsMap = {};

    data.forEach((item) => {
      item.tags.forEach(tag => {
        tagsMap[tag] = (tagsMap[tag] || 0) + 1;
      });
    });

    const tagsArray = Object.entries(tagsMap).map(([tag, count]) => ({
      name: tag,
      y: count,
    }));

    setTagsDistribution(tagsArray);
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
          Compliance Policies Dashboard
        </Typography>

        <Grid container spacing={4}>
          {/* KPIs Section */}
          <Grid item xs={12} md={3}>
            <Card>
              <CardContent>
                <Typography variant="h6">Total Compliance Policies</Typography>
                <Typography variant="h4" color="green" sx={{ fontWeight: 'bold' }}>
                  {totalPolicies}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Grid container spacing={4} sx={{ marginTop: 4 }}>
          {/* Tags Distribution Chart */}
          <Grid item xs={12} md={6}>
            <HighchartsReact highcharts={Highcharts} options={tagsChartOptions} />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
