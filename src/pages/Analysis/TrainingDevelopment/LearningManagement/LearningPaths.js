import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { Box, Typography, Grid, Card, CardContent, Container } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import Backdrop from '@mui/material/Backdrop';

export default function LearningPathsDashboard({ fetchItems }) {
  const [learningPathsData, setLearningPathsData] = useState([]);
  const [statusDistribution, setStatusDistribution] = useState([]);
  const [departmentDistribution, setDepartmentDistribution] = useState([]);
  const [averageDuration, setAverageDuration] = useState(0);
  const [topSkillsData, setTopSkillsData] = useState([]);
  const [totalPaths, setTotalPaths] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const data = await fetchItems();
      setLearningPathsData(data);
      processLearningPathsData(data);
      setLoading(false);
    };

    fetchData();
  }, [fetchItems]);

  const processLearningPathsData = (data) => {
    // Total Paths
    setTotalPaths(data.length);

    // Status Distribution
    const statusCounts = data.reduce((acc, path) => {
      acc[path.status] = (acc[path.status] || 0) + 1;
      return acc;
    }, {});

    setStatusDistribution(Object.keys(statusCounts).map(key => ({
      name: key,
      y: statusCounts[key],
    })));

    // Department Distribution
    const departmentCounts = data.reduce((acc, path) => {
      acc[path.department] = (acc[path.department] || 0) + 1;
      return acc;
    }, {});

    setDepartmentDistribution(Object.keys(departmentCounts).map(key => ({
      name: key,
      y: departmentCounts[key],
    })));

    // Average Estimated Duration
    const totalDuration = data.reduce((acc, path) => acc + Number(path.estimatedDuration), 0);
    setAverageDuration(totalDuration / data.length);

    // Top Target Skills
    const skillCounts = data.reduce((acc, path) => {
      path.targetSkills.split(' ').forEach(skill => {
        acc[skill] = (acc[skill] || 0) + 1;
      });
      return acc;
    }, {});

    setTopSkillsData(Object.keys(skillCounts).map(key => ({
      name: key,
      y: skillCounts[key],
    })));
  };

  // Chart options for each chart
  const statusChartOptions = {
    chart: {
      type: 'pie',
    },
    title: {
      text: 'Learning Paths by Status',
    },
    series: [
      {
        name: 'Status',
        colorByPoint: true,
        data: statusDistribution,
      },
    ],
  };

  const departmentChartOptions = {
    chart: {
      type: 'column',
    },
    title: {
      text: 'Learning Paths by Department',
    },
    series: [
      {
        name: 'Department',
        data: departmentDistribution,
      },
    ],
  };

  const topSkillsChartOptions = {
    chart: {
      type: 'column',
    },
    title: {
      text: 'Top Target Skills',
    },
    series: [
      {
        name: 'Skills',
        data: topSkillsData,
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
          Learning Paths Dashboard
        </Typography>
        <Grid container spacing={4}>
          {/* KPI Section */}
          <Grid item xs={12} md={3}>
            <Card>
              <CardContent>
                <Typography variant="h6">Total Learning Paths</Typography>
                <Typography variant="h4" color="green" sx={{ fontWeight: 'bold' }}>
                  {totalPaths}
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
            <HighchartsReact highcharts={Highcharts} options={statusChartOptions} />
          </Grid>
          <Grid item xs={12} md={6}>
            <HighchartsReact highcharts={Highcharts} options={departmentChartOptions} />
          </Grid>
          <Grid item xs={12} md={12}>
            <HighchartsReact highcharts={Highcharts} options={topSkillsChartOptions} />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
