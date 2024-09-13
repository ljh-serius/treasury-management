import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { Box, Typography, Grid, Card, CardContent, Container, CircularProgress, Backdrop } from '@mui/material';

export default function EmployeesDashboard({ fetchItems }) {
  const [employeeData, setEmployeeData] = useState([]);
  const [totalEmployees, setTotalEmployees] = useState(0);
  const [departmentDistribution, setDepartmentDistribution] = useState([]);
  const [employmentStatusChartData, setEmploymentStatusChartData] = useState([]);
  const [averageSalary, setAverageSalary] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const data = await fetchItems();
      setEmployeeData(data);
      processEmployeeData(data);
      setLoading(false);
    };

    fetchData();
  }, [fetchItems]);

  const processEmployeeData = (data) => {
    setTotalEmployees(data.length);

    // Calculate department distribution
    const departmentMap = {};
    data.forEach((item) => {
      const department = item.department;
      departmentMap[department] = (departmentMap[department] || 0) + 1;
    });
    const departmentArray = Object.entries(departmentMap).map(([department, count]) => ({
      name: department,
      y: count,
    }));
    setDepartmentDistribution(departmentArray);

    // Calculate employment status distribution
    const statusMap = {};
    data.forEach((item) => {
      const status = item.employmentStatus;
      statusMap[status] = (statusMap[status] || 0) + 1;
    });
    const statusArray = Object.entries(statusMap).map(([status, count]) => ({
      name: status,
      y: count,
    }));
    setEmploymentStatusChartData(statusArray);

    // Calculate average salary
    const totalSalary = data.reduce((sum, item) => sum + item.salary, 0);
    setAverageSalary(totalSalary / data.length);
  };

  // Highcharts options for Department Distribution
  const departmentChartOptions = {
    chart: { type: 'pie' },
    title: { text: 'Department Distribution' },
    series: [
      {
        name: 'Departments',
        data: departmentDistribution,
      },
    ],
  };

  // Highcharts options for Employment Status Distribution
  const employmentStatusChartOptions = {
    chart: { type: 'pie' },
    title: { text: 'Employment Status Distribution' },
    series: [
      {
        name: 'Status',
        data: employmentStatusChartData,
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
          Employees List Dashboard
        </Typography>

        <Grid container spacing={4}>
          {/* KPIs Section */}
          <Grid item xs={12} md={3}>
            <Card>
              <CardContent>
                <Typography variant="h6">Total Employees</Typography>
                <Typography variant="h4" color="green" sx={{ fontWeight: 'bold' }}>
                  {totalEmployees}
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={3}>
            <Card>
              <CardContent>
                <Typography variant="h6">Average Salary</Typography>
                <Typography variant="h4" color="blue" sx={{ fontWeight: 'bold' }}>
                  ${averageSalary.toFixed(2)}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Grid container spacing={4} sx={{ marginTop: 4 }}>
          {/* Department Distribution Chart */}
          <Grid item xs={12} md={6}>
            <HighchartsReact highcharts={Highcharts} options={departmentChartOptions} />
          </Grid>

          {/* Employment Status Distribution Chart */}
          <Grid item xs={12} md={6}>
            <HighchartsReact highcharts={Highcharts} options={employmentStatusChartOptions} />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
