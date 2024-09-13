import React, { useEffect, useState } from 'react';
import { Grid, Typography, Card, CardContent, CircularProgress } from '@mui/material';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const MediaRelationsAnalytics = ({ fetchItems }) => {
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
    const totalRelations = data.length;
    const urgentRelations = data.filter(item => item.tags.includes('urgent')).length;
    const completedRelations = data.filter(item => item.tags.includes('completed')).length;

    // Highcharts options
    const methodDistributionOptions = {
        chart: { type: 'pie' },
        title: { text: 'Communication Method Distribution' },
        series: [
            {
                name: 'Methods',
                colorByPoint: true,
                data: [
                    { name: 'Email', y: data.filter(item => item.communicationMethod === 'email').length },
                    { name: 'Phone Call', y: data.filter(item => item.communicationMethod === 'phone-call').length },
                    { name: 'Meeting', y: data.filter(item => item.communicationMethod === 'meeting').length },
                    { name: 'Press Conference', y: data.filter(item => item.communicationMethod === 'press-conference').length },
                ],
            },
        ],
    };

    const outcomeCounts = data.reduce((acc, item) => {
        const outcome = item.outcome;
        acc[outcome] = (acc[outcome] || 0) + 1;
        return acc;
    }, {});

    const outcomeOptions = {
        chart: { type: 'column' },
        title: { text: 'Outcomes Distribution' },
        xAxis: { categories: Object.keys(outcomeCounts) },
        series: [
            {
                name: 'Outcomes',
                data: Object.values(outcomeCounts),
            },
        ],
    };

    return (
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <Typography variant="h4">Media Relations Analytics</Typography>
            </Grid>

            <Grid item xs={12} md={4}>
                <Card>
                    <CardContent>
                        <Typography variant="h6">Total Relations</Typography>
                        <Typography variant="h4">{totalRelations}</Typography>
                    </CardContent>
                </Card>
            </Grid>

            <Grid item xs={12} md={4}>
                <Card>
                    <CardContent>
                        <Typography variant="h6">Urgent Relations</Typography>
                        <Typography variant="h4">{urgentRelations}</Typography>
                    </CardContent>
                </Card>
            </Grid>

            <Grid item xs={12} md={4}>
                <Card>
                    <CardContent>
                        <Typography variant="h6">Completed Relations</Typography>
                        <Typography variant="h4">{completedRelations}</Typography>
                    </CardContent>
                </Card>
            </Grid>

            <Grid item xs={12} md={6}>
                <HighchartsReact highcharts={Highcharts} options={methodDistributionOptions} />
            </Grid>

            <Grid item xs={12} md={6}>
                <HighchartsReact highcharts={Highcharts} options={outcomeOptions} />
            </Grid>
        </Grid>
    );
};

export default MediaRelationsAnalytics;
