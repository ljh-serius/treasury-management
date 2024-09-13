import React, { useState, useEffect } from 'react';
import { Box, Grid, Typography, Paper } from '@mui/material';
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';

const TicketPrioritizationAnalytics = ({ fetchItems }) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            const items = await fetchItems(); // Fetching data using the function passed as prop
            setData(items);
            setLoading(false);
        }
        fetchData();
    }, [fetchItems]);

    if (loading) {
        return <Typography>Loading...</Typography>;
    }

    const ticketCount = data.length;
    const resolvedTickets = data.filter(ticket => ticket.status === 'resolved').length;
    const highPriorityTickets = data.filter(ticket => ticket.priority === 'high' || ticket.priority === 'urgent').length;
    const resolutionTimeAvg = data.reduce((acc, ticket) => acc + ticket.resolutionTime, 0) / data.length;

    const chartOptions = {
        title: { text: 'Ticket Status Distribution' },
        chart: { type: 'pie' },
        series: [
            {
                name: 'Tickets',
                colorByPoint: true,
                data: [
                    { name: 'Open', y: data.filter(ticket => ticket.status === 'open').length },
                    { name: 'In Progress', y: data.filter(ticket => ticket.status === 'in-progress').length },
                    { name: 'Resolved', y: resolvedTickets },
                    { name: 'Closed', y: data.filter(ticket => ticket.status === 'closed').length },
                ],
            },
        ],
    };

    const priorityChartOptions = {
        title: { text: 'Ticket Priority Levels' },
        chart: { type: 'bar' },
        series: [
            {
                name: 'Tickets',
                data: [
                    { name: 'Low', y: data.filter(ticket => ticket.priority === 'low').length },
                    { name: 'Medium', y: data.filter(ticket => ticket.priority === 'medium').length },
                    { name: 'High/Urgent', y: highPriorityTickets },
                ],
            },
        ],
    };

    return (
        <Box sx={{ padding: 3 }}>
            <Typography variant="h4" gutterBottom>
                Ticket Prioritization Analytics
            </Typography>
            <Grid container spacing={3}>
                <Grid item xs={12} md={4}>
                    <Paper elevation={3} sx={{ padding: 2 }}>
                        <Typography variant="h6">Total Tickets</Typography>
                        <Typography variant="h4">{ticketCount}</Typography>
                    </Paper>
                </Grid>
                <Grid item xs={12} md={4}>
                    <Paper elevation={3} sx={{ padding: 2 }}>
                        <Typography variant="h6">Resolved Tickets</Typography>
                        <Typography variant="h4">{resolvedTickets}</Typography>
                    </Paper>
                </Grid>
                <Grid item xs={12} md={4}>
                    <Paper elevation={3} sx={{ padding: 2 }}>
                        <Typography variant="h6">Avg. Resolution Time (hours)</Typography>
                        <Typography variant="h4">{resolutionTimeAvg.toFixed(2)}</Typography>
                    </Paper>
                </Grid>
            </Grid>
            <Grid container spacing={3} sx={{ marginTop: 3 }}>
                <Grid item xs={12} md={6}>
                    <HighchartsReact highcharts={Highcharts} options={chartOptions} />
                </Grid>
                <Grid item xs={12} md={6}>
                    <HighchartsReact highcharts={Highcharts} options={priorityChartOptions} />
                </Grid>
            </Grid>
        </Box>
    );
};

export default TicketPrioritizationAnalytics;
