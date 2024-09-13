import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { Box, Typography, Grid, Card, CardContent, Container } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import Backdrop from '@mui/material/Backdrop';

export default function WithholdingTaxesAnalytics({ fetchItems }) {
  const [taxesData, setTaxesData] = useState([]);
  const [statusDistribution, setStatusDistribution] = useState([]);
  const [totalWithheldAmount, setTotalWithheldAmount] = useState(0);
  const [topPayers, setTopPayers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const data = await fetchItems();
      setTaxesData(data);
      processTaxesData(data);
      setLoading(false);
    };

    fetchData();
  }, [fetchItems]);

  const processTaxesData = (data) => {
    // Status Distribution
    const statusCounts = data.reduce((acc, tax) => {
      acc[tax.status] = (acc[tax.status] || 0) + 1;
      return acc;
    }, {});

    setStatusDistribution(Object.keys(statusCounts).map(key => ({
      name: key,
      y: statusCounts[key],
    })));

    // Total Withheld Amount
    const total = data.reduce((sum, tax) => sum + Number(tax.withheldAmount), 0);
    setTotalWithheldAmount(total);

    // Top 5 Payers
    const topPayersList = data
      .sort((a, b) => Number(b.withheldAmount) - Number(a.withheldAmount))
      .slice(0, 5);
    setTopPayers(topPayersList);
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
          Withholding Taxes Analytics
        </Typography>
        <Grid container spacing={4}>
          {/* KPI Section */}
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6">Total Withheld Amount</Typography>
                <Typography variant="h4" color="green" sx={{ fontWeight: 'bold' }}>
                  ${totalWithheldAmount.toFixed(2)}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6">Top 5 Payers</Typography>
                <ol>
                  {topPayers.map(tax => (
                    <li key={tax.withholdingId}>
                      <Typography variant="body2">
                        {tax.payer} - Withheld: ${Number(tax.withheldAmount).toFixed(2)}
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
