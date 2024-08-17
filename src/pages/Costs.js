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
} from '../components/BaseManagementComponent/CostsConfig';

import CostsAnalysis from './Analysis/Costs'

function CostsManagement({showAnalytics}) {
  return (
    <>
      {
        showAnalytics ?
        ( <CostsAnalysis fetchCosts={fetchItems} /> ) : (
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

export default CostsManagement;
