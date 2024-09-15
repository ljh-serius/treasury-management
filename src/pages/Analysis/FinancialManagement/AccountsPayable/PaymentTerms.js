import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { Box, Typography, Grid, Card, CardContent, Container } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import Backdrop from '@mui/material/Backdrop';

export default function PaymentTermsAnalysisDashboard({ fetchItems }) {
  const [paymentTermsData, setPaymentTermsData] = useState([]);
  const [activeInactiveDistribution, setActiveInactiveDistribution] = useState([]);
  const [discountRateDistribution, setDiscountRateDistribution] = useState([]);
  const [penaltyRateDistribution, setPenaltyRateDistribution] = useState([]);
  const [averageNetDays, setAverageNetDays] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const data = await fetchItems();
      setPaymentTermsData(data);
      processPaymentTermsData(data);
      setLoading(false);
    };

    fetchData();
  }, [fetchItems]);

  const processPaymentTermsData = (data) => {
    // Active/Inactive Distribution
    const activeInactiveCounts = data.reduce((acc, term) => {
      acc[term.isActive] = (acc[term.isActive] || 0) + 1;
      return acc;
    }, {});

    setActiveInactiveDistribution(Object.keys(activeInactiveCounts).map(key => ({
      name: key === 'yes' ? 'Active' : 'Inactive',
      y: activeInactiveCounts[key],
    })));

    // Discount Rate Distribution
    const discountCounts = data.reduce((acc, term) => {
      acc[term.discountRate] = (acc[term.discountRate] || 0) + 1;
      return acc;
    }, {});

    setDiscountRateDistribution(Object.keys(discountCounts).map(key => ({
      name: `${key}%`,
      y: discountCounts[key],
    })));

    // Penalty Rate Distribution
    const penaltyCounts = data.reduce((acc, term) => {
      acc[term.penaltyRate] = (acc[term.penaltyRate] || 0) + 1;
      return acc;
    }, {});

    setPenaltyRateDistribution(Object.keys(penaltyCounts).map(key => ({
      name: `${key}%`,
      y: penaltyCounts[key],
    })));

    // Average Net Days
    const totalNetDays = data.reduce((acc, term) => acc + term.netDays, 0);
    setAverageNetDays(totalNetDays / data.length);
  };

  const activeInactiveChartOptions = {
    chart: { type: 'pie' },
    title: { text: 'Active vs Inactive Payment Terms' },
    series: [{ name: 'Status', data: activeInactiveDistribution }],
  };

  const discountRateChartOptions = {
    chart: { type: 'column' },
    title: { text: 'Discount Rate Distribution' },
    series: [{ name: 'Discount Rates', data: discountRateDistribution }],
  };

  const penaltyRateChartOptions = {
    chart: { type: 'column' },
    title: { text: 'Penalty Rate Distribution' },
    series: [{ name: 'Penalty Rates', data: penaltyRateDistribution }],
  };

  return (
    <Container maxWidth="xl" sx={{ paddingTop: 3, paddingBottom: 7 }}>
      <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <Box sx={{ padding: 4 }}>
        <Typography variant="h4" gutterBottom>
          Payment Terms Analysis Dashboard
        </Typography>
        <Grid container spacing={4}>
          {/* KPI Section */}
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6">Average Net Days</Typography>
                <Typography variant="h4" color="green" sx={{ fontWeight: 'bold' }}>
                  {averageNetDays.toFixed(2)} Days
                </Typography>
                <Typography variant="body2">
                  The average number of net days across all payment terms.
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Chart Section */}
          <Grid item xs={12} md={6}>
            <HighchartsReact highcharts={Highcharts} options={activeInactiveChartOptions} />
          </Grid>
          <Grid item xs={12} md={6}>
            <HighchartsReact highcharts={Highcharts} options={discountRateChartOptions} />
          </Grid>
          <Grid item xs={12} md={6}>
            <HighchartsReact highcharts={Highcharts} options={penaltyRateChartOptions} />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
