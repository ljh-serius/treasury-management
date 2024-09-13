import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { Box, Typography, Grid, Card, CardContent, Container } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import Backdrop from '@mui/material/Backdrop';

export default function CashFlowForecastsAnalytics({ fetchItems }) {
  const [cashFlowData, setCashFlowData] = useState([]);
  const [netCashFlow, setNetCashFlow] = useState(0);
  const [cashFlowDistribution, setCashFlowDistribution] = useState([]);
  const [tagsDistribution, setTagsDistribution] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const data = await fetchItems();
      setCashFlowData(data);
      processCashFlowData(data);
      setLoading(false);
    };

    fetchData();
  }, [fetchItems]);

  const processCashFlowData = (data) => {
    // Net Cash Flow Calculation
    const netCash = data.reduce((sum, item) => sum + Number(item.netCashFlow), 0);
    setNetCashFlow(netCash);

    // Cash Flow Distribution
    const distribution = data.map(item => ({
      name: item.fiscalPeriod,
      y: Number(item.netCashFlow),
    }));

    setCashFlowDistribution(distribution);

    // Tags Distribution
    const tagsCounts = data.reduce((acc, item) => {
      item.tags.forEach(tag => {
        acc[tag] = (acc[tag] || 0) + 1;
      });
      return acc;
    }, {});

    setTagsDistribution(Object.keys(tagsCounts).map(tag => ({
      name: tag,
      y: tagsCounts[tag],
    })));
  };

  const cashFlowChartOptions = {
    chart: { type: 'line' },
    title: { text: 'Net Cash Flow Over Time' },
    series: [{ name: 'Net Cash Flow', data: cashFlowDistribution }],
  };

  const tagsChartOptions = {
    chart: { type: 'pie' },
    title: { text: 'Tags Distribution' },
    series: [{ name: 'Tags', colorByPoint: true, data: tagsDistribution }],
  };

  return (
    <Container maxWidth="xl" sx={{ paddingTop: 3, paddingBottom: 7 }}>
      <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <Box sx={{ padding: 4 }}>
        <Typography variant="h4" gutterBottom>Cash Flow Forecasts Analytics</Typography>
        <Grid container spacing={4}>
          {/* KPI Section */}
          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Typography variant="h6">Net Cash Flow</Typography>
                <Typography variant="h4" color="green" sx={{ fontWeight: 'bold' }}>
                  ${netCashFlow.toFixed(2)}
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Charts Section */}
          <Grid item xs={12} md={6}>
            <HighchartsReact highcharts={Highcharts} options={cashFlowChartOptions} />
          </Grid>
          <Grid item xs={12} md={6}>
            <HighchartsReact highcharts={Highcharts} options={tagsChartOptions} />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
