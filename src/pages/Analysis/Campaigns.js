import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

function CampaignsAnalysis({ fetchCampaigns }) {
  const [campaignsData, setCampaignsData] = useState([]);
  const [kpis, setKpis] = useState({ totalCampaigns: 0, activeCampaigns: 0, averageROI: 0 });

  useEffect(() => {
    const loadData = async () => {
      const data = await fetchCampaigns();
      setCampaignsData(data);

      // Calculate KPIs
      const totalCampaigns = data.length;
      const activeCampaigns = data.filter(campaign => campaign.status === 'active').length;
      const averageROI = data.reduce((sum, campaign) => sum + (campaign.roi || 0), 0) / totalCampaigns;

      setKpis({ totalCampaigns, activeCampaigns, averageROI });
    };

    loadData();
  }, []);

  const roiChartOptions = {
    title: { text: 'Campaign ROI Distribution' },
    series: [
      {
        name: 'ROI',
        data: campaignsData.map(campaign => campaign.roi),
      },
    ],
    xAxis: { categories: campaignsData.map(campaign => campaign.campaignName) },
    yAxis: { title: { text: 'ROI (%)' } },
  };

  const campaignsStatusChartOptions = {
    chart: { type: 'pie' },
    title: { text: 'Campaign Status Distribution' },
    series: [
      {
        name: 'Campaigns',
        colorByPoint: true,
        data: [
          { name: 'Active', y: kpis.activeCampaigns },
          { name: 'Completed', y: campaignsData.filter(campaign => campaign.status === 'completed').length },
          { name: 'On Hold', y: campaignsData.filter(campaign => campaign.status === 'on_hold').length },
          { name: 'Cancelled', y: campaignsData.filter(campaign => campaign.status === 'cancelled').length },
        ],
      },
    ],
  };

  return (
    <div>
      <h2>Campaigns Dashboard</h2>
      <div style={{ display: 'flex', justifyContent: 'space-around' }}>
        <div>
          <h3>Total Campaigns</h3>
          <p>{kpis.totalCampaigns}</p>
        </div>
        <div>
          <h3>Active Campaigns</h3>
          <p>{kpis.activeCampaigns}</p>
        </div>
        <div>
          <h3>Average ROI</h3>
          <p>{kpis.averageROI.toFixed(2)}%</p>
        </div>
      </div>
      <HighchartsReact highcharts={Highcharts} options={roiChartOptions} />
      <HighchartsReact highcharts={Highcharts} options={campaignsStatusChartOptions} />
    </div>
  );
}

export default CampaignsAnalysis;
