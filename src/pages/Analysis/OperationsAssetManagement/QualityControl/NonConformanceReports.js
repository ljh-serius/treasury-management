import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { Box, Typography, Grid, Card, CardContent, Container } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import Backdrop from '@mui/material/Backdrop';

export default function NonConformanceReportsAnalytics({ fetchItems }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalReports, setTotalReports] = useState(0);
  const [highSeverityReports, setHighSeverityReports] = useState([]);
  const [nonConformanceDistribution, setNonConformanceDistribution] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const fetchedData = await fetchItems();
      setData(fetchedData);
      calculateKpis(fetchedData);
      generateCharts(fetchedData);
      setLoading(false);
    };

    fetchData();
  }, [fetchItems]);

  const calculateKpis = (data) => {
    setTotalReports(data.length);

    const highSeverity = data.filter((item) => item.tags.includes('high_severity'));
    setHighSeverityReports(highSeverity);
  };

  const generateCharts = (data) => {
    const nonConformanceTypes = data.reduce((acc, item) => {
      acc[item.nonConformanceType] = (acc[item.nonConformanceType] || 0) + 1;
      return acc;
    }, {});

    setNonConformanceDistribution(
      Object.keys(nonConformanceTypes).map((key) => ({
        name: key,
        y: nonConformanceTypes[key],
      }))
    );
  };

  const nonConformanceDistributionChart = {
    chart: { type: 'pie' },
    title: { text: 'Non-conformance Types Distribution' },
    series: [
      {
        name: 'Types',
        colorByPoint: true,
        data: nonConformanceDistribution,
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
          Non-conformance Reports Analytics
        </Typography>
        <Grid container spacing={4}>
          {/* KPIs */}
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6">Total Reports</Typography>
                <Typography variant="h4" color="blue" sx={{ fontWeight: 'bold' }}>
                  {totalReports}
                </Typography>
                <Typography variant="body2">Total number of non-conformance reports.</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6">High Severity Reports</Typography>
                <Typography variant="h4" color="green" sx={{ fontWeight: 'bold' }}>
                  {highSeverityReports.length}
                </Typography>
                <Typography variant="body2">Reports tagged as 'High Severity'.</Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Charts */}
          <Grid item xs={12} md={12}>
            <HighchartsReact highcharts={Highcharts} options={nonConformanceDistributionChart} />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
