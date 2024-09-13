import React, { useEffect, useState } from 'react';
import { Grid, Card, CardContent, Typography } from '@mui/material';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const ResolutionTimeTrackingAnalytics = ({ fetchItems }) => {
    const [data, setData] = useState([]);
    const [kpis, setKpis] = useState({
        totalTickets: 0,
        highPriorityTickets: 0,
        averageResolutionTime: 0,
        urgentTickets: 0,
    });

    useEffect(() => {
        fetchItems().then((response) => {
            setData(response);
            calculateKpis(response);
        });
    }, [fetchItems]);

    const calculateKpis = (items) => {
        const totalTickets = items.length;
        const highPriorityTickets = items.filter((item) => item.priority === 'high').length;
        const urgentTickets = items.filter((item) => item.priority === 'urgent').length;
        const totalResolutionTime = items.reduce((sum, item) => sum + Number(item.resolutionTime), 0);
        const averageResolutionTime = totalTickets ? totalResolutionTime / totalTickets : 0;

        setKpis({
            totalTickets,
            highPriorityTickets,
            urgentTickets,
            averageResolutionTime: averageResolutionTime.toFixed(2),
        });
    };

    // Highcharts options for Priority Distribution
    const priorityDistributionChartOptions = {
        chart: {
            type: 'pie',
        },
        title: {
            text: 'Ticket Priority Distribution',
        },
        series: [
            {
                name: 'Priority',
                colorByPoint: true,
                data: [
                    { name: 'Low', y: data.filter((item) => item.priority === 'low').length },
                    { name: 'Medium', y: data.filter((item) => item.priority === 'medium').length },
                    { name: 'High', y: data.filter((item) => item.priority === 'high').length },
                    { name: 'Urgent', y: data.filter((item) => item.priority === 'urgent').length },
                ],
            },
        ],
    };

    // Highcharts options for Average Resolution Time by Priority
    const resolutionTimeChartOptions = {
        chart: {
            type: 'column',
        },
        title: {
            text: 'Average Resolution Time by Priority (hours)',
        },
        xAxis: {
            categories: ['Low', 'Medium', 'High', 'Urgent'],
        },
        series: [
            {
                name: 'Resolution Time (hours)',
                data: [
                    calculateAverageTime('low'),
                    calculateAverageTime('medium'),
                    calculateAverageTime('high'),
                    calculateAverageTime('urgent'),
                ],
            },
        ],
    };

    const calculateAverageTime = (priority) => {
        const filteredTickets = data.filter((item) => item.priority === priority);
        const totalTime = filteredTickets.reduce((sum, item) => sum + Number(item.resolutionTime), 0);
        return filteredTickets.length ? totalTime / filteredTickets.length : 0;
    };

    return (
        <Grid container spacing={3}>
            {/* KPIs */}
            <Grid item xs={12} sm={6} md={3}>
                <Card>
                    <CardContent>
                        <Typography variant="h6">Total Tickets</Typography>
                        <Typography variant="h4">{kpis.totalTickets}</Typography>
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
                <Card>
                    <CardContent>
                        <Typography variant="h6">High Priority Tickets</Typography>
                        <Typography variant="h4">{kpis.highPriorityTickets}</Typography>
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
                <Card>
                    <CardContent>
                        <Typography variant="h6">Urgent Tickets</Typography>
                        <Typography variant="h4">{kpis.urgentTickets}</Typography>
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
                <Card>
                    <CardContent>
                        <Typography variant="h6">Avg. Resolution Time (hrs)</Typography>
                        <Typography variant="h4">{kpis.averageResolutionTime}</Typography>
                    </CardContent>
                </Card>
            </Grid>

            {/* Charts */}
            <Grid item xs={12} md={6}>
                <HighchartsReact highcharts={Highcharts} options={priorityDistributionChartOptions} />
            </Grid>
            <Grid item xs={12} md={6}>
                <HighchartsReact highcharts={Highcharts} options={resolutionTimeChartOptions} />
            </Grid>
        </Grid>
    );
};

export default ResolutionTimeTrackingAnalytics;
