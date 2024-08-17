import React, { useState, useEffect } from 'react';
import {
  Box, Grid, Paper, Typography, CircularProgress, Container, 
  Card, CardContent, CardHeader, Divider
} from '@mui/material';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { fetchProjects } from '../utils/projectsFirebaseHelpers';  // Adjust the import based on your structure

export default function ProjectsStatistic(){
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const projectsData = await fetchProjects();
      setProjects(projectsData);
      setLoading(false);
    };

    fetchData();
  }, []);

  if (loading) {
    return <CircularProgress />;
  }

  const totalProjects = projects.length;
  const completedProjects = projects.filter(p => p.status === 'completed').length;
  const inProgressProjects = projects.filter(p => p.status === 'in_progress').length;
  const onHoldProjects = projects.filter(p => p.status === 'on_hold').length;
  const averageProgress = projects.reduce((acc, p) => acc + p.progress, 0) / totalProjects || 0;

  const projectTypesCount = projects.reduce((acc, p) => {
    acc[p.projectType] = (acc[p.projectType] || 0) + 1;
    return acc;
  }, {});

  const budgetData = projects.map(p => p.budget);
  const totalBudget = budgetData.reduce((acc, budget) => acc + budget, 0);

  const businessImpactCount = projects.reduce((acc, p) => {
    acc[p.businessImpact] = (acc[p.businessImpact] || 0) + 1;
    return acc;
  }, {});

  const resourceAllocationCount = projects.reduce((acc, p) => {
    const key = p.resourceAllocation || 'unspecified';
    acc[key] = (acc[key] || 0) + 1;
    return acc;
  }, {});

  // Highcharts configuration for various charts

  const pieChartOptions = {
    chart: {
      type: 'pie'
    },
    title: {
      text: 'Project Status Distribution'
    },
    series: [{
      name: 'Projects',
      colorByPoint: true,
      data: [
        { name: 'Completed', y: completedProjects },
        { name: 'In Progress', y: inProgressProjects },
        { name: 'On Hold', y: onHoldProjects },
      ]
    }]
  };

  const barChartOptions = {
    chart: {
      type: 'bar'
    },
    title: {
      text: 'Project Budget Overview'
    },
    xAxis: {
      categories: projects.map(p => p.name),
    },
    yAxis: {
      title: {
        text: 'Budget ($)'
      }
    },
    series: [{
      name: 'Budget',
      data: budgetData
    }]
  };

  const lineChartOptions = {
    chart: {
      type: 'line'
    },
    title: {
      text: 'Average Progress Over Time'
    },
    xAxis: {
      categories: projects.map(p => p.name),
    },
    yAxis: {
      title: {
        text: 'Progress (%)'
      }
    },
    series: [{
      name: 'Progress',
      data: projects.map(p => p.progress)
    }]
  };

  const columnChartOptions = {
    chart: {
      type: 'column'
    },
    title: {
      text: 'Project Types Distribution'
    },
    xAxis: {
      categories: Object.keys(projectTypesCount),
      crosshair: true
    },
    yAxis: {
      min: 0,
      title: {
        text: 'Number of Projects'
      }
    },
    series: [{
      name: 'Projects',
      data: Object.values(projectTypesCount)
    }]
  };

  const businessImpactChartOptions = {
    chart: {
      type: 'column'
    },
    title: {
      text: 'Business Impact Distribution'
    },
    xAxis: {
      categories: Object.keys(businessImpactCount),
      crosshair: true
    },
    yAxis: {
      min: 0,
      title: {
        text: 'Number of Projects'
      }
    },
    series: [{
      name: 'Projects',
      data: Object.values(businessImpactCount)
    }]
  };

  const resourceAllocationChartOptions = {
    chart: {
      type: 'pie'
    },
    title: {
      text: 'Resource Allocation Distribution'
    },
    series: [{
      name: 'Projects',
      colorByPoint: true,
      data: Object.keys(resourceAllocationCount).map(key => ({
        name: key,
        y: resourceAllocationCount[key]
      }))
    }]
  };

  return (
    <Container maxWidth="xl" sx={{ paddingTop: 3, paddingBottom: 7 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Project KPIs Dashboard
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Card>
            <CardHeader title="Total Projects" />
            <CardContent>
              <Typography variant="h5">{totalProjects}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card>
            <CardHeader title="Completed Projects" />
            <CardContent>
              <Typography variant="h5">{completedProjects}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card>
            <CardHeader title="Average Progress" />
            <CardContent>
              <Typography variant="h5">{averageProgress.toFixed(2)}%</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card>
            <CardHeader title="Total Budget" />
            <CardContent>
              <Typography variant="h5">${totalBudget.toLocaleString()}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card>
            <CardHeader title="Highest Business Impact" />
            <CardContent>
              <Typography variant="h5">
                {Object.keys(businessImpactCount).reduce((a, b) => businessImpactCount[a] > businessImpactCount[b] ? a : b)}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card>
            <CardHeader title="Most Used Resource Allocation" />
            <CardContent>
              <Typography variant="h5">
                {Object.keys(resourceAllocationCount).reduce((a, b) => resourceAllocationCount[a] > resourceAllocationCount[b] ? a : b)}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <Divider sx={{ marginY: 3 }} />
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ padding: 2 }}>
            <HighchartsReact highcharts={Highcharts} options={pieChartOptions} />
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ padding: 2 }}>
            <HighchartsReact highcharts={Highcharts} options={columnChartOptions} />
          </Paper>
        </Grid>
      </Grid>
      <Grid container spacing={3} sx={{ marginTop: 3 }}>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ padding: 2 }}>
            <HighchartsReact highcharts={Highcharts} options={barChartOptions} />
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ padding: 2 }}>
            <HighchartsReact highcharts={Highcharts} options={lineChartOptions} />
          </Paper>
        </Grid>
      </Grid>
      <Grid container spacing={3} sx={{ marginTop: 3 }}>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ padding: 2 }}>
            <HighchartsReact highcharts={Highcharts} options={businessImpactChartOptions} />
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ padding: 2 }}>
            <HighchartsReact highcharts={Highcharts} options={resourceAllocationChartOptions} />
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}
