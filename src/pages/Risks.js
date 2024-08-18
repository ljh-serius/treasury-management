import React from 'react';
import BaseManagementComponent from '../components/BaseManagementComponent/BaseManagementComponent';
import {
  risksFieldsConfig,
  risksEntityName,
  fetchRisks,
  updateRisk,
  deleteRisk,
  risksHeadCells,
  addRisk
} from '../components/BaseManagementComponent/FieldsConfig';

import RisksAnalysis from './Analysis/Risks'

function RisksManagement({showAnalytics}) {
  return (
    <>
      {
        showAnalytics ? ( <RisksAnalysis fetchRisks={fetchRisks} /> ) : (
          <BaseManagementComponent
          fieldConfig={risksFieldsConfig}
          entityName={risksEntityName}
          fetchItems={fetchRisks}
          addItem={addRisk}
          updateItem={updateRisk}
          deleteItem={deleteRisk}
          headCells={risksHeadCells}
        />
        )
      }
    </>
  );
}

export default RisksManagement;
