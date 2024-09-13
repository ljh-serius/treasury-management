import React, { useEffect, useState } from 'react';
import { Box, Grid, Typography, Card, CardContent } from '@mui/material';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const StakeholderFeedbackAnalytics = ({ fetchItems }) => {
  const [data, setData] = useState([]);
  const [kpis, setKpis] = useState({
    totalFeedbacks: 0,
    positiveFeedbacks: 0,
    neutralFeedbacks: 0,
    negativeFeedbacks: 0,
    respondedCount: 0,
    notRespondedCount: 0,
  });

  useEffect(() => {
    const loadData = async () => {
      const feedbacks = await fetchItems();
      setData(feedbacks);
      calculateKPIs(feedbacks);
    };

    loadData();
  }, [fetchItems]);

  const calculateKPIs = (items) => {
    const totalFeedbacks = items.length;
    const positiveFeedbacks = items.filter((item) => item.feedbackType === 'positive').length;
    const neutralFeedbacks = items.filter((item) => item.feedbackType === 'neutral').length;
    const negativeFeedbacks = items.filter((item) => item.feedbackType === 'negative').length;
    const respondedCount = items.filter((item) => item.responseStatus === 'responded').length;
    const notRespondedCount = items.filter((item) => item.responseStatus === 'not-responded').length;

    setKpis({
      totalFeedbacks,
      positiveFeedbacks,
      neutralFeedbacks,
      negativeFeedbacks,
      respondedCount,
      notRespondedCount,
    });
  };

  const feedbackTypeChart = {
    chart: {
      type: 'pie',
    },
    title: {
      text: 'Feedback Type Distribution',
    },
    series: [
      {
        name: 'Feedbacks',
        colorByPoint: true,
        data: [
          { name: 'Positive', y: kpis.positiveFeedbacks },
          { name: 'Neutral', y: kpis.neutralFeedbacks },
          { name: 'Negative', y: kpis.negativeFeedbacks },
        ],
      },
    ],
  };

  const responseStatusChart = {
    chart: {
      type: 'pie',
    },
    title: {
      text: 'Response Status Distribution',
    },
    series: [
      {
        name: 'Response Status',
        colorByPoint: true,
        data: [
          { name: 'Responded', y: kpis.respondedCount },
          { name: 'Not Responded', y: kpis.notRespondedCount },
        ],
      },
    ],
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Stakeholder Feedback Analytics
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6">Total Feedbacks</Typography>
              <Typography variant="h4">{kpis.totalFeedbacks}</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6">Positive Feedbacks</Typography>
              <Typography variant="h4">{kpis.positiveFeedbacks}</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6">Neutral Feedbacks</Typography>
              <Typography variant="h4">{kpis.neutralFeedbacks}</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6">Negative Feedbacks</Typography>
              <Typography variant="h4">{kpis.negativeFeedbacks}</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Grid container spacing={3} mt={4}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6">Responded Feedbacks</Typography>
              <Typography variant="h4">{kpis.respondedCount}</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6">Not Responded Feedbacks</Typography>
              <Typography variant="h4">{kpis.notRespondedCount}</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Box mt={4}>
        <HighchartsReact highcharts={Highcharts} options={feedbackTypeChart} />
      </Box>

      <Box mt={4}>
        <HighchartsReact highcharts={Highcharts} options={responseStatusChart} />
      </Box>
    </Box>
  );
};

export default StakeholderFeedbackAnalytics;
