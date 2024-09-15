import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { Box, Typography, Grid, Card, CardContent, Container } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import Backdrop from '@mui/material/Backdrop';

export default function InvestmentReturnsDashboard({ fetchItems }) {
  const [returnsData, setReturnsData] = useState([]);
  const [statusDistribution, setStatusDistribution] = useState([]);
  const [totalReturnAmount, setTotalReturnAmount] = useState(0);
  const [ecoContributionTotal, setEcoContributionTotal] = useState(0);
  const [averageROI, setAverageROI] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const data = await fetchItems();
      setReturnsData(data);
      processReturnsData(data);
      setLoading(false);
    };

    fetchData();
  }, [fetchItems]);

  const processReturnsData = (data) => {
    // Status Distribution
    const statusCounts = data.reduce((acc, ret) => {
      acc[ret.status] = (acc[ret.status] || 0) + 1;
      return acc;
    }, {});

    setStatusDistribution(Object.keys(statusCounts).map(key => ({
      name: key,
      y: statusCounts[key],
    })));

    // Total Return Amount, Eco Contribution, and Average ROI
    const totals = data.reduce(
      (acc, ret) => {
        acc.totalReturn += Number(ret.returnAmount) || 0;
        acc.ecoContribution += Number(ret.ecoContribution) || 0;
        acc.roi += Number(ret.roi) || 0;
        return acc;
      },
      { totalReturn: 0, ecoContribution: 0, roi: 0 }
    );

    setTotalReturnAmount(totals.totalReturn);
    setEcoContributionTotal(totals.ecoContribution);
    setAverageROI(totals.roi / data.length);
  };

  const statusChartOptions = {
    chart: { type: 'pie' },
    title: { text: 'Return Status Distribution' },
    series: [{ name: 'Returns', colorByPoint: true, data: statusDistribution }],
  };

  return (
    <Container maxWidth="xl" sx={{ paddingTop: 3, paddingBottom: 7 }}>
      <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <Box sx={{ padding: 4 }}>
        <Typography variant="h4" gutterBottom>
          Investment Returns Dashboard
        </Typography>
        <Grid container spacing={4}>
          {/* KPI Section */}
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6">Total Return Amount</Typography>
                <Typography variant="h4" color="green" sx={{ fontWeight: 'bold' }}>
                  ${totalReturnAmount.toFixed(2)}
                </Typography>
                <Typography variant="body2">Total amount of returns received.</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6">Average ROI</Typography>
                <Typography variant="h4" color="blue" sx={{ fontWeight: 'bold' }}>
                  {averageROI.toFixed(2)}%
                </Typography>
                <Typography variant="body2">Average return on investment (ROI).</Typography>
              </CardContent>
            </Card>
          </Grid>
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
            <HighchartsReact highcharts={Highcharts} options={statusChartOptions} />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
