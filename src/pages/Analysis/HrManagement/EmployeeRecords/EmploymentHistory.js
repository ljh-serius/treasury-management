import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { Box, Typography, Grid, Card, CardContent, Container } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import Backdrop from '@mui/material/Backdrop';

export default function EmploymentHistoryAnalytics({ fetchItems }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalRecords, setTotalRecords] = useState(0);
  const [positionDistribution, setPositionDistribution] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const fetchedData = await fetchItems();
      setData(fetchedData);
      calculateKPIs(fetchedData);
      generateCharts(fetchedData);
      setLoading(false);
    };

    fetchData();
  }, [fetchItems]);

  const calculateKPIs = (data) => {
    setTotalRecords(data.length);
  };

  const generateCharts = (data) => {
    const positionCounts = data.reduce((acc, record) => {
      acc[record.position] = (acc[record.position] || 0) + 1;
      return acc;
    }, {});
    setPositionDistribution(
      Object.keys(positionCounts).map((key) => ({
        name: key,
        y: positionCounts[key],
      }))
    );
  };

  const positionDistributionChart = {
    chart: { type: 'pie' },
    title: { text: 'Position Distribution' },
    series: [
      {
        name: 'Position',
        colorByPoint: true,
        data: positionDistribution,
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
          Employment History Analytics
        </Typography>
        <Grid container spacing={4}>
          {/* KPIs */}
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6">Total Employment Records</Typography>
                <Typography variant="h4" color="blue" sx={{ fontWeight: 'bold' }}>
                  {totalRecords}
                </Typography>
                <Typography variant="body2">Total number of employment history records.</Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Charts */}
          <Grid item xs={12} md={12}>
            <HighchartsReact highcharts={Highcharts} options={positionDistributionChart} />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
