import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { Box, Typography, Grid, Card, CardContent, Container } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import Backdrop from '@mui/material/Backdrop';

export default function ContractTerminationsAnalytics({ fetchItems }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalTerminations, setTotalTerminations] = useState(0);
  const [processedTerminations, setProcessedTerminations] = useState([]);
  const [statusDistribution, setStatusDistribution] = useState([]);

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
    setTotalTerminations(data.length);
    const processed = data.filter((termination) => termination.status === 'processed');
    setProcessedTerminations(processed);
  };

  const generateCharts = (data) => {
    const statusCounts = data.reduce((acc, termination) => {
      acc[termination.status] = (acc[termination.status] || 0) + 1;
      return acc;
    }, {});
    setStatusDistribution(
      Object.keys(statusCounts).map((key) => ({
        name: key,
        y: statusCounts[key],
      }))
    );
  };

  const statusDistributionChart = {
    chart: { type: 'pie' },
    title: { text: 'Termination Status Distribution' },
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
          Contract Terminations Analytics
        </Typography>
        <Grid container spacing={4}>
          {/* KPIs */}
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6">Total Terminations</Typography>
                <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                  {totalTerminations}
                </Typography>
                <Typography variant="body2">Total number of contract terminations.</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6">Processed Terminations</Typography>
                <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                  {processedTerminations.length}
                </Typography>
                <Typography variant="body2">Terminations that have been processed.</Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Charts */}
          <Grid item xs={12} md={12}>
            <HighchartsReact highcharts={Highcharts} options={statusDistributionChart} />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
