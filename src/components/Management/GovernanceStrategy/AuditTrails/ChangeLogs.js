export const fieldsConfig = {
    logId: { label: 'Log ID', type: 'text', faker: 'datatype.uuid' },
    changeDescription: { label: 'Change Description', type: 'text', multiline: true, rows: 4, faker: 'lorem.paragraph' },
    changeDate: { label: 'Change Date', type: 'date', faker: 'date.past' },
    changedBy: { label: 'Changed By', type: 'text', faker: 'name.fullName' },
    changeImpact: {
      label: 'Change Impact',
      type: 'select',
      options: [
        { id: 'low', label: 'Low' },
        { id: 'medium', label: 'Medium' },
        { id: 'high', label: 'High' },
      ],
      faker: 'random.arrayElement',
    },
    status: {
      label: 'Status',
      type: 'select',
      options: [
        { id: 'implemented', label: 'Implemented' },
        { id: 'pending', label: 'Pending' },
        { id: 'reverted', label: 'Reverted' },
      ],
      faker: 'random.arrayElement',
    },
    tags: {
        label: 'Tags',
        type: 'select',
        options: [
            { id: 'urgent', label: 'Urgent' },
            { id: 'review', label: 'Review' },
            { id: 'important', label: 'Important' },
            { id: 'completed', label: 'Completed' },
            { id: 'follow-up', label: 'Follow-Up' },
        ],
        multiple: true,
        faker: 'random.arrayElement',
    },
    createdBy: { label: 'Created By', type: 'text', faker: 'name.fullName' },
    createdDate: { label: 'Created Date', type: 'date', faker: 'date.past' },
  };
  
export const entityName = 'Change Logs';
export const collectionName = 'change-logs'