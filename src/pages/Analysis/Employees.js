import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { Box, Typography, Grid, Card, CardContent, Container } from '@mui/material';

export default function EmployeeAnalysisDashboard({ fetchEmployees }) {
  const [employeesData, setEmployeesData] = useState([]);
  const [departmentDistribution, setDepartmentDistribution] = useState([]);
  const [locationDistribution, setLocationDistribution] = useState([]);
  const [genderDistribution, setGenderDistribution] = useState([]);
  const [employmentTypeDistribution, setEmploymentTypeDistribution] = useState([]);
  const [averageSalary, setAverageSalary] = useState(0);
  const [averageExperience, setAverageExperience] = useState(0);
  const [topPerformers, setTopPerformers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchEmployees();
      if (data && data.length > 0) {
        setEmployeesData(data);
        processEmployeeData(data);
      } else {
        console.log("No employee data available.");
      }
    };

    fetchData();
  }, [fetchEmployees]);

  const processEmployeeData = (data) => {
    if (!data || data.length === 0) {
      console.log("No data to process.");
      return;
    }

    // Department Distribution
    const departmentCounts = data.reduce((acc, employee) => {
      acc[employee.department] = (acc[employee.department] || 0) + 1;
      return acc;
    }, {});

    setDepartmentDistribution(Object.keys(departmentCounts).map(key => ({
      name: key,
      y: departmentCounts[key],
    })));

    // Location Distribution
    const locationCounts = data.reduce((acc, employee) => {
      acc[employee.location] = (acc[employee.location] || 0) + 1;
      return acc;
    }, {});

    setLocationDistribution(Object.keys(locationCounts).map(key => ({
      name: key,
      y: locationCounts[key],
    })));

    // Gender Distribution
    const genderCounts = data.reduce((acc, employee) => {
      acc[employee.gender] = (acc[employee.gender] || 0) + 1;
      return acc;
    }, {});

    setGenderDistribution(Object.keys(genderCounts).map(key => ({
      name: key,
      y: genderCounts[key],
    })));

    // Employment Type Distribution
    const employmentTypeCounts = data.reduce((acc, employee) => {
      acc[employee.employmentType] = (acc[employee.employmentType] || 0) + 1;
      return acc;
    }, {});

    setEmploymentTypeDistribution(Object.keys(employmentTypeCounts).map(key => ({
      name: key,
      y: employmentTypeCounts[key],
    })));

    // Average Salary
    const totalSalary = data.reduce((acc, employee) => acc + (Number(employee.salary) || 0), 0);
    const averageSalaryValue = data.length ? totalSalary / data.length : 0;
    setAverageSalary(averageSalaryValue);

    // Average Years of Experience
    const totalExperience = data.reduce((acc, employee) => acc + (Number(employee.yearsOfExperience) || 0), 0);
    const averageExperienceValue = data.length ? totalExperience / data.length : 0;
    setAverageExperience(averageExperienceValue);

    // Top 5 Performers by Rating
    const topPerformersList = data
      .sort((a, b) => (Number(b.performanceRating) || 0) - (Number(a.performanceRating) || 0))
      .slice(0, 5);
    setTopPerformers(topPerformersList);
  };

  const departmentChartOptions = {
    chart: {
      type: 'pie',
    },
    title: {
      text: 'Employee Distribution by Department',
    },
    series: [
      {
        name: 'Employees',
        colorByPoint: true,
        data: departmentDistribution,
      },
    ],
  };

  const locationChartOptions = {
    chart: {
      type: 'pie',
    },
    title: {
      text: 'Employee Distribution by Location',
    },
    series: [
      {
        name: 'Employees',
        colorByPoint: true,
        data: locationDistribution,
      },
    ],
  };

  const genderChartOptions = {
    chart: {
      type: 'pie',
    },
    title: {
      text: 'Employee Distribution by Gender',
    },
    series: [
      {
        name: 'Employees',
        colorByPoint: true,
        data: genderDistribution,
      },
    ],
  };

  const employmentTypeChartOptions = {
    chart: {
      type: 'pie',
    },
    title: {
      text: 'Employee Distribution by Employment Type',
    },
    series: [
      {
        name: 'Employees',
        colorByPoint: true,
        data: employmentTypeDistribution,
      },
    ],
  };

  const averageSalaryChartOptions = {
    chart: {
      type: 'column',
    },
    title: {
      text: 'Average Salary by Department',
    },
    series: [
      {
        name: 'Average Salary',
        data: departmentDistribution.map(dep => ({
          name: dep.name,
          y: employeesData.filter(emp => emp.department === dep.name)
            .reduce((acc, emp) => acc + (Number(emp.salary) || 0), 0) / dep.y,
        })),
      },
    ],
  };

  return (
    <Container maxWidth="xl" sx={{ paddingTop: 3, paddingBottom: 7 }}>
      <Box sx={{ padding: 4 }}>
        <Typography variant="h4" gutterBottom>
          Employee Analysis Dashboard
        </Typography>
        <Grid container spacing={4}>
          {/* KPI Section */}
          <Grid item xs={12} md={3}>
            <Card>
              <CardContent>
                <Typography variant="h6">Average Salary</Typography>
                <Typography variant="h4" color="green" sx={{ fontWeight: 'bold' }}>
                  ${Number(averageSalary).toFixed(2)}
                </Typography>
                <Typography variant="body2">
                  This represents the average salary of all employees.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={3}>
            <Card>
              <CardContent>
                <Typography variant="h6">Average Years of Experience</Typography>
                <Typography variant="h4" color="blue" sx={{ fontWeight: 'bold' }}>
                  {Number(averageExperience).toFixed(2)} Years
                </Typography>
                <Typography variant="body2">
                  This is the average years of experience of all employees.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6">Top 5 Performers by Rating</Typography>
                <ol>
                  {topPerformers.map(employee => (
                    <li key={employee.id}>
                      <Typography variant="body2">
                        {employee.name} - Rating: {Number(employee.performanceRating).toFixed(2)} Stars
                      </Typography>
                    </li>
                  ))}
                </ol>
              </CardContent>
            </Card>
          </Grid>

          {/* Chart Section */}
          <Grid item xs={12} md={6}>
            <HighchartsReact highcharts={Highcharts} options={departmentChartOptions} />
          </Grid>
          <Grid item xs={12} md={6}>
            <HighchartsReact highcharts={Highcharts} options={locationChartOptions} />
          </Grid>
          <Grid item xs={12} md={6}>
            <HighchartsReact highcharts={Highcharts} options={genderChartOptions} />
          </Grid>
          <Grid item xs={12} md={6}>
            <HighchartsReact highcharts={Highcharts} options={employmentTypeChartOptions} />
          </Grid>
          <Grid item xs={12} md={12}>
            <HighchartsReact highcharts={Highcharts} options={averageSalaryChartOptions} />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
