import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

function ClientsAnalysis({ fetchClients }) {
  const [clientsData, setClientsData] = useState([]);
  const [kpis, setKpis] = useState({ totalClients: 0, activeClients: 0, averageRevenue: 0 });

  useEffect(() => {
    const loadData = async () => {
      const data = await fetchClients();
      setClientsData(data);

      // Calculate KPIs
      const totalClients = data.length;
      const activeClients = data.filter(client => client.clientStatus === 'active').length;
      const averageRevenue = data.reduce((sum, client) => sum + (client.annualRevenue || 0), 0) / totalClients;

      setKpis({ totalClients, activeClients, averageRevenue });
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
    <div>
      <h2>Clients Dashboard</h2>
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
    </div>
  );
}

export default ClientsAnalysis;
