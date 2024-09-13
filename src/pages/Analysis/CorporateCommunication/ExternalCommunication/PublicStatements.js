import React, { useEffect, useState } from 'react';
import { Grid, Typography, Card, CardContent, CircularProgress } from '@mui/material';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const PublicStatementsAnalytics = ({ fetchItems }) => {
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
    const totalStatements = data.length;
    const urgentStatements = data.filter(item => item.tags.includes('urgent')).length;
    const statementsByAudience = {
        public: data.filter(item => item.audience === 'public').length,
        investors: data.filter(item => item.audience === 'investors').length,
        customers: data.filter(item => item.audience === 'customers').length,
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
                    { name: 'Website', y: data.filter(item => item.distributionChannels === 'website').length },
                    { name: 'Email', y: data.filter(item => item.distributionChannels === 'email').length },
                    { name: 'Social Media', y: data.filter(item => item.distributionChannels === 'social-media').length },
                ],
            },
        ],
    };

    const audienceOptions = {
        chart: { type: 'bar' },
        title: { text: 'Statements by Audience' },
        xAxis: { categories: ['Public', 'Investors', 'Customers'] },
        series: [
            {
                name: 'Audience',
                data: [statementsByAudience.public, statementsByAudience.investors, statementsByAudience.customers],
            },
        ],
    };

    return (
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <Typography variant="h4">Public Statements Analytics</Typography>
            </Grid>

            <Grid item xs={12} md={4}>
                <Card>
                    <CardContent>
                        <Typography variant="h6">Total Statements</Typography>
                        <Typography variant="h4">{totalStatements}</Typography>
                    </CardContent>
                </Card>
            </Grid>

            <Grid item xs={12} md={4}>
                <Card>
                    <CardContent>
                        <Typography variant="h6">Urgent Statements</Typography>
                        <Typography variant="h4">{urgentStatements}</Typography>
                    </CardContent>
                </Card>
            </Grid>

            <Grid item xs={12} md={6}>
                <HighchartsReact highcharts={Highcharts} options={distributionChannelOptions} />
            </Grid>

            <Grid item xs={12} md={6}>
                <HighchartsReact highcharts={Highcharts} options={audienceOptions} />
            </Grid>
        </Grid>
    );
};

export default PublicStatementsAnalytics;
