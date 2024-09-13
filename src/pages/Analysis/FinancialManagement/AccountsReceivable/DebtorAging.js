import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { Box, Typography, Grid, Card, CardContent, Container } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import Backdrop from '@mui/material/Backdrop';

export default function DebtorAgingDashboard({ fetchItems }) {
  const [debtorData, setDebtorData] = useState([]);
  const [riskLevelDistribution, setRiskLevelDistribution] = useState([]);
  const [overdueAmountByRange, setOverdueAmountByRange] = useState([]);
  const [overdueInvoicesTrendsData, setOverdueInvoicesTrendsData] = useState([]);
  const [averageOverdueDaysTrendsData, setAverageOverdueDaysTrendsData] = useState([]);
  const [tagsDistribution, setTagsDistribution] = useState([]);
  const [totalOverdueInvoices, setTotalOverdueInvoices] = useState(0);
  const [totalOverdueAmount, setTotalOverdueAmount] = useState(0);
  const [averageOverdueDays, setAverageOverdueDays] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const data = await fetchItems();
      setDebtorData(data);
      processDebtorData(data);
      setLoading(false);
    };

    fetchData();
  }, [fetchItems]);

  const processDebtorData = (data) => {
    // Total Number of Overdue Invoices
    setTotalOverdueInvoices(data.length);

    // Total Overdue Amount
    const totalAmount = data.reduce((acc, invoice) => acc + Number(invoice.amount), 0);
    setTotalOverdueAmount(totalAmount);

    // Average Overdue Days
    const totalDays = data.reduce((acc, invoice) => acc + Number(invoice.overdueDays), 0);
    setAverageOverdueDays(totalDays / data.length);

    // Invoices by Risk Level
    const riskLevelCounts = data.reduce((acc, invoice) => {
      acc[invoice.riskLevel] = (acc[invoice.riskLevel] || 0) + 1;
      return acc;
    }, {});

    setRiskLevelDistribution(Object.keys(riskLevelCounts).map(key => ({
      name: key.charAt(0).toUpperCase() + key.slice(1),  // Capitalize risk level
      y: riskLevelCounts[key],
    })));

    // Overdue Amount by Due Date Range
    const overdueAmountRanges = data.reduce((acc, invoice) => {
      const days = Number(invoice.overdueDays);
      const range = days <= 30 ? '0-30 Days' :
                    days <= 60 ? '31-60 Days' :
                    days <= 90 ? '61-90 Days' : '90+ Days';
      acc[range] = (acc[range] || 0) + Number(invoice.amount);
      return acc;
    }, {});

    setOverdueAmountByRange(Object.keys(overdueAmountRanges).map(key => ({
      name: key,
      y: overdueAmountRanges[key],
    })));

    // Overdue Invoices Over Time
    const overdueTrends = data.reduce((acc, invoice) => {
      const month = new Date(invoice.createdDate).getMonth() + 1;
      acc[month] = (acc[month] || 0) + 1;
      return acc;
    }, {});

    setOverdueInvoicesTrendsData(Object.keys(overdueTrends).map(key => ({
      name: `Month ${key}`,
      y: overdueTrends[key],
    })));

    // Average Overdue Days Over Time
    const overdueDaysTrends = data.reduce((acc, invoice) => {
      const month = new Date(invoice.createdDate).getMonth() + 1;
      acc[month] = (acc[month] || { totalDays: 0, count: 0 });
      acc[month].totalDays += Number(invoice.overdueDays);
      acc[month].count += 1;
      return acc;
    }, {});

    setAverageOverdueDaysTrendsData(Object.keys(overdueDaysTrends).map(key => ({
      name: `Month ${key}`,
      y: overdueDaysTrends[key].totalDays / overdueDaysTrends[key].count,
    })));

    // Tags Distribution
    const tagsCounts = data.reduce((acc, invoice) => {
      invoice.tags.forEach(tag => {
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
  const riskLevelChartOptions = {
    chart: {
      type: 'pie',
    },
    title: {
      text: 'Invoices by Risk Level',
    },
    series: [
      {
        name: 'Risk Levels',
        colorByPoint: true,
        data: riskLevelDistribution,
      },
    ],
  };

  const overdueAmountRangeChartOptions = {
    chart: {
      type: 'column',
    },
    title: {
      text: 'Overdue Amount by Due Date Range',
    },
    series: [
      {
        name: 'Overdue Amount',
        data: overdueAmountByRange,
      },
    ],
  };

  const overdueInvoicesTrendsChartOptions = {
    chart: {
      type: 'line',
    },
    title: {
      text: 'Overdue Invoices Over Time',
    },
    xAxis: {
      categories: overdueInvoicesTrendsData.map(data => data.name),
    },
    series: [
      {
        name: 'Number of Overdue Invoices',
        data: overdueInvoicesTrendsData.map(data => data.y),
      },
    ],
  };

  const averageOverdueDaysTrendsChartOptions = {
    chart: {
      type: 'line',
    },
    title: {
      text: 'Average Overdue Days Over Time',
    },
    xAxis: {
      categories: averageOverdueDaysTrendsData.map(data => data.name),
    },
    series: [
      {
        name: 'Average Overdue Days',
        data: averageOverdueDaysTrendsData.map(data => data.y),
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
          Debtor Aging Dashboard
        </Typography>
        <Grid container spacing={4}>
          {/* KPI Section */}
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6">Total Overdue Invoices</Typography>
                <Typography variant="h4" color="green" sx={{ fontWeight: 'bold' }}>
                  {totalOverdueInvoices}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6">Total Overdue Amount</Typography>
                <Typography variant="h4" color="blue" sx={{ fontWeight: 'bold' }}>
                  ${totalOverdueAmount.toFixed(2)}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6">Average Overdue Days</Typography>
                <Typography variant="h4" color="orange" sx={{ fontWeight: 'bold' }}>
                  {averageOverdueDays.toFixed(2)}
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Chart Section */}
          <Grid item xs={12} md={6}>
            <HighchartsReact highcharts={Highcharts} options={riskLevelChartOptions} />
          </Grid>
          <Grid item xs={12} md={6}>
            <HighchartsReact highcharts={Highcharts} options={overdueAmountRangeChartOptions} />
          </Grid>
          <Grid item xs={12} md={6}>
            <HighchartsReact highcharts={Highcharts} options={overdueInvoicesTrendsChartOptions} />
          </Grid>
          <Grid item xs={12} md={6}>
            <HighchartsReact highcharts={Highcharts} options={averageOverdueDaysTrendsChartOptions} />
          </Grid>
          <Grid item xs={12} md={12}>
            <HighchartsReact highcharts={Highcharts} options={tagsChartOptions} />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
