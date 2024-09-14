import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { Box, Typography, Grid, Card, CardContent, Container } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import Backdrop from '@mui/material/Backdrop';

export default function OvertimeManagementAnalytics({ fetchItems }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalOvertimeHours, setTotalOvertimeHours] = useState(0);
  const [approvedOvertime, setApprovedOvertime] = useState([]);
  const [statusDistribution, setStatusDistribution] = useState([]);

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
    const totalHours = data.reduce((acc, overtime) => acc + overtime.overtimeHours, 0);
    setTotalOvertimeHours(totalHours);
    const approved = data.filter((overtime) => overtime.status === 'approved');
    setApprovedOvertime(approved);
  };

  const generateCharts = (data) => {
    const statusCounts = data.reduce((acc, overtime) => {
      acc[overtime.status] = (acc[overtime.status] || 0) + 1;
      return acc;
    }, {});
    setStatusDistribution(
      Object.keys(statusCounts).map((key) => ({
        name: key,
        y: statusCounts[key],
      }))
    );
  };

  const statusDistributionChart = {
    chart: { type: 'pie' },
    title: { text: 'Overtime Status Distribution' },
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
          Overtime Management Analytics
        </Typography>
        <Grid container spacing={4}>
          {/* KPIs */}
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6">Total Overtime Hours</Typography>
                <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                  {totalOvertimeHours}
                </Typography>
                <Typography variant="body2">Total overtime hours recorded.</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6">Approved Overtime Entries</Typography>
                <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                  {approvedOvertime.length}
                </Typography>
                <Typography variant="body2">Approved overtime entries.</Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Charts */}
          <Grid item xs={12} md={12}>
            <HighchartsReact highcharts={Highcharts} options={statusDistributionChart} />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
