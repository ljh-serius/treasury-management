import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { Box, Typography, Grid, Card, CardContent, Container } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import Backdrop from '@mui/material/Backdrop';

export default function VatGstRecordsAnalytics({ fetchItems }) {
  const [recordsData, setRecordsData] = useState([]);
  const [statusDistribution, setStatusDistribution] = useState([]);
  const [totalVatAmount, setTotalVatAmount] = useState(0);
  const [totalGstAmount, setTotalGstAmount] = useState(0);
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

    // Total VAT and GST Amounts
    const totalVat = data.reduce((sum, record) => sum + Number(record.vatAmount), 0);
    const totalGst = data.reduce((sum, record) => sum + Number(record.gstAmount), 0);
    setTotalVatAmount(totalVat);
    setTotalGstAmount(totalGst);
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
          VAT/GST Records Analytics
        </Typography>
        <Grid container spacing={4}>
          {/* KPI Section */}
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6">Total VAT Amount</Typography>
                <Typography variant="h4" color="green" sx={{ fontWeight: 'bold' }}>
                  ${totalVatAmount.toFixed(2)}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6">Total GST Amount</Typography>
                <Typography variant="h4" color="blue" sx={{ fontWeight: 'bold' }}>
                  ${totalGstAmount.toFixed(2)}
                </Typography>
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
