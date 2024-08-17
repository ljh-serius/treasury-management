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
} from '../components/BaseManagementComponent/ProjectsConfig';

import ProjectsAnalysis from './Analysis/Projects'

function ProjectsManagement({showAnalytics}) {
  return (
    <>
      {
        showAnalytics ?
        ( <ProjectsAnalysis fetchProjects={fetchItems} /> ) : (
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

export default ProjectsManagement;
