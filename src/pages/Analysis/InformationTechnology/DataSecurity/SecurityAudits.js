import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { Box, Typography, Grid, Card, CardContent, Container, CircularProgress, Backdrop } from '@mui/material';

export default function SecurityAuditDashboard({ fetchItems }) {
  const [auditData, setAuditData] = useState([]);
  const [totalAudits, setTotalAudits] = useState(0);
  const [severityDistribution, setSeverityDistribution] = useState([]);
  const [remediationStatusDistribution, setRemediationStatusDistribution] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const data = await fetchItems();
      setAuditData(data);
      processAuditData(data);
      setLoading(false);
    };

    fetchData();
  }, [fetchItems]);

  const processAuditData = (data) => {
    // Total Audits
    setTotalAudits(data.length);

    // Severity Level Distribution
    const severityCounts = data.reduce((acc, audit) => {
      acc[audit.severityLevel] = (acc[audit.severityLevel] || 0) + 1;
      return acc;
    }, {});
    setSeverityDistribution(Object.keys(severityCounts).map(key => ({
      name: key.charAt(0).toUpperCase() + key.slice(1),
      y: severityCounts[key],
    })));

    // Remediation Status Distribution
    const remediationStatusCounts = data.reduce((acc, audit) => {
      acc[audit.remediationStatus] = (acc[audit.remediationStatus] || 0) + 1;
      return acc;
    }, {});
    setRemediationStatusDistribution(Object.keys(remediationStatusCounts).map(key => ({
      name: key,
      y: remediationStatusCounts[key],
    })));
  };

  // Highcharts options for Severity Level Distribution
  const severityChartOptions = {
    chart: { type: 'pie' },
    title: { text: 'Severity Level Distribution' },
    series: [{
      name: 'Severity Levels',
      colorByPoint: true,
      data: severityDistribution,
    }],
  };

  // Highcharts options for Remediation Status Distribution
  const remediationStatusChartOptions = {
    chart: { type: 'column' },
    title: { text: 'Remediation Status Distribution' },
    xAxis: { type: 'category', title: { text: 'Remediation Status' } },
    yAxis: { title: { text: 'Number of Audits' } },
    series: [{
      name: 'Remediation Status',
      data: remediationStatusDistribution,
    }],
  };

  return (
    <Container maxWidth="xl" sx={{ paddingTop: 3, paddingBottom: 7 }}>
      <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <Box sx={{ padding: 4 }}>
        <Typography variant="h4" gutterBottom>
          Security Audit Dashboard
        </Typography>

        <Grid container spacing={4}>
          {/* KPIs Section */}
          <Grid item xs={12} md={3}>
            <Card>
              <CardContent>
                <Typography variant="h6">Total Audits</Typography>
                <Typography variant="h4" color="green" sx={{ fontWeight: 'bold' }}>
                  {totalAudits}
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

          {/* Remediation Status Distribution Chart */}
          <Grid item xs={12} md={6}>
            <HighchartsReact highcharts={Highcharts} options={remediationStatusChartOptions} />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
