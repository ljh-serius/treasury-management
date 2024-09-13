export const fieldsConfig = {
    deadlineId: { label: 'Deadline ID', type: 'text', faker: 'datatype.uuid' },
    taskId: { label: 'Task ID', type: 'text', faker: 'datatype.uuid' },
    deadlineDate: { label: 'Deadline Date', type: 'date', faker: 'date.future' },
    extensionRequest: { label: 'Extension Request', type: 'text', multiline: true, rows: 4, faker: 'lorem.paragraph' },
    extensionApprovalStatus: {
      label: 'Extension Approval Status',
      type: 'select',
      options: [
        { id: 'approved', label: 'Approved' },
        { id: 'denied', label: 'Denied' },
        { id: 'pending', label: 'Pending' },
      ],
      faker: 'random.arrayElement',
    },
    tags: {
      label: 'Tags',
      type: 'select',
      options: [
        { id: 'urgent', label: 'Urgent' },
        { id: 'important', label: 'Important' },
        { id: 'pending', label: 'Pending' },
        { id: 'completed', label: 'Completed' },
        { id: 'follow-up', label: 'Follow-Up' },
      ],
      multiple: true,
      faker: 'random.arrayElement',
    },
    createdBy: { label: 'Created By', type: 'text', faker: 'name.fullName' },
    createdDate: { label: 'Created Date', type: 'date', faker: 'date.past' },
  };
  
  export const entityName = 'Task Deadlines';
  export const collectionName = 'tasks-deadlines';
  