import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { Box, Typography, Grid, Card, CardContent, Container } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import Backdrop from '@mui/material/Backdrop';

export default function LiquidityManagementAnalytics({ fetchItems }) {
  const [liquidityData, setLiquidityData] = useState([]);
  const [totalLiquidity, setTotalLiquidity] = useState(0);
  const [liquidityDistribution, setLiquidityDistribution] = useState([]);
  const [tagsDistribution, setTagsDistribution] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const data = await fetchItems();
      setLiquidityData(data);
      processLiquidityData(data);
      setLoading(false);
    };

    fetchData();
  }, [fetchItems]);

  const processLiquidityData = (data) => {
    // Total Liquidity Calculation
    const total = data.reduce((sum, item) => sum + Number(item.availableCash) + Number(item.shortTermInvestments) + Number(item.cashEquivalents), 0);
    setTotalLiquidity(total);

    // Liquidity Distribution
    const distribution = data.map(item => ({
      name: item.fiscalPeriod,
      y: Number(item.availableCash) + Number(item.shortTermInvestments) + Number(item.cashEquivalents),
    }));

    setLiquidityDistribution(distribution);

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

  const liquidityChartOptions = {
    chart: { type: 'column' },
    title: { text: 'Liquidity Distribution' },
    series: [{ name: 'Liquidity', data: liquidityDistribution }],
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
        <Typography variant="h4" gutterBottom>Liquidity Management Analytics</Typography>
        <Grid container spacing={4}>
          {/* KPI Section */}
          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Typography variant="h6">Total Liquidity</Typography>
                <Typography variant="h4" color="green" sx={{ fontWeight: 'bold' }}>
                  ${totalLiquidity.toFixed(2)}
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Charts Section */}
          <Grid item xs={12} md={6}>
            <HighchartsReact highcharts={Highcharts} options={liquidityChartOptions} />
          </Grid>
          <Grid item xs={12} md={6}>
            <HighchartsReact highcharts={Highcharts} options={tagsChartOptions} />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
