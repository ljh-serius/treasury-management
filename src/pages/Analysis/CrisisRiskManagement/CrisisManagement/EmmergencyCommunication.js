import React, { useEffect, useState } from 'react';
import { Grid, Card, CardContent, Typography, CircularProgress } from '@mui/material';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const EmergencyCommunicationAnalytics = ({ fetchItems }) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadData = async () => {
            setLoading(true);
            const items = await fetchItems(); // Fetching data passed as a prop
            setData(items);
            setLoading(false);
        };
        loadData();
    }, [fetchItems]);

    if (loading) {
        return <CircularProgress />;
    }

    // KPIs calculation
    const totalMessages = data.length;
    const sentMessages = data.filter(item => item.status === 'sent').length;
    const pendingMessages = data.filter(item => item.status === 'pending').length;
    const failedMessages = data.filter(item => item.status === 'failed').length;

    // Highcharts configuration for message status breakdown
    const chartOptions = {
        chart: {
            type: 'pie',
        },
        title: {
            text: 'Message Status Breakdown',
        },
        series: [
            {
                name: 'Messages',
                colorByPoint: true,
                data: [
                    { name: 'Sent', y: sentMessages },
                    { name: 'Pending', y: pendingMessages },
                    { name: 'Failed', y: failedMessages },
                ],
            },
        ],
    };

    return (
        <Grid container spacing={3}>
            {/* KPI Cards */}
            <Grid item xs={12} sm={4}>
                <Card>
                    <CardContent>
                        <Typography variant="h6">Total Messages</Typography>
                        <Typography variant="h4">{totalMessages}</Typography>
                    </CardContent>
                </Card>
            </Grid>

            <Grid item xs={12} sm={4}>
                <Card>
                    <CardContent>
                        <Typography variant="h6">Sent Messages</Typography>
                        <Typography variant="h4">{sentMessages}</Typography>
                    </CardContent>
                </Card>
            </Grid>

            <Grid item xs={12} sm={4}>
                <Card>
                    <CardContent>
                        <Typography variant="h6">Failed Messages</Typography>
                        <Typography variant="h4">{failedMessages}</Typography>
                    </CardContent>
                </Card>
            </Grid>

            {/* Highcharts Pie Chart */}
            <Grid item xs={12}>
                <Card>
                    <CardContent>
                        <HighchartsReact highcharts={Highcharts} options={chartOptions} />
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    );
};

export default EmergencyCommunicationAnalytics;
