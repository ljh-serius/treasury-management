import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { Box, Typography, Grid, Card, CardContent, Container, CircularProgress, Backdrop } from '@mui/material';

export default function PartnerAgreementsDashboard({ fetchItems }) {
  const [agreementData, setAgreementData] = useState([]);
  const [totalAgreements, setTotalAgreements] = useState(0);
  const [complianceDistribution, setComplianceDistribution] = useState([]);
  const [contractValueTrends, setContractValueTrends] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const data = await fetchItems();
      setAgreementData(data);
      processAgreementData(data);
      setLoading(false);
    };

    fetchData();
  }, [fetchItems]);

  const processAgreementData = (data) => {
    // Total Agreements
    setTotalAgreements(data.length);
  
    // Compliance Distribution for Pie Chart
    const complianceCounts = data.reduce((acc, agreement) => {
      acc[agreement.complianceStatus] = (acc[agreement.complianceStatus] || 0) + 1;
      return acc;
    }, {});
    setComplianceDistribution(Object.keys(complianceCounts).map(key => ({
      name: key.charAt(0).toUpperCase() + key.slice(1),
      y: complianceCounts[key],
    })));
  
    // Contract Value Trends for Line Chart
    const valueData = data.map(agreement => ({
      date: new Date(agreement.startDate).getTime(), // Ensure date is a timestamp
      value: parseFloat(agreement.contractValue), // Ensure value is a number
    })).sort((a, b) => a.date - b.date);
    setContractValueTrends(valueData);
  };
  
  // Highcharts options for Contract Value Trends
  const contractValueChartOptions = {
    chart: { type: 'line' },
    title: { text: 'Contract Value Trends Over Time' },
    xAxis: { type: 'datetime', title: { text: 'Start Date' } },
    yAxis: { title: { text: 'Contract Value' } },
    series: [{
      name: 'Contract Value',
      data: contractValueTrends.map(item => [item.date, item.value]), // Properly formatted data for Highcharts
    }],
  };
  

  // Highcharts options for Compliance Status Distribution
  const complianceChartOptions = {
    chart: { type: 'pie' },
    title: { text: 'Compliance Status Distribution' },
    series: [{
      name: 'Compliance Status',
      colorByPoint: true,
      data: complianceDistribution,
    }],
  };

  return (
    <Container maxWidth="xl" sx={{ paddingTop: 3, paddingBottom: 7 }}>
      <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <Box sx={{ padding: 4 }}>
        <Typography variant="h4" gutterBottom>
          Partner Agreements Dashboard
        </Typography>

        <Grid container spacing={4}>
          {/* KPIs Section */}
          <Grid item xs={12} md={3}>
            <Card>
              <CardContent>
                <Typography variant="h6">Total Agreements</Typography>
                <Typography variant="h4" color="green" sx={{ fontWeight: 'bold' }}>
                  {totalAgreements}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Grid container spacing={4} sx={{ marginTop: 4 }}>
          {/* Compliance Distribution Chart */}
          <Grid item xs={12} md={6}>
            <HighchartsReact highcharts={Highcharts} options={complianceChartOptions} />
          </Grid>

          {/* Contract Value Trends Chart */}
          <Grid item xs={12} md={6}>
            <HighchartsReact highcharts={Highcharts} options={contractValueChartOptions} />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
