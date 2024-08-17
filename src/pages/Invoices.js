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

import InvoicesAnalysis from './Analysis/Invoices'

function InvoicesManagement({showAnalytics}) {
  return (
    <>
      {
        showAnalytics ?
        ( <InvoicesAnalysis fetchInvoices={fetchItems} /> ) : (
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

export default InvoicesManagement;
