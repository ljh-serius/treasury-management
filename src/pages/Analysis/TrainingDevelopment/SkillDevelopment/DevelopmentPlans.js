import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { Box, Typography, Grid, Card, CardContent, Container } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import Backdrop from '@mui/material/Backdrop';

export default function DevelopmentPlansDashboard({ fetchItems }) {
  const [plansData, setPlansData] = useState([]);
  const [statusDistribution, setStatusDistribution] = useState([]);
  const [supervisorDistribution, setSupervisorDistribution] = useState([]);
  const [planDurationData, setPlanDurationData] = useState([]);
  const [totalPlans, setTotalPlans] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const data = await fetchItems();
      setPlansData(data);
      processPlansData(data);
      setLoading(false);
    };

    fetchData();
  }, [fetchItems]);

  const processPlansData = (data) => {
    // Total Number of Plans
    setTotalPlans(data.length);

    // Plans by Status
    const statusCounts = data.reduce((acc, plan) => {
      acc[plan.status] = (acc[plan.status] || 0) + 1;
      return acc;
    }, {});

    setStatusDistribution(Object.keys(statusCounts).map(key => ({
      name: key,
      y: statusCounts[key],
    })));

    // Plans by Supervisor
    const supervisorCounts = data.reduce((acc, plan) => {
      acc[plan.supervisor] = (acc[plan.supervisor] || 0) + 1;
      return acc;
    }, {});

    setSupervisorDistribution(Object.keys(supervisorCounts).map(key => ({
      name: key,
      y: supervisorCounts[key],
    })));

    // Plan Duration Trends (from startDate to endDate)
    const durationTrends = data.map(plan => {
      const start = new Date(plan.startDate);
      const end = new Date(plan.endDate);
      const durationInDays = Math.ceil((end - start) / (1000 * 60 * 60 * 24)); // duration in days
      return { name: plan.planTitle, y: durationInDays };
    });

    setPlanDurationData(durationTrends);
  };

  // Chart options for each chart
  const statusChartOptions = {
    chart: {
      type: 'pie',
    },
    title: {
      text: 'Plans by Status',
    },
    series: [
      {
        name: 'Statuses',
        colorByPoint: true,
        data: statusDistribution,
      },
    ],
  };

  const supervisorChartOptions = {
    chart: {
      type: 'column',
    },
    title: {
      text: 'Plans by Supervisor',
    },
    series: [
      {
        name: 'Supervisors',
        data: supervisorDistribution,
      },
    ],
  };

  const planDurationChartOptions = {
    chart: {
      type: 'line',
    },
    title: {
      text: 'Plan Duration (in days)',
    },
    series: [
      {
        name: 'Duration',
        data: planDurationData.map(plan => plan.y),
      },
    ],
    xAxis: {
      categories: planDurationData.map(plan => plan.name),
    },
  };

  return (
    <Container maxWidth="xl" sx={{ paddingTop: 3, paddingBottom: 7 }}>
      <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <Box sx={{ padding: 4 }}>
        <Typography variant="h4" gutterBottom>
          Development Plans Dashboard
        </Typography>
        <Grid container spacing={4}>
          {/* KPI Section */}
          <Grid item xs={12} md={3}>
            <Card>
              <CardContent>
                <Typography variant="h6">Total Plans</Typography>
                <Typography variant="h4" color="green" sx={{ fontWeight: 'bold' }}>
                  {totalPlans}
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Chart Section */}
          <Grid item xs={12} md={6}>
            <HighchartsReact highcharts={Highcharts} options={statusChartOptions} />
          </Grid>
          <Grid item xs={12} md={6}>
            <HighchartsReact highcharts={Highcharts} options={supervisorChartOptions} />
          </Grid>
          <Grid item xs={12} md={12}>
            <HighchartsReact highcharts={Highcharts} options={planDurationChartOptions} />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
