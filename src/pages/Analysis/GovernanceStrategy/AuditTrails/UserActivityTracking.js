import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { Box, Typography, Grid, Card, CardContent, Container, CircularProgress, Backdrop } from '@mui/material';

export default function UserActivityDashboard({ fetchItems }) {
  const [activityData, setActivityData] = useState([]);
  const [totalActivities, setTotalActivities] = useState(0);
  const [activityTypeDistribution, setActivityTypeDistribution] = useState([]);
  const [tagsDistribution, setTagsDistribution] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const data = await fetchItems();
      setActivityData(data);
      processActivityData(data);
      setLoading(false);
    };

    fetchData();
  }, [fetchItems]);

  const processActivityData = (data) => {
    setTotalActivities(data.length);

    const activityMap = {};
    const tagsMap = {};
    data.forEach((item) => {
      const activityType = item.activityType;
      const tags = item.tags;

      activityMap[activityType] = (activityMap[activityType] || 0) + 1;
      tags.forEach(tag => {
        tagsMap[tag] = (tagsMap[tag] || 0) + 1;
      });
    });

    const activityArray = Object.entries(activityMap).map(([type, count]) => ({
      name: type,
      y: count,
    }));
    const tagsArray = Object.entries(tagsMap).map(([tag, count]) => ({
      name: tag,
      y: count,
    }));
    setActivityTypeDistribution(activityArray);
    setTagsDistribution(tagsArray);
  };

  // Highcharts options for Activity Type Distribution
  const activityChartOptions = {
    chart: { type: 'pie' },
    title: { text: 'Activity Type Distribution' },
    series: [
      {
        name: 'Activities',
        colorByPoint: true,
        data: activityTypeDistribution,
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
          User Activity Tracking Dashboard
        </Typography>

        <Grid container spacing={4}>
          {/* KPIs Section */}
          <Grid item xs={12} md={3}>
            <Card>
              <CardContent>
                <Typography variant="h6">Total Activities Logged</Typography>
                <Typography variant="h4" color="green" sx={{ fontWeight: 'bold' }}>
                  {totalActivities}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Grid container spacing={4} sx={{ marginTop: 4 }}>
          {/* Activity Type Distribution Chart */}
          <Grid item xs={12} md={6}>
            <HighchartsReact highcharts={Highcharts} options={activityChartOptions} />
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
