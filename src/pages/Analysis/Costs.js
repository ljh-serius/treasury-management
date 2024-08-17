import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { Box, Typography, Grid, Card, CardContent, Container } from '@mui/material';

export default function CostAnalysisDashboard({ fetchCosts }) {
  const [costsData, setCostsData] = useState([]);
  const [departmentDistribution, setDepartmentDistribution] = useState([]);
  const [allocationTypeDistribution, setAllocationTypeDistribution] = useState([]);
  const [priorityDistribution, setPriorityDistribution] = useState([]);
  const [capexOpexDistribution, setCapexOpexDistribution] = useState([]);
  const [totalCost, setTotalCost] = useState(0);
  const [averageCost, setAverageCost] = useState(0);
  const [topCosts, setTopCosts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchCosts();
      if (data && data.length > 0) {
        setCostsData(data);
        processCostData(data);
      } else {
        console.log("No cost data available.");
      }
    };

    fetchData();
  }, [fetchCosts]);

  const processCostData = (data) => {
    if (!data || data.length === 0) {
      console.log("No data to process.");
      return;
    }

    // Department Distribution
    const departmentCounts = data.reduce((acc, cost) => {
      acc[cost.department] = (acc[cost.department] || 0) + 1;
      return acc;
    }, {});

    setDepartmentDistribution(Object.keys(departmentCounts).map(key => ({
      name: key,
      y: departmentCounts[key],
    })));

    // Allocation Type Distribution
    const allocationTypeCounts = data.reduce((acc, cost) => {
      acc[cost.allocationType] = (acc[cost.allocationType] || 0) + 1;
      return acc;
    }, {});

    setAllocationTypeDistribution(Object.keys(allocationTypeCounts).map(key => ({
      name: key,
      y: allocationTypeCounts[key],
    })));

    // Priority Distribution
    const priorityCounts = data.reduce((acc, cost) => {
      acc[cost.priority] = (acc[cost.priority] || 0) + 1;
      return acc;
    }, {});

    setPriorityDistribution(Object.keys(priorityCounts).map(key => ({
      name: key,
      y: priorityCounts[key],
    })));

    // Capex/Opex Distribution
    const capexOpexCounts = data.reduce((acc, cost) => {
      acc[cost.capexOrOpex] = (acc[cost.capexOrOpex] || 0) + 1;
      return acc;
    }, {});

    setCapexOpexDistribution(Object.keys(capexOpexCounts).map(key => ({
      name: key,
      y: capexOpexCounts[key],
    })));

    // Total and Average Cost
    const totalCostValue = data.reduce((acc, cost) => acc + (Number(cost.cost) || 0), 0);
    setTotalCost(totalCostValue);
    const averageCostValue = data.length ? totalCostValue / data.length : 0;
    setAverageCost(averageCostValue);

    // Top 5 Costs
    const topCostsList = data
      .sort((a, b) => (Number(b.cost) || 0) - (Number(a.cost) || 0))
      .slice(0, 5);
    setTopCosts(topCostsList);
  };

  const departmentChartOptions = {
    chart: {
      type: 'pie',
    },
    title: {
      text: 'Cost Distribution by Department',
    },
    series: [
      {
        name: 'Costs',
        colorByPoint: true,
        data: departmentDistribution,
      },
    ],
  };

  const allocationTypeChartOptions = {
    chart: {
      type: 'pie',
    },
    title: {
      text: 'Cost Distribution by Allocation Type',
    },
    series: [
      {
        name: 'Costs',
        colorByPoint: true,
        data: allocationTypeDistribution,
      },
    ],
  };

  const priorityChartOptions = {
    chart: {
      type: 'pie',
    },
    title: {
      text: 'Cost Distribution by Priority',
    },
    series: [
      {
        name: 'Costs',
        colorByPoint: true,
        data: priorityDistribution,
      },
    ],
  };

  const capexOpexChartOptions = {
    chart: {
      type: 'pie',
    },
    title: {
      text: 'Capex vs Opex Distribution',
    },
    series: [
      {
        name: 'Costs',
        colorByPoint: true,
        data: capexOpexDistribution,
      },
    ],
  };

  const topCostsChartOptions = {
    chart: {
      type: 'column',
    },
    title: {
      text: 'Top 5 Costs',
    },
    series: [
      {
        name: 'Cost',
        data: topCosts.map(cost => ({
          name: cost.description,
          y: Number(cost.cost),
        })),
      },
    ],
  };

  return (
    <Container maxWidth="xl" sx={{ paddingTop: 3, paddingBottom: 7 }}>
      <Box sx={{ padding: 4 }}>
        <Typography variant="h4" gutterBottom>
          Cost Analysis Dashboard
        </Typography>
        <Grid container spacing={4}>
          {/* KPI Section */}
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6">Total Cost</Typography>
                <Typography variant="h4" color="green" sx={{ fontWeight: 'bold' }}>
                  ${Number(totalCost).toFixed(2)}
                </Typography>
                <Typography variant="body2">
                  This represents the total cost across all allocations.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6">Average Cost per Allocation</Typography>
                <Typography variant="h4" color="blue" sx={{ fontWeight: 'bold' }}>
                  ${Number(averageCost).toFixed(2)}
                </Typography>
                <Typography variant="body2">
                  This is the average cost per allocation.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6">Top 5 Costs</Typography>
                <ol>
                  {topCosts.map(cost => (
                    <li key={cost.id}>
                      <Typography variant="body2">
                        {cost.description} - Cost: ${Number(cost.cost).toFixed(2)}
                      </Typography>
                    </li>
                  ))}
                </ol>
              </CardContent>
            </Card>
          </Grid>

          {/* Chart Section */}
          <Grid item xs={12} md={6}>
            <HighchartsReact highcharts={Highcharts} options={departmentChartOptions} />
          </Grid>
          <Grid item xs={12} md={6}>
            <HighchartsReact highcharts={Highcharts} options={allocationTypeChartOptions} />
          </Grid>
          <Grid item xs={12} md={6}>
            <HighchartsReact highcharts={Highcharts} options={priorityChartOptions} />
          </Grid>
          <Grid item xs={12} md={6}>
            <HighchartsReact highcharts={Highcharts} options={capexOpexChartOptions} />
          </Grid>
          <Grid item xs={12} md={12}>
            <HighchartsReact highcharts={Highcharts} options={topCostsChartOptions} />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
