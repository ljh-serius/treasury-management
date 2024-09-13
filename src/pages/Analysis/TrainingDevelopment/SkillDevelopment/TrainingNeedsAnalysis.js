import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { Box, Typography, Grid, Card, CardContent, Container } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import Backdrop from '@mui/material/Backdrop';

export default function TrainingNeedsAnalysisDashboard({ fetchItems }) {
  const [analysisData, setAnalysisData] = useState([]);
  const [priorityDistribution, setPriorityDistribution] = useState([]);
  const [departmentDistribution, setDepartmentDistribution] = useState([]);
  const [analysisTrendsData, setAnalysisTrendsData] = useState([]);
  const [recommendedTrainingData, setRecommendedTrainingData] = useState([]);
  const [totalAnalyses, setTotalAnalyses] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const data = await fetchItems();
      setAnalysisData(data);
      processAnalysisData(data);
      setLoading(false);
    };

    fetchData();
  }, [fetchItems]);

  const processAnalysisData = (data) => {
    // Total Analyses
    setTotalAnalyses(data.length);

    // Priority Distribution
    const priorityCounts = data.reduce((acc, analysis) => {
      acc[analysis.priorityLevel] = (acc[analysis.priorityLevel] || 0) + 1;
      return acc;
    }, {});

    setPriorityDistribution(Object.keys(priorityCounts).map(key => ({
      name: key,
      y: priorityCounts[key],
    })));

    // Analyses by Department
    const departmentCounts = data.reduce((acc, analysis) => {
      acc[analysis.department] = (acc[analysis.department] || 0) + 1;
      return acc;
    }, {});

    setDepartmentDistribution(Object.keys(departmentCounts).map(key => ({
      name: key,
      y: departmentCounts[key],
    })));

    // Analysis Trends Over Time
    const trendsData = data.reduce((acc, analysis) => {
      const month = new Date(analysis.analysisDate).getMonth() + 1;
      acc[month] = (acc[month] || 0) + 1;
      return acc;
    }, {});

    setAnalysisTrendsData(Object.keys(trendsData).map(key => ({
      name: `Month ${key}`,
      y: trendsData[key],
    })));

    // Recommended Training Frequency
    const trainingCounts = data.reduce((acc, analysis) => {
      acc[analysis.recommendedTraining] = (acc[analysis.recommendedTraining] || 0) + 1;
      return acc;
    }, {});

    setRecommendedTrainingData(Object.keys(trainingCounts).map(key => ({
      name: key,
      y: trainingCounts[key],
    })));
  };

  // Chart options for each chart
  const priorityChartOptions = {
    chart: {
      type: 'pie',
    },
    title: {
      text: 'Priority Level Distribution',
    },
    series: [
      {
        name: 'Priority Level',
        colorByPoint: true,
        data: priorityDistribution,
      },
    ],
  };

  const departmentChartOptions = {
    chart: {
      type: 'column',
    },
    title: {
      text: 'Analyses by Department',
    },
    series: [
      {
        name: 'Department',
        data: departmentDistribution,
      },
    ],
  };

  const analysisTrendsChartOptions = {
    chart: {
      type: 'line',
    },
    title: {
      text: 'Analysis Trends Over Time',
    },
    xAxis: {
      categories: analysisTrendsData.map(data => data.name),
    },
    series: [
      {
        name: 'Number of Analyses',
        data: analysisTrendsData.map(data => data.y),
      },
    ],
  };

  const recommendedTrainingChartOptions = {
    chart: {
      type: 'column',
    },
    title: {
      text: 'Recommended Training Programs',
    },
    series: [
      {
        name: 'Training',
        data: recommendedTrainingData,
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
          Training Needs Analysis Dashboard
        </Typography>
        <Grid container spacing={4}>
          {/* KPI Section */}
          <Grid item xs={12} md={3}>
            <Card>
              <CardContent>
                <Typography variant="h6">Total Analyses</Typography>
                <Typography variant="h4" color="green" sx={{ fontWeight: 'bold' }}>
                  {totalAnalyses}
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Chart Section */}
          <Grid item xs={12} md={6}>
            <HighchartsReact highcharts={Highcharts} options={priorityChartOptions} />
          </Grid>
          <Grid item xs={12} md={6}>
            <HighchartsReact highcharts={Highcharts} options={departmentChartOptions} />
          </Grid>
          <Grid item xs={12} md={6}>
            <HighchartsReact highcharts={Highcharts} options={analysisTrendsChartOptions} />
          </Grid>
          <Grid item xs={12} md={6}>
            <HighchartsReact highcharts={Highcharts} options={recommendedTrainingChartOptions} />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
