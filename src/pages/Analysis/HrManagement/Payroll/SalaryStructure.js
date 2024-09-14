import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { Box, Typography, Grid, Card, CardContent, Container } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import Backdrop from '@mui/material/Backdrop';

export default function SalaryStructureAnalytics({ fetchItems }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalEmployees, setTotalEmployees] = useState(0);
  const [totalCompensationDistribution, setTotalCompensationDistribution] = useState([]);

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
    setTotalEmployees(data.length);
  };

  const generateCharts = (data) => {
    const compensationDistribution = data.map((record) => ({
      name: record.employeeId,
      y: record.totalCompensation,
    }));
    setTotalCompensationDistribution(compensationDistribution);
  };

  const totalCompensationChart = {
    chart: { type: 'column' },
    title: { text: 'Total Compensation Distribution' },
    series: [
      {
        name: 'Employee Compensation',
        data: totalCompensationDistribution,
      },
    ],
    xAxis: {
      categories: totalCompensationDistribution.map((entry) => entry.name),
    },
  };

  return (
    <Container maxWidth="xl" sx={{ paddingTop: 3, paddingBottom: 7 }}>
      <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <Box sx={{ padding: 4 }}>
        <Typography variant="h4" gutterBottom>
          Salary Structure Analytics
        </Typography>
        <Grid container spacing={4}>
          {/* KPIs */}
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6">Total Employees</Typography>
                <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                  {totalEmployees}
                </Typography>
                <Typography variant="body2">Total number of employees with salary records.</Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Charts */}
          <Grid item xs={12} md={12}>
            <HighchartsReact highcharts={Highcharts} options={totalCompensationChart} />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
