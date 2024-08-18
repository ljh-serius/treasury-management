import React from 'react';
import BaseManagementComponent from '../components/BaseManagementComponent/BaseManagementComponent';
import {
  clientFieldsConfig,
  clientsEntityName,
  fetchClients,
  updateClient,
  deleteClient,
  clientsHeadCells,
  addClient
} from '../components/BaseManagementComponent/FieldsConfig';

import ClientsAnalysis from './Analysis/Clients'

function ClientsManagement({showAnalytics}) {
  return (
    <>
      {
        showAnalytics ? ( <ClientsAnalysis fetchClients={fetchClients} /> ) : (
          <BaseManagementComponent
          fieldConfig={clientFieldsConfig}
          entityName={clientsEntityName}
          fetchItems={fetchClients}
          addItem={addClient}
          updateItem={updateClient}
          deleteItem={deleteClient}
          headCells={clientsHeadCells}
        />
        )
      }
    </>
  );
}

export default ClientsManagement;
