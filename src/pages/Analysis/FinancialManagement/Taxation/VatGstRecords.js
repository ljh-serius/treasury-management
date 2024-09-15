import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { Box, Typography, Grid, Card, CardContent, Container } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import Backdrop from '@mui/material/Backdrop';

export default function VATGSTDashboard({ fetchItems }) {
  const [recordsData, setRecordsData] = useState([]);
  const [statusDistribution, setStatusDistribution] = useState([]);
  const [totalVATAmount, setTotalVATAmount] = useState(0);
  const [totalGSTAmount, setTotalGSTAmount] = useState(0);
  const [ecoContributionTotal, setEcoContributionTotal] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const data = await fetchItems();
      setRecordsData(data);
      processRecordsData(data);
      setLoading(false);
    };

    fetchData();
  }, [fetchItems]);

  const processRecordsData = (data) => {
    // Status Distribution
    const statusCounts = data.reduce((acc, record) => {
      acc[record.status] = (acc[record.status] || 0) + 1;
      return acc;
    }, {});

    setStatusDistribution(Object.keys(statusCounts).map(key => ({
      name: key,
      y: statusCounts[key],
    })));

    // Total VAT, GST Amount, and Eco Contribution
    const totals = data.reduce(
      (acc, record) => {
        acc.totalVAT += Number(record.vatAmount) || 0;
        acc.totalGST += Number(record.gstAmount) || 0;
        acc.ecoContribution += Number(record.ecoContribution) || 0;
        return acc;
      },
      { totalVAT: 0, totalGST: 0, ecoContribution: 0 }
    );

    setTotalVATAmount(totals.totalVAT);
    setTotalGSTAmount(totals.totalGST);
    setEcoContributionTotal(totals.ecoContribution);
  };

  const statusChartOptions = {
    chart: { type: 'pie' },
    title: { text: 'VAT/GST Status Distribution' },
    series: [{ name: 'Records', colorByPoint: true, data: statusDistribution }],
  };

  return (
    <Container maxWidth="xl" sx={{ paddingTop: 3, paddingBottom: 7 }}>
      <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <Box sx={{ padding: 4 }}>
        <Typography variant="h4" gutterBottom>
          VAT/GST Records Dashboard
        </Typography>
        <Grid container spacing={4}>
          {/* KPI Section */}
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6">Total VAT Amount</Typography>
                <Typography variant="h4" color="green" sx={{ fontWeight: 'bold' }}>
                  ${totalVATAmount.toFixed(2)}
                </Typography>
                <Typography variant="body2">Total VAT amount across all records.</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6">Total GST Amount</Typography>
                <Typography variant="h4" color="blue" sx={{ fontWeight: 'bold' }}>
                  ${totalGSTAmount.toFixed(2)}
                </Typography>
                <Typography variant="body2">Total GST amount across all records.</Typography>
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
