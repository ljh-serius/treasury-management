import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { Box, Typography, Grid, Card, CardContent, Container } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import Backdrop from '@mui/material/Backdrop';

export default function SkillAssessmentsDashboard({ fetchItems }) {
  const [assessmentData, setAssessmentData] = useState([]);
  const [proficiencyDistribution, setProficiencyDistribution] = useState([]);
  const [assessmentTrendsData, setAssessmentTrendsData] = useState([]);
  const [scoreBySkillData, setScoreBySkillData] = useState([]);
  const [averageScore, setAverageScore] = useState(0);
  const [totalAssessments, setTotalAssessments] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const data = await fetchItems();
      setAssessmentData(data);
      processAssessmentData(data);
      setLoading(false);
    };

    fetchData();
  }, [fetchItems]);

  const processAssessmentData = (data) => {
    // Total Assessments
    setTotalAssessments(data.length);

    // Calculate Average Score
    const totalScore = data.reduce((acc, assessment) => acc + Number(assessment.score), 0);
    setAverageScore(totalScore / data.length);

    // Assessments by Proficiency Level
    const proficiencyCounts = data.reduce((acc, assessment) => {
      acc[assessment.proficiencyLevel] = (acc[assessment.proficiencyLevel] || 0) + 1;
      return acc;
    }, {});

    setProficiencyDistribution(Object.keys(proficiencyCounts).map(key => ({
      name: key,
      y: proficiencyCounts[key],
    })));

    // Assessment Trends over Time
    const trendsData = data.reduce((acc, assessment) => {
      const month = new Date(assessment.assessmentDate).getMonth() + 1;
      acc[month] = (acc[month] || 0) + 1;
      return acc;
    }, {});

    setAssessmentTrendsData(Object.keys(trendsData).map(key => ({
      name: `Month ${key}`,
      y: trendsData[key],
    })));

    // Scores by Skill
    const skillScores = data.reduce((acc, assessment) => {
      acc[assessment.skillName] = (acc[assessment.skillName] || 0) + Number(assessment.score);
      return acc;
    }, {});

    setScoreBySkillData(Object.keys(skillScores).map(key => ({
      name: key,
      y: skillScores[key] / data.filter(assessment => assessment.skillName === key).length, // Average score by skill
    })));
  };

  // Chart options for each chart
  const proficiencyChartOptions = {
    chart: {
      type: 'pie',
    },
    title: {
      text: 'Assessments by Proficiency Level',
    },
    series: [
      {
        name: 'Proficiency Level',
        colorByPoint: true,
        data: proficiencyDistribution,
      },
    ],
  };

  const assessmentTrendsChartOptions = {
    chart: {
      type: 'line',
    },
    title: {
      text: 'Assessment Trends Over Time',
    },
    xAxis: {
      categories: assessmentTrendsData.map(data => data.name),
    },
    series: [
      {
        name: 'Number of Assessments',
        data: assessmentTrendsData.map(data => data.y),
      },
    ],
  };

  const scoreBySkillChartOptions = {
    chart: {
      type: 'column',
    },
    title: {
      text: 'Average Score by Skill',
    },
    series: [
      {
        name: 'Skill',
        data: scoreBySkillData,
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
          Skill Assessments Dashboard
        </Typography>
        <Grid container spacing={4}>
          {/* KPI Section */}
          <Grid item xs={12} md={3}>
            <Card>
              <CardContent>
                <Typography variant="h6">Total Assessments</Typography>
                <Typography variant="h4" color="green" sx={{ fontWeight: 'bold' }}>
                  {totalAssessments}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={3}>
            <Card>
              <CardContent>
                <Typography variant="h6">Average Score</Typography>
                <Typography variant="h4" color="blue" sx={{ fontWeight: 'bold' }}>
                  {averageScore.toFixed(2)}
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Chart Section */}
          <Grid item xs={12} md={6}>
            <HighchartsReact highcharts={Highcharts} options={proficiencyChartOptions} />
          </Grid>
          <Grid item xs={12} md={6}>
            <HighchartsReact highcharts={Highcharts} options={assessmentTrendsChartOptions} />
          </Grid>
          <Grid item xs={12} md={12}>
            <HighchartsReact highcharts={Highcharts} options={scoreBySkillChartOptions} />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
