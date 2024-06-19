import React from 'react';
import TreasuryChart from './TreasuryChart';
import { Grid } from '@mui/material';

const ChartContainer = ({ title, data, onHover }) => {
  return (
      <TreasuryChart
        title={title}
        data={data}
        onHover={onHover}
      />
  );
};

export default ChartContainer;
