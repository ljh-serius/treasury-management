import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { Box, Typography, Grid, Card, CardContent, Container } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import Backdrop from '@mui/material/Backdrop';

export default function TimesheetApprovalsAnalytics({ fetchItems }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalTimesheets, setTotalTimesheets] = useState(0);
  const [approvedTimesheets, setApprovedTimesheets] = useState([]);
  const [approvalStatusDistribution, setApprovalStatusDistribution] = useState([]);

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
    setTotalTimesheets(data.length);
    const approved = data.filter((timesheet) => timesheet.approvalStatus === 'approved');
    setApprovedTimesheets(approved);
  };

  const generateCharts = (data) => {
    const statusCounts = data.reduce((acc, timesheet) => {
      acc[timesheet.approvalStatus] = (acc[timesheet.approvalStatus] || 0) + 1;
      return acc;
    }, {});
    setApprovalStatusDistribution(
      Object.keys(statusCounts).map((key) => ({
        name: key,
        y: statusCounts[key],
      }))
    );
  };

  const approvalStatusChart = {
    chart: { type: 'pie' },
    title: { text: 'Approval Status Distribution' },
    series: [
      {
        name: 'Status',
        colorByPoint: true,
        data: approvalStatusDistribution,
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
          Timesheet Approvals Analytics
        </Typography>
        <Grid container spacing={4}>
          {/* KPIs */}
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6">Total Timesheets</Typography>
                <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                  {totalTimesheets}
                </Typography>
                <Typography variant="body2">Total number of timesheets submitted.</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6">Approved Timesheets</Typography>
                <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                  {approvedTimesheets.length}
                </Typography>
                <Typography variant="body2">Timesheets that have been approved.</Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Charts */}
          <Grid item xs={12} md={12}>
            <HighchartsReact highcharts={Highcharts} options={approvalStatusChart} />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
