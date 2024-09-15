import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { Box, Typography, Grid, Card, CardContent, Container } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import Backdrop from '@mui/material/Backdrop';

export default function TaxAuditsDashboard({ fetchItems }) {
  const [auditsData, setAuditsData] = useState([]);
  const [statusDistribution, setStatusDistribution] = useState([]);
  const [totalAuditAmount, setTotalAuditAmount] = useState(0);
  const [ecoContributionTotal, setEcoContributionTotal] = useState(0);
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

    // Total Audit Amount and Eco Contribution
    const totals = data.reduce(
      (acc, audit) => {
        acc.totalAmount += Number(audit.auditAmount) || 0;
        acc.ecoContribution += Number(audit.ecoContribution) || 0;
        return acc;
      },
      { totalAmount: 0, ecoContribution: 0 }
    );

    setTotalAuditAmount(totals.totalAmount);
    setEcoContributionTotal(totals.ecoContribution);
  };

  const statusChartOptions = {
    chart: { type: 'pie' },
    title: { text: 'Audit Status Distribution' },
    series: [{ name: 'Audits', colorByPoint: true, data: statusDistribution }],
  };

  return (
    <Container maxWidth="xl" sx={{ paddingTop: 3, paddingBottom: 7 }}>
      <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <Box sx={{ padding: 4 }}>
        <Typography variant="h4" gutterBottom>
          Tax Audits Dashboard
        </Typography>
        <Grid container spacing={4}>
          {/* KPI Section */}
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6">Total Audit Amount</Typography>
                <Typography variant="h4" color="green" sx={{ fontWeight: 'bold' }}>
                  ${totalAuditAmount.toFixed(2)}
                </Typography>
                <Typography variant="body2">Total amount under tax audits.</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6">Eco Contribution</Typography>
                <Typography variant="h4" color="orange" sx={{ fontWeight: 'bold' }}>
                  ${ecoContributionTotal.toFixed(2)}
                </Typography>
                <Typography variant="body2">Total eco-tax contributions (French-specific).</Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Chart Section */}
          <Grid item xs={12} md={6}>
            <HighchartsReact highcharts={Highcharts} options={statusChartOptions} />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
