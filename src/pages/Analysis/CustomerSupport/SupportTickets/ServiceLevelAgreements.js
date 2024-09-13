import React, { useEffect, useState } from 'react';
import { Grid, Card, CardContent, Typography } from '@mui/material';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const SLAAnalytics = ({ fetchItems }) => {
    const [data, setData] = useState([]);
    const [kpis, setKpis] = useState({
        totalSLAs: 0,
        activeSLAs: 0,
        avgResponseTime: 0,
        avgResolutionTime: 0,
    });

    useEffect(() => {
        fetchItems().then((response) => {
            setData(response);
            calculateKpis(response);
        });
    }, [fetchItems]);

    const calculateKpis = (items) => {
        const totalSLAs = items.length;
        const activeSLAs = items.filter((item) => item.status === 'active').length;
        const totalResponseTime = items.reduce((sum, item) => sum + Number(item.responseTime), 0);
        const totalResolutionTime = items.reduce((sum, item) => sum + Number(item.resolutionTime), 0);
        const avgResponseTime = totalSLAs ? totalResponseTime / totalSLAs : 0;
        const avgResolutionTime = totalSLAs ? totalResolutionTime / totalSLAs : 0;

        setKpis({
            totalSLAs,
            activeSLAs,
            avgResponseTime: avgResponseTime.toFixed(2),
            avgResolutionTime: avgResolutionTime.toFixed(2),
        });
    };

    // Highcharts options for SLA Status Distribution
    const statusDistributionChartOptions = {
        chart: {
            type: 'pie',
        },
        title: {
            text: 'SLA Status Distribution',
        },
        series: [
            {
                name: 'Status',
                colorByPoint: true,
                data: [
                    { name: 'Active', y: data.filter((item) => item.status === 'active').length },
                    { name: 'Expired', y: data.filter((item) => item.status === 'expired').length },
                ],
            },
        ],
    };

    // Highcharts options for Average Times (Response and Resolution)
    const timesChartOptions = {
        chart: {
            type: 'column',
        },
        title: {
            text: 'Average Response and Resolution Times',
        },
        xAxis: {
            categories: ['Response Time', 'Resolution Time'],
        },
        series: [
            {
                name: 'Average Time (hours)',
                data: [kpis.avgResponseTime, kpis.avgResolutionTime],
            },
        ],
    };

    return (
        <Grid container spacing={3}>
            {/* KPIs */}
            <Grid item xs={12} sm={6} md={3}>
                <Card>
                    <CardContent>
                        <Typography variant="h6">Total SLAs</Typography>
                        <Typography variant="h4">{kpis.totalSLAs}</Typography>
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
                <Card>
                    <CardContent>
                        <Typography variant="h6">Active SLAs</Typography>
                        <Typography variant="h4">{kpis.activeSLAs}</Typography>
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
                <Card>
                    <CardContent>
                        <Typography variant="h6">Avg. Response Time (hrs)</Typography>
                        <Typography variant="h4">{kpis.avgResponseTime}</Typography>
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
                <Card>
                    <CardContent>
                        <Typography variant="h6">Avg. Resolution Time (hrs)</Typography>
                        <Typography variant="h4">{kpis.avgResolutionTime}</Typography>
                    </CardContent>
                </Card>
            </Grid>

            {/* Charts */}
            <Grid item xs={12} md={6}>
                <HighchartsReact highcharts={Highcharts} options={statusDistributionChartOptions} />
            </Grid>
            <Grid item xs={12} md={6}>
                <HighchartsReact highcharts={Highcharts} options={timesChartOptions} />
            </Grid>
        </Grid>
    );
};

export default SLAAnalytics;
