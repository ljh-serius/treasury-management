import React from 'react';
import BaseManagementComponent from '../components/BaseManagementComponent/BaseManagementComponent';
import {
  campaignFieldsConfig,
  campaignsEntityName,
  fetchCampaigns,
  addCampaign,
  updateCampaign,
  deleteCampaign,
  campaignsHeadCells
} from '../components/BaseManagementComponent/FieldsConfig';

import CampaignsAnalysis from './Analysis/Campaigns'

function CompaginsManagement({showAnalytics}) {
  return (
    <>
      {
        showAnalytics ?
        ( <CampaignsAnalysis fetchCampaigns={fetchCampaigns} /> ) : (
            <BaseManagementComponent
            fieldConfig={campaignFieldsConfig}
            entityName={campaignsEntityName}
            fetchItems={fetchCampaigns}
            addItem={addCampaign}
            updateItem={updateCampaign}
            deleteItem={deleteCampaign}
            headCells={campaignsHeadCells}
          />
        )
      }
    </>
  );
}

export default CompaginsManagement;
