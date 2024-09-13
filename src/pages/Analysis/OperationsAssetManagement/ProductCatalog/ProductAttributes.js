import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { Box, Typography, Grid, Card, CardContent, Container } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import Backdrop from '@mui/material/Backdrop';

export default function ProductAttributesAnalytics({ fetchItems }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalAttributes, setTotalAttributes] = useState(0);
  const [customizableAttributes, setCustomizableAttributes] = useState([]);
  const [attributeDistribution, setAttributeDistribution] = useState([]);

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
    setTotalAttributes(data.length);

    const customizable = data.filter((item) => item.tags.includes('customizable'));
    setCustomizableAttributes(customizable);
  };

  const generateCharts = (data) => {
    const types = data.reduce((acc, item) => {
      acc[item.valueType] = (acc[item.valueType] || 0) + 1;
      return acc;
    }, {});

    setAttributeDistribution(
      Object.keys(types).map((key) => ({
        name: key,
        y: types[key],
      }))
    );
  };

  const attributeDistributionChart = {
    chart: { type: 'pie' },
    title: { text: 'Attribute Type Distribution' },
    series: [
      {
        name: 'Attributes',
        colorByPoint: true,
        data: attributeDistribution,
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
          Product Attributes Analytics
        </Typography>
        <Grid container spacing={4}>
          {/* KPIs */}
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6">Total Attributes</Typography>
                <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                  {totalAttributes}
                </Typography>
                <Typography variant="body2">Total number of product attributes.</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6">Customizable Attributes</Typography>
                <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                  {customizableAttributes.length}
                </Typography>
                <Typography variant="body2">Attributes tagged as 'Customizable'.</Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Charts */}
          <Grid item xs={12} md={6}>
            <HighchartsReact highcharts={Highcharts} options={attributeDistributionChart} />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
