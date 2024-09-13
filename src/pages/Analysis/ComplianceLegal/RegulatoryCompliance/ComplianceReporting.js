import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { Box, Typography, Grid, Card, CardContent, Container } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import Backdrop from '@mui/material/Backdrop';

export default function ComplianceReportingAnalytics({ fetchItems }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalReports, setTotalReports] = useState(0);
  const [submittedReports, setSubmittedReports] = useState([]);
  const [reportStatusDistribution, setReportStatusDistribution] = useState([]);

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
    setTotalReports(data.length);

    const submitted = data.filter((item) => item.status === 'submitted');
    setSubmittedReports(submitted);
  };

  const generateCharts = (data) => {
    const statusCounts = data.reduce((acc, item) => {
      acc[item.status] = (acc[item.status] || 0) + 1;
      return acc;
    }, {});

    setReportStatusDistribution(
      Object.keys(statusCounts).map((key) => ({
        name: key,
        y: statusCounts[key],
      }))
    );
  };

  const reportStatusDistributionChart = {
    chart: { type: 'pie' },
    title: { text: 'Compliance Report Status Distribution' },
    series: [
      {
        name: 'Status',
        colorByPoint: true,
        data: reportStatusDistribution,
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
          Compliance Reporting Analytics
        </Typography>
        <Grid container spacing={4}>
          {/* KPIs */}
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6">Total Reports</Typography>
                <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                  {totalReports}
                </Typography>
                <Typography variant="body2">Total number of compliance reports generated.</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6">Submitted Reports</Typography>
                <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                  {submittedReports.length}
                </Typography>
                <Typography variant="body2">Reports that have been submitted.</Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Charts */}
          <Grid item xs={12} md={12}>
            <HighchartsReact highcharts={Highcharts} options={reportStatusDistributionChart} />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
