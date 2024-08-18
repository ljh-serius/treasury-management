import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { Box, Typography, Grid, Card, CardContent, Container } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import Backdrop from '@mui/material/Backdrop';

export default function PartnerAnalysisDashboard({ fetchItems }) {
  const [partnersData, setPartnersData] = useState([]);
  const [industryDistribution, setIndustryDistribution] = useState([]);
  const [regionDistribution, setRegionDistribution] = useState([]);
  const [partnerTypeDistribution, setPartnerTypeDistribution] = useState([]);
  const [riskLevelDistribution, setRiskLevelDistribution] = useState([]);
  const [totalContractValue, setTotalContractValue] = useState(0);
  const [averageContractValue, setAverageContractValue] = useState(0);
  const [topPartners, setTopPartners] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); // Start loading
      const data = await fetchItems();
      if (data && data.length > 0) {
        setPartnersData(data);
        processPartnerData(data);
      } else {
        console.log("No partner data available.");
      }
      setLoading(false); // Stop loading
    };

    fetchData();
  }, [fetchItems]);

  const processPartnerData = (data) => {
    if (!data || data.length === 0) {
      console.log("No data to process.");
      return;
    }

    // Industry Distribution
    const industryCounts = data.reduce((acc, partner) => {
      acc[partner.industry] = (acc[partner.industry] || 0) + 1;
      return acc;
    }, {});

    setIndustryDistribution(Object.keys(industryCounts).map(key => ({
      name: key,
      y: industryCounts[key],
    })));

    // Region Distribution
    const regionCounts = data.reduce((acc, partner) => {
      acc[partner.region] = (acc[partner.region] || 0) + 1;
      return acc;
    }, {});

    setRegionDistribution(Object.keys(regionCounts).map(key => ({
      name: key,
      y: regionCounts[key],
    })));

    // Partner Type Distribution
    const partnerTypeCounts = data.reduce((acc, partner) => {
      acc[partner.partnerType] = (acc[partner.partnerType] || 0) + 1;
      return acc;
    }, {});

    setPartnerTypeDistribution(Object.keys(partnerTypeCounts).map(key => ({
      name: key,
      y: partnerTypeCounts[key],
    })));

    // Risk Level Distribution
    const riskLevelCounts = data.reduce((acc, partner) => {
      acc[partner.riskLevel] = (acc[partner.riskLevel] || 0) + 1;
      return acc;
    }, {});

    setRiskLevelDistribution(Object.keys(riskLevelCounts).map(key => ({
      name: key,
      y: riskLevelCounts[key],
    })));

    // Total and Average Contract Value
    const totalValue = data.reduce((acc, partner) => acc + (Number(partner.contractValue) || 0), 0);
    setTotalContractValue(totalValue);
    const averageValue = data.length ? totalValue / data.length : 0;
    setAverageContractValue(averageValue);

    // Top 5 Partners by Contract Value
    const topPartnersList = data
      .sort((a, b) => (Number(b.contractValue) || 0) - (Number(a.contractValue) || 0))
      .slice(0, 5);
    setTopPartners(topPartnersList);
  };

  const industryChartOptions = {
    chart: {
      type: 'pie',
    },
    title: {
      text: 'Partner Distribution by Industry',
    },
    series: [
      {
        name: 'Partners',
        colorByPoint: true,
        data: industryDistribution,
      },
    ],
  };

  const regionChartOptions = {
    chart: {
      type: 'pie',
    },
    title: {
      text: 'Partner Distribution by Region',
    },
    series: [
      {
        name: 'Partners',
        colorByPoint: true,
        data: regionDistribution,
      },
    ],
  };

  const partnerTypeChartOptions = {
    chart: {
      type: 'pie',
    },
    title: {
      text: 'Partner Distribution by Type',
    },
    series: [
      {
        name: 'Partners',
        colorByPoint: true,
        data: partnerTypeDistribution,
      },
    ],
  };

  const riskLevelChartOptions = {
    chart: {
      type: 'pie',
    },
    title: {
      text: 'Partner Risk Level Distribution',
    },
    series: [
      {
        name: 'Partners',
        colorByPoint: true,
        data: riskLevelDistribution,
      },
    ],
  };

  const topPartnersChartOptions = {
    chart: {
      type: 'column',
    },
    title: {
      text: 'Top 5 Partners by Contract Value',
    },
    series: [
      {
        name: 'Contract Value',
        data: topPartners.map(partner => ({
          name: partner.name,
          y: Number(partner.contractValue),
        })),
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
          Partner Analysis Dashboard
        </Typography>
        <Grid container spacing={4}>
          {/* KPI Section */}
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6">Total Contract Value</Typography>
                <Typography variant="h4" color="green" sx={{ fontWeight: 'bold' }}>
                  ${Number(totalContractValue).toFixed(2)}
                </Typography>
                <Typography variant="body2">
                  This represents the total value of all partner contracts.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6">Average Contract Value</Typography>
                <Typography variant="h4" color="blue" sx={{ fontWeight: 'bold' }}>
                  ${Number(averageContractValue).toFixed(2)}
                </Typography>
                <Typography variant="body2">
                  This is the average value per partner contract.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6">Top 5 Partners by Contract Value</Typography>
                <ol>
                  {topPartners.map(partner => (
                    <li key={partner.id}>
                      <Typography variant="body2">
                        {partner.name} - Value: ${Number(partner.contractValue).toFixed(2)}
                      </Typography>
                    </li>
                  ))}
                </ol>
              </CardContent>
            </Card>
          </Grid>

          {/* Chart Section */}
          <Grid item xs={12} md={6}>
            <HighchartsReact highcharts={Highcharts} options={industryChartOptions} />
          </Grid>
          <Grid item xs={12} md={6}>
            <HighchartsReact highcharts={Highcharts} options={regionChartOptions} />
          </Grid>
          <Grid item xs={12} md={6}>
            <HighchartsReact highcharts={Highcharts} options={partnerTypeChartOptions} />
          </Grid>
          <Grid item xs={12} md={6}>
            <HighchartsReact highcharts={Highcharts} options={riskLevelChartOptions} />
          </Grid>
          <Grid item xs={12} md={12}>
            <HighchartsReact highcharts={Highcharts} options={topPartnersChartOptions} />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
