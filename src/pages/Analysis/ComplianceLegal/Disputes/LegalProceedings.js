import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { Box, Typography, Grid, Card, CardContent, Container } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import Backdrop from '@mui/material/Backdrop';

export default function LegalProceedingsAnalytics({ fetchItems }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalProceedings, setTotalProceedings] = useState(0);
  const [openProceedings, setOpenProceedings] = useState([]);
  const [proceedingStatusDistribution, setProceedingStatusDistribution] = useState([]);

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
    setTotalProceedings(data.length);

    const open = data.filter((item) => item.status === 'open');
    setOpenProceedings(open);
  };

  const generateCharts = (data) => {
    const statusCounts = data.reduce((acc, item) => {
      acc[item.status] = (acc[item.status] || 0) + 1;
      return acc;
    }, {});

    setProceedingStatusDistribution(
      Object.keys(statusCounts).map((key) => ({
        name: key,
        y: statusCounts[key],
      }))
    );
  };

  const proceedingStatusDistributionChart = {
    chart: { type: 'pie' },
    title: { text: 'Legal Proceedings Status Distribution' },
    series: [
      {
        name: 'Status',
        colorByPoint: true,
        data: proceedingStatusDistribution,
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
          Legal Proceedings Analytics
        </Typography>
        <Grid container spacing={4}>
          {/* KPIs */}
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6">Total Proceedings</Typography>
                <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                  {totalProceedings}
                </Typography>
                <Typography variant="body2">Total number of legal proceedings tracked.</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6">Open Proceedings</Typography>
                <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                  {openProceedings.length}
                </Typography>
                <Typography variant="body2">Proceedings that are currently open.</Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Charts */}
          <Grid item xs={12} md={12}>
            <HighchartsReact highcharts={Highcharts} options={proceedingStatusDistributionChart} />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
