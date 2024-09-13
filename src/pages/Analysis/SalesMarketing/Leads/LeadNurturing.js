import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { Box, Typography, Grid, Card, CardContent, Container, CircularProgress, Backdrop } from '@mui/material';

export default function LeadNurturingDashboard({ fetchItems }) {
  const [leadData, setLeadData] = useState([]);
  const [totalLeads, setTotalLeads] = useState(0);
  const [leadsByStage, setLeadsByStage] = useState([]);
  const [followUpLeads, setFollowUpLeads] = useState(0);
  const [nextContactSchedule, setNextContactSchedule] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDataAsync = async () => {
      setLoading(true);
      const data = await fetchItems();
      setLeadData(data);
      processLeadData(data);
      setLoading(false);
    };

    fetchDataAsync();
  }, [fetchItems]);

  const processLeadData = (data) => {
    // Total Leads
    setTotalLeads(data.length);

    // Count Leads Needing Follow-Up
    const followUp = data.filter(lead => lead.tags.includes('follow-up-needed')).length;
    setFollowUpLeads(followUp);

    // Leads by Nurture Stage
    const stageCounts = data.reduce((acc, lead) => {
      acc[lead.nurtureStage] = (acc[lead.nurtureStage] || 0) + 1;
      return acc;
    }, {});
    setLeadsByStage(Object.keys(stageCounts).map(key => ({
      name: key.charAt(0).toUpperCase() + key.slice(1),
      y: stageCounts[key],
    })));

    // Next Contact Schedule
    const schedule = data.map(lead => ({
      date: new Date(lead.nextContactDate).getTime(),
      name: lead.leadId,
    })).sort((a, b) => a.date - b.date);
    setNextContactSchedule(schedule);
  };

  // Highcharts options for Leads by Nurture Stage
  const stageChartOptions = {
    chart: { type: 'pie' },
    title: { text: 'Leads by Nurture Stage' },
    series: [{
      name: 'Leads',
      colorByPoint: true,
      data: leadsByStage,
    }],
  };

  // Highcharts options for Next Contact Schedule
  const contactScheduleChartOptions = {
    chart: { type: 'line' },
    title: { text: 'Next Contact Schedule' },
    xAxis: { type: 'datetime', title: { text: 'Date' } },
    yAxis: { title: { text: 'Leads' } },
    series: [{
      name: 'Next Contact',
      data: nextContactSchedule.map(item => [item.date, item.name]),
    }],
  };

  return (
    <Container maxWidth="xl" sx={{ paddingTop: 3, paddingBottom: 7 }}>
      <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <Box sx={{ padding: 4 }}>
        <Typography variant="h4" gutterBottom>
          Lead Nurturing Dashboard
        </Typography>

        <Grid container spacing={4}>
          {/* KPIs Section */}
          <Grid item xs={12} md={3}>
            <Card>
              <CardContent>
                <Typography variant="h6">Total Leads</Typography>
                <Typography variant="h4" color="green" sx={{ fontWeight: 'bold' }}>
                  {totalLeads}
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={3}>
            <Card>
              <CardContent>
                <Typography variant="h6">Follow-up Leads</Typography>
                <Typography variant="h4" color="orange" sx={{ fontWeight: 'bold' }}>
                  {followUpLeads}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Grid container spacing={4} sx={{ marginTop: 4 }}>
          {/* Leads by Nurture Stage Chart */}
          <Grid item xs={12} md={6}>
            <HighchartsReact highcharts={Highcharts} options={stageChartOptions} />
          </Grid>

          {/* Next Contact Schedule Chart */}
          <Grid item xs={12} md={6}>
            <HighchartsReact highcharts={Highcharts} options={contactScheduleChartOptions} />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
