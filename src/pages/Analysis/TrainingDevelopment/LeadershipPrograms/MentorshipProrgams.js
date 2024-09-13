import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { Box, Typography, Grid, Card, CardContent, Container } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import Backdrop from '@mui/material/Backdrop';

export default function MentorshipProgramsDashboard({ fetchItems }) {
  const [programsData, setProgramsData] = useState([]);
  const [statusDistribution, setStatusDistribution] = useState([]);
  const [averageProgress, setAverageProgress] = useState(0);
  const [mentorsMenteesData, setMentorsMenteesData] = useState([]);
  const [totalPrograms, setTotalPrograms] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const data = await fetchItems();
      setProgramsData(data);
      processProgramsData(data);
      setLoading(false);
    };

    fetchData();
  }, [fetchItems]);

  const processProgramsData = (data) => {
    // Total Programs
    setTotalPrograms(data.length);

    // Programs by Status
    const statusCounts = data.reduce((acc, program) => {
      acc[program.status] = (acc[program.status] || 0) + 1;
      return acc;
    }, {});

    setStatusDistribution(Object.keys(statusCounts).map(key => ({
      name: key,
      y: statusCounts[key],
    })));

    // Average Progress
    const totalProgress = data.reduce((acc, program) => acc + Number(program.progress), 0);
    setAverageProgress(totalProgress / data.length);

    // Mentors and Mentees Data
    const mentorsMenteesList = data.map(program => ({
      programTitle: program.programTitle,
      mentor: program.mentorName,
      mentee: program.menteeName,
    }));
    setMentorsMenteesData(mentorsMenteesList);
  };

  // Chart options for each chart
  const statusChartOptions = {
    chart: {
      type: 'pie',
    },
    title: {
      text: 'Programs by Status',
    },
    series: [
      {
        name: 'Status',
        colorByPoint: true,
        data: statusDistribution,
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
          Mentorship Programs Dashboard
        </Typography>
        <Grid container spacing={4}>
          {/* KPI Section */}
          <Grid item xs={12} md={3}>
            <Card>
              <CardContent>
                <Typography variant="h6">Total Programs</Typography>
                <Typography variant="h4" color="green" sx={{ fontWeight: 'bold' }}>
                  {totalPrograms}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={3}>
            <Card>
              <CardContent>
                <Typography variant="h6">Average Progress (%)</Typography>
                <Typography variant="h4" color="blue" sx={{ fontWeight: 'bold' }}>
                  {averageProgress.toFixed(2)}
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Chart Section */}
          <Grid item xs={12} md={6}>
            <HighchartsReact highcharts={Highcharts} options={statusChartOptions} />
          </Grid>

          {/* Mentors and Mentees Section */}
          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Typography variant="h6">Mentors and Mentees</Typography>
                <ul>
                  {mentorsMenteesData.map((program, index) => (
                    <li key={index}>
                      <strong>{program.programTitle}</strong> - Mentor: {program.mentor}, Mentee: {program.mentee}
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
