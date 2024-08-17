import React from 'react';
import BaseManagementComponent from '../components/BaseManagementComponent/BaseManagementComponent';
import {
  fieldsConfig,
  entityName,
  fetchItems,
  addItem,
  updateItem,
  deleteItem,
  headCells
} from '../components/BaseManagementComponent/RisksConfig';

import RisksAnalysis from './Analysis/Risks'

function RisksManagement({showAnalytics}) {
  return (
    <>
      {
        showAnalytics ? ( <RisksAnalysis fetchRisks={fetchItems} /> ) : (
          <BaseManagementComponent
          fieldConfig={fieldsConfig}
          entityName={entityName}
          fetchItems={fetchItems}
          addItem={addItem}
          updateItem={updateItem}
          deleteItem={deleteItem}
          headCells={headCells}
        />
        )
      }
    </>
  );
}

export default RisksManagement;
