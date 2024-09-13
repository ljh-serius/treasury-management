import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { Box, Typography, Grid, Card, CardContent, Container } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import Backdrop from '@mui/material/Backdrop';

export default function AssetDisposalAnalytics({ fetchItems }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalDisposals, setTotalDisposals] = useState(0);
  const [obsoleteAssets, setObsoleteAssets] = useState([]);
  const [disposalDistribution, setDisposalDistribution] = useState([]);

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
    setTotalDisposals(data.length);

    const obsolete = data.filter((item) => item.tags.includes('obsolete'));
    setObsoleteAssets(obsolete);
  };

  const generateCharts = (data) => {
    const reasons = data.reduce((acc, item) => {
      acc[item.disposalReason] = (acc[item.disposalReason] || 0) + 1;
      return acc;
    }, {});

    setDisposalDistribution(
      Object.keys(reasons).map((key) => ({
        name: key,
        y: reasons[key],
      }))
    );
  };

  const disposalDistributionChart = {
    chart: { type: 'pie' },
    title: { text: 'Reasons for Asset Disposal' },
    series: [
      {
        name: 'Reasons',
        colorByPoint: true,
        data: disposalDistribution,
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
          Asset Disposal Analytics
        </Typography>
        <Grid container spacing={4}>
          {/* KPIs */}
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6">Total Asset Disposals</Typography>
                <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                  {totalDisposals}
                </Typography>
                <Typography variant="body2">Total number of asset disposals.</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6">Obsolete Assets</Typography>
                <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                  {obsoleteAssets.length}
                </Typography>
                <Typography variant="body2">Assets tagged as 'Obsolete'.</Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Charts */}
          <Grid item xs={12} md={6}>
            <HighchartsReact highcharts={Highcharts} options={disposalDistributionChart} />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
