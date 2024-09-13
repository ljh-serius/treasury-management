import React, { useEffect, useState } from 'react';
import { Box, Grid, Typography, Card, CardContent } from '@mui/material';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const LegalBriefsAnalytics = ({ fetchItems }) => {
  const [data, setData] = useState([]);
  const [kpis, setKpis] = useState({
    totalBriefs: 0,
    submittedBriefs: 0,
    underReviewBriefs: 0,
    approvedBriefs: 0,
    rejectedBriefs: 0,
  });

  useEffect(() => {
    const loadData = async () => {
      const briefs = await fetchItems();
      setData(briefs);
      calculateKPIs(briefs);
    };

    loadData();
  }, [fetchItems]);

  const calculateKPIs = (items) => {
    const totalBriefs = items.length;
    const submittedBriefs = items.filter((item) => item.status === 'submitted').length;
    const underReviewBriefs = items.filter((item) => item.status === 'under-review').length;
    const approvedBriefs = items.filter((item) => item.status === 'approved').length;
    const rejectedBriefs = items.filter((item) => item.status === 'rejected').length;

    setKpis({
      totalBriefs,
      submittedBriefs,
      underReviewBriefs,
      approvedBriefs,
      rejectedBriefs,
    });
  };

  const statusChart = {
    chart: {
      type: 'pie',
    },
    title: {
      text: 'Brief Status Distribution',
    },
    series: [
      {
        name: 'Briefs',
        colorByPoint: true,
        data: [
          { name: 'Submitted', y: kpis.submittedBriefs },
          { name: 'Under Review', y: kpis.underReviewBriefs },
          { name: 'Approved', y: kpis.approvedBriefs },
          { name: 'Rejected', y: kpis.rejectedBriefs },
        ],
      },
    ],
  };

  const courtChart = {
    chart: {
      type: 'column',
    },
    title: {
      text: 'Briefs by Court',
    },
    xAxis: {
      categories: data.map((item) => item.court),
    },
    yAxis: {
      title: {
        text: 'Number of Briefs',
      },
    },
    series: [
      {
        name: 'Briefs',
        data: data.reduce((acc, curr) => {
          acc[curr.court] = (acc[curr.court] || 0) + 1;
          return acc;
        }, {}),
      },
    ],
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Legal Briefs Analytics
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6">Total Briefs</Typography>
              <Typography variant="h4">{kpis.totalBriefs}</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6">Submitted Briefs</Typography>
              <Typography variant="h4">{kpis.submittedBriefs}</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6">Under Review Briefs</Typography>
              <Typography variant="h4">{kpis.underReviewBriefs}</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6">Approved Briefs</Typography>
              <Typography variant="h4">{kpis.approvedBriefs}</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6">Rejected Briefs</Typography>
              <Typography variant="h4">{kpis.rejectedBriefs}</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Box mt={4}>
        <HighchartsReact highcharts={Highcharts} options={statusChart} />
      </Box>

      <Box mt={4}>
        <HighchartsReact highcharts={Highcharts} options={courtChart} />
      </Box>
    </Box>
  );
};

export default LegalBriefsAnalytics;
