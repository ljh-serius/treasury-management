import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { Box, Typography, Grid, Card, CardContent, Container, CircularProgress, Backdrop } from '@mui/material';

export default function RiskMitigationPlansDashboard({ fetchItems }) {
  const [mitigationPlans, setMitigationPlans] = useState([]);
  const [totalPlans, setTotalPlans] = useState(0);
  const [statusDistribution, setStatusDistribution] = useState([]);
  const [responsiblePartyCount, setResponsiblePartyCount] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const data = await fetchItems();
      setMitigationPlans(data);
      processPlanData(data);
      setLoading(false);
    };

    fetchData();
  }, [fetchItems]);

  const processPlanData = (data) => {
    setTotalPlans(data.length);

    const statusMap = {};
    const responsiblePartyMap = {};

    data.forEach((item) => {
      // Process status distribution
      const status = item.status;
      statusMap[status] = (statusMap[status] || 0) + 1;

      // Process responsible party count
      const responsibleParty = item.responsibleParty;
      responsiblePartyMap[responsibleParty] = (responsiblePartyMap[responsibleParty] || 0) + 1;
    });

    const statusArray = Object.entries(statusMap).map(([status, count]) => ({
      name: status,
      y: count,
    }));

    setStatusDistribution(statusArray);
    setResponsiblePartyCount(responsiblePartyMap);
  };

  // Highcharts options for Status Distribution
  const statusChartOptions = {
    chart: { type: 'pie' },
    title: { text: 'Status Distribution' },
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
          Risk Mitigation Plans Dashboard
        </Typography>

        <Grid container spacing={4}>
          {/* KPIs Section */}
          <Grid item xs={12} md={3}>
            <Card>
              <CardContent>
                <Typography variant="h6">Total Mitigation Plans</Typography>
                <Typography variant="h4" color="green" sx={{ fontWeight: 'bold' }}>
                  {totalPlans}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Grid container spacing={4} sx={{ marginTop: 4 }}>
          {/* Status Distribution Chart */}
          <Grid item xs={12} md={6}>
            <HighchartsReact highcharts={Highcharts} options={statusChartOptions} />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
