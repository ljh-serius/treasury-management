import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { Box, Typography, Grid, Card, CardContent, Container } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import Backdrop from '@mui/material/Backdrop';

export default function ProductUpdatesDashboard({ fetchItems }) {
  const [updateData, setUpdateData] = useState([]);
  const [updateTypeDistribution, setUpdateTypeDistribution] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const data = await fetchItems();
      setUpdateData(data);
      processUpdateData(data);
      setLoading(false);
    };

    fetchData();
  }, [fetchItems]);

  const processUpdateData = (data) => {
    // Update Type Distribution
    const updateTypeCounts = data.reduce((acc, update) => {
      acc[update.updateType] = (acc[update.updateType] || 0) + 1;
      return acc;
    }, {});

    setUpdateTypeDistribution(Object.keys(updateTypeCounts).map(key => ({
      name: key,
      y: updateTypeCounts[key],
    })));
  };

  const updateTypeChartOptions = {
    chart: { type: 'pie' },
    title: { text: 'Product Update Type Distribution' },
    series: [{ name: 'Updates', colorByPoint: true, data: updateTypeDistribution }],
  };

  return (
    <Container maxWidth="xl" sx={{ paddingTop: 3, paddingBottom: 7 }}>
      <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <Box sx={{ padding: 4 }}>
        <Typography variant="h4" gutterBottom>
          Product Updates Dashboard
        </Typography>
        <Grid container spacing={4}>
          {/* Total Number of Updates */}
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6">Total Product Updates</Typography>
                <Typography variant="h4" color="blue" sx={{ fontWeight: 'bold' }}>
                  {updateData.length}
                </Typography>
                <Typography variant="body2">Total number of product updates.</Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Chart Section */}
          <Grid item xs={12} md={6}>
            <HighchartsReact highcharts={Highcharts} options={updateTypeChartOptions} />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
