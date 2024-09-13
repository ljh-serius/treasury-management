import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { Box, Typography, Grid, Card, CardContent, Container, CircularProgress, Backdrop } from '@mui/material';

export default function ChangeLogsDashboard({ fetchItems }) {
  const [changeLogData, setChangeLogData] = useState([]);
  const [totalChanges, setTotalChanges] = useState(0);
  const [impactDistribution, setImpactDistribution] = useState([]);
  const [statusDistribution, setStatusDistribution] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const data = await fetchItems();
      setChangeLogData(data);
      processChangeLogData(data);
      setLoading(false);
    };

    fetchData();
  }, [fetchItems]);

  const processChangeLogData = (data) => {
    setTotalChanges(data.length);

    // Calculate change impact distribution
    const impactMap = {};
    const statusMap = {};
    data.forEach((item) => {
      const impact = item.changeImpact;
      const status = item.status;

      impactMap[impact] = (impactMap[impact] || 0) + 1;
      statusMap[status] = (statusMap[status] || 0) + 1;
    });

    const impactArray = Object.entries(impactMap).map(([impact, count]) => ({
      name: impact,
      y: count,
    }));
    const statusArray = Object.entries(statusMap).map(([status, count]) => ({
      name: status,
      y: count,
    }));
    setImpactDistribution(impactArray);
    setStatusDistribution(statusArray);
  };

  // Highcharts options for Change Impact Distribution
  const impactChartOptions = {
    chart: { type: 'pie' },
    title: { text: 'Change Impact Distribution' },
    series: [
      {
        name: 'Changes',
        colorByPoint: true,
        data: impactDistribution,
      },
    ],
  };

  // Highcharts options for Change Status Distribution
  const statusChartOptions = {
    chart: { type: 'pie' },
    title: { text: 'Change Status Distribution' },
    series: [
      {
        name: 'Status',
        colorByPoint: true,
        data: statusDistribution,
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
          Change Logs Dashboard
        </Typography>

        <Grid container spacing={4}>
          {/* KPIs Section */}
          <Grid item xs={12} md={3}>
            <Card>
              <CardContent>
                <Typography variant="h6">Total Changes Logged</Typography>
                <Typography variant="h4" color="green" sx={{ fontWeight: 'bold' }}>
                  {totalChanges}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Grid container spacing={4} sx={{ marginTop: 4 }}>
          {/* Change Impact Distribution Chart */}
          <Grid item xs={12} md={6}>
            <HighchartsReact highcharts={Highcharts} options={impactChartOptions} />
          </Grid>

          {/* Change Status Distribution Chart */}
          <Grid item xs={12} md={6}>
            <HighchartsReact highcharts={Highcharts} options={statusChartOptions} />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
