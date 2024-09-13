import React, { useEffect, useState } from 'react';
import { Grid, Typography, Card, CardContent, CircularProgress } from '@mui/material';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const PressReleasesAnalytics = ({ fetchItems }) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            const result = await fetchItems();
            setData(result);
            setLoading(false);
        }
        fetchData();
    }, [fetchItems]);

    if (loading) {
        return <CircularProgress />;
    }

    // Calculate KPIs
    const totalReleases = data.length;
    const urgentReleases = data.filter(item => item.tags.includes('urgent')).length;
    const releasesByDistributionChannel = {
        website: data.filter(item => item.distributionChannels === 'website').length,
        email: data.filter(item => item.distributionChannels === 'email').length,
        socialMedia: data.filter(item => item.distributionChannels === 'social-media').length,
    };

    // Highcharts options
    const distributionChannelOptions = {
        chart: { type: 'pie' },
        title: { text: 'Distribution Channels' },
        series: [
            {
                name: 'Channels',
                colorByPoint: true,
                data: [
                    { name: 'Website', y: releasesByDistributionChannel.website },
                    { name: 'Email', y: releasesByDistributionChannel.email },
                    { name: 'Social Media', y: releasesByDistributionChannel.socialMedia },
                ],
            },
        ],
    };

    const urgentReleaseOptions = {
        chart: { type: 'bar' },
        title: { text: 'Urgent Press Releases' },
        xAxis: { categories: ['Urgent', 'Non-Urgent'] },
        series: [
            {
                name: 'Urgency',
                data: [urgentReleases, totalReleases - urgentReleases],
            },
        ],
    };

    return (
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <Typography variant="h4">Press Releases Analytics</Typography>
            </Grid>

            <Grid item xs={12} md={4}>
                <Card>
                    <CardContent>
                        <Typography variant="h6">Total Press Releases</Typography>
                        <Typography variant="h4">{totalReleases}</Typography>
                    </CardContent>
                </Card>
            </Grid>

            <Grid item xs={12} md={4}>
                <Card>
                    <CardContent>
                        <Typography variant="h6">Urgent Press Releases</Typography>
                        <Typography variant="h4">{urgentReleases}</Typography>
                    </CardContent>
                </Card>
            </Grid>

            <Grid item xs={12} md={6}>
                <HighchartsReact highcharts={Highcharts} options={distributionChannelOptions} />
            </Grid>

            <Grid item xs={12} md={6}>
                <HighchartsReact highcharts={Highcharts} options={urgentReleaseOptions} />
            </Grid>
        </Grid>
    );
};

export default PressReleasesAnalytics;
