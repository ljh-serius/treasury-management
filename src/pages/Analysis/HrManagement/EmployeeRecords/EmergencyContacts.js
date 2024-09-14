import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { Box, Typography, Grid, Card, CardContent, Container } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import Backdrop from '@mui/material/Backdrop';

export default function EmergencyContactsAnalytics({ fetchItems }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalContacts, setTotalContacts] = useState(0);
  const [relationshipsDistribution, setRelationshipsDistribution] = useState([]);

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
    setTotalContacts(data.length);
  };

  const generateCharts = (data) => {
    const relationshipsCounts = data.reduce((acc, contact) => {
      acc[contact.relationship] = (acc[contact.relationship] || 0) + 1;
      return acc;
    }, {});
    setRelationshipsDistribution(
      Object.keys(relationshipsCounts).map((key) => ({
        name: key,
        y: relationshipsCounts[key],
      }))
    );
  };

  const relationshipDistributionChart = {
    chart: { type: 'pie' },
    title: { text: 'Relationship Distribution' },
    series: [
      {
        name: 'Relationship',
        colorByPoint: true,
        data: relationshipsDistribution,
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
          Emergency Contacts Analytics
        </Typography>
        <Grid container spacing={4}>
          {/* KPIs */}
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6">Total Contacts</Typography>
                <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                  {totalContacts}
                </Typography>
                <Typography variant="body2">Total number of emergency contacts.</Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Charts */}
          <Grid item xs={12} md={12}>
            <HighchartsReact highcharts={Highcharts} options={relationshipDistributionChart} />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
