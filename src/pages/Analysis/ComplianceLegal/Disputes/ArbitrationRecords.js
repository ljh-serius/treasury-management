import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { Box, Typography, Grid, Card, CardContent, Container } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import Backdrop from '@mui/material/Backdrop';

export default function ArbitrationRecordsAnalytics({ fetchItems }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalRecords, setTotalRecords] = useState(0);
  const [closedRecords, setClosedRecords] = useState([]);
  const [arbitrationStatusDistribution, setArbitrationStatusDistribution] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const fetchedData = await fetchItems();
      setData(fetchedData);
      calculateKpis(fetchedData);
      generateCharts(fetchedData);
      setLoading(false);
    };

    fetchData();
  }, [fetchItems]);

  const calculateKpis = (data) => {
    setTotalRecords(data.length);

    const closed = data.filter((item) => item.status === 'closed');
    setClosedRecords(closed);
  };

  const generateCharts = (data) => {
    const statusCounts = data.reduce((acc, item) => {
      acc[item.status] = (acc[item.status] || 0) + 1;
      return acc;
    }, {});

    setArbitrationStatusDistribution(
      Object.keys(statusCounts).map((key) => ({
        name: key,
        y: statusCounts[key],
      }))
    );
  };

  const arbitrationStatusDistributionChart = {
    chart: { type: 'pie' },
    title: { text: 'Arbitration Records Status Distribution' },
    series: [
      {
        name: 'Status',
        colorByPoint: true,
        data: arbitrationStatusDistribution,
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
          Arbitration Records Analytics
        </Typography>
        <Grid container spacing={4}>
          {/* KPIs */}
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6">Total Records</Typography>
                <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                  {totalRecords}
                </Typography>
                <Typography variant="body2">Total number of arbitration records.</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6">Closed Records</Typography>
                <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                  {closedRecords.length}
                </Typography>
                <Typography variant="body2">Arbitration records that have been closed.</Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Charts */}
          <Grid item xs={12} md={12}>
            <HighchartsReact highcharts={Highcharts} options={arbitrationStatusDistributionChart} />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
