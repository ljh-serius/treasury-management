import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { Box, Typography, Grid, Card, CardContent, Container, CircularProgress, Backdrop } from '@mui/material';

export default function ResearchProposalsDashboard({ fetchItems }) {
  const [proposalsData, setProposalsData] = useState([]);
  const [totalProposals, setTotalProposals] = useState(0);
  const [approvalStatusDistribution, setApprovalStatusDistribution] = useState([]);
  const [budgetDistribution, setBudgetDistribution] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const data = await fetchItems();
      setProposalsData(data);
      processProposalsData(data);
      setLoading(false);
    };

    fetchData();
  }, [fetchItems]);

  const processProposalsData = (data) => {
    // Total Proposals
    setTotalProposals(data.length);

    // Approval Status Distribution for Pie Chart
    const statusCounts = data.reduce((acc, proposal) => {
      acc[proposal.approvalStatus] = (acc[proposal.approvalStatus] || 0) + 1;
      return acc;
    }, {});
    setApprovalStatusDistribution(Object.keys(statusCounts).map(key => ({
      name: key.charAt(0).toUpperCase() + key.slice(1),
      y: statusCounts[key],
    })));

    // Budget Distribution for Column Chart
    setBudgetDistribution(data.map(proposal => ({
      name: proposal.proposalTitle,
      y: proposal.budget,
    })));
  };

  // Highcharts options for Approval Status Distribution
  const statusChartOptions = {
    chart: { type: 'pie' },
    title: { text: 'Approval Status Distribution' },
    series: [{
      name: 'Approval Status',
      colorByPoint: true,
      data: approvalStatusDistribution,
    }],
  };

  // Highcharts options for Budget Distribution
  const budgetChartOptions = {
    chart: { type: 'column' },
    title: { text: 'Budget Distribution by Proposal' },
    xAxis: { type: 'category', title: { text: 'Proposal Titles' } },
    yAxis: { title: { text: 'Budget Amount' } },
    series: [{
      name: 'Budget',
      data: budgetDistribution,
    }],
  };

  return (
    <Container maxWidth="xl" sx={{ paddingTop: 3, paddingBottom: 7 }}>
      <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <Box sx={{ padding: 4 }}>
        <Typography variant="h4" gutterBottom>
          Research Proposals Dashboard
        </Typography>

        <Grid container spacing={4}>
          {/* KPIs Section */}
          <Grid item xs={12} md={3}>
            <Card>
              <CardContent>
                <Typography variant="h6">Total Proposals</Typography>
                <Typography variant="h4" color="green" sx={{ fontWeight: 'bold' }}>
                  {totalProposals}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Grid container spacing={4} sx={{ marginTop: 4 }}>
          {/* Approval Status Distribution Chart */}
          <Grid item xs={12} md={6}>
            <HighchartsReact highcharts={Highcharts} options={statusChartOptions} />
          </Grid>

          {/* Budget Distribution Chart */}
          <Grid item xs={12} md={6}>
            <HighchartsReact highcharts={Highcharts} options={budgetChartOptions} />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
