import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { Box, Typography, Grid, Card, CardContent, Container } from '@mui/material';

export default function ProjectAnalysisDashboard({ fetchProjects }) {
  const [projectsData, setProjectsData] = useState([]);
  const [statusDistribution, setStatusDistribution] = useState([]);
  const [progressData, setProgressData] = useState([]);
  const [budgetDistribution, setBudgetDistribution] = useState([]);
  const [monthlyTrendsData, setMonthlyTrendsData] = useState([]);
  const [priorityDistribution, setPriorityDistribution] = useState([]);
  const [totalBudget, setTotalBudget] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [averageProgress, setAverageProgress] = useState(0);
  const [topProjects, setTopProjects] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchProjects();
      if (data && data.length > 0) {
        setProjectsData(data);
        processProjectData(data);
      } else {
        console.log("No project data available.");
      }
    };

    fetchData();
  }, [fetchProjects]);

  const processProjectData = (data) => {
    if (!data || data.length === 0) {
      console.log("No data to process.");
      return;
    }

    // Status Distribution
    const statusCounts = data.reduce((acc, project) => {
      acc[project.status] = (acc[project.status] || 0) + 1;
      return acc;
    }, {});

    setStatusDistribution(Object.keys(statusCounts).map(key => ({
      name: key,
      y: statusCounts[key],
    })));

    // Progress Data
    const progressSum = data.reduce((acc, project) => acc + (Number(project.progress) || 0), 0);
    const averageProgressValue = data.length ? progressSum / data.length : 0;
    setAverageProgress(averageProgressValue);

    setProgressData(data.map(project => ({
      name: project.name,
      y: Number(project.progress) || 0,
    })));

    // Budget Distribution
    const budgetSum = data.reduce((acc, project) => acc + (Number(project.budget) || 0), 0);
    setTotalBudget(budgetSum);

    setBudgetDistribution(data.map(project => ({
      name: project.name,
      y: Number(project.budget) || 0,
    })));

    // Monthly Trends Data (Projects started each month)
    const trendCounts = data.reduce((acc, project) => {
      const month = new Date(project.startDate).getMonth() + 1;
      acc[month] = (acc[month] || 0) + 1;
      return acc;
    }, {});

    setMonthlyTrendsData(Object.keys(trendCounts).map(key => ({
      name: `Month ${key}`,
      y: trendCounts[key],
    })));

    // Priority Distribution
    const priorityCounts = data.reduce((acc, project) => {
      acc[project.priority] = (acc[project.priority] || 0) + 1;
      return acc;
    }, {});

    setPriorityDistribution(Object.keys(priorityCounts).map(key => ({
      name: key,
      y: priorityCounts[key],
    })));

    // Total Revenue
    const revenueSum = data.reduce((acc, project) => acc + (Number(project.revenueGenerated) || 0), 0);
    setTotalRevenue(revenueSum);

    // Top 5 Projects by Budget
    const topProjectsList = data
      .sort((a, b) => (Number(b.budget) || 0) - (Number(a.budget) || 0))
      .slice(0, 5);
    setTopProjects(topProjectsList);
  };

  const statusChartOptions = {
    chart: {
      type: 'pie',
    },
    title: {
      text: 'Project Status Distribution',
    },
    series: [
      {
        name: 'Projects',
        colorByPoint: true,
        data: statusDistribution,
      },
    ],
  };

  const progressChartOptions = {
    chart: {
      type: 'column',
    },
    title: {
      text: 'Project Progress (%)',
    },
    series: [
      {
        name: 'Progress',
        data: progressData,
      },
    ],
  };

  const budgetChartOptions = {
    chart: {
      type: 'column',
    },
    title: {
      text: 'Budget Allocation per Project',
    },
    series: [
      {
        name: 'Budget',
        data: budgetDistribution,
      },
    ],
  };

  const monthlyTrendsChartOptions = {
    chart: {
      type: 'line',
    },
    title: {
      text: 'Monthly Project Start Trends',
    },
    xAxis: {
      categories: monthlyTrendsData.map(data => data.name),
    },
    series: [
      {
        name: 'Number of Projects',
        data: monthlyTrendsData.map(data => data.y),
      },
    ],
  };

  const priorityChartOptions = {
    chart: {
      type: 'pie',
    },
    title: {
      text: 'Project Priority Distribution',
    },
    series: [
      {
        name: 'Projects',
        colorByPoint: true,
        data: priorityDistribution,
      },
    ],
  };

  return (
    <Container maxWidth="xl" sx={{ paddingTop: 3, paddingBottom: 7 }}>
      <Box sx={{ padding: 4 }}>
        <Typography variant="h4" gutterBottom>
          Project Analysis Dashboard
        </Typography>
        <Grid container spacing={4}>
          {/* KPI Section */}
          <Grid item xs={12} md={3}>
            <Card>
              <CardContent>
                <Typography variant="h6">Total Budget</Typography>
                <Typography variant="h4" color="green" sx={{ fontWeight: 'bold' }}>
                  ${Number(totalBudget).toFixed(2)}
                </Typography>
                <Typography variant="body2">
                  This represents the total budget allocated across all projects.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={3}>
            <Card>
              <CardContent>
                <Typography variant="h6">Total Revenue Generated</Typography>
                <Typography variant="h4" color="blue" sx={{ fontWeight: 'bold' }}>
                  ${Number(totalRevenue).toFixed(2)}
                </Typography>
                <Typography variant="body2">
                  This represents the total revenue generated by all projects.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={3}>
            <Card>
              <CardContent>
                <Typography variant="h6">Average Project Progress</Typography>
                <Typography variant="h4" color="orange" sx={{ fontWeight: 'bold' }}>
                  {Number(averageProgress).toFixed(2)}%
                </Typography>
                <Typography variant="body2">
                  This is the average progress of all ongoing projects.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={3}>
            <Card>
              <CardContent>
                <Typography variant="h6">Top 5 Projects by Budget</Typography>
                <ol>
                  {topProjects.map(project => (
                    <li key={project.id}>
                      <Typography variant="body2">
                        {project.name} - Budget: ${Number(project.budget).toFixed(2)}
                      </Typography>
                    </li>
                  ))}
                </ol>
              </CardContent>
            </Card>
          </Grid>

          {/* Chart Section */}
          <Grid item xs={12} md={6}>
            <HighchartsReact highcharts={Highcharts} options={statusChartOptions} />
          </Grid>
          <Grid item xs={12} md={6}>
            <HighchartsReact highcharts={Highcharts} options={progressChartOptions} />
          </Grid>
          <Grid item xs={12} md={6}>
            <HighchartsReact highcharts={Highcharts} options={budgetChartOptions} />
          </Grid>
          <Grid item xs={12} md={6}>
            <HighchartsReact highcharts={Highcharts} options={monthlyTrendsChartOptions} />
          </Grid>
          <Grid item xs={12} md={6}>
            <HighchartsReact highcharts={Highcharts} options={priorityChartOptions} />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
