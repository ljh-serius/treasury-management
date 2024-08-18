import React from 'react';
import BaseManagementComponent from '../components/BaseManagementComponent/BaseManagementComponent';
import {
  entitiesFieldsConfig,
  entitiesName,
  fetchEntities,
  addEntity,
  updateEntity,
  deleteEntity,
  entitiesHeadCells
} from '../components/BaseManagementComponent/FieldsConfig';

import EntitiesAnalysis from './Analysis/Entities'

function EntitiesManagement({showAnalytics}) {
  return (
    <>
      {
        showAnalytics ?
        ( <EntitiesAnalysis fetchEntities={fetchEntities} /> ) : (
            <BaseManagementComponent
            fieldConfig={entitiesFieldsConfig}
            entityName={entitiesName}
            fetchItems={fetchEntities}
            addItem={addEntity}
            updateItem={updateEntity}
            deleteItem={deleteEntity}
            headCells={entitiesHeadCells}
          />
        )
      }
    </>
  );
}

export default EntitiesManagement;
