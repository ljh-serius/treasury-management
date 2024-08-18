import React from 'react';
import BaseManagementComponent from '../components/BaseManagementComponent/BaseManagementComponent';
import {
  providersFieldsConfig,
  providersEntityName,
  fetchProviders,
  addProvider,
  updateProvider,
  deleteProvider,
  providersHeadCells
} from '../components/BaseManagementComponent/FieldsConfig';

import ProvidersAnalysis from './Analysis/Providers'

function ProvidersManagement({showAnalytics}) {
  return (
    <>
      {
        showAnalytics ?
        ( <ProvidersAnalysis fetchProviders={fetchProviders} /> ) : (
            <BaseManagementComponent
            fieldConfig={providersFieldsConfig}
            entityName={providersEntityName}
            fetchItems={fetchProviders}
            addItem={addProvider}
            updateItem={updateProvider}
            deleteItem={deleteProvider}
            headCells={providersHeadCells}
          />
        )
      }
    </>
  );
}

export default ProvidersManagement;
