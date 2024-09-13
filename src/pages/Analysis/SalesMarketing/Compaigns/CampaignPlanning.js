import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { Box, Typography, Grid, Card, CardContent, Container, CircularProgress, Backdrop } from '@mui/material';

export default function CampaignAnalyticsDashboard({ fetchItems }) {
  const [campaignData, setCampaignData] = useState([]);
  const [budgetDistribution, setBudgetDistribution] = useState([]);
  const [tagDistribution, setTagDistribution] = useState([]);
  const [averageBudget, setAverageBudget] = useState(0);
  const [totalBudget, setTotalBudget] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDataAsync = async () => {
      setLoading(true);
      const data = await fetchItems();
      setCampaignData(data);
      processCampaignData(data);
      setLoading(false);
    };

    fetchDataAsync();
  }, [fetchItems]);

  const processCampaignData = (data) => {
    // Total Budget
    const total = data.reduce((acc, campaign) => acc + Number(campaign.budget), 0);
    setTotalBudget(total);

    // Average Budget
    setAverageBudget(total / data.length);

    // Budget Distribution
    const budgetCounts = data.reduce((acc, campaign) => {
      acc[campaign.campaignName] = (acc[campaign.campaignName] || 0) + Number(campaign.budget);
      return acc;
    }, {});

    setBudgetDistribution(Object.keys(budgetCounts).map(key => ({
      name: key,
      y: budgetCounts[key],
    })));

    // Tags Distribution
    const tagCounts = data.reduce((acc, campaign) => {
      campaign.tags.forEach(tag => {
        acc[tag] = (acc[tag] || 0) + 1;
      });
      return acc;
    }, {});

    setTagDistribution(Object.keys(tagCounts).map(key => ({
      name: key,
      y: tagCounts[key],
    })));
  };

  // Chart options
  const budgetChartOptions = {
    chart: {
      type: 'column',
    },
    title: {
      text: 'Budget Distribution by Campaign',
    },
    series: [
      {
        name: 'Budget',
        data: budgetDistribution,
      },
    ],
  };

  const tagChartOptions = {
    chart: {
      type: 'pie',
    },
    title: {
      text: 'Tags Distribution',
    },
    series: [
      {
        name: 'Tags',
        colorByPoint: true,
        data: tagDistribution,
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
          Campaign Analytics Dashboard
        </Typography>

        <Grid container spacing={4}>
          {/* KPIs Section */}
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6">Total Budget</Typography>
                <Typography variant="h4" color="green" sx={{ fontWeight: 'bold' }}>
                  ${totalBudget.toFixed(2)}
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6">Average Budget</Typography>
                <Typography variant="h4" color="blue" sx={{ fontWeight: 'bold' }}>
                  ${averageBudget.toFixed(2)}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Grid container spacing={4} sx={{ marginTop: 4 }}>
          {/* Budget Distribution */}
          <Grid item xs={12} md={6}>
            <HighchartsReact highcharts={Highcharts} options={budgetChartOptions} />
          </Grid>

          {/* Tags Distribution */}
          <Grid item xs={12} md={6}>
            <HighchartsReact highcharts={Highcharts} options={tagChartOptions} />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
