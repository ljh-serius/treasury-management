import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { Box, Typography, Grid, Card, CardContent, Container } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import Backdrop from '@mui/material/Backdrop';

export default function PaymentTermsDashboard({ fetchItems }) {
  const [termsData, setTermsData] = useState([]);
  const [isActiveDistribution, setIsActiveDistribution] = useState([]);
  const [netDaysDistribution, setNetDaysDistribution] = useState([]);
  const [tagsDistribution, setTagsDistribution] = useState([]);
  const [monthlyCreatedData, setMonthlyCreatedData] = useState([]);
  const [modificationTrendsData, setModificationTrendsData] = useState([]);
  const [totalTerms, setTotalTerms] = useState(0);
  const [averageNetDays, setAverageNetDays] = useState(0);
  const [recentModifications, setRecentModifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const data = await fetchItems();
      setTermsData(data);
      processTermsData(data);
      setLoading(false);
    };

    fetchData();
  }, [fetchItems]);

  const processTermsData = (data) => {
    // Total Number of Payment Terms
    setTotalTerms(data.length);

    // Active vs. Inactive Payment Terms
    const activeCounts = data.reduce((acc, term) => {
      acc[term.isActive] = (acc[term.isActive] || 0) + 1;
      return acc;
    }, {});

    setIsActiveDistribution(Object.keys(activeCounts).map(key => ({
      name: key === 'yes' ? 'Active' : 'Inactive',
      y: activeCounts[key],
    })));

    // Average Net Days
    const totalNetDays = data.reduce((acc, term) => acc + Number(term.netDays || 0), 0);
    setAverageNetDays(totalNetDays / data.length);

    // Net Days Distribution
    const netDaysCounts = data.reduce((acc, term) => {
      const range = term.netDays <= 30 ? '0-30' :
                    term.netDays <= 60 ? '31-60' :
                    term.netDays <= 90 ? '61-90' : '91+';
      acc[range] = (acc[range] || 0) + 1;
      return acc;
    }, {});

    setNetDaysDistribution(Object.keys(netDaysCounts).map(key => ({
      name: key,
      y: netDaysCounts[key],
    })));

    // Tags Distribution
    const tagsCounts = data.reduce((acc, term) => {
      term.tags.forEach(tag => {
        acc[tag] = (acc[tag] || 0) + 1;
      });
      return acc;
    }, {});

    setTagsDistribution(Object.keys(tagsCounts).map(key => ({
      name: key,
      y: tagsCounts[key],
    })));

    // Monthly Created Payment Terms
    const createdCounts = data.reduce((acc, term) => {
      const month = new Date(term.createdDate).getMonth() + 1;
      acc[month] = (acc[month] || 0) + 1;
      return acc;
    }, {});

    setMonthlyCreatedData(Object.keys(createdCounts).map(key => ({
      name: `Month ${key}`,
      y: createdCounts[key],
    })));

    // Modification Trends
    const modificationCounts = data.reduce((acc, term) => {
      const month = new Date(term.lastModifiedDate).getMonth() + 1;
      acc[month] = (acc[month] || 0) + 1;
      return acc;
    }, {});

    setModificationTrendsData(Object.keys(modificationCounts).map(key => ({
      name: `Month ${key}`,
      y: modificationCounts[key],
    })));

    // Recent Modifications
    const recentModificationsList = data
      .sort((a, b) => new Date(b.lastModifiedDate) - new Date(a.lastModifiedDate))
      .slice(0, 5);
    setRecentModifications(recentModificationsList);
  };

  // Chart options for each chart
  const isActiveChartOptions = {
    chart: {
      type: 'pie',
    },
    title: {
      text: 'Active vs. Inactive Payment Terms',
    },
    series: [
      {
        name: 'Status',
        colorByPoint: true,
        data: isActiveDistribution,
      },
    ],
  };

  const netDaysChartOptions = {
    chart: {
      type: 'column',
    },
    title: {
      text: 'Net Days Distribution',
    },
    series: [
      {
        name: 'Net Days',
        data: netDaysDistribution,
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

  const monthlyCreatedChartOptions = {
    chart: {
      type: 'line',
    },
    title: {
      text: 'Monthly Created Payment Terms',
    },
    xAxis: {
      categories: monthlyCreatedData.map(data => data.name),
    },
    series: [
      {
        name: 'Number of Terms Created',
        data: monthlyCreatedData.map(data => data.y),
      },
    ],
  };

  const modificationTrendsChartOptions = {
    chart: {
      type: 'line',
    },
    title: {
      text: 'Modification Trends Over Time',
    },
    xAxis: {
      categories: modificationTrendsData.map(data => data.name),
    },
    series: [
      {
        name: 'Number of Modifications',
        data: modificationTrendsData.map(data => data.y),
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
          Payment Terms Dashboard
        </Typography>
        <Grid container spacing={4}>
          {/* KPI Section */}
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6">Total Payment Terms</Typography>
                <Typography variant="h4" color="green" sx={{ fontWeight: 'bold' }}>
                  {totalTerms}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6">Average Net Days</Typography>
                <Typography variant="h4" color="blue" sx={{ fontWeight: 'bold' }}>
                  {averageNetDays.toFixed(2)}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6">Recent Modifications</Typography>
                <ol>
                  {recentModifications.map(term => (
                    <li key={term.termId}>
                      <Typography variant="body2">
                        {term.termName} - Last Modified: {new Date(term.lastModifiedDate).toLocaleDateString()}
                      </Typography>
                    </li>
                  ))}
                </ol>
              </CardContent>
            </Card>
          </Grid>

          {/* Chart Section */}
          <Grid item xs={12} md={6}>
            <HighchartsReact highcharts={Highcharts} options={isActiveChartOptions} />
          </Grid>
          <Grid item xs={12} md={6}>
            <HighchartsReact highcharts={Highcharts} options={netDaysChartOptions} />
          </Grid>
          <Grid item xs={12} md={6}>
            <HighchartsReact highcharts={Highcharts} options={tagsChartOptions} />
          </Grid>
          <Grid item xs={12} md={12}>
            <HighchartsReact highcharts={Highcharts} options={monthlyCreatedChartOptions} />
          </Grid>
          <Grid item xs={12} md={12}>
            <HighchartsReact highcharts={Highcharts} options={modificationTrendsChartOptions} />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
