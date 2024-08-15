import React from 'react';
import { GanttOriginal } from 'react-gantt-chart';
import { Container } from '@mui/material';

const GanttChart = () => {
  const tasks = [
    {
      id: '1',
      name: 'Task 1',
      start: new Date(),
      end: new Date(new Date().getTime() + 24 * 60 * 60 * 1000),
    },
    {
      id: '2',
      name: 'Task 2',
      start: new Date(new Date().getTime() + 24 * 60 * 60 * 1000),
      end: new Date(new Date().getTime() + 48 * 60 * 60 * 1000),
    },
  ];

  return (
    <Container maxWidth="lg">
      <GanttOriginal tasks={tasks} />
    </Container>
  );
};

export default GanttChart;
