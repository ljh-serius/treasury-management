import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { Box, Typography, Grid, Card, CardContent, Container } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import Backdrop from '@mui/material/Backdrop';

export default function ContractRenewalRemindersAnalytics({ fetchItems }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalReminders, setTotalReminders] = useState(0);
  const [pendingReminders, setPendingReminders] = useState([]);
  const [reminderStatusDistribution, setReminderStatusDistribution] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const fetchedData = await fetchItems();
      setData(fetchedData);
      calculateKpis(fetchedData);
      generateCharts(fetchedData);
      setLoading(false);
    };

    fetchData();
  }, [fetchItems]);

  const calculateKpis = (data) => {
    setTotalReminders(data.length);

    const pending = data.filter((item) => item.status === 'pending');
    setPendingReminders(pending);
  };

  const generateCharts = (data) => {
    const statusCounts = data.reduce((acc, item) => {
      acc[item.status] = (acc[item.status] || 0) + 1;
      return acc;
    }, {});

    setReminderStatusDistribution(
      Object.keys(statusCounts).map((key) => ({
        name: key,
        y: statusCounts[key],
      }))
    );
  };

  const reminderStatusDistributionChart = {
    chart: { type: 'pie' },
    title: { text: 'Contract Renewal Reminder Status Distribution' },
    series: [
      {
        name: 'Status',
        colorByPoint: true,
        data: reminderStatusDistribution,
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
          Contract Renewal Reminders Analytics
        </Typography>
        <Grid container spacing={4}>
          {/* KPIs */}
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6">Total Reminders</Typography>
                <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                  {totalReminders}
                </Typography>
                <Typography variant="body2">Total number of contract renewal reminders.</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6">Pending Reminders</Typography>
                <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                  {pendingReminders.length}
                </Typography>
                <Typography variant="body2">Reminders still pending completion.</Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Charts */}
          <Grid item xs={12} md={12}>
            <HighchartsReact highcharts={Highcharts} options={reminderStatusDistributionChart} />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
