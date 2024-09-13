import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { Box, Typography, Grid, Card, CardContent, Container } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import Backdrop from '@mui/material/Backdrop';

export default function ContractTemplatesAnalytics({ fetchItems }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalTemplates, setTotalTemplates] = useState(0);
  const [standardTemplates, setStandardTemplates] = useState([]);
  const [templateTypeDistribution, setTemplateTypeDistribution] = useState([]);

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
    setTotalTemplates(data.length);

    const standard = data.filter((item) => item.contractType === 'standard');
    setStandardTemplates(standard);
  };

  const generateCharts = (data) => {
    const typeCounts = data.reduce((acc, item) => {
      acc[item.contractType] = (acc[item.contractType] || 0) + 1;
      return acc;
    }, {});

    setTemplateTypeDistribution(
      Object.keys(typeCounts).map((key) => ({
        name: key,
        y: typeCounts[key],
      }))
    );
  };

  const templateTypeDistributionChart = {
    chart: { type: 'pie' },
    title: { text: 'Contract Template Type Distribution' },
    series: [
      {
        name: 'Contract Type',
        colorByPoint: true,
        data: templateTypeDistribution,
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
          Contract Templates Analytics
        </Typography>
        <Grid container spacing={4}>
          {/* KPIs */}
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6">Total Templates</Typography>
                <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                  {totalTemplates}
                </Typography>
                <Typography variant="body2">Total number of contract templates.</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6">Standard Templates</Typography>
                <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                  {standardTemplates.length}
                </Typography>
                <Typography variant="body2">Templates classified as 'Standard'.</Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Charts */}
          <Grid item xs={12} md={12}>
            <HighchartsReact highcharts={Highcharts} options={templateTypeDistributionChart} />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
