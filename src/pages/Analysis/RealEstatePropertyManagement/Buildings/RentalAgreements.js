import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { Box, Typography, Grid, Card, CardContent, Container, CircularProgress, Backdrop } from '@mui/material';

export default function RentalAgreementsDashboard({ fetchData }) {
  const [rentalData, setRentalData] = useState([]);
  const [totalRent, setTotalRent] = useState(0);
  const [totalSecurityDeposit, setTotalSecurityDeposit] = useState(0);
  const [renewalAgreements, setRenewalAgreements] = useState(0);
  const [rentTrends, setRentTrends] = useState([]);
  const [tagDistribution, setTagDistribution] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDataAsync = async () => {
      setLoading(true);
      const data = await fetchData();
      setRentalData(data);
      processRentalData(data);
      setLoading(false);
    };

    fetchDataAsync();
  }, [fetchData]);

  const processRentalData = (data) => {
    // Total Rent and Security Deposits
    const totalRentAmount = data.reduce((acc, rental) => acc + Number(rental.monthlyRent), 0);
    const totalSecurity = data.reduce((acc, rental) => acc + Number(rental.securityDeposit), 0);
    setTotalRent(totalRentAmount);
    setTotalSecurityDeposit(totalSecurity);

    // Count Renewal Agreements
    const renewals = data.filter(rental => rental.tags.includes('renewal')).length;
    setRenewalAgreements(renewals);

    // Rent Trends for Line Chart
    const trendData = data.map(rental => ({
      date: new Date(rental.startDate).getTime(),
      rent: Number(rental.monthlyRent),
    }));
    setRentTrends(trendData);

    // Tag Distribution for Pie Chart
    const tagCounts = data.reduce((acc, rental) => {
      rental.tags.forEach(tag => {
        acc[tag] = (acc[tag] || 0) + 1;
      });
      return acc;
    }, {});
    setTagDistribution(Object.keys(tagCounts).map(key => ({
      name: key.charAt(0).toUpperCase() + key.slice(1),
      y: tagCounts[key],
    })));
  };

  // Highcharts options for Rent Trends
  const rentTrendChartOptions = {
    chart: { type: 'line' },
    title: { text: 'Monthly Rent Trends' },
    xAxis: { type: 'datetime', title: { text: 'Date' } },
    yAxis: { title: { text: 'Monthly Rent' } },
    series: [{
      name: 'Monthly Rent',
      data: rentTrends.map(item => [item.date, item.rent]),
    }],
  };

  // Highcharts options for Tag Distribution
  const tagChartOptions = {
    chart: { type: 'pie' },
    title: { text: 'Rental Agreement Tags Distribution' },
    series: [{
      name: 'Tags',
      colorByPoint: true,
      data: tagDistribution,
    }],
  };

  return (
    <Container maxWidth="xl" sx={{ paddingTop: 3, paddingBottom: 7 }}>
      <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <Box sx={{ padding: 4 }}>
        <Typography variant="h4" gutterBottom>
          Rental Agreements Dashboard
        </Typography>

        <Grid container spacing={4}>
          {/* KPIs Section */}
          <Grid item xs={12} md={3}>
            <Card>
              <CardContent>
                <Typography variant="h6">Total Rent Income</Typography>
                <Typography variant="h4" color="green" sx={{ fontWeight: 'bold' }}>
                  ${totalRent.toFixed(2)}
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={3}>
            <Card>
              <CardContent>
                <Typography variant="h6">Total Security Deposits</Typography>
                <Typography variant="h4" color="blue" sx={{ fontWeight: 'bold' }}>
                  ${totalSecurityDeposit.toFixed(2)}
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={3}>
            <Card>
              <CardContent>
                <Typography variant="h6">Renewal Agreements</Typography>
                <Typography variant="h4" color="orange" sx={{ fontWeight: 'bold' }}>
                  {renewalAgreements}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Grid container spacing={4} sx={{ marginTop: 4 }}>
          {/* Rent Trends Chart */}
          <Grid item xs={12} md={6}>
            <HighchartsReact highcharts={Highcharts} options={rentTrendChartOptions} />
          </Grid>

          {/* Tag Distribution Chart */}
          <Grid item xs={12} md={6}>
            <HighchartsReact highcharts={Highcharts} options={tagChartOptions} />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
