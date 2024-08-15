import React, { useEffect } from 'react';
import 'dhtmlx-gantt/codebase/dhtmlxgantt.css';  // Import Gantt CSS
import gantt from 'dhtmlx-gantt';        // Import Gantt JavaScript
import { Container } from '@mui/material';

const GanttChart = () => {
  useEffect(() => {
    gantt.init('gantt_here');  // Initialize the Gantt chart

    const tasks = {
      data: [
        { id: 1, text: 'Task 1', start_date: new Date(), duration: 3, progress: 0.6 },
        { id: 2, text: 'Task 2', start_date: new Date(new Date().getTime() + 24 * 60 * 60 * 1000), duration: 2, progress: 0.4 },
      ],
      links: [],
    };

    gantt.parse(tasks);  // Parse tasks to Gantt chart

    // Clean up on component unmount
    return () => gantt.clearAll();
  }, []);

  return (
    <div
      id="gantt_here"
      style={{
        width: 'calc(100% - 240px)', // Adjust width to account for the sidebar
        height: 'calc(100vh - 64px)', // Adjust height to account for the app bar
        overflow: 'hidden',
      }}
    ></div>
  );
};

export default GanttChart;
