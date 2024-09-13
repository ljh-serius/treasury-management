import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { Box, Typography, Grid, Card, CardContent, Container } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import Backdrop from '@mui/material/Backdrop';

export default function TaxAuditsAnalytics({ fetchItems }) {
  const [auditsData, setAuditsData] = useState([]);
  const [statusDistribution, setStatusDistribution] = useState([]);
  const [totalAuditAmount, setTotalAuditAmount] = useState(0);
  const [topAuditors, setTopAuditors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const data = await fetchItems();
      setAuditsData(data);
      processAuditsData(data);
      setLoading(false);
    };

    fetchData();
  }, [fetchItems]);

  const processAuditsData = (data) => {
    // Status Distribution
    const statusCounts = data.reduce((acc, audit) => {
      acc[audit.status] = (acc[audit.status] || 0) + 1;
      return acc;
    }, {});

    setStatusDistribution(Object.keys(statusCounts).map(key => ({
      name: key,
      y: statusCounts[key],
    })));

    // Total Audit Amount
    const total = data.reduce((sum, audit) => sum + Number(audit.auditAmount), 0);
    setTotalAuditAmount(total);

    // Top 5 Auditors
    const topAuditorsList = data
      .sort((a, b) => Number(b.auditAmount) - Number(a.auditAmount))
      .slice(0, 5);
    setTopAuditors(topAuditorsList);
  };

  const statusChartOptions = {
    chart: { type: 'pie' },
    title: { text: 'Status Distribution' },
    series: [{ name: 'Statuses', colorByPoint: true, data: statusDistribution }],
  };

  return (
    <Container maxWidth="xl" sx={{ paddingTop: 3, paddingBottom: 7 }}>
      <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <Box sx={{ padding: 4 }}>
        <Typography variant="h4" gutterBottom>
          Tax Audits Analytics
        </Typography>
        <Grid container spacing={4}>
          {/* KPI Section */}
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6">Total Audit Amount</Typography>
                <Typography variant="h4" color="green" sx={{ fontWeight: 'bold' }}>
                  ${totalAuditAmount.toFixed(2)}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6">Top 5 Auditors</Typography>
                <ol>
                  {topAuditors.map(audit => (
                    <li key={audit.auditId}>
                      <Typography variant="body2">
                        {audit.auditor} - Audit Amount: ${Number(audit.auditAmount).toFixed(2)}
                      </Typography>
                    </li>
                  ))}
                </ol>
              </CardContent>
            </Card>
          </Grid>

          {/* Chart Section */}
          <Grid item xs={12}>
            <HighchartsReact highcharts={Highcharts} options={statusChartOptions} />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
