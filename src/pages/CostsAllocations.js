import React from 'react';
import CostsAllocationsManagement from '../components/CostsAllocationsManagement';
import CostAllocationStatistics from '../components/CostAllocationStatistics';

const CostsAllocations = ({ showAnalytics }) => {
    console.log("SHOW SHOW ANALYTICS ANALYTICS", showAnalytics)
  return (
    <div>
      {showAnalytics ? <CostAllocationStatistics /> : <CostsAllocationsManagement /> }
    </div>
  );
};

export default CostsAllocations;
