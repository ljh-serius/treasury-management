import React from 'react';
import BaseManagementComponent from '../components/BaseManagementComponent/BaseManagementComponent';
import {
  partnersFieldsConfig,
  partnersEntityName,
  fetchPartners,
  addPartner,
  updatePartner,
  deletePartner,
  partnerHeadCells
} from '../components/BaseManagementComponent/FieldsConfig';

import PartnersAnalysis from './Analysis/Partners'

function PartnersManagement({showAnalytics}) {
  return (
    <>
      {
        showAnalytics ?
        ( <PartnersAnalysis fetchPartners={fetchPartners} /> ) : (
            <BaseManagementComponent
            fieldConfig={partnersFieldsConfig}
            entityName={partnersEntityName}
            fetchItems={fetchPartners}
            addItem={addPartner}
            updateItem={updatePartner}
            deleteItem={deletePartner}
            headCells={partnerHeadCells}
          />
        )
      }
    </>
  );
}

export default PartnersManagement;
