import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { Box, Typography, Grid, Card, CardContent, Container } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import Backdrop from '@mui/material/Backdrop';

export default function TaxFilingsDashboard({ fetchItems }) {
  const [filingsData, setFilingsData] = useState([]);
  const [statusDistribution, setStatusDistribution] = useState([]);
  const [totalTaxAmount, setTotalTaxAmount] = useState(0);
  const [ecoContributionTotal, setEcoContributionTotal] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const data = await fetchItems();
      setFilingsData(data);
      processFilingsData(data);
      setLoading(false);
    };

    fetchData();
  }, [fetchItems]);

  const processFilingsData = (data) => {
    // Status Distribution
    const statusCounts = data.reduce((acc, filing) => {
      acc[filing.status] = (acc[filing.status] || 0) + 1;
      return acc;
    }, {});

    setStatusDistribution(Object.keys(statusCounts).map(key => ({
      name: key,
      y: statusCounts[key],
    })));

    // Total Tax Amount and Eco Contribution
    const totals = data.reduce(
      (acc, filing) => {
        acc.totalAmount += Number(filing.taxAmount) || 0;
        acc.ecoContribution += Number(filing.ecoContribution) || 0;
        return acc;
      },
      { totalAmount: 0, ecoContribution: 0 }
    );

    setTotalTaxAmount(totals.totalAmount);
    setEcoContributionTotal(totals.ecoContribution);
  };

  const statusChartOptions = {
    chart: { type: 'pie' },
    title: { text: 'Filing Status Distribution' },
    series: [{ name: 'Filings', colorByPoint: true, data: statusDistribution }],
  };

  return (
    <Container maxWidth="xl" sx={{ paddingTop: 3, paddingBottom: 7 }}>
      <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <Box sx={{ padding: 4 }}>
        <Typography variant="h4" gutterBottom>
          Tax Filings Dashboard
        </Typography>
        <Grid container spacing={4}>
          {/* KPI Section */}
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6">Total Tax Amount</Typography>
                <Typography variant="h4" color="green" sx={{ fontWeight: 'bold' }}>
                  ${totalTaxAmount.toFixed(2)}
                </Typography>
                <Typography variant="body2">Total amount of taxes filed.</Typography>
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
