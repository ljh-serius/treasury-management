import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { Container } from '@mui/material';

const VisualAnalytics = ({ fetchItems, fieldsConfig }) => {
    const [data, setData] = useState([]);
    const [kpiData, setKpiData] = useState({});
    const [chartData, setChartData] = useState([]);

    useEffect(() => {
        async function loadData() {
            const fetchedData = await fetchItems();
            setData(fetchedData);
            processKPIs(fetchedData);
            processChartsData(fetchedData);
        }

        loadData();
    }, [fetchItems]);

    const processKPIs = (rows) => {
        const totalRecords = rows.length;
        let totalAmount = 0;
        let scoreSum = 0;
        let scoreCount = 0;
        const statusMap = {};
        const categoryMap = {};

        rows.forEach(row => {
            if (row.amount) {
                totalAmount += parseFloat(row.amount);
            }
            if (row.score) {
                scoreSum += parseFloat(row.score);
                scoreCount++;
            }
            if (row.status) {
                statusMap[row.status] = (statusMap[row.status] || 0) + 1;
            }
            if (row.category) {
                categoryMap[row.category] = (categoryMap[row.category] || 0) + 1;
            }
        });

        const averageScore = scoreCount > 0 ? scoreSum / scoreCount : null;

        setKpiData({ 
            totalRecords, 
            totalAmount: totalAmount || null, 
            averageScore,
            statusDistribution: statusMap,
            categoryDistribution: categoryMap,
        });
    };

    const processChartsData = (rows) => {
        const charts = [];

        // Dynamic chart generation based on fields with "options" property
        Object.keys(fieldsConfig).forEach(field => {
            const fieldConfig = fieldsConfig[field];
            if (fieldConfig.options) {
                const categoryMap = {};

                rows.forEach(row => {
                    const category = row[field];
                    if (category) {
                        categoryMap[category] = (categoryMap[category] || 0) + 1;
                    }
                });

                const categories = Object.keys(categoryMap);
                const values = categories.map(key => categoryMap[key]);

                if (categories.length > 0) {
                    charts.push({
                        title: `${fieldConfig.label} Distribution`,
                        categories,
                        values,
                    });
                }
            }
        });

        // Additional timeline chart
        const timelineMap = {};

        rows.forEach(row => {
            if (row.createdDate) {
                const date = new Date(row.createdDate).toLocaleDateString();
                timelineMap[date] = (timelineMap[date] || 0) + 1;
            }
        });

        const timelineDates = Object.keys(timelineMap);
        const timelineCounts = timelineDates.map(key => timelineMap[key]);

        if (timelineDates.length > 0) {
            charts.push({
                title: 'Timeline Analysis',
                type: 'line',
                dates: timelineDates,
                counts: timelineCounts,
            });
        }

        // Set chart data
        setChartData(charts);
    };

    return (
        <Container maxWidth="xl" sx={{ paddingTop: 3, paddingBottom: 7 }}>
            <div>
                {/* KPI Section */}
                <div className="kpi-section">
                    <h2>Key Performance Indicators</h2>
                    <div className="kpi-card">
                        <h3>Total Records</h3>
                        <p>{kpiData.totalRecords}</p>
                    </div>
                    {kpiData.totalAmount !== null && (
                        <div className="kpi-card">
                            <h3>Total Amount</h3>
                            <p>${Number(kpiData.totalAmount).toFixed(2)}</p>
                        </div>
                    )}
                    {kpiData.averageScore !== null && (
                        <div className="kpi-card">
                            <h3>Average Score</h3>
                            <p>{Number(kpiData.averageScore).toFixed(2)}</p>
                        </div>
                    )}
                    {kpiData.statusDistribution && (
                        <div className="kpi-card">
                            <h3>Status Distribution</h3>
                            <p>{JSON.stringify(kpiData.statusDistribution)}</p>
                        </div>
                    )}
                    {kpiData.categoryDistribution && (
                        <div className="kpi-card">
                            <h3>Category Distribution</h3>
                            <p>{JSON.stringify(kpiData.categoryDistribution)}</p>
                        </div>
                    )}
                </div>

                {/* Highcharts Section */}
                <div className="charts-section">
                    <h2>Visual Analytics</h2>

                    {/* Render dynamically generated charts */}
                    {chartData.map((chart, index) => (
                        <div className="chart-container" key={index}>
                            <HighchartsReact 
                                highcharts={Highcharts} 
                                options={
                                    chart.type === 'line' ? 
                                    getTimelineAnalysisOptions(chart.title, chart.dates, chart.counts) : 
                                    getCategoryDistributionOptions(chart.title, chart.categories, chart.values)
                                } 
                            />
                        </div>
                    ))}
                </div>
            </div>
        </Container>
    );
};

// Reusable functions to create Highcharts options
function getCategoryDistributionOptions(title, categories, values) {
    return {
        chart: { type: 'bar' },
        title: { text: title },
        xAxis: {
            categories,
            title: { text: null }
        },
        yAxis: {
            min: 0,
            title: { text: 'Count' }
        },
        series: [{
            name: 'Count',
            data: values
        }]
    };
}

function getTimelineAnalysisOptions(title, dates, counts) {
    return {
        chart: { type: 'line' },
        title: { text: title },
        xAxis: {
            categories: dates,
            title: { text: 'Date' }
        },
        yAxis: {
            title: { text: 'Count' }
        },
        series: [{
            name: 'Records',
            data: counts
        }]
    };
}

export default VisualAnalytics;
