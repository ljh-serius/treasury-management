import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { Box, Typography, Grid, Card, CardContent, Container } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import Backdrop from '@mui/material/Backdrop';

export default function LeadershipWorkshopsDashboard({ fetchItems }) {
  const [workshopsData, setWorkshopsData] = useState([]);
  const [facilitatorDistribution, setFacilitatorDistribution] = useState([]);
  const [locationDistribution, setLocationDistribution] = useState([]);
  const [participantsData, setParticipantsData] = useState([]);
  const [averageDuration, setAverageDuration] = useState(0);
  const [totalWorkshops, setTotalWorkshops] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const data = await fetchItems();
      setWorkshopsData(data);
      processWorkshopData(data);
      setLoading(false);
    };

    fetchData();
  }, [fetchItems]);

  const processWorkshopData = (data) => {
    // Total Workshops
    setTotalWorkshops(data.length);

    // Facilitator Distribution
    const facilitatorCounts = data.reduce((acc, workshop) => {
      acc[workshop.facilitator] = (acc[workshop.facilitator] || 0) + 1;
      return acc;
    }, {});

    setFacilitatorDistribution(Object.keys(facilitatorCounts).map(key => ({
      name: key,
      y: facilitatorCounts[key],
    })));

    // Workshops by Location
    const locationCounts = data.reduce((acc, workshop) => {
      acc[workshop.location] = (acc[workshop.location] || 0) + 1;
      return acc;
    }, {});

    setLocationDistribution(Object.keys(locationCounts).map(key => ({
      name: key,
      y: locationCounts[key],
    })));

    // Average Duration of Workshops
    const totalDuration = data.reduce((acc, workshop) => acc + Number(workshop.duration), 0);
    setAverageDuration(totalDuration / data.length);

    // Participants Data
    const participantsList = data.map(workshop => ({
      workshopTitle: workshop.workshopTitle,
      participants: workshop.participants,
    }));
    setParticipantsData(participantsList);
  };

  // Chart options for each chart
  const facilitatorChartOptions = {
    chart: {
      type: 'pie',
    },
    title: {
      text: 'Workshops by Facilitator',
    },
    series: [
      {
        name: 'Facilitator',
        colorByPoint: true,
        data: facilitatorDistribution,
      },
    ],
  };

  const locationChartOptions = {
    chart: {
      type: 'column',
    },
    title: {
      text: 'Workshops by Location',
    },
    series: [
      {
        name: 'Location',
        data: locationDistribution,
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
          Leadership Workshops Dashboard
        </Typography>
        <Grid container spacing={4}>
          {/* KPI Section */}
          <Grid item xs={12} md={3}>
            <Card>
              <CardContent>
                <Typography variant="h6">Total Workshops</Typography>
                <Typography variant="h4" color="green" sx={{ fontWeight: 'bold' }}>
                  {totalWorkshops}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={3}>
            <Card>
              <CardContent>
                <Typography variant="h6">Average Duration (hours)</Typography>
                <Typography variant="h4" color="blue" sx={{ fontWeight: 'bold' }}>
                  {averageDuration.toFixed(2)}
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Chart Section */}
          <Grid item xs={12} md={6}>
            <HighchartsReact highcharts={Highcharts} options={facilitatorChartOptions} />
          </Grid>
          <Grid item xs={12} md={6}>
            <HighchartsReact highcharts={Highcharts} options={locationChartOptions} />
          </Grid>

          {/* Participants Section */}
          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Typography variant="h6">Participants Involved</Typography>
                <ul>
                  {participantsData.map(participant => (
                    <li key={participant.workshopTitle}>
                      <strong>{participant.workshopTitle}</strong> - Participants: {participant.participants}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
