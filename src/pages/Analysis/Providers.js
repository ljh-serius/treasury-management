import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { Box, Typography, Grid, Card, CardContent, Container } from '@mui/material';

export default function ProviderAnalysisDashboard({ fetchProviders }) {
  const [providersData, setProvidersData] = useState([]);
  const [countryDistribution, setCountryDistribution] = useState([]);
  const [industryDistribution, setIndustryDistribution] = useState([]);
  const [companyTypeDistribution, setCompanyTypeDistribution] = useState([]);
  const [ratingDistribution, setRatingDistribution] = useState([]);
  const [annualRevenueData, setAnnualRevenueData] = useState([]);
  const [totalAnnualRevenue, setTotalAnnualRevenue] = useState(0);
  const [averageRating, setAverageRating] = useState(0);
  const [topProviders, setTopProviders] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchProviders();
      if (data && data.length > 0) {
        setProvidersData(data);
        processProviderData(data);
      } else {
        console.log("No provider data available.");
      }
    };

    fetchData();
  }, [fetchProviders]);

  const processProviderData = (data) => {
    if (!data || data.length === 0) {
      console.log("No data to process.");
      return;
    }

    // Country Distribution
    const countryCounts = data.reduce((acc, provider) => {
      acc[provider.country] = (acc[provider.country] || 0) + 1;
      return acc;
    }, {});

    setCountryDistribution(Object.keys(countryCounts).map(key => ({
      name: key,
      y: countryCounts[key],
    })));

    // Industry Distribution
    const industryCounts = data.reduce((acc, provider) => {
      acc[provider.industry] = (acc[provider.industry] || 0) + 1;
      return acc;
    }, {});

    setIndustryDistribution(Object.keys(industryCounts).map(key => ({
      name: key,
      y: industryCounts[key],
    })));

    // Company Type Distribution
    const companyTypeCounts = data.reduce((acc, provider) => {
      acc[provider.companyType] = (acc[provider.companyType] || 0) + 1;
      return acc;
    }, {});

    setCompanyTypeDistribution(Object.keys(companyTypeCounts).map(key => ({
      name: key,
      y: companyTypeCounts[key],
    })));

    // Rating Distribution
    const ratingCounts = data.reduce((acc, provider) => {
      const rating = Math.round(provider.rating); // Rounding to nearest integer for rating distribution
      acc[rating] = (acc[rating] || 0) + 1;
      return acc;
    }, {});

    setRatingDistribution(Object.keys(ratingCounts).map(key => ({
      name: `${key} Stars`,
      y: ratingCounts[key],
    })));

    // Annual Revenue Data
    const revenueSum = data.reduce((acc, provider) => acc + (Number(provider.annualRevenue) || 0), 0);
    setTotalAnnualRevenue(revenueSum);

    setAnnualRevenueData(data.map(provider => ({
      name: provider.name,
      y: Number(provider.annualRevenue) || 0,
    })));

    // Average Rating
    const ratingSum = data.reduce((acc, provider) => acc + (Number(provider.rating) || 0), 0);
    const averageRatingValue = data.length ? ratingSum / data.length : 0;
    setAverageRating(averageRatingValue);

    // Top 5 Providers by Annual Revenue
    const topProvidersList = data
      .sort((a, b) => (Number(b.annualRevenue) || 0) - (Number(a.annualRevenue) || 0))
      .slice(0, 5);
    setTopProviders(topProvidersList);
  };

  const countryChartOptions = {
    chart: {
      type: 'pie',
    },
    title: {
      text: 'Provider Distribution by Country',
    },
    series: [
      {
        name: 'Providers',
        colorByPoint: true,
        data: countryDistribution,
      },
    ],
  };

  const industryChartOptions = {
    chart: {
      type: 'pie',
    },
    title: {
      text: 'Provider Distribution by Industry',
    },
    series: [
      {
        name: 'Providers',
        colorByPoint: true,
        data: industryDistribution,
      },
    ],
  };

  const companyTypeChartOptions = {
    chart: {
      type: 'pie',
    },
    title: {
      text: 'Provider Distribution by Company Type',
    },
    series: [
      {
        name: 'Providers',
        colorByPoint: true,
        data: companyTypeDistribution,
      },
    ],
  };

  const ratingChartOptions = {
    chart: {
      type: 'column',
    },
    title: {
      text: 'Provider Rating Distribution',
    },
    xAxis: {
      categories: ratingDistribution.map(data => data.name),
    },
    series: [
      {
        name: 'Providers',
        data: ratingDistribution.map(data => data.y),
      },
    ],
  };

  const annualRevenueChartOptions = {
    chart: {
      type: 'column',
    },
    title: {
      text: 'Annual Revenue of Providers',
    },
    series: [
      {
        name: 'Revenue',
        data: annualRevenueData,
      },
    ],
  };

  return (
    <Container maxWidth="xl" sx={{ paddingTop: 3, paddingBottom: 7 }}>
      <Box sx={{ padding: 4 }}>
        <Typography variant="h4" gutterBottom>
          Provider Analysis Dashboard
        </Typography>
        <Grid container spacing={4}>
          {/* KPI Section */}
          <Grid item xs={12} md={3}>
            <Card>
              <CardContent>
                <Typography variant="h6">Total Annual Revenue</Typography>
                <Typography variant="h4" color="green" sx={{ fontWeight: 'bold' }}>
                  ${Number(totalAnnualRevenue).toFixed(2)}
                </Typography>
                <Typography variant="body2">
                  This represents the total annual revenue across all providers.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={3}>
            <Card>
              <CardContent>
                <Typography variant="h6">Average Provider Rating</Typography>
                <Typography variant="h4" color="orange" sx={{ fontWeight: 'bold' }}>
                  {Number(averageRating).toFixed(2)} Stars
                </Typography>
                <Typography variant="body2">
                  This is the average rating of all providers.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6">Top 5 Providers by Annual Revenue</Typography>
                <ol>
                  {topProviders.map(provider => (
                    <li key={provider.id}>
                      <Typography variant="body2">
                        {provider.name} - Revenue: ${Number(provider.annualRevenue).toFixed(2)}
                      </Typography>
                    </li>
                  ))}
                </ol>
              </CardContent>
            </Card>
          </Grid>

          {/* Chart Section */}
          <Grid item xs={12} md={6}>
            <HighchartsReact highcharts={Highcharts} options={countryChartOptions} />
          </Grid>
          <Grid item xs={12} md={6}>
            <HighchartsReact highcharts={Highcharts} options={industryChartOptions} />
          </Grid>
          <Grid item xs={12} md={6}>
            <HighchartsReact highcharts={Highcharts} options={companyTypeChartOptions} />
          </Grid>
          <Grid item xs={12} md={6}>
            <HighchartsReact highcharts={Highcharts} options={ratingChartOptions} />
          </Grid>
          <Grid item xs={12} md={12}>
            <HighchartsReact highcharts={Highcharts} options={annualRevenueChartOptions} />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
