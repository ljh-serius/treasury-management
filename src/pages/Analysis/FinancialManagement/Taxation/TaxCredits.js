import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { Box, Typography, Grid, Card, CardContent, Container } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import Backdrop from '@mui/material/Backdrop';

export default function TaxCreditsAnalytics({ fetchItems }) {
  const [creditsData, setCreditsData] = useState([]);
  const [statusDistribution, setStatusDistribution] = useState([]);
  const [totalCreditAmount, setTotalCreditAmount] = useState(0);
  const [topCreditTypes, setTopCreditTypes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const data = await fetchItems();
      setCreditsData(data);
      processCreditData(data);
      setLoading(false);
    };

    fetchData();
  }, [fetchItems]);

  const processCreditData = (data) => {
    // Status Distribution
    const statusCounts = data.reduce((acc, credit) => {
      acc[credit.status] = (acc[credit.status] || 0) + 1;
      return acc;
    }, {});

    setStatusDistribution(Object.keys(statusCounts).map(key => ({
      name: key,
      y: statusCounts[key],
    })));

    // Total Credit Amount
    const total = data.reduce((sum, credit) => sum + Number(credit.creditAmount), 0);
    setTotalCreditAmount(total);

    // Top 5 Credit Types
    const topTypes = data
      .sort((a, b) => Number(b.creditAmount) - Number(a.creditAmount))
      .slice(0, 5);
    setTopCreditTypes(topTypes);
  };

  const statusChartOptions = {
    chart: { type: 'pie' },
    title: { text: 'Status Distribution' },
    series: [{ name: 'Statuses', colorByPoint: true, data: statusDistribution }],
  };

  return (
    <Container maxWidth="xl" sx={{ paddingTop: 3, paddingBottom: 7 }}>
      <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <Box sx={{ padding: 4 }}>
        <Typography variant="h4" gutterBottom>
          Tax Credits Analytics
        </Typography>
        <Grid container spacing={4}>
          {/* KPI Section */}
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6">Total Credit Amount</Typography>
                <Typography variant="h4" color="green" sx={{ fontWeight: 'bold' }}>
                  ${totalCreditAmount.toFixed(2)}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6">Top 5 Credit Types</Typography>
                <ol>
                  {topCreditTypes.map(credit => (
                    <li key={credit.creditId}>
                      <Typography variant="body2">
                        {credit.creditType} - Value: ${Number(credit.creditAmount).toFixed(2)}
                      </Typography>
                    </li>
                  ))}
                </ol>
              </CardContent>
            </Card>
          </Grid>

          {/* Chart Section */}
          <Grid item xs={12}>
            <HighchartsReact highcharts={Highcharts} options={statusChartOptions} />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
