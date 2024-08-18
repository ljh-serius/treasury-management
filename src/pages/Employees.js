import React from 'react';
import BaseManagementComponent from '../components/BaseManagementComponent/BaseManagementComponent';
import {
  employeesFieldsConfig,
  employeesEntityName,
  fetchEmployees,
  addEmployee,
  updateEmployee,
  deleteEmployee,
  employeesHeadCells
} from '../components/BaseManagementComponent/FieldsConfig';

import EmployeesAnalysis from './Analysis/Employees'

function EmployeesManagement({showAnalytics}) {
  return (
    <>
      {
        showAnalytics ?
        ( <EmployeesAnalysis fetchEmployees={fetchEmployees} /> ) : (
            <BaseManagementComponent
            fieldConfig={employeesFieldsConfig}
            entityName={employeesEntityName}
            fetchItems={fetchEmployees}
            addItem={addEmployee}
            updateItem={updateEmployee}
            deleteItem={deleteEmployee}
            headCells={employeesHeadCells}
          />
        )
      }
    </>
  );
}

export default EmployeesManagement;
