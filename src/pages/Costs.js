import React from 'react';
import BaseManagementComponent from '../components/BaseManagementComponent/BaseManagementComponent';
import {
  costsFieldsConfig,
  costsEntityName,
  fetchCosts,
  addCost,
  updateCost,
  deleteCost,
  costsHeadCells,
} from '../components/BaseManagementComponent/FieldsConfig';

import CostsAnalysis from './Analysis/Costs'

function CostsManagement({showAnalytics}) {
  return (
    <>
      {
        showAnalytics ?
        ( <CostsAnalysis fetchCosts={fetchCosts} /> ) : (
            <BaseManagementComponent
              fieldConfig={costsFieldsConfig}
              entityName={costsEntityName}
              fetchItems={fetchCosts}
              addItem={addCost}
              updateItem={updateCost}
              deleteItem={deleteCost}
              headCells={costsHeadCells}
            />
        )
      }
    </>
  );
}

export default CostsManagement;
