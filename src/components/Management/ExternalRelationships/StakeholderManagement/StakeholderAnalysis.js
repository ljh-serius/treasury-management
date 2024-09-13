import React, { useEffect, useState } from 'react';
import { Box, Grid, Typography, Card, CardContent } from '@mui/material';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const RevenueSharingAgreementsAnalytics = ({ fetchItems }) => {
  const [data, setData] = useState([]);
  const [kpis, setKpis] = useState({
    totalAgreements: 0,
    activeAgreements: 0,
    expiredAgreements: 0,
    terminatedAgreements: 0,
    averageRevenueShare: 0,
  });

  useEffect(() => {
    const loadData = async () => {
      const agreements = await fetchItems();
      setData(agreements);
      calculateKPIs(agreements);
    };

    loadData();
  }, [fetchItems]);

  const calculateKPIs = (items) => {
    const totalAgreements = items.length;
    const activeAgreements = items.filter((item) => item.status === 'active').length;
    const expiredAgreements = items.filter((item) => item.status === 'expired').length;
    const terminatedAgreements = items.filter((item) => item.status === 'terminated').length;
    const averageRevenueShare =
      items.reduce((acc, curr) => acc + parseFloat(curr.revenueShare || 0), 0) / totalAgreements;

    setKpis({
      totalAgreements,
      activeAgreements,
      expiredAgreements,
      terminatedAgreements,
      averageRevenueShare: averageRevenueShare.toFixed(2),
    });
  };

  const statusChart = {
    chart: {
      type: 'pie',
    },
    title: {
      text: 'Agreement Status Distribution',
    },
    series: [
      {
        name: 'Agreements',
        colorByPoint: true,
        data: [
          { name: 'Active', y: kpis.activeAgreements },
          { name: 'Expired', y: kpis.expiredAgreements },
          { name: 'Terminated', y: kpis.terminatedAgreements },
        ],
      },
    ],
  };

  const revenueShareChart = {
    chart: {
      type: 'column',
    },
    title: {
      text: 'Revenue Share by Partner',
    },
    xAxis: {
      categories: data.map((item) => item.partnerName),
    },
    yAxis: {
      title: {
        text: 'Revenue Share (%)',
      },
    },
    series: [
      {
        name: 'Revenue Share',
        data: data.map((item) => parseFloat(item.revenueShare || 0)),
      },
    ],
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Revenue Sharing Agreements Analytics
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6">Total Agreements</Typography>
              <Typography variant="h4">{kpis.totalAgreements}</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6">Active Agreements</Typography>
              <Typography variant="h4">{kpis.activeAgreements}</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6">Expired Agreements</Typography>
              <Typography variant="h4">{kpis.expiredAgreements}</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6">Terminated Agreements</Typography>
              <Typography variant="h4">{kpis.terminatedAgreements}</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Grid container spacing={3} mt={4}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6">Average Revenue Share (%)</Typography>
              <Typography variant="h4">{kpis.averageRevenueShare}</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Box mt={4}>
        <HighchartsReact highcharts={Highcharts} options={statusChart} />
      </Box>

      <Box mt={4}>
        <HighchartsReact highcharts={Highcharts} options={revenueShareChart} />
      </Box>
    </Box>
  );
};

export default RevenueSharingAgreementsAnalytics;
export const fieldsConfig = {
    analysisId: { label: 'Analysis ID', type: 'text', faker: 'datatype.uuid' },
    stakeholderName: { label: 'Stakeholder Name', type: 'text', faker: 'name.fullName' },
    analysisDate: { label: 'Analysis Date', type: 'date', faker: 'date.past' },
    influenceLevel: {
        label: 'Influence Level',
        type: 'select',
        options: [
            { id: 'high', label: 'High' },
            { id: 'medium', label: 'Medium' },
            { id: 'low', label: 'Low' },
        ],
        faker: 'random.arrayElement',
    },
    interestLevel: {
        label: 'Interest Level',
        type: 'select',
        options: [
            { id: 'high', label: 'High' },
            { id: 'medium', label: 'Medium' },
            { id: 'low', label: 'Low' },
        ],
        faker: 'random.arrayElement',
    },
    strategy: { label: 'Strategy', type: 'text', faker: 'lorem.paragraph' },
    outcomes: { label: 'Outcomes', type: 'text', faker: 'lorem.sentence' },
    createdBy: { label: 'Created By', type: 'text', faker: 'name.fullName' },
    createdDate: { label: 'Created Date', type: 'date', faker: 'date.past' },
    tags: {
        label: 'Tags',
        type: 'select',
        options: [
            { id: 'urgent', label: 'Urgent' },
            { id: 'review', label: 'Review' },
            { id: 'important', label: 'Important' },
            { id: 'completed', label: 'Completed' },
            { id: 'follow-up', label: 'Follow-Up' },
        ],
        multiple: true,
        faker: 'random.arrayElement',
    },
};

export const entityName = 'Stakeholder Analysis';
export const collectionName = 'stakeholder-analysis';
