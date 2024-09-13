import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { Box, Typography, Grid, Card, CardContent, Container } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import Backdrop from '@mui/material/Backdrop';

export default function PatentFilingsAnalytics({ fetchItems }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalFilings, setTotalFilings] = useState(0);
  const [approvedFilings, setApprovedFilings] = useState([]);
  const [filingStatusDistribution, setFilingStatusDistribution] = useState([]);

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
    setTotalFilings(data.length);

    const approved = data.filter((item) => item.status === 'approved');
    setApprovedFilings(approved);
  };

  const generateCharts = (data) => {
    const statusCounts = data.reduce((acc, item) => {
      acc[item.status] = (acc[item.status] || 0) + 1;
      return acc;
    }, {});

    setFilingStatusDistribution(
      Object.keys(statusCounts).map((key) => ({
        name: key,
        y: statusCounts[key],
      }))
    );
  };

  const filingStatusDistributionChart = {
    chart: { type: 'pie' },
    title: { text: 'Patent Filing Status Distribution' },
    series: [
      {
        name: 'Status',
        colorByPoint: true,
        data: filingStatusDistribution,
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
          Patent Filings Analytics
        </Typography>
        <Grid container spacing={4}>
          {/* KPIs */}
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6">Total Filings</Typography>
                <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                  {totalFilings}
                </Typography>
                <Typography variant="body2">Total number of patent filings submitted.</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6">Approved Filings</Typography>
                <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                  {approvedFilings.length}
                </Typography>
                <Typography variant="body2">Patents that have been approved.</Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Charts */}
          <Grid item xs={12} md={12}>
            <HighchartsReact highcharts={Highcharts} options={filingStatusDistributionChart} />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
