import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { Box, Typography, Grid, Card, CardContent, Container } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import Backdrop from '@mui/material/Backdrop';

export default function WorkContractTypesAnalytics({ fetchItems }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalContracts, setTotalContracts] = useState(0);
  const [activeContracts, setActiveContracts] = useState([]);
  const [contractTypeDistribution, setContractTypeDistribution] = useState([]);

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
    setTotalContracts(data.length);

    const active = data.filter((item) => item.status === 'active');
    setActiveContracts(active);
  };

  const generateCharts = (data) => {
    const typeCounts = data.reduce((acc, item) => {
      acc[item.contractCategory] = (acc[item.contractCategory] || 0) + 1;
      return acc;
    }, {});

    setContractTypeDistribution(
      Object.keys(typeCounts).map((key) => ({
        name: key,
        y: typeCounts[key],
      }))
    );
  };

  const contractTypeDistributionChart = {
    chart: { type: 'pie' },
    title: { text: 'Work Contract Type Distribution' },
    series: [
      {
        name: 'Contract Type',
        colorByPoint: true,
        data: contractTypeDistribution,
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
          Work Contract Types Analytics
        </Typography>
        <Grid container spacing={4}>
          {/* KPIs */}
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6">Total Contracts</Typography>
                <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                  {totalContracts}
                </Typography>
                <Typography variant="body2">Total number of work contracts.</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6">Active Contracts</Typography>
                <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                  {activeContracts.length}
                </Typography>
                <Typography variant="body2">Contracts that are currently active.</Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Charts */}
          <Grid item xs={12} md={12}>
            <HighchartsReact highcharts={Highcharts} options={contractTypeDistributionChart} />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
