import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { Box, Typography, Grid, Card, CardContent, Container, CircularProgress, Backdrop } from '@mui/material';

export default function RiskAssessmentsDashboard({ fetchItems }) {
  const [riskData, setRiskData] = useState([]);
  const [totalAssessments, setTotalAssessments] = useState(0);
  const [likelihoodDistribution, setLikelihoodDistribution] = useState([]);
  const [impactDistribution, setImpactDistribution] = useState([]);
  const [averageRiskScore, setAverageRiskScore] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const data = await fetchItems();
      setRiskData(data);
      processRiskData(data);
      setLoading(false);
    };

    fetchData();
  }, [fetchItems]);

  const processRiskData = (data) => {
    setTotalAssessments(data.length);

    let totalRiskScore = 0;
    const likelihoodMap = {};
    const impactMap = {};

    data.forEach((item) => {
      // Calculate total risk score for average
      totalRiskScore += item.riskScore;

      // Process likelihood distribution
      const likelihood = item.likelihood;
      likelihoodMap[likelihood] = (likelihoodMap[likelihood] || 0) + 1;

      // Process impact distribution
      const impact = item.impact;
      impactMap[impact] = (impactMap[impact] || 0) + 1;
    });

    setAverageRiskScore((totalRiskScore / data.length).toFixed(2));

    const likelihoodArray = Object.entries(likelihoodMap).map(([likelihood, count]) => ({
      name: likelihood,
      y: count,
    }));

    const impactArray = Object.entries(impactMap).map(([impact, count]) => ({
      name: impact,
      y: count,
    }));

    setLikelihoodDistribution(likelihoodArray);
    setImpactDistribution(impactArray);
  };

  // Highcharts options for Likelihood Distribution
  const likelihoodChartOptions = {
    chart: { type: 'pie' },
    title: { text: 'Likelihood Distribution' },
    series: [
      {
        name: 'Likelihood',
        colorByPoint: true,
        data: likelihoodDistribution,
      },
    ],
  };

  // Highcharts options for Impact Distribution
  const impactChartOptions = {
    chart: { type: 'pie' },
    title: { text: 'Impact Distribution' },
    series: [
      {
        name: 'Impact',
        colorByPoint: true,
        data: impactDistribution,
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
          Risk Assessments Dashboard
        </Typography>

        <Grid container spacing={4}>
          {/* KPIs Section */}
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
                <Typography variant="h6">Average Risk Score</Typography>
                <Typography variant="h4" color="orange" sx={{ fontWeight: 'bold' }}>
                  {averageRiskScore}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Grid container spacing={4} sx={{ marginTop: 4 }}>
          {/* Likelihood Distribution Chart */}
          <Grid item xs={12} md={6}>
            <HighchartsReact highcharts={Highcharts} options={likelihoodChartOptions} />
          </Grid>

          {/* Impact Distribution Chart */}
          <Grid item xs={12} md={6}>
            <HighchartsReact highcharts={Highcharts} options={impactChartOptions} />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
