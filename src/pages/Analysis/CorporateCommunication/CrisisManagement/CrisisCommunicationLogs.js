import React, { useEffect, useState } from 'react';
import { Grid, Typography, Card, CardContent, CircularProgress } from '@mui/material';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const CrisisCommunicationLogsAnalytics = ({ fetchItems }) => {
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

    const emailLogs = data.filter(item => item.communicationMethod === 'email').length;
    const phoneCallLogs = data.filter(item => item.communicationMethod === 'phone-call').length;
    const pressConferenceLogs = data.filter(item => item.communicationMethod === 'press-conference').length;

    const communicationStatusOptions = {
        chart: { type: 'pie' },
        title: { text: 'Communication Method Distribution' },
        series: [
            {
                name: 'Communications',
                colorByPoint: true,
                data: [
                    { name: 'Email', y: emailLogs },
                    { name: 'Phone Call', y: phoneCallLogs },
                    { name: 'Press Conference', y: pressConferenceLogs },
                ],
            },
        ],
    };

    const statusCounts = data.reduce((acc, item) => {
        acc[item.status] = (acc[item.status] || 0) + 1;
        return acc;
    }, {});

    const statusOptions = {
        chart: { type: 'column' },
        title: { text: 'Communication Status Breakdown' },
        xAxis: { categories: Object.keys(statusCounts) },
        series: [
            {
                name: 'Communications',
                data: Object.values(statusCounts),
            },
        ],
    };

    return (
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <Typography variant="h4">Crisis Communication Logs Analytics</Typography>
            </Grid>

            <Grid item xs={12} md={4}>
                <Card>
                    <CardContent>
                        <Typography variant="h6">Total Logs</Typography>
                        <Typography variant="h4">{data.length}</Typography>
                    </CardContent>
                </Card>
            </Grid>

            <Grid item xs={12} md={4}>
                <Card>
                    <CardContent>
                        <Typography variant="h6">Emails Sent</Typography>
                        <Typography variant="h4">{emailLogs}</Typography>
                    </CardContent>
                </Card>
            </Grid>

            <Grid item xs={12} md={4}>
                <Card>
                    <CardContent>
                        <Typography variant="h6">Phone Calls</Typography>
                        <Typography variant="h4">{phoneCallLogs}</Typography>
                    </CardContent>
                </Card>
            </Grid>

            <Grid item xs={12} md={6}>
                <HighchartsReact highcharts={Highcharts} options={communicationStatusOptions} />
            </Grid>

            <Grid item xs={12} md={6}>
                <HighchartsReact highcharts={Highcharts} options={statusOptions} />
            </Grid>
        </Grid>
    );
};

export default CrisisCommunicationLogsAnalytics;
