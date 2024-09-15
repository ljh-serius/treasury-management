import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { Box, Typography, Grid, Card, CardContent, Container } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import Backdrop from '@mui/material/Backdrop';

export default function InventoryAgingDashboard({ fetchItems }) {
  const [agingData, setAgingData] = useState([]);
  const [agingCategoryDistribution, setAgingCategoryDistribution] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const data = await fetchItems();
      setAgingData(data);
      processAgingData(data);
      setLoading(false);
    };

    fetchData();
  }, [fetchItems]);

  const processAgingData = (data) => {
    // Aging Category Distribution
    const agingCategoryCounts = data.reduce((acc, item) => {
      acc[item.agingCategory] = (acc[item.agingCategory] || 0) + 1;
      return acc;
    }, {});

    setAgingCategoryDistribution(Object.keys(agingCategoryCounts).map(key => ({
      name: key,
      y: agingCategoryCounts[key],
    })));
  };

  const agingCategoryChartOptions = {
    chart: { type: 'pie' },
    title: { text: 'Inventory Aging Category Distribution' },
    series: [{ name: 'Aging', colorByPoint: true, data: agingCategoryDistribution }],
  };

  return (
    <Container maxWidth="xl" sx={{ paddingTop: 3, paddingBottom: 7 }}>
      <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <Box sx={{ padding: 4 }}>
        <Typography variant="h4" gutterBottom>
          Inventory Aging Dashboard
        </Typography>
        <Grid container spacing={4}>
          {/* Total Number of Aging Records */}
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6">Total Aging Records</Typography>
                <Typography variant="h4" color="blue" sx={{ fontWeight: 'bold' }}>
                  {agingData.length}
                </Typography>
                <Typography variant="body2">Total number of inventory aging records.</Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Chart Section */}
          <Grid item xs={12} md={6}>
            <HighchartsReact highcharts={Highcharts} options={agingCategoryChartOptions} />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
