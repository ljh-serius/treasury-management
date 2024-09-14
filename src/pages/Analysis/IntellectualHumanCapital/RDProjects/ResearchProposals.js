import React, { useState, useEffect } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { Card, Grid, Typography, Chip } from '@mui/material';

const ResearchProposalsAnalytics = ({ fetchItems }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const response = await fetchItems();
      setData(response || []); // Ensure data is an array
      setLoading(false);
    }
    fetchData();
  }, [fetchItems]);

  if (loading) return <Typography>Loading...</Typography>;

  // Calculate KPIs
  const totalBudget = data.reduce((sum, record) => sum + (Number(record.budget) || 0), 0);
  const approvedProposals = data.filter(record => record.approvalStatus === 'approved').length;
  const pendingProposals = data.filter(record => record.approvalStatus === 'pending').length;
  const rejectedProposals = data.filter(record => record.approvalStatus === 'rejected').length;

  // Highcharts options for proposal status distribution
  const statusChartOptions = {
    chart: { type: 'pie' },
    title: { text: 'Proposal Approval Status Distribution' },
    series: [{
      name: 'Proposals',
      colorByPoint: true,
      data: [
        { name: 'Approved', y: approvedProposals },
        { name: 'Pending', y: pendingProposals },
        { name: 'Rejected', y: rejectedProposals },
      ]
    }]
  };

  // Highcharts options for budget allocation by department
  const budgetChartOptions = {
    chart: { type: 'bar' },
    title: { text: 'Budget Allocation by Department' },
    xAxis: { type: 'category', title: { text: 'Department' } },
    yAxis: { title: { text: 'Budget' } },
    series: [{
      name: 'Budget',
      data: data.map(record => ({
        name: record.department || 'Unknown',
        y: Number(record.budget) || 0
      })),
    }]
  };

  return (
    <Grid container spacing={4}>
      {/* KPI Cards */}
      <Grid item xs={12} md={4}>
        <Card>
          <Typography variant="h6" gutterBottom>Total Budget</Typography>
          <Typography variant="h4">${totalBudget.toFixed(2)}</Typography>
        </Card>
      </Grid>
      <Grid item xs={12} md={4}>
        <Card>
          <Typography variant="h6" gutterBottom>Approved Proposals</Typography>
          <Typography variant="h4">{approvedProposals}</Typography>
        </Card>
      </Grid>
      <Grid item xs={12} md={4}>
        <Card>
          <Typography variant="h6" gutterBottom>Pending Proposals</Typography>
          <Typography variant="h4">{pendingProposals}</Typography>
        </Card>
      </Grid>

      {/* Highcharts */}
      <Grid item xs={12} md={6}>
        <Card>
          <HighchartsReact highcharts={Highcharts} options={statusChartOptions} />
        </Card>
      </Grid>
      <Grid item xs={12} md={6}>
        <Card>
          <HighchartsReact highcharts={Highcharts} options={budgetChartOptions} />
        </Card>
      </Grid>

      {/* Tags */}
      <Grid item xs={12}>
        <Card>
          <Typography variant="h6" gutterBottom>Tags</Typography>
          {data.map((record, index) => (
            <div key={index}>
              <Typography variant="subtitle1">{record.proposalTitle}:</Typography>
              {Array.isArray(record.tags) ? record.tags.map((tag, tagIndex) => (
                <Chip key={tagIndex} label={tag.label} style={{ margin: '5px' }} />
              )) : 'No Tags'}
            </div>
          ))}
        </Card>
      </Grid>
    </Grid>
  );
};

export default ResearchProposalsAnalytics;
