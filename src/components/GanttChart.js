import React, { useEffect } from 'react';
import 'dhtmlx-gantt/codebase/dhtmlxgantt.css';  // Import Gantt CSS
import gantt from 'dhtmlx-gantt';        // Import Gantt JavaScript
import { Container } from '@mui/material';

// Function to generate random data
const generateRandomTasks = (numTasks) => {
  const tasks = [];
  const now = new Date();

  for (let i = 0; i < numTasks; i++) {
    const startOffset = Math.floor(Math.random() * 30); // Random offset for start date
    const duration = Math.floor(Math.random() * 10) + 1; // Random duration between 1 and 10 days
    const progress = Math.random(); // Random progress between 0 and 1

    tasks.push({
      id: i + 1,
      text: `Task ${i + 1}`,
      start_date: new Date(now.getTime() + startOffset * 24 * 60 * 60 * 1000).toLocaleDateString('en-GB'), // Format to correct date string
      duration: duration,
      progress: progress,
    });
  }

  return tasks;
};

const GanttChart = () => {
  useEffect(() => {
    gantt.init('gantt_here');  // Initialize the Gantt chart

    const tasks = {
      data: generateRandomTasks(10), // Generate 10 random tasks
      links: [], // Optional: add links if necessary
    };

    gantt.parse(tasks);  // Parse tasks to Gantt chart

    // Clean up on component unmount
    return () => gantt.clearAll();
  }, []);

  return (
      <div
        id="gantt_here"
        style={{
          height: '80vh',
          width: '80vw',
        }}
      ></div>
  );
};

export default GanttChart;
