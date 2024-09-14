import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { Box, Typography, Grid, Card, CardContent, Container } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import Backdrop from '@mui/material/Backdrop';

export default function ShiftSchedulesAnalytics({ fetchItems }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalShifts, setTotalShifts] = useState(0);
  const [completedShifts, setCompletedShifts] = useState([]);
  const [shiftTypeDistribution, setShiftTypeDistribution] = useState([]);
  const [overtimeHoursTotal, setOvertimeHoursTotal] = useState(0);

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
    setTotalShifts(data.length);
    const completed = data.filter((shift) => shift.status === 'completed');
    setCompletedShifts(completed);
    const totalOvertime = data.reduce((acc, shift) => acc + shift.overtimeHours, 0);
    setOvertimeHoursTotal(totalOvertime);
  };

  const generateCharts = (data) => {
    const typeCounts = data.reduce((acc, shift) => {
      acc[shift.shiftType] = (acc[shift.shiftType] || 0) + 1;
      return acc;
    }, {});
    setShiftTypeDistribution(
      Object.keys(typeCounts).map((key) => ({
        name: key,
        y: typeCounts[key],
      }))
    );
  };

  const shiftTypeDistributionChart = {
    chart: { type: 'pie' },
    title: { text: 'Shift Type Distribution' },
    series: [
      {
        name: 'Shift Type',
        colorByPoint: true,
        data: shiftTypeDistribution,
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
          Shift Schedules Analytics
        </Typography>
        <Grid container spacing={4}>
          {/* KPIs */}
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6">Total Shifts</Typography>
                <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                  {totalShifts}
                </Typography>
                <Typography variant="body2">Total number of shifts scheduled.</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6">Completed Shifts</Typography>
                <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                  {completedShifts.length}
                </Typography>
                <Typography variant="body2">Shifts that have been completed.</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6">Total Overtime Hours</Typography>
                <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                  {overtimeHoursTotal}
                </Typography>
                <Typography variant="body2">Total overtime hours worked across shifts.</Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Charts */}
          <Grid item xs={12} md={12}>
            <HighchartsReact highcharts={Highcharts} options={shiftTypeDistributionChart} />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
