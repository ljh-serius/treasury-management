import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { Box, Typography, Grid, Card, CardContent, Container } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import Backdrop from '@mui/material/Backdrop';

export default function CertificationTrackingDashboard({ fetchItems }) {
  const [certificationsData, setCertificationsData] = useState([]);
  const [statusDistribution, setStatusDistribution] = useState([]);
  const [organizationDistribution, setOrganizationDistribution] = useState([]);
  const [upcomingExpirationsData, setUpcomingExpirationsData] = useState([]);
  const [totalCertifications, setTotalCertifications] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const data = await fetchItems();
      setCertificationsData(data);
      processCertificationsData(data);
      setLoading(false);
    };

    fetchData();
  }, [fetchItems]);

  const processCertificationsData = (data) => {
    // Total Certifications
    setTotalCertifications(data.length);

    // Certifications by Status
    const statusCounts = data.reduce((acc, certification) => {
      acc[certification.status] = (acc[certification.status] || 0) + 1;
      return acc;
    }, {});

    setStatusDistribution(Object.keys(statusCounts).map(key => ({
      name: key,
      y: statusCounts[key],
    })));

    // Certifications by Issuing Organization
    const organizationCounts = data.reduce((acc, certification) => {
      acc[certification.issuingOrganization] = (acc[certification.issuingOrganization] || 0) + 1;
      return acc;
    }, {});

    setOrganizationDistribution(Object.keys(organizationCounts).map(key => ({
      name: key,
      y: organizationCounts[key],
    })));

    // Upcoming Expirations
    const upcomingExpirations = data.filter(certification => {
      const expirationDate = new Date(certification.expirationDate);
      const today = new Date();
      const daysUntilExpiration = (expirationDate - today) / (1000 * 60 * 60 * 24);
      return daysUntilExpiration <= 30 && daysUntilExpiration >= 0;  // within the next 30 days
    });

    setUpcomingExpirationsData(upcomingExpirations.map(cert => ({
      name: cert.certificationName,
      expirationDate: cert.expirationDate,
    })));
  };

  // Chart options for each chart
  const statusChartOptions = {
    chart: {
      type: 'pie',
    },
    title: {
      text: 'Certifications by Status',
    },
    series: [
      {
        name: 'Status',
        colorByPoint: true,
        data: statusDistribution,
      },
    ],
  };

  const organizationChartOptions = {
    chart: {
      type: 'column',
    },
    title: {
      text: 'Certifications by Issuing Organization',
    },
    series: [
      {
        name: 'Organization',
        data: organizationDistribution,
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
          Certification Tracking Dashboard
        </Typography>
        <Grid container spacing={4}>
          {/* KPI Section */}
          <Grid item xs={12} md={3}>
            <Card>
              <CardContent>
                <Typography variant="h6">Total Certifications</Typography>
                <Typography variant="h4" color="green" sx={{ fontWeight: 'bold' }}>
                  {totalCertifications}
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Chart Section */}
          <Grid item xs={12} md={6}>
            <HighchartsReact highcharts={Highcharts} options={statusChartOptions} />
          </Grid>
          <Grid item xs={12} md={6}>
            <HighchartsReact highcharts={Highcharts} options={organizationChartOptions} />
          </Grid>

          {/* Upcoming Expirations Section */}
          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Typography variant="h6">Upcoming Expirations</Typography>
                <ul>
                  {upcomingExpirationsData.map(expiration => (
                    <li key={expiration.name}>
                      <strong>{expiration.name}</strong> - Expires on {expiration.expirationDate}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
