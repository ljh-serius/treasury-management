import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { Box, Typography, Grid, Card, CardContent, Container } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import Backdrop from '@mui/material/Backdrop';

export default function ProductDevelopmentDashboard({ fetchItems }) {
  const [developmentData, setDevelopmentData] = useState([]);
  const [stageDistribution, setStageDistribution] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const data = await fetchItems();
      setDevelopmentData(data);
      processDevelopmentData(data);
      setLoading(false);
    };

    fetchData();
  }, [fetchItems]);

  const processDevelopmentData = (data) => {
    // Development Stage Distribution
    const stageCounts = data.reduce((acc, item) => {
      acc[item.developmentStage] = (acc[item.developmentStage] || 0) + 1;
      return acc;
    }, {});

    setStageDistribution(Object.keys(stageCounts).map(key => ({
      name: key,
      y: stageCounts[key],
    })));
  };

  const stageChartOptions = {
    chart: { type: 'pie' },
    title: { text: 'Development Stage Distribution' },
    series: [{ name: 'Stages', colorByPoint: true, data: stageDistribution }],
  };

  return (
    <Container maxWidth="xl" sx={{ paddingTop: 3, paddingBottom: 7 }}>
      <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <Box sx={{ padding: 4 }}>
        <Typography variant="h4" gutterBottom>
          New Product Development Dashboard
        </Typography>
        <Grid container spacing={4}>
          {/* Total Number of Projects */}
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6">Total Development Projects</Typography>
                <Typography variant="h4" color="blue" sx={{ fontWeight: 'bold' }}>
                  {developmentData.length}
                </Typography>
                <Typography variant="body2">Total number of product development projects.</Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Chart Section */}
          <Grid item xs={12} md={6}>
            <HighchartsReact highcharts={Highcharts} options={stageChartOptions} />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
