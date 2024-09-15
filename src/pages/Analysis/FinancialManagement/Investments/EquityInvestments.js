import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { Box, Typography, Grid, Card, CardContent, Container } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import Backdrop from '@mui/material/Backdrop';

export default function EquityInvestmentsDashboard({ fetchItems }) {
  const [investmentsData, setInvestmentsData] = useState([]);
  const [statusDistribution, setStatusDistribution] = useState([]);
  const [totalInvestmentValue, setTotalInvestmentValue] = useState(0);
  const [ecoContributionTotal, setEcoContributionTotal] = useState(0);
  const [totalShares, setTotalShares] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const data = await fetchItems();
      setInvestmentsData(data);
      processInvestmentsData(data);
      setLoading(false);
    };

    fetchData();
  }, [fetchItems]);

  const processInvestmentsData = (data) => {
    // Status Distribution
    const statusCounts = data.reduce((acc, investment) => {
      acc[investment.status] = (acc[investment.status] || 0) + 1;
      return acc;
    }, {});

    setStatusDistribution(Object.keys(statusCounts).map(key => ({
      name: key,
      y: statusCounts[key],
    })));

    // Total Investment Value and Eco Contribution
    const totals = data.reduce(
      (acc, investment) => {
        acc.totalValue += Number(investment.currentValue) || 0;
        acc.ecoContribution += Number(investment.ecoContribution) || 0;
        acc.totalShares += Number(investment.sharesHeld) || 0;
        return acc;
      },
      { totalValue: 0, ecoContribution: 0, totalShares: 0 }
    );

    setTotalInvestmentValue(totals.totalValue);
    setEcoContributionTotal(totals.ecoContribution);
    setTotalShares(totals.totalShares);
  };

  const statusChartOptions = {
    chart: { type: 'pie' },
    title: { text: 'Investment Status Distribution' },
    series: [{ name: 'Investments', colorByPoint: true, data: statusDistribution }],
  };

  return (
    <Container maxWidth="xl" sx={{ paddingTop: 3, paddingBottom: 7 }}>
      <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <Box sx={{ padding: 4 }}>
        <Typography variant="h4" gutterBottom>
          Equity Investments Dashboard
        </Typography>
        <Grid container spacing={4}>
          {/* KPI Section */}
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6">Total Investment Value</Typography>
                <Typography variant="h4" color="green" sx={{ fontWeight: 'bold' }}>
                  ${totalInvestmentValue.toFixed(2)}
                </Typography>
                <Typography variant="body2">Total current value of all investments.</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6">Total Shares Held</Typography>
                <Typography variant="h4" color="blue" sx={{ fontWeight: 'bold' }}>
                  {totalShares}
                </Typography>
                <Typography variant="body2">Total shares held across all investments.</Typography>
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
