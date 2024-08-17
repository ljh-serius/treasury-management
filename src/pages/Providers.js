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
} from '../components/BaseManagementComponent/InvoicesConfig';

import ProvidersAnalysis from './Analysis/Providers'

function ProvidersManagement({showAnalytics}) {
  return (
    <>
      {
        showAnalytics ?
        ( <ProvidersAnalysis fetchProviders={fetchItems} /> ) : (
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

export default ProvidersManagement;
