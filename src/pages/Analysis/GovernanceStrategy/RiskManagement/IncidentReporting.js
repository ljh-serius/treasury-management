import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { Box, Typography, Grid, Card, CardContent, Container, CircularProgress, Backdrop } from '@mui/material';

export default function IncidentReportingDashboard({ fetchItems }) {
  const [incidentData, setIncidentData] = useState([]);
  const [totalIncidents, setTotalIncidents] = useState(0);
  const [severityDistribution, setSeverityDistribution] = useState([]);
  const [statusDistribution, setStatusDistribution] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const data = await fetchItems();
      setIncidentData(data);
      processIncidentData(data);
      setLoading(false);
    };

    fetchData();
  }, [fetchItems]);

  const processIncidentData = (data) => {
    setTotalIncidents(data.length);

    const severityMap = {};
    const statusMap = {};

    data.forEach((item) => {
      // Process severity distribution
      const severity = item.severity;
      severityMap[severity] = (severityMap[severity] || 0) + 1;

      // Process status distribution
      const status = item.status;
      statusMap[status] = (statusMap[status] || 0) + 1;
    });

    const severityArray = Object.entries(severityMap).map(([severity, count]) => ({
      name: severity,
      y: count,
    }));

    const statusArray = Object.entries(statusMap).map(([status, count]) => ({
      name: status,
      y: count,
    }));

    setSeverityDistribution(severityArray);
    setStatusDistribution(statusArray);
  };

  // Highcharts options for Severity Distribution
  const severityChartOptions = {
    chart: { type: 'pie' },
    title: { text: 'Severity Distribution' },
    series: [
      {
        name: 'Severity',
        colorByPoint: true,
        data: severityDistribution,
      },
    ],
  };

  // Highcharts options for Status Distribution
  const statusChartOptions = {
    chart: { type: 'pie' },
    title: { text: 'Incident Status Distribution' },
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
          Incident Reporting Dashboard
        </Typography>

        <Grid container spacing={4}>
          {/* KPIs Section */}
          <Grid item xs={12} md={3}>
            <Card>
              <CardContent>
                <Typography variant="h6">Total Incidents</Typography>
                <Typography variant="h4" color="green" sx={{ fontWeight: 'bold' }}>
                  {totalIncidents}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Grid container spacing={4} sx={{ marginTop: 4 }}>
          {/* Severity Distribution Chart */}
          <Grid item xs={12} md={6}>
            <HighchartsReact highcharts={Highcharts} options={severityChartOptions} />
          </Grid>

          {/* Status Distribution Chart */}
          <Grid item xs={12} md={6}>
            <HighchartsReact highcharts={Highcharts} options={statusChartOptions} />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
