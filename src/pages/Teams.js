import React from 'react';
import BaseManagementComponent from '../components/BaseManagementComponent/BaseManagementComponent';
import {
  teamsFieldsConfig,
  teamsName,
  fetchTeams,
  updateTeam,
  deleteRisk,
  risksHeadCells,
  addRisk
} from '../components/BaseManagementComponent/FieldsConfig';

import TeamsAnalysis from './Analysis/Teams'

function TeamsManagement({showAnalytics}) {
  return (
    <>
      {
        showAnalytics ? ( <TeamsAnalysis fetchTeams={fetchTeams} /> ) : (
          <BaseManagementComponent
          fieldConfig={risksFieldsConfig}
          entityName={risksEntityName}
          fetchItems={fetchTeams}
          addItem={addRisk}
          updateItem={updateRisk}
          deleteItem={deleteRisk}
          headCells={risksHeadCells}
        />
        )
      }
    </>
  );
}

export default TeamsManagement;
