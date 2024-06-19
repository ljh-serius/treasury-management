import React from 'react';
import TreasuryChart from './TreasuryChart';
import { Grid } from '@mui/material';

const ChartContainer = ({ title, data, onHover }) => {
  return (
    <Grid item xs={12} md={6}>
      <TreasuryChart
        title={title}
        data={data}
        onHover={onHover}
      />
    </Grid>
  );
};

export default ChartContainer;
