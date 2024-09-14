import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { Box, Typography, Grid, Card, CardContent, Container, CircularProgress, Backdrop } from '@mui/material';

export default function PayslipsDashboard({ fetchItems }) {
  const [payslipsData, setPayslipsData] = useState([]);
  const [totalPayslips, setTotalPayslips] = useState(0);
  const [totalNetPay, setTotalNetPay] = useState(0);
  const [statusDistribution, setStatusDistribution] = useState([]);
  const [averageNetPay, setAverageNetPay] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const data = await fetchItems();
      setPayslipsData(data);
      processPayslipData(data);
      setLoading(false);
    };

    fetchData();
  }, [fetchItems]);

  const processPayslipData = (data) => {
    setTotalPayslips(data.length);

    // Calculate total and average net pay
    const totalNetPayAmount = data.reduce((acc, payslip) => acc + (parseFloat(payslip.netPay) || 0), 0); // Ensure netPay is treated as a number
    setTotalNetPay(totalNetPayAmount);
    setAverageNetPay(data.length > 0 ? totalNetPayAmount / data.length : 0);

    // Calculate status distribution
    const statusMap = {};
    data.forEach((item) => {
      const status = item.status;
      statusMap[status] = (statusMap[status] || 0) + 1;
    });
    const statusArray = Object.entries(statusMap).map(([status, count]) => ({
      name: status.replace(/_/g, ' '),
      y: count,
    }));
    setStatusDistribution(statusArray);
  };

  // Highcharts options for Payslip Status Distribution
  const statusChartOptions = {
    chart: { type: 'pie' },
    title: { text: 'Payslip Status Distribution' },
    series: [
      {
        name: 'Status',
        data: statusDistribution,
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
          Payslips Dashboard
        </Typography>

        <Grid container spacing={4}>
          {/* KPIs Section */}
          <Grid item xs={12} md={3}>
            <Card>
              <CardContent>
                <Typography variant="h6">Total Payslips</Typography>
                <Typography variant="h4" color="green" sx={{ fontWeight: 'bold' }}>
                  {totalPayslips}
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={3}>
            <Card>
              <CardContent>
                <Typography variant="h6">Total Net Pay</Typography>
                <Typography variant="h4" color="blue" sx={{ fontWeight: 'bold' }}>
                  {totalNetPay.toFixed(2)} {/* Ensure totalNetPay is a number */}
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={3}>
            <Card>
              <CardContent>
                <Typography variant="h6">Average Net Pay</Typography>
                <Typography variant="h4" color="purple" sx={{ fontWeight: 'bold' }}>
                  {averageNetPay.toFixed(2)} {/* Ensure averageNetPay is a number */}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Grid container spacing={4} sx={{ marginTop: 4 }}>
          {/* Payslip Status Chart */}
          <Grid item xs={12} md={6}>
            <HighchartsReact highcharts={Highcharts} options={statusChartOptions} />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
