import React, { useEffect, useState } from 'react';
import { Box, Grid, Typography, Card, CardContent } from '@mui/material';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const VendorAssessmentsAnalytics = ({ fetchItems }) => {
  const [data, setData] = useState([]);
  const [kpis, setKpis] = useState({
    totalAssessments: 0,
    averageScore: 0,
    urgentAssessments: 0,
    completedAssessments: 0,
  });

  useEffect(() => {
    const loadData = async () => {
      const assessments = await fetchItems();
      setData(assessments);
      calculateKPIs(assessments);
    };

    loadData();
  }, [fetchItems]);

  const calculateKPIs = (items) => {
    const totalAssessments = items.length;
    const averageScore = items.reduce((acc, curr) => acc + parseFloat(curr.score || 0), 0) / totalAssessments;
    const urgentAssessments = items.filter((item) => item.tags.includes('urgent')).length;
    const completedAssessments = items.filter((item) => item.tags.includes('completed')).length;

    setKpis({
      totalAssessments,
      averageScore: averageScore.toFixed(2),
      urgentAssessments,
      completedAssessments,
    });
  };

  const scoreDistributionChart = {
    chart: {
      type: 'column',
    },
    title: {
      text: 'Score Distribution by Vendor',
    },
    xAxis: {
      categories: data.map((item) => item.vendorName),
    },
    yAxis: {
      title: {
        text: 'Score',
      },
    },
    series: [
      {
        name: 'Score',
        data: data.map((item) => parseFloat(item.score || 0)),
      },
    ],
  };

  const tagsDistributionChart = {
    chart: {
      type: 'pie',
    },
    title: {
      text: 'Assessment Tags Distribution',
    },
    series: [
      {
        name: 'Tags',
        colorByPoint: true,
        data: [
          { name: 'Urgent', y: kpis.urgentAssessments },
          { name: 'Completed', y: kpis.completedAssessments },
        ],
      },
    ],
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Vendor Assessments Analytics
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6">Total Assessments</Typography>
              <Typography variant="h4">{kpis.totalAssessments}</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6">Average Score</Typography>
              <Typography variant="h4">{kpis.averageScore}</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6">Urgent Assessments</Typography>
              <Typography variant="h4">{kpis.urgentAssessments}</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6">Completed Assessments</Typography>
              <Typography variant="h4">{kpis.completedAssessments}</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Box mt={4}>
        <HighchartsReact highcharts={Highcharts} options={scoreDistributionChart} />
      </Box>

      <Box mt={4}>
        <HighchartsReact highcharts={Highcharts} options={tagsDistributionChart} />
      </Box>
    </Box>
  );
};

export default VendorAssessmentsAnalytics;
