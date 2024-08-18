import React from 'react';
import BaseManagementComponent from '../components/BaseManagementComponent/BaseManagementComponent';
import {
  projectFieldsConfig,
  projectsEntityName,
  fetchProjects,
  addProject,
  updateProject,
  deleteProject,
  productsHeadCells
} from '../components/BaseManagementComponent/FieldsConfig';

import ProjectsAnalysis from './Analysis/Projects'

function ProjectsManagement({showAnalytics}) {
  return (
    <>
      {
        showAnalytics ?
        ( <ProjectsAnalysis fetchProjects={fetchProjects} /> ) : (
            <BaseManagementComponent
            fieldConfig={projectFieldsConfig}
            entityName={projectsEntityName}
            fetchItems={fetchProjects}
            addItem={addProject}
            updateItem={updateProject}
            deleteItem={deleteProject}
            headCells={productsHeadCells}
          />
        )
      }
    </>
  );
}

export default ProjectsManagement;
