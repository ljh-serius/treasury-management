import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { Box, Typography, Grid, Card, CardContent, Container } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import Backdrop from '@mui/material/Backdrop';

export default function ComplianceAuditsAnalytics({ fetchItems }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalAudits, setTotalAudits] = useState(0);
  const [completedAudits, setCompletedAudits] = useState([]);
  const [auditStatusDistribution, setAuditStatusDistribution] = useState([]);

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
    setTotalAudits(data.length);
    const completed = data.filter((audit) => audit.status === 'completed');
    setCompletedAudits(completed);
  };

  const generateCharts = (data) => {
    const statusCounts = data.reduce((acc, audit) => {
      acc[audit.status] = (acc[audit.status] || 0) + 1;
      return acc;
    }, {});
    setAuditStatusDistribution(
      Object.keys(statusCounts).map((key) => ({
        name: key,
        y: statusCounts[key],
      }))
    );
  };

  const auditStatusChart = {
    chart: { type: 'pie' },
    title: { text: 'Audit Status Distribution' },
    series: [
      {
        name: 'Status',
        colorByPoint: true,
        data: auditStatusDistribution,
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
          Compliance Audits Analytics
        </Typography>
        <Grid container spacing={4}>
          {/* KPIs */}
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6">Total Audits</Typography>
                <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                  {totalAudits}
                </Typography>
                <Typography variant="body2">Total number of compliance audits.</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6">Completed Audits</Typography>
                <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                  {completedAudits.length}
                </Typography>
                <Typography variant="body2">Compliance audits that have been completed.</Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Charts */}
          <Grid item xs={12} md={12}>
            <HighchartsReact highcharts={Highcharts} options={auditStatusChart} />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
