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
} from '../components/BaseManagementComponent/PartnersConfig';

function PartnersManagement() {
  return (
    <BaseManagementComponent
      fieldConfig={fieldsConfig}
      entityName={entityName}
      fetchItems={fetchItems}
      addItem={addItem}
      updateItem={updateItem}
      deleteItem={deleteItem}
      headCells={headCells} // Pass the dynamically generated head cells
    />
  );
}

export default PartnersManagement;
