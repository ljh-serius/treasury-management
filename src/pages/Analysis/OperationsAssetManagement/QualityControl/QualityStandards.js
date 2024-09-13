import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { Box, Typography, Grid, Card, CardContent, Container } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import Backdrop from '@mui/material/Backdrop';

export default function QualityStandardsAnalytics({ fetchItems }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalStandards, setTotalStandards] = useState(0);
  const [criticalStandards, setCriticalStandards] = useState([]);
  const [complianceDistribution, setComplianceDistribution] = useState([]);

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
    setTotalStandards(data.length);

    const critical = data.filter((item) => item.tags.includes('critical'));
    setCriticalStandards(critical);
  };

  const generateCharts = (data) => {
    const complianceLevels = data.reduce((acc, item) => {
      acc[item.complianceLevel] = (acc[item.complianceLevel] || 0) + 1;
      return acc;
    }, {});

    setComplianceDistribution(
      Object.keys(complianceLevels).map((key) => ({
        name: key,
        y: complianceLevels[key],
      }))
    );
  };

  const complianceDistributionChart = {
    chart: { type: 'bar' },
    title: { text: 'Compliance Level Distribution' },
    xAxis: {
      categories: complianceDistribution.map((item) => item.name),
      title: { text: 'Compliance Levels' },
    },
    yAxis: { title: { text: 'Number of Standards' } },
    series: [
      {
        name: 'Standards',
        data: complianceDistribution.map((item) => item.y),
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
          Quality Standards Analytics
        </Typography>
        <Grid container spacing={4}>
          {/* KPIs */}
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6">Total Quality Standards</Typography>
                <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                  {totalStandards}
                </Typography>
                <Typography variant="body2">Total number of quality standards tracked.</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6">Critical Standards</Typography>
                <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                  {criticalStandards.length}
                </Typography>
                <Typography variant="body2">Standards tagged as 'Critical'.</Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Charts */}
          <Grid item xs={12} md={12}>
            <HighchartsReact highcharts={Highcharts} options={complianceDistributionChart} />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
