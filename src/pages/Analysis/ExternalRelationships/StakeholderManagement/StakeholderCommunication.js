import React, { useEffect, useState } from 'react';
import { Box, Grid, Typography, Card, CardContent } from '@mui/material';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const StakeholderCommunicationAnalytics = ({ fetchItems }) => {
  const [data, setData] = useState([]);
  const [kpis, setKpis] = useState({
    totalCommunications: 0,
    emailCount: 0,
    meetingCount: 0,
    phoneCallCount: 0,
    presentationCount: 0,
  });

  useEffect(() => {
    const loadData = async () => {
      const communications = await fetchItems();
      setData(communications);
      calculateKPIs(communications);
    };

    loadData();
  }, [fetchItems]);

  const calculateKPIs = (items) => {
    const totalCommunications = items.length;
    const emailCount = items.filter((item) => item.communicationMethod === 'email').length;
    const meetingCount = items.filter((item) => item.communicationMethod === 'meeting').length;
    const phoneCallCount = items.filter((item) => item.communicationMethod === 'phone-call').length;
    const presentationCount = items.filter((item) => item.communicationMethod === 'presentation').length;

    setKpis({
      totalCommunications,
      emailCount,
      meetingCount,
      phoneCallCount,
      presentationCount,
    });
  };

  const methodChart = {
    chart: {
      type: 'pie',
    },
    title: {
      text: 'Communication Method Distribution',
    },
    series: [
      {
        name: 'Communications',
        colorByPoint: true,
        data: [
          { name: 'Email', y: kpis.emailCount },
          { name: 'Meeting', y: kpis.meetingCount },
          { name: 'Phone Call', y: kpis.phoneCallCount },
          { name: 'Presentation', y: kpis.presentationCount },
        ],
      },
    ],
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Stakeholder Communication Analytics
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6">Total Communications</Typography>
              <Typography variant="h4">{kpis.totalCommunications}</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6">Email Communications</Typography>
              <Typography variant="h4">{kpis.emailCount}</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6">Meetings</Typography>
              <Typography variant="h4">{kpis.meetingCount}</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6">Phone Calls</Typography>
              <Typography variant="h4">{kpis.phoneCallCount}</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6">Presentations</Typography>
              <Typography variant="h4">{kpis.presentationCount}</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Box mt={4}>
        <HighchartsReact highcharts={Highcharts} options={methodChart} />
      </Box>
    </Box>
  );
};

export default StakeholderCommunicationAnalytics;
