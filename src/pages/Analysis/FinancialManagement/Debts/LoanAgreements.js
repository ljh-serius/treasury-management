import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { Box, Typography, Grid, Card, CardContent, Container } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import Backdrop from '@mui/material/Backdrop';

export default function LoanAgreementsDashboard({ fetchItems }) {
  const [loansData, setLoansData] = useState([]);
  const [statusDistribution, setStatusDistribution] = useState([]);
  const [totalLoanAmount, setTotalLoanAmount] = useState(0);
  const [totalLateFees, setTotalLateFees] = useState(0);
  const [ecoContributionTotal, setEcoContributionTotal] = useState(0);
  const [averageInterestRate, setAverageInterestRate] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const data = await fetchItems();
      setLoansData(data);
      processLoansData(data);
      setLoading(false);
    };

    fetchData();
  }, [fetchItems]);

  const processLoansData = (data) => {
    // Status Distribution
    const statusCounts = data.reduce((acc, loan) => {
      acc[loan.status] = (acc[loan.status] || 0) + 1;
      return acc;
    }, {});

    setStatusDistribution(Object.keys(statusCounts).map(key => ({
      name: key,
      y: statusCounts[key],
    })));

    // Total Loan Amount, Late Payment Fees, and Eco Contribution
    const totals = data.reduce(
      (acc, loan) => {
        acc.loanAmount += Number(loan.loanAmount) || 0;
        acc.lateFees += Number(loan.latePaymentFee) || 0;
        acc.ecoContribution += Number(loan.ecoContribution) || 0;
        acc.interestRate += Number(loan.interestRate) || 0;
        return acc;
      },
      { loanAmount: 0, lateFees: 0, ecoContribution: 0, interestRate: 0 }
    );

    setTotalLoanAmount(totals.loanAmount);
    setTotalLateFees(totals.lateFees);
    setEcoContributionTotal(totals.ecoContribution);
    setAverageInterestRate(totals.interestRate / data.length);
  };

  const statusChartOptions = {
    chart: { type: 'pie' },
    title: { text: 'Status Distribution' },
    series: [{ name: 'Status', colorByPoint: true, data: statusDistribution }],
  };

  return (
    <Container maxWidth="xl" sx={{ paddingTop: 3, paddingBottom: 7 }}>
      <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <Box sx={{ padding: 4 }}>
        <Typography variant="h4" gutterBottom>
          Loan Agreements Dashboard
        </Typography>
        <Grid container spacing={4}>
          {/* KPI Section */}
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6">Total Loan Amount</Typography>
                <Typography variant="h4" color="green" sx={{ fontWeight: 'bold' }}>
                  ${totalLoanAmount.toFixed(2)}
                </Typography>
                <Typography variant="body2">Total loan amount across all agreements.</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6">Average Interest Rate</Typography>
                <Typography variant="h4" color="blue" sx={{ fontWeight: 'bold' }}>
                  {averageInterestRate.toFixed(2)}%
                </Typography>
                <Typography variant="body2">Average interest rate across all loans.</Typography>
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
                <Typography variant="body2">Total late payment fees across all loans.</Typography>
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
