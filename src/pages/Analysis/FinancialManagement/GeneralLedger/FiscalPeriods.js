import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { Box, Typography, Grid, Card, CardContent, Container } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import Backdrop from '@mui/material/Backdrop';

export default function FiscalPeriodsDashboard({ fetchItems }) {
  const [periodsData, setPeriodsData] = useState([]);
  const [statusDistribution, setStatusDistribution] = useState([]);
  const [ecoContributionTotal, setEcoContributionTotal] = useState(0);
  const [totalLateFees, setTotalLateFees] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const data = await fetchItems();
      setPeriodsData(data);
      processPeriodsData(data);
      setLoading(false);
    };

    fetchData();
  }, [fetchItems]);

  const processPeriodsData = (data) => {
    // Status Distribution (Closed or Open)
    const statusCounts = data.reduce((acc, period) => {
      acc[period.isClosed] = (acc[period.isClosed] || 0) + 1;
      return acc;
    }, {});

    setStatusDistribution(Object.keys(statusCounts).map(key => ({
      name: key === 'yes' ? 'Closed' : 'Open',
      y: statusCounts[key],
    })));

    // Total Eco Contribution and Late Payment Fees
    const totals = data.reduce(
      (acc, period) => {
        acc.ecoContribution += Number(period.ecoContribution) || 0;
        acc.lateFees += Number(period.latePaymentFee) || 0;
        return acc;
      },
      { ecoContribution: 0, lateFees: 0 }
    );

    setEcoContributionTotal(totals.ecoContribution);
    setTotalLateFees(totals.lateFees);
  };

  const statusChartOptions = {
    chart: { type: 'pie' },
    title: { text: 'Fiscal Period Status' },
    series: [{ name: 'Periods', colorByPoint: true, data: statusDistribution }],
  };

  return (
    <Container maxWidth="xl" sx={{ paddingTop: 3, paddingBottom: 7 }}>
      <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <Box sx={{ padding: 4 }}>
        <Typography variant="h4" gutterBottom>
          Fiscal Periods Dashboard
        </Typography>
        <Grid container spacing={4}>
          {/* KPI Section */}
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
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6">Total Late Payment Fees</Typography>
                <Typography variant="h4" color="red" sx={{ fontWeight: 'bold' }}>
                  ${totalLateFees.toFixed(2)}
                </Typography>
                <Typography variant="body2">Total late payment fees across all periods.</Typography>
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
