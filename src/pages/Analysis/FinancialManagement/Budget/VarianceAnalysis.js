import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { Box, Typography, Grid, Card, CardContent, Container } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import Backdrop from '@mui/material/Backdrop';

export default function VarianceAnalysisAnalytics({ fetchItems }) {
  const [varianceData, setVarianceData] = useState([]);
  const [varianceDistribution, setVarianceDistribution] = useState([]);
  const [totalVariance, setTotalVariance] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const data = await fetchItems();
      setVarianceData(data);
      processVarianceData(data);
      setLoading(false);
    };

    fetchData();
  }, [fetchItems]);

  const processVarianceData = (data) => {
    // Variance Distribution
    const distribution = data.map(item => ({
      name: item.department,
      y: Number(item.varianceAmount),
    }));

    setVarianceDistribution(distribution);

    // Total Variance
    const total = data.reduce((sum, item) => sum + Number(item.varianceAmount), 0);
    setTotalVariance(total);
  };

  const varianceChartOptions = {
    chart: { type: 'pie' },
    title: { text: 'Variance Distribution by Department' },
    series: [{ name: 'Variance', colorByPoint: true, data: varianceDistribution }],
  };

  return (
    <Container maxWidth="xl" sx={{ paddingTop: 3, paddingBottom: 7 }}>
      <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <Box sx={{ padding: 4 }}>
        <Typography variant="h4" gutterBottom>Variance Analysis</Typography>
        <Grid container spacing={4}>
          {/* KPI Section */}
          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Typography variant="h6">Total Variance</Typography>
                <Typography variant="h4" color="green" sx={{ fontWeight: 'bold' }}>
                  ${totalVariance.toFixed(2)}
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Chart Section */}
          <Grid item xs={12}>
            <HighchartsReact highcharts={Highcharts} options={varianceChartOptions} />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
