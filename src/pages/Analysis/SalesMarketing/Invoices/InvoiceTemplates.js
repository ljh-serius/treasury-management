import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { Box, Typography, Grid, Card, CardContent, Container, CircularProgress, Backdrop } from '@mui/material';

export default function InvoiceTemplatesDashboard({ fetchItems }) {
  const [templateData, setTemplateData] = useState([]);
  const [templateTypeDistribution, setTemplateTypeDistribution] = useState([]);
  const [totalTemplates, setTotalTemplates] = useState(0);
  const [recurringTemplates, setRecurringTemplates] = useState(0);
  const [oneTimeTemplates, setOneTimeTemplates] = useState(0);
  const [lastModifiedTemplates, setLastModifiedTemplates] = useState([]);
  const [revenueContribution, setRevenueContribution] = useState([]);
  const [createdByDistribution, setCreatedByDistribution] = useState([]);
  const [averageTemplateRevenue, setAverageTemplateRevenue] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDataAsync = async () => {
      setLoading(true);
      const data = await fetchItems();
      setTemplateData(data);
      processTemplateData(data);
      setLoading(false);
    };

    fetchDataAsync();
  }, [fetchItems]);

  const processTemplateData = (data) => {
    // Total Templates
    setTotalTemplates(data.length);

    // Count Recurring and One-time Templates
    const recurring = data.filter(template => template.tags.includes('recurring')).length;
    const oneTime = data.filter(template => template.tags.includes('one-time')).length;
    setRecurringTemplates(recurring);
    setOneTimeTemplates(oneTime);

    // Last Modified Templates (last 30 days)
    const recentTemplates = data.filter(template => new Date(template.lastModifiedDate) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000));
    setLastModifiedTemplates(recentTemplates.length);

    // Revenue Contribution by Template
    const revenueData = data.map(template => ({
      name: template.templateName,
      y: Number(template.revenueContribution),
    }));
    setRevenueContribution(revenueData);

    // Total and Average Revenue
    const totalRev = revenueData.reduce((acc, curr) => acc + curr.y, 0);
    setTotalRevenue(totalRev);
    setAverageTemplateRevenue(totalRev / data.length);

    // Created By Distribution
    const createdByCounts = data.reduce((acc, template) => {
      acc[template.createdBy] = (acc[template.createdBy] || 0) + 1;
      return acc;
    }, {});
    setCreatedByDistribution(Object.keys(createdByCounts).map(key => ({
      name: key,
      y: createdByCounts[key],
    })));

    // Template Type Distribution
    const typeCounts = {
      'Recurring Templates': recurring,
      'One-time Templates': oneTime,
    };
    setTemplateTypeDistribution(Object.keys(typeCounts).map(key => ({
      name: key,
      y: typeCounts[key],
    })));
  };

  // Highcharts options
  const templateTypeChartOptions = {
    chart: { type: 'pie' },
    title: { text: 'Template Type Distribution' },
    series: [{
      name: 'Template Types',
      colorByPoint: true,
      data: templateTypeDistribution,
    }],
  };

  const revenueChartOptions = {
    chart: { type: 'column' },
    title: { text: 'Revenue Contribution by Template' },
    series: [{
      name: 'Revenue',
      data: revenueContribution,
    }],
  };

  const createdByChartOptions = {
    chart: { type: 'pie' },
    title: { text: 'Templates Created by User' },
    series: [{
      name: 'Created By',
      colorByPoint: true,
      data: createdByDistribution,
    }],
  };

  return (
    <Container maxWidth="xl" sx={{ paddingTop: 3, paddingBottom: 7 }}>
      <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <Box sx={{ padding: 4 }}>
        <Typography variant="h4" gutterBottom>
          Invoice Templates Dashboard
        </Typography>

        <Grid container spacing={4}>
          {/* KPIs Section */}
          <Grid item xs={12} md={3}>
            <Card>
              <CardContent>
                <Typography variant="h6">Total Templates</Typography>
                <Typography variant="h4" color="green" sx={{ fontWeight: 'bold' }}>
                  {totalTemplates}
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={3}>
            <Card>
              <CardContent>
                <Typography variant="h6">Recurring Templates</Typography>
                <Typography variant="h4" color="blue" sx={{ fontWeight: 'bold' }}>
                  {recurringTemplates}
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={3}>
            <Card>
              <CardContent>
                <Typography variant="h6">One-time Templates</Typography>
                <Typography variant="h4" color="orange" sx={{ fontWeight: 'bold' }}>
                  {oneTimeTemplates}
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={3}>
            <Card>
              <CardContent>
                <Typography variant="h6">Last Modified in 30 Days</Typography>
                <Typography variant="h4" color="purple" sx={{ fontWeight: 'bold' }}>
                  {lastModifiedTemplates}
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={3}>
            <Card>
              <CardContent>
                <Typography variant="h6">Total Revenue from Templates</Typography>
                <Typography variant="h4" color="green" sx={{ fontWeight: 'bold' }}>
                  ${totalRevenue.toFixed(2)}
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={3}>
            <Card>
              <CardContent>
                <Typography variant="h6">Average Revenue per Template</Typography>
                <Typography variant="h4" color="blue" sx={{ fontWeight: 'bold' }}>
                  ${averageTemplateRevenue.toFixed(2)}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Grid container spacing={4} sx={{ marginTop: 4 }}>
          {/* Template Type Distribution Chart */}
          <Grid item xs={12} md={6}>
            <HighchartsReact highcharts={Highcharts} options={templateTypeChartOptions} />
          </Grid>

          {/* Revenue Contribution Chart */}
          <Grid item xs={12} md={6}>
            <HighchartsReact highcharts={Highcharts} options={revenueChartOptions} />
          </Grid>

          {/* Created By Distribution Chart */}
          <Grid item xs={12} md={6}>
            <HighchartsReact highcharts={Highcharts} options={createdByChartOptions} />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
