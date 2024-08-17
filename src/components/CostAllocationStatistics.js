import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { fetchCostAllocations } from '../utils/costAllocationFirebaseHelpers';
import { Container, Grid, Paper, Typography } from '@mui/material';

const CostAllocationStatistics = () => {
  const [costAllocations, setCostAllocations] = useState([]);
  const organizationId = JSON.parse(localStorage.getItem('userData')).organizationId;

  useEffect(() => {
    const fetchData = async () => {
      const allocations = await fetchCostAllocations(organizationId);
      setCostAllocations(allocations || []);
    };

    fetchData();
  }, [organizationId]);

  // Calculate KPIs
  const totalCosts = costAllocations.reduce((sum, allocation) => sum + parseFloat(allocation.cost), 0);
  const approvedAllocations = costAllocations.filter(allocation => allocation.approvalStatus === 'Approved').length;
  const percentageApproved = (approvedAllocations / costAllocations.length) * 100;
  const averageCost = totalCosts / costAllocations.length;
  const totalSpent = costAllocations.reduce((sum, allocation) => sum + parseFloat(allocation.totalCostAfterDiscount), 0);
  const spendingEfficiency = (totalSpent / totalCosts) * 100;

  // Highcharts options
  const costAllocationPieOptions = {
    chart: {
      type: 'pie',
    },
    title: {
      text: 'Cost Allocation by Department',
    },
    series: [
      {
        name: 'Cost',
        colorByPoint: true,
        data: costAllocations.reduce((acc, allocation) => {
          const department = acc.find(d => d.name === allocation.department);
          if (department) {
            department.y += parseFloat(allocation.cost);
          } else {
            acc.push({ name: allocation.department, y: parseFloat(allocation.cost) });
          }
          return acc;
        }, []),
      },
    ],
  };

  const approvalStatusBarOptions = {
    chart: {
      type: 'column',
    },
    title: {
      text: 'Approval Status of Allocations',
    },
    xAxis: {
      categories: ['Pending', 'Approved', 'Rejected'],
    },
    yAxis: {
      min: 0,
      title: {
        text: 'Number of Allocations',
      },
    },
    series: [
      {
        name: 'Allocations',
        data: [
          costAllocations.filter(a => a.approvalStatus === 'Pending').length,
          costAllocations.filter(a => a.approvalStatus === 'Approved').length,
          costAllocations.filter(a => a.approvalStatus === 'Rejected').length,
        ],
      },
    ],
  };

  const spendingEfficiencyLineOptions = {
    chart: {
      type: 'line',
    },
    title: {
      text: 'Spending Efficiency Over Time',
    },
    xAxis: {
      type: 'datetime',
    },
    yAxis: {
      title: {
        text: 'Spending Efficiency (%)',
      },
    },
    series: [
      {
        name: 'Efficiency',
        data: costAllocations.map(allocation => [
          new Date(allocation.allocationDate).getTime(),
          (parseFloat(allocation.totalCostAfterDiscount) / parseFloat(allocation.cost)) * 100,
        ]),
      },
    ],
  };

  return (
    <Container maxWidth="xl" sx={{ paddingTop: 3, paddingBottom: 7 }}>
      <Typography variant="h4" gutterBottom>
        Cost Allocation Statistics
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ padding: 2 }}>
            <HighchartsReact highcharts={Highcharts} options={costAllocationPieOptions} />
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ padding: 2 }}>
            <HighchartsReact highcharts={Highcharts} options={approvalStatusBarOptions} />
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper elevation={3} sx={{ padding: 2 }}>
            <HighchartsReact highcharts={Highcharts} options={spendingEfficiencyLineOptions} />
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ padding: 2 }}>
            <Typography variant="h6">Key Performance Indicators (KPIs)</Typography>
            <Typography>Total Costs: ${totalCosts.toFixed(2)}</Typography>
            <Typography>Average Cost per Allocation: ${averageCost.toFixed(2)}</Typography>
            <Typography>Approved Allocations: {percentageApproved.toFixed(2)}%</Typography>
            <Typography>Spending Efficiency: {spendingEfficiency.toFixed(2)}%</Typography>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default CostAllocationStatistics;
