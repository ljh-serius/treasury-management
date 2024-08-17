import React from 'react';
import ProjectsStatistics from '../components/ProjectsStatistics';
import ProjectsManagement from '../components/ProjectsManagement';

const CostsAllocations = ({ showAnalytics }) => {
    console.log("SHOW SHOW ANALYTICS ANALYTICS", showAnalytics)
  return (
    <div>
      {showAnalytics ? <ProjectsStatistics /> : <ProjectsManagement /> }
    </div>
  );
};

export default CostsAllocations;
