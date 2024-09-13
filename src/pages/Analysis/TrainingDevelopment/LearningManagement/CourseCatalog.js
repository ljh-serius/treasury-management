import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { Box, Typography, Grid, Card, CardContent, Container } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import Backdrop from '@mui/material/Backdrop';

export default function CourseCatalogDashboard({ fetchItems }) {
  const [coursesData, setCoursesData] = useState([]);
  const [statusDistribution, setStatusDistribution] = useState([]);
  const [departmentDistribution, setDepartmentDistribution] = useState([]);
  const [averageDuration, setAverageDuration] = useState(0);
  const [instructorDistribution, setInstructorDistribution] = useState([]);
  const [totalCourses, setTotalCourses] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const data = await fetchItems();
      setCoursesData(data);
      processCoursesData(data);
      setLoading(false);
    };

    fetchData();
  }, [fetchItems]);

  const processCoursesData = (data) => {
    // Total Courses
    setTotalCourses(data.length);

    // Status Distribution
    const statusCounts = data.reduce((acc, course) => {
      acc[course.status] = (acc[course.status] || 0) + 1;
      return acc;
    }, {});

    setStatusDistribution(Object.keys(statusCounts).map(key => ({
      name: key,
      y: statusCounts[key],
    })));

    // Department Distribution
    const departmentCounts = data.reduce((acc, course) => {
      acc[course.department] = (acc[course.department] || 0) + 1;
      return acc;
    }, {});

    setDepartmentDistribution(Object.keys(departmentCounts).map(key => ({
      name: key,
      y: departmentCounts[key],
    })));

    // Average Duration
    const totalDuration = data.reduce((acc, course) => acc + Number(course.duration), 0);
    setAverageDuration(totalDuration / data.length);

    // Instructor Involvement
    const instructorCounts = data.reduce((acc, course) => {
      acc[course.instructor] = (acc[course.instructor] || 0) + 1;
      return acc;
    }, {});

    setInstructorDistribution(Object.keys(instructorCounts).map(key => ({
      name: key,
      y: instructorCounts[key],
    })));
  };

  // Chart options for each chart
  const statusChartOptions = {
    chart: {
      type: 'pie',
    },
    title: {
      text: 'Courses by Status',
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
      text: 'Courses by Department',
    },
    series: [
      {
        name: 'Department',
        data: departmentDistribution,
      },
    ],
  };

  const instructorChartOptions = {
    chart: {
      type: 'column',
    },
    title: {
      text: 'Instructor Involvement',
    },
    series: [
      {
        name: 'Instructor',
        data: instructorDistribution,
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
          Course Catalog Dashboard
        </Typography>
        <Grid container spacing={4}>
          {/* KPI Section */}
          <Grid item xs={12} md={3}>
            <Card>
              <CardContent>
                <Typography variant="h6">Total Courses</Typography>
                <Typography variant="h4" color="green" sx={{ fontWeight: 'bold' }}>
                  {totalCourses}
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
          <Grid item xs={12} md={6}>
            <HighchartsReact highcharts={Highcharts} options={instructorChartOptions} />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
