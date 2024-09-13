import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { Box, Typography, Grid, Card, CardContent, Container } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import Backdrop from '@mui/material/Backdrop';

export default function LoanAgreementsDashboard({ fetchItems }) {
  const [loansData, setLoansData] = useState([]);
  const [statusDistribution, setStatusDistribution] = useState([]);
  const [loanAmountByStatus, setLoanAmountByStatus] = useState([]);
  const [averageInterestRateByStatus, setAverageInterestRateByStatus] = useState([]);
  const [loansOverTimeData, setLoansOverTimeData] = useState([]);
  const [tagsDistribution, setTagsDistribution] = useState([]);
  const [totalLoans, setTotalLoans] = useState(0);
  const [totalLoanAmount, setTotalLoanAmount] = useState(0);
  const [averageLoanAmount, setAverageLoanAmount] = useState(0);
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
    // Total Number of Loans
    setTotalLoans(data.length);

    // Total Loan Amount
    const totalLoanAmount = data.reduce((acc, loan) => acc + Number(loan.loanAmount), 0);
    setTotalLoanAmount(totalLoanAmount);

    // Average Loan Amount
    setAverageLoanAmount(totalLoanAmount / data.length);

    // Average Interest Rate
    const totalInterestRate = data.reduce((acc, loan) => acc + Number(loan.interestRate), 0);
    setAverageInterestRate(totalInterestRate / data.length);

    // Loans by Status
    const statusCounts = data.reduce((acc, loan) => {
      acc[loan.status] = (acc[loan.status] || 0) + 1;
      return acc;
    }, {});

    setStatusDistribution(Object.keys(statusCounts).map(key => ({
      name: key.charAt(0).toUpperCase() + key.slice(1),  // Capitalize status
      y: statusCounts[key],
    })));

    // Total Loan Amount by Status
    const loanAmountByStatus = data.reduce((acc, loan) => {
      acc[loan.status] = (acc[loan.status] || 0) + Number(loan.loanAmount);
      return acc;
    }, {});

    setLoanAmountByStatus(Object.keys(loanAmountByStatus).map(key => ({
      name: key.charAt(0).toUpperCase() + key.slice(1),
      y: loanAmountByStatus[key],
    })));

    // Average Interest Rate by Status
    const interestRateByStatus = data.reduce((acc, loan) => {
      acc[loan.status] = acc[loan.status] || { totalInterestRate: 0, count: 0 };
      acc[loan.status].totalInterestRate += Number(loan.interestRate);
      acc[loan.status].count += 1;
      return acc;
    }, {});

    setAverageInterestRateByStatus(Object.keys(interestRateByStatus).map(key => ({
      name: key.charAt(0).toUpperCase() + key.slice(1),
      y: interestRateByStatus[key].totalInterestRate / interestRateByStatus[key].count || 0,
    })));

    // Loans Over Time
    const loansByMonth = data.reduce((acc, loan) => {
      const month = new Date(loan.startDate).getMonth() + 1;
      acc[month] = (acc[month] || 0) + 1;
      return acc;
    }, {});

    setLoansOverTimeData(Object.keys(loansByMonth).map(key => ({
      name: `Month ${key}`,
      y: loansByMonth[key],
    })));

    // Tags Distribution
    const tagsCounts = data.reduce((acc, loan) => {
      loan.tags.forEach(tag => {
        acc[tag] = (acc[tag] || 0) + 1;
      });
      return acc;
    }, {});

    setTagsDistribution(Object.keys(tagsCounts).map(key => ({
      name: key,
      y: tagsCounts[key],
    })));
  };

  // Chart options for each chart
  const statusChartOptions = {
    chart: {
      type: 'pie',
    },
    title: {
      text: 'Loans by Status',
    },
    series: [
      {
        name: 'Status',
        colorByPoint: true,
        data: statusDistribution,
      },
    ],
  };

  const loanAmountByStatusChartOptions = {
    chart: {
      type: 'column',
    },
    title: {
      text: 'Total Loan Amount by Status',
    },
    series: [
      {
        name: 'Loan Amount',
        data: loanAmountByStatus,
      },
    ],
  };

  const averageInterestRateByStatusChartOptions = {
    chart: {
      type: 'bar',
    },
    title: {
      text: 'Average Interest Rate by Status',
    },
    series: [
      {
        name: 'Interest Rate (%)',
        data: averageInterestRateByStatus,
      },
    ],
  };

  const loansOverTimeChartOptions = {
    chart: {
      type: 'line',
    },
    title: {
      text: 'Loans Over Time',
    },
    xAxis: {
      categories: loansOverTimeData.map(data => data.name),
    },
    series: [
      {
        name: 'Number of Loans',
        data: loansOverTimeData.map(data => data.y),
      },
    ],
  };

  const tagsChartOptions = {
    chart: {
      type: 'column',
    },
    title: {
      text: 'Tags Distribution',
    },
    series: [
      {
        name: 'Tags',
        data: tagsDistribution,
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
          Loan Agreements Dashboard
        </Typography>
        <Grid container spacing={4}>
          {/* KPI Section */}
          <Grid item xs={12} md={3}>
            <Card>
              <CardContent>
                <Typography variant="h6">Total Loans</Typography>
                <Typography variant="h4" color="green" sx={{ fontWeight: 'bold' }}>
                  {totalLoans}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={3}>
            <Card>
              <CardContent>
                <Typography variant="h6">Total Loan Amount</Typography>
                <Typography variant="h4" color="blue" sx={{ fontWeight: 'bold' }}>
                  ${totalLoanAmount.toFixed(2)}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={3}>
            <Card>
              <CardContent>
                <Typography variant="h6">Average Loan Amount</Typography>
                <Typography variant="h4" color="orange" sx={{ fontWeight: 'bold' }}>
                  ${averageLoanAmount.toFixed(2)}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={3}>
            <Card>
              <CardContent>
                <Typography variant="h6">Average Interest Rate</Typography>
                <Typography variant="h4" color="purple" sx={{ fontWeight: 'bold' }}>
                  {averageInterestRate.toFixed(2)}%
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Chart Section */}
          <Grid item xs={12} md={6}>
            <HighchartsReact highcharts={Highcharts} options={statusChartOptions} />
          </Grid>
          <Grid item xs={12} md={6}>
            <HighchartsReact highcharts={Highcharts} options={loanAmountByStatusChartOptions} />
          </Grid>
          <Grid item xs={12} md={6}>
            <HighchartsReact highcharts={Highcharts} options={averageInterestRateByStatusChartOptions} />
          </Grid>
          <Grid item xs={12} md={6}>
            <HighchartsReact highcharts={Highcharts} options={loansOverTimeChartOptions} />
          </Grid>
          <Grid item xs={12} md={12}>
            <HighchartsReact highcharts={Highcharts} options={tagsChartOptions} />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
