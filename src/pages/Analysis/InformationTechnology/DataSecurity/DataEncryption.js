import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { Box, Typography, Grid, Card, CardContent, Container, CircularProgress, Backdrop } from '@mui/material';

export default function DataEncryptionDashboard({ fetchItems }) {
  const [encryptionData, setEncryptionData] = useState([]);
  const [totalEncryptions, setTotalEncryptions] = useState(0);
  const [dataTypeDistribution, setDataTypeDistribution] = useState([]);
  const [encryptionMethodDistribution, setEncryptionMethodDistribution] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const data = await fetchItems();
      setEncryptionData(data);
      processEncryptionData(data);
      setLoading(false);
    };

    fetchData();
  }, [fetchItems]);

  const processEncryptionData = (data) => {
    // Total Encryptions
    setTotalEncryptions(data.length);

    // Data Type Distribution for Pie Chart
    const dataTypeCounts = data.reduce((acc, encryption) => {
      acc[encryption.dataType] = (acc[encryption.dataType] || 0) + 1;
      return acc;
    }, {});
    setDataTypeDistribution(Object.keys(dataTypeCounts).map(key => ({
      name: key.charAt(0).toUpperCase() + key.slice(1),
      y: dataTypeCounts[key],
    })));

    // Encryption Method Distribution for Column Chart
    const encryptionMethodCounts = data.reduce((acc, encryption) => {
      acc[encryption.encryptionMethod] = (acc[encryption.encryptionMethod] || 0) + 1;
      return acc;
    }, {});
    setEncryptionMethodDistribution(Object.keys(encryptionMethodCounts).map(key => ({
      name: key,
      y: encryptionMethodCounts[key],
    })));
  };

  // Highcharts options for Data Type Distribution
  const dataTypeChartOptions = {
    chart: { type: 'pie' },
    title: { text: 'Data Type Distribution' },
    series: [{
      name: 'Data Types',
      colorByPoint: true,
      data: dataTypeDistribution,
    }],
  };

  // Highcharts options for Encryption Method Distribution
  const encryptionMethodChartOptions = {
    chart: { type: 'column' },
    title: { text: 'Encryption Method Distribution' },
    xAxis: { type: 'category', title: { text: 'Encryption Methods' } },
    yAxis: { title: { text: 'Number of Encryptions' } },
    series: [{
      name: 'Encryption Methods',
      data: encryptionMethodDistribution,
    }],
  };

  return (
    <Container maxWidth="xl" sx={{ paddingTop: 3, paddingBottom: 7 }}>
      <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <Box sx={{ padding: 4 }}>
        <Typography variant="h4" gutterBottom>
          Data Encryption Dashboard
        </Typography>

        <Grid container spacing={4}>
          {/* KPIs Section */}
          <Grid item xs={12} md={3}>
            <Card>
              <CardContent>
                <Typography variant="h6">Total Encryptions</Typography>
                <Typography variant="h4" color="green" sx={{ fontWeight: 'bold' }}>
                  {totalEncryptions}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Grid container spacing={4} sx={{ marginTop: 4 }}>
          {/* Data Type Distribution Chart */}
          <Grid item xs={12} md={6}>
            <HighchartsReact highcharts={Highcharts} options={dataTypeChartOptions} />
          </Grid>

          {/* Encryption Method Distribution Chart */}
          <Grid item xs={12} md={6}>
            <HighchartsReact highcharts={Highcharts} options={encryptionMethodChartOptions} />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
