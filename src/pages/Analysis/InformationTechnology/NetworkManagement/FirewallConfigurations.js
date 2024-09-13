import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { Box, Typography, Grid, Card, CardContent, Container, CircularProgress, Backdrop } from '@mui/material';

export default function FirewallConfigurationsDashboard({ fetchItems }) {
  const [firewallData, setFirewallData] = useState([]);
  const [totalConfigs, setTotalConfigs] = useState(0);
  const [allowedProtocolsData, setAllowedProtocolsData] = useState([]);
  const [blockedIPsData, setBlockedIPsData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const data = await fetchItems();
      setFirewallData(data);
      processFirewallData(data);
      setLoading(false);
    };

    fetchData();
  }, [fetchItems]);

  const processFirewallData = (data) => {
    setTotalConfigs(data.length);

    // Aggregate Allowed Protocols
    const protocolsMap = {};
    data.forEach((item) => {
      const protocols = item.allowedProtocols.split(' ');
      protocols.forEach((protocol) => {
        protocolsMap[protocol] = (protocolsMap[protocol] || 0) + 1;
      });
    });
    const protocolsArray = Object.entries(protocolsMap).map(([protocol, count]) => ({
      name: protocol,
      y: count,
    }));
    setAllowedProtocolsData(protocolsArray);

    // Aggregate Blocked IPs
    setBlockedIPsData(data.map(item => ({
      name: item.networkName,
      y: item.blockedIPs.split(',').length,
    })));
  };

  // Highcharts options for Allowed Protocols
  const protocolsChartOptions = {
    chart: { type: 'pie' },
    title: { text: 'Allowed Protocols Distribution' },
    series: [{
      name: 'Protocols',
      data: allowedProtocolsData,
    }],
  };

  // Highcharts options for Blocked IPs
  const blockedIPsChartOptions = {
    chart: { type: 'bar' },
    title: { text: 'Blocked IPs Count by Network' },
    xAxis: { type: 'category', title: { text: 'Network Name' } },
    yAxis: { title: { text: 'Blocked IPs' } },
    series: [{
      name: 'Blocked IPs',
      data: blockedIPsData,
    }],
  };

  return (
    <Container maxWidth="xl" sx={{ paddingTop: 3, paddingBottom: 7 }}>
      <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <Box sx={{ padding: 4 }}>
        <Typography variant="h4" gutterBottom>
          Firewall Configurations Dashboard
        </Typography>

        <Grid container spacing={4}>
          {/* KPIs Section */}
          <Grid item xs={12} md={3}>
            <Card>
              <CardContent>
                <Typography variant="h6">Total Configurations</Typography>
                <Typography variant="h4" color="green" sx={{ fontWeight: 'bold' }}>
                  {totalConfigs}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Grid container spacing={4} sx={{ marginTop: 4 }}>
          {/* Allowed Protocols Chart */}
          <Grid item xs={12} md={6}>
            <HighchartsReact highcharts={Highcharts} options={protocolsChartOptions} />
          </Grid>

          {/* Blocked IPs Chart */}
          <Grid item xs={12} md={6}>
            <HighchartsReact highcharts={Highcharts} options={blockedIPsChartOptions} />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
