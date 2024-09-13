import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { Box, Typography, Grid, Card, CardContent, Container } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import Backdrop from '@mui/material/Backdrop';

export default function FiscalPeriodsDashboard({ fetchItems }) {
  const [fiscalPeriodsData, setFiscalPeriodsData] = useState([]);
  const [periodsStatusDistribution, setPeriodsStatusDistribution] = useState([]);
  const [averageDurationData, setAverageDurationData] = useState([]);
  const [periodsByMonthData, setPeriodsByMonthData] = useState([]);
  const [tagsDistribution, setTagsDistribution] = useState([]);
  const [totalPeriods, setTotalPeriods] = useState(0);
  const [openPeriods, setOpenPeriods] = useState(0);
  const [closedPeriods, setClosedPeriods] = useState(0);
  const [averageDuration, setAverageDuration] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const data = await fetchItems();
      setFiscalPeriodsData(data);
      processFiscalPeriodsData(data);
      setLoading(false);
    };

    fetchData();
  }, [fetchItems]);

  const processFiscalPeriodsData = (data) => {
    // Total Number of Fiscal Periods
    setTotalPeriods(data.length);

    // Count Open and Closed Periods
    const statusCounts = data.reduce((acc, period) => {
      if (period.isClosed === 'yes') {
        acc.closed += 1;
      } else {
        acc.open += 1;
      }
      return acc;
    }, { open: 0, closed: 0 });

    setOpenPeriods(statusCounts.open);
    setClosedPeriods(statusCounts.closed);

    // Periods by Status
    setPeriodsStatusDistribution([
      { name: 'Open', y: statusCounts.open },
      { name: 'Closed', y: statusCounts.closed },
    ]);

    // Average Duration of Fiscal Periods
    const totalDuration = data.reduce((acc, period) => {
      const start = new Date(period.startDate);
      const end = new Date(period.endDate);
      const duration = (end - start) / (1000 * 60 * 60 * 24); // Convert milliseconds to days
      return acc + duration;
    }, 0);

    setAverageDuration(totalDuration / data.length);

    // Calculate Average Duration for Open and Closed Periods Separately
    const durationByStatus = data.reduce((acc, period) => {
      const start = new Date(period.startDate);
      const end = new Date(period.endDate);
      const duration = (end - start) / (1000 * 60 * 60 * 24);
      if (period.isClosed === 'yes') {
        acc.closed.totalDuration += duration;
        acc.closed.count += 1;
      } else {
        acc.open.totalDuration += duration;
        acc.open.count += 1;
      }
      return acc;
    }, { open: { totalDuration: 0, count: 0 }, closed: { totalDuration: 0, count: 0 } });

    setAverageDurationData([
      { name: 'Open', y: durationByStatus.open.totalDuration / durationByStatus.open.count || 0 },
      { name: 'Closed', y: durationByStatus.closed.totalDuration / durationByStatus.closed.count || 0 },
    ]);

    // Number of Periods by Month
    const periodsByMonth = data.reduce((acc, period) => {
      const startMonth = new Date(period.startDate).getMonth() + 1;
      acc[startMonth] = (acc[startMonth] || 0) + 1;
      return acc;
    }, {});

    setPeriodsByMonthData(Object.keys(periodsByMonth).map(key => ({
      name: `Month ${key}`,
      y: periodsByMonth[key],
    })));

    // Tags Distribution
    const tagsCounts = data.reduce((acc, period) => {
      period.tags.forEach(tag => {
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
  const periodsStatusChartOptions = {
    chart: {
      type: 'pie',
    },
    title: {
      text: 'Periods by Status',
    },
    series: [
      {
        name: 'Status',
        colorByPoint: true,
        data: periodsStatusDistribution,
      },
    ],
  };

  const averageDurationChartOptions = {
    chart: {
      type: 'bar',
    },
    title: {
      text: 'Average Duration of Fiscal Periods',
    },
    series: [
      {
        name: 'Average Duration (Days)',
        data: averageDurationData,
      },
    ],
  };

  const periodsByMonthChartOptions = {
    chart: {
      type: 'column',
    },
    title: {
      text: 'Number of Periods by Month',
    },
    xAxis: {
      categories: periodsByMonthData.map(data => data.name),
    },
    series: [
      {
        name: 'Number of Periods',
        data: periodsByMonthData.map(data => data.y),
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
          Fiscal Periods Dashboard
        </Typography>
        <Grid container spacing={4}>
          {/* KPI Section */}
          <Grid item xs={12} md={3}>
            <Card>
              <CardContent>
                <Typography variant="h6">Total Periods</Typography>
                <Typography variant="h4" color="green" sx={{ fontWeight: 'bold' }}>
                  {totalPeriods}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={3}>
            <Card>
              <CardContent>
                <Typography variant="h6">Open Periods</Typography>
                <Typography variant="h4" color="blue" sx={{ fontWeight: 'bold' }}>
                  {openPeriods}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={3}>
            <Card>
              <CardContent>
                <Typography variant="h6">Closed Periods</Typography>
                <Typography variant="h4" color="orange" sx={{ fontWeight: 'bold' }}>
                  {closedPeriods}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={3}>
            <Card>
              <CardContent>
                <Typography variant="h6">Average Duration (Days)</Typography>
                <Typography variant="h4" color="purple" sx={{ fontWeight: 'bold' }}>
                  {averageDuration.toFixed(2)}
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Chart Section */}
          <Grid item xs={12} md={6}>
            <HighchartsReact highcharts={Highcharts} options={periodsStatusChartOptions} />
          </Grid>
          <Grid item xs={12} md={6}>
            <HighchartsReact highcharts={Highcharts} options={averageDurationChartOptions} />
          </Grid>
          <Grid item xs={12} md={6}>
            <HighchartsReact highcharts={Highcharts} options={periodsByMonthChartOptions} />
          </Grid>
          <Grid item xs={12} md={12}>
            <HighchartsReact highcharts={Highcharts} options={tagsChartOptions} />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
