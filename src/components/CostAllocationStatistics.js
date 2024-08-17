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
  const approvedAllocations = costAllocations.filter(allocation => allocation.approvalStatus === 'approved').length;
  const rejectedAllocations = costAllocations.filter(allocation => allocation.approvalStatus === 'rejected').length;
  const pendingAllocations = costAllocations.filter(allocation => allocation.approvalStatus === 'pending').length;
  const percentageApproved = (approvedAllocations / costAllocations.length) * 100;
  const percentageRejected = (rejectedAllocations / costAllocations.length) * 100;
  const averageCost = totalCosts / costAllocations.length;
  const totalSpent = costAllocations.reduce((sum, allocation) => sum + parseFloat(allocation.totalCostAfterDiscount), 0);
  const spendingEfficiency = (totalSpent / totalCosts) * 100;

  // Additional KPIs
  const averageROI = costAllocations.reduce((sum, allocation) => sum + parseFloat(allocation.roiEstimate || 0), 0) / costAllocations.length;
  const totalVAT = costAllocations.reduce((sum, allocation) => sum + parseFloat(allocation.vatAmount || 0), 0);
  const capexAllocations = costAllocations.filter(allocation => allocation.capexOrOpex === 'capex').length;
  const opexAllocations = costAllocations.filter(allocation => allocation.capexOrOpex === 'opex').length;

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
        data: [pendingAllocations, approvedAllocations, rejectedAllocations],
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

  const roiEstimateBarOptions = {
    chart: {
      type: 'bar',
    },
    title: {
      text: 'ROI Estimate by Department',
    },
    xAxis: {
      categories: [...new Set(costAllocations.map(allocation => allocation.department))],
      title: {
        text: 'Department',
      },
    },
    yAxis: {
      min: 0,
      title: {
        text: 'ROI Estimate',
      },
    },
    series: [
      {
        name: 'ROI Estimate',
        data: costAllocations.reduce((acc, allocation) => {
          const department = acc.find(d => d.name === allocation.department);
          if (department) {
            department.y += parseFloat(allocation.roiEstimate || 0);
          } else {
            acc.push({ name: allocation.department, y: parseFloat(allocation.roiEstimate || 0) });
          }
          return acc;
        }, []),
      },
    ],
  };

  const costTrendAreaOptions = {
    chart: {
      type: 'area',
    },
    title: {
      text: 'Cost Allocation Trend Over Time',
    },
    xAxis: {
      type: 'datetime',
    },
    yAxis: {
      title: {
        text: 'Total Cost',
      },
    },
    series: [
      {
        name: 'Cost',
        data: costAllocations.map(allocation => [
          new Date(allocation.allocationDate).getTime(),
          parseFloat(allocation.cost),
        ]),
      },
    ],
  };

  const capexOpexPieOptions = {
    chart: {
      type: 'pie',
    },
    title: {
      text: 'Capex vs Opex Allocations',
    },
    series: [
      {
        name: 'Allocations',
        colorByPoint: true,
        data: [
          { name: 'Capex', y: capexAllocations },
          { name: 'Opex', y: opexAllocations },
        ],
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
            <HighchartsReact highcharts={Highcharts} options={roiEstimateBarOptions} />
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ padding: 2 }}>
            <HighchartsReact highcharts={Highcharts} options={costTrendAreaOptions} />
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ padding: 2 }}>
            <HighchartsReact highcharts={Highcharts} options={capexOpexPieOptions} />
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ padding: 2 }}>
            <Typography variant="h6">Key Performance Indicators (KPIs)</Typography>
            <Typography>Total Costs: ${totalCosts.toFixed(2)}</Typography>
            <Typography>Average Cost per Allocation: ${averageCost.toFixed(2)}</Typography>
            <Typography>Approved Allocations: {percentageApproved.toFixed(2)}%</Typography>
            <Typography>Rejected Allocations: {percentageRejected.toFixed(2)}%</Typography>
            <Typography>Spending Efficiency: {spendingEfficiency.toFixed(2)}%</Typography>
            <Typography>Average ROI Estimate: {averageROI.toFixed(2)}</Typography>
            <Typography>Total VAT: ${totalVAT.toFixed(2)}</Typography>
            <Typography>Capex Allocations: {capexAllocations}</Typography>
            <Typography>Opex Allocations: {opexAllocations}</Typography>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default CostAllocationStatistics;
