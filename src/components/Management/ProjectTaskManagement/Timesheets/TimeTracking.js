export const fieldsConfig = {
  trackingId: { label: 'Tracking ID', type: 'text', faker: 'datatype.uuid' },
  taskId: { label: 'Task ID', type: 'text', faker: 'datatype.uuid' },
  startTime: { label: 'Start Time', type: 'date', faker: 'date.past' },
  endTime: { label: 'End Time', type: 'date', faker: 'date.future' },
  hoursSpent: { label: 'Hours Spent', type: 'number', faker: 'datatype.number' },
  description: { label: 'Description', type: 'text', multiline: true, rows: 4, faker: 'lorem.paragraph' },
  tags: {
    label: 'Tags',
    type: 'select',
    options: [
      { id: 'urgent', label: 'Urgent' },
      { id: 'high-priority', label: 'High Priority' },
      { id: 'on-hold', label: 'On Hold' },
      { id: 'completed', label: 'Completed' },
    ],
    multiple: true,
    faker: 'random.arrayElement',
  },
  createdBy: { label: 'Created By', type: 'text', faker: 'name.fullName' },
  createdDate: { label: 'Created Date', type: 'date', faker: 'date.past' },
};

export const entityName = 'Time Tracking';
export const collectionName = 'time-tracking';
