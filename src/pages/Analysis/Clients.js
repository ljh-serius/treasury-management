import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import CircularProgress from '@mui/material/CircularProgress';
import Backdrop from '@mui/material/Backdrop';
import { Container } from '@mui/material';

function ClientsAnalysis({ fetchItems }) {
  const [clientsData, setClientsData] = useState([]);
  const [kpis, setKpis] = useState({ totalClients: 0, activeClients: 0, averageRevenue: 0 });
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    const loadData = async () => {
      setLoading(true); // Start loading
      const data = await fetchItems();
      setClientsData(data);

      // Calculate KPIs
      const totalClients = data.length;
      const activeClients = data.filter(client => client.clientStatus === 'active').length;
      const averageRevenue = totalClients > 0 ? 
        data.reduce((sum, client) => sum + (client.annualRevenue || 0), 0) / totalClients : 0;

      setKpis({ totalClients, activeClients, averageRevenue });
      setLoading(false); // Stop loading
    };

    loadData();
  }, []);

  const revenueChartOptions = {
    title: { text: 'Annual Revenue Distribution' },
    series: [
      {
        name: 'Revenue',
        data: clientsData.map(client => client.annualRevenue),
      },
    ],
    xAxis: { categories: clientsData.map(client => client.clientName) },
    yAxis: { title: { text: 'Revenue' } },
  };

  const clientsStatusChartOptions = {
    chart: { type: 'pie' },
    title: { text: 'Client Status Distribution' },
    series: [
      {
        name: 'Clients',
        colorByPoint: true,
        data: [
          { name: 'Active', y: kpis.activeClients },
          { name: 'Inactive', y: clientsData.filter(client => client.clientStatus === 'inactive').length },
          { name: 'Prospect', y: clientsData.filter(client => client.clientStatus === 'prospect').length },
        ],
      },
    ],
  };

  return (
    <Container maxWidth="xl" sx={{ paddingTop: 3, paddingBottom: 7 }}>
      <h2>Clients Dashboard</h2>
      <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
      {!loading && (
        <>
          <div style={{ display: 'flex', justifyContent: 'space-around' }}>
            <div>
              <h3>Total Clients</h3>
              <p>{kpis.totalClients}</p>
            </div>
            <div>
              <h3>Active Clients</h3>
              <p>{kpis.activeClients}</p>
            </div>
            <div>
              <h3>Average Revenue</h3>
              <p>${kpis.averageRevenue.toFixed(2)}</p>
            </div>
          </div>
          <HighchartsReact highcharts={Highcharts} options={revenueChartOptions} />
          <HighchartsReact highcharts={Highcharts} options={clientsStatusChartOptions} />
        </>
      )}
    </Container>
  );
}

export default ClientsAnalysis;
