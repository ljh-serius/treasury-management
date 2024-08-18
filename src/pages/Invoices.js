import React from 'react';
import BaseManagementComponent from '../components/BaseManagementComponent/BaseManagementComponent';
import {
  invoiceFieldsConfig,
  invoicesEntityName,
  fetchInvoices,
  addInvoice,
  updateInvoice,
  deleteInvoice,
  invoiceHeadCells
} from '../components/BaseManagementComponent/FieldsConfig';

import InvoicesAnalysis from './Analysis/Invoices'

function InvoicesManagement({showAnalytics}) {
  return (
    <>
      {
        showAnalytics ?
        ( <InvoicesAnalysis fetchInvoices={fetchInvoices} /> ) : (
            <BaseManagementComponent
            fieldConfig={invoiceFieldsConfig}
            entityName={invoicesEntityName}
            fetchItems={fetchInvoices}
            addItem={addInvoice}
            updateItem={updateInvoice}
            deleteItem={deleteInvoice}
            headCells={invoiceHeadCells}
          />
        )
      }
    </>
  );
}

export default InvoicesManagement;
