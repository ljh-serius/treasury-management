import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { Box, Typography, Grid, Card, CardContent, Container } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import Backdrop from '@mui/material/Backdrop';

export default function CertificationsAnalytics({ fetchItems }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalCertifications, setTotalCertifications] = useState(0);
  const [expiredCertifications, setExpiredCertifications] = useState([]);
  const [certificationStatusDistribution, setCertificationStatusDistribution] = useState([]);

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
    setTotalCertifications(data.length);
    const expired = data.filter((certification) => certification.status === 'expired');
    setExpiredCertifications(expired);
  };

  const generateCharts = (data) => {
    const statusCounts = data.reduce((acc, certification) => {
      acc[certification.status] = (acc[certification.status] || 0) + 1;
      return acc;
    }, {});
    setCertificationStatusDistribution(
      Object.keys(statusCounts).map((key) => ({
        name: key,
        y: statusCounts[key],
      }))
    );
  };

  const certificationStatusChart = {
    chart: { type: 'pie' },
    title: { text: 'Certification Status Distribution' },
    series: [
      {
        name: 'Status',
        colorByPoint: true,
        data: certificationStatusDistribution,
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
          Certifications Analytics
        </Typography>
        <Grid container spacing={4}>
          {/* KPIs */}
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6">Total Certifications</Typography>
                <Typography variant="h4" color="blue" sx={{ fontWeight: 'bold' }}>
                  {totalCertifications}
                </Typography>
                <Typography variant="body2">Total number of certifications issued.</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6">Expired Certifications</Typography>
                <Typography variant="h4" color="yellow" sx={{ fontWeight: 'bold' }}>
                  {expiredCertifications.length}
                </Typography>
                <Typography variant="body2">Certifications that have expired.</Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Charts */}
          <Grid item xs={12} md={12}>
            <HighchartsReact highcharts={Highcharts} options={certificationStatusChart} />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
