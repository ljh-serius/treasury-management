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
} from '../components/BaseManagementComponent/EntitiesConfig';

import EntitiesAnalysis from './Analysis/Entities'

function EntitiesManagement({showAnalytics}) {
  return (
    <>
      {
        showAnalytics ?
        ( <EntitiesAnalysis fetchEntities={fetchItems} /> ) : (
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

export default EntitiesManagement;
