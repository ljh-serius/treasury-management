import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { Box, Typography, Grid, Card, CardContent, Container } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import Backdrop from '@mui/material/Backdrop';

export default function InventoryValuationDashboard({ fetchItems }) {
  const [valuationData, setValuationData] = useState([]);
  const [tagsDistribution, setTagsDistribution] = useState([]);
  const [totalInventoryValuation, setTotalInventoryValuation] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const data = await fetchItems();
      setValuationData(data);
      processValuationData(data);
      setLoading(false);
    };

    fetchData();
  }, [fetchItems]);

  const processValuationData = (data) => {
    // Tags Distribution
    const tagCounts = data.reduce((acc, item) => {
      item.tags.forEach(tag => {
        acc[tag] = (acc[tag] || 0) + 1;
      });
      return acc;
    }, {});

    setTagsDistribution(Object.keys(tagCounts).map(key => ({
      name: key,
      y: tagCounts[key],
    })));

    // Total Inventory Valuation
    const totalValuation = data.reduce((acc, item) => {
      acc += Number(item.totalValuation) || 0;
      return acc;
    }, 0);

    setTotalInventoryValuation(totalValuation);
  };

  const tagsChartOptions = {
    chart: { type: 'pie' },
    title: { text: 'Inventory Tags Distribution' },
    series: [{ name: 'Valuation', colorByPoint: true, data: tagsDistribution }],
  };

  return (
    <Container maxWidth="xl" sx={{ paddingTop: 3, paddingBottom: 7 }}>
      <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <Box sx={{ padding: 4 }}>
        <Typography variant="h4" gutterBottom>
          Inventory Valuation Dashboard
        </Typography>
        <Grid container spacing={4}>
          {/* Total Number of Valuations */}
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6">Total Valuation Records</Typography>
                <Typography variant="h4" color="blue" sx={{ fontWeight: 'bold' }}>
                  {valuationData.length}
                </Typography>
                <Typography variant="body2">Total number of inventory valuation records.</Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* KPI Section */}
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6">Total Inventory Valuation</Typography>
                <Typography variant="h4" color="green" sx={{ fontWeight: 'bold' }}>
                  ${totalInventoryValuation.toFixed(2)}
                </Typography>
                <Typography variant="body2">Total value of inventory across all products.</Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Chart Section */}
          <Grid item xs={12} md={6}>
            <HighchartsReact highcharts={Highcharts} options={tagsChartOptions} />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
