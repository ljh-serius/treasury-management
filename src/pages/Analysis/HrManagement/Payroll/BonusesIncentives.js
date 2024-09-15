import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { Box, Typography, Grid, Card, CardContent, Container } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import Backdrop from '@mui/material/Backdrop';

export default function BonusesIncentivesAnalytics({ fetchItems }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalBonuses, setTotalBonuses] = useState(0);
  const [paidBonuses, setPaidBonuses] = useState([]);
  const [bonusTypeDistribution, setBonusTypeDistribution] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const fetchedData = await fetchItems();
      setData(fetchedData);
      calculateKPIs(fetchedData);
      generateCharts(fetchedData);
      setLoading(false);
    };

    fetchData();
  }, [fetchItems]);

  const calculateKPIs = (data) => {
    setTotalBonuses(data.length);
    const paid = data.filter((bonus) => bonus.status === 'paid');
    setPaidBonuses(paid);
  };

  const generateCharts = (data) => {
    const typeCounts = data.reduce((acc, bonus) => {
      acc[bonus.bonusType] = (acc[bonus.bonusType] || 0) + 1;
      return acc;
    }, {});
    setBonusTypeDistribution(
      Object.keys(typeCounts).map((key) => ({
        name: key,
        y: typeCounts[key],
      }))
    );
  };

  const bonusTypeChart = {
    chart: { type: 'pie' },
    title: { text: 'Bonus Type Distribution' },
    series: [
      {
        name: 'Bonus Type',
        colorByPoint: true,
        data: bonusTypeDistribution,
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
          Bonuses and Incentives Analytics
        </Typography>
        <Grid container spacing={4}>
          {/* KPIs */}
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6">Total Bonuses</Typography>
                <Typography variant="h4" color="blue" sx={{ fontWeight: 'bold' }}>
                  {totalBonuses}
                </Typography>
                <Typography variant="body2">Total number of bonuses awarded.</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6">Paid Bonuses</Typography>
                <Typography variant="h4" color="green" sx={{ fontWeight: 'bold' }}>
                  {paidBonuses.length}
                </Typography>
                <Typography variant="body2">Bonuses that have been paid.</Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Charts */}
          <Grid item xs={12} md={12}>
            <HighchartsReact highcharts={Highcharts} options={bonusTypeChart} />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
