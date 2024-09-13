import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { Box, Typography, Grid, Card, CardContent, Container } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import Backdrop from '@mui/material/Backdrop';

export default function InventoryValuationAnalytics({ fetchItems }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalValuation, setTotalValuation] = useState(0);
  const [rawMaterialValuation, setRawMaterialValuation] = useState(0);
  const [valuationDistribution, setValuationDistribution] = useState([]);

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
    const total = data.reduce((acc, item) => acc + item.totalValuation, 0);
    setTotalValuation(total);

    const rawMaterial = data.filter((item) => item.tags.includes('raw_material'));
    const rawMaterialVal = rawMaterial.reduce((acc, item) => acc + item.totalValuation, 0);
    setRawMaterialValuation(rawMaterialVal);
  };

  const generateCharts = (data) => {
    const valuation = data.reduce((acc, item) => {
      acc[item.productName] = (acc[item.productName] || 0) + item.totalValuation;
      return acc;
    }, {});

    setValuationDistribution(
      Object.keys(valuation).map((key) => ({
        name: key,
        y: valuation[key],
      }))
    );
  };

  const valuationDistributionChart = {
    chart: { type: 'column' },
    title: { text: 'Inventory Valuation by Product' },
    xAxis: {
      categories: valuationDistribution.map((item) => item.name),
      title: { text: 'Products' },
    },
    yAxis: { title: { text: 'Total Valuation (USD)' } },
    series: [
      {
        name: 'Valuation',
        data: valuationDistribution.map((item) => item.y),
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
          Inventory Valuation Analytics
        </Typography>
        <Grid container spacing={4}>
          {/* KPIs */}
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6">Total Inventory Valuation</Typography>
                <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                  ${totalValuation.toFixed(2)}
                </Typography>
                <Typography variant="body2">Total valuation of all inventory items.</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6">Raw Material Valuation</Typography>
                <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                  ${rawMaterialValuation.toFixed(2)}
                </Typography>
                <Typography variant="body2">Valuation of inventory tagged as 'Raw Material'.</Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Charts */}
          <Grid item xs={12} md={12}>
            <HighchartsReact highcharts={Highcharts} options={valuationDistributionChart} />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
