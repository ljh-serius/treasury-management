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
} from '../components/ProjectsConfig';

function ProjectsManagement() {
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

export default ProjectsManagement;
