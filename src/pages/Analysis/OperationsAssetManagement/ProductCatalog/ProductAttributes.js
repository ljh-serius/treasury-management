import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { Box, Typography, Grid, Card, CardContent, Container } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import Backdrop from '@mui/material/Backdrop';

export default function ProductAttributesDashboard({ fetchItems }) {
  const [attributeData, setAttributeData] = useState([]);
  const [tagsDistribution, setTagsDistribution] = useState([]);
  const [ecoContributionTotal, setEcoContributionTotal] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const data = await fetchItems();
      setAttributeData(data);
      processAttributeData(data);
      setLoading(false);
    };

    fetchData();
  }, [fetchItems]);

  const processAttributeData = (data) => {
    // Tags Distribution
    const tagCounts = data.reduce((acc, attribute) => {
      attribute.tags.forEach(tag => {
        acc[tag] = (acc[tag] || 0) + 1;
      });
      return acc;
    }, {});

    setTagsDistribution(Object.keys(tagCounts).map(key => ({
      name: key,
      y: tagCounts[key],
    })));

    // Total Eco Contribution
    const totals = data.reduce(
      (acc, attribute) => {
        acc.ecoContribution += Number(attribute.ecoContribution) || 0;
        return acc;
      },
      { ecoContribution: 0 }
    );

    setEcoContributionTotal(totals.ecoContribution);
  };

  const tagsChartOptions = {
    chart: { type: 'pie' },
    title: { text: 'Product Attribute Tags Distribution' },
    series: [{ name: 'Attributes', colorByPoint: true, data: tagsDistribution }],
  };

  return (
    <Container maxWidth="xl" sx={{ paddingTop: 3, paddingBottom: 7 }}>
      <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <Box sx={{ padding: 4 }}>
        <Typography variant="h4" gutterBottom>
          Product Attributes Dashboard
        </Typography>
        <Grid container spacing={4}>
          {/* Total Number of Attributes */}
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6">Total Attributes</Typography>
                <Typography variant="h4" color="blue" sx={{ fontWeight: 'bold' }}>
                  {attributeData.length}
                </Typography>
                <Typography variant="body2">Total number of product attributes.</Typography>
              </CardContent>
            </Card>
          </Grid>
          {/* KPI Section */}
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6">Eco Contribution</Typography>
                <Typography variant="h4" color="orange" sx={{ fontWeight: 'bold' }}>
                  ${ecoContributionTotal.toFixed(2)}
                </Typography>
                <Typography variant="body2">Total eco-tax contributions (French-specific).</Typography>
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
