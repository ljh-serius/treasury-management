import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { Box, Typography, Grid, Card, CardContent, Container, CircularProgress, Backdrop } from '@mui/material';

export default function VolunteerInitiativesDashboard({ fetchItems }) {
  const [initiatives, setInitiatives] = useState([]);
  const [totalInitiatives, setTotalInitiatives] = useState(0);
  const [totalParticipants, setTotalParticipants] = useState(0);
  const [totalHoursContributed, setTotalHoursContributed] = useState(0);
  const [participantHoursChartData, setParticipantHoursChartData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const data = await fetchItems();
      setInitiatives(data);
      processInitiativeData(data);
      setLoading(false);
    };

    fetchData();
  }, [fetchItems]);

  const processInitiativeData = (data) => {
    let totalParticipants = 0;
    let totalHours = 0;

    const chartData = data.map((initiative) => {
      totalParticipants += initiative.participants;
      totalHours += initiative.hoursContributed;

      return {
        name: initiative.initiativeName,
        participants: initiative.participants,
        hoursContributed: initiative.hoursContributed,
      };
    });

    setTotalInitiatives(data.length);
    setTotalParticipants(totalParticipants);
    setTotalHoursContributed(totalHours);
    setParticipantHoursChartData(chartData);
  };

  // Highcharts options for Participants vs Hours Contributed
  const participantHoursChartOptions = {
    chart: { type: 'column' },
    title: { text: 'Participants vs Hours Contributed' },
    xAxis: { categories: participantHoursChartData.map((initiative) => initiative.name) },
    yAxis: {
      min: 0,
      title: { text: 'Participants and Hours Contributed' },
    },
    series: [
      { name: 'Participants', data: participantHoursChartData.map((initiative) => initiative.participants) },
      { name: 'Hours Contributed', data: participantHoursChartData.map((initiative) => initiative.hoursContributed) },
    ],
  };

  return (
    <Container maxWidth="xl" sx={{ paddingTop: 3, paddingBottom: 7 }}>
      <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <Box sx={{ padding: 4 }}>
        <Typography variant="h4" gutterBottom>
          Volunteer Initiatives Dashboard
        </Typography>

        <Grid container spacing={4}>
          {/* KPIs Section */}
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6">Total Initiatives</Typography>
                <Typography variant="h4" color="green" sx={{ fontWeight: 'bold' }}>
                  {totalInitiatives}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6">Total Participants</Typography>
                <Typography variant="h4" color="blue" sx={{ fontWeight: 'bold' }}>
                  {totalParticipants.toLocaleString()}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6">Total Hours Contributed</Typography>
                <Typography variant="h4" color="purple" sx={{ fontWeight: 'bold' }}>
                  {totalHoursContributed.toLocaleString()}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Grid container spacing={4} sx={{ marginTop: 4 }}>
          {/* Participants vs Hours Contributed Chart */}
          <Grid item xs={12} md={12}>
            <HighchartsReact highcharts={Highcharts} options={participantHoursChartOptions} />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
