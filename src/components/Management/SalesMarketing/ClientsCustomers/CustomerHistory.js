export const fieldsConfig = {
    historyId: { label: 'History ID', type: 'text', faker: 'datatype.uuid' },
    customerId: { label: 'Customer ID', type: 'text', faker: 'datatype.uuid' },
    interactionDate: { label: 'Interaction Date', type: 'date', faker: 'date.past' },
    interactionType: {
      label: 'Interaction Type',
      type: 'select',
      options: [
        { id: 'call', label: 'Call' },
        { id: 'email', label: 'Email' },
        { id: 'meeting', label: 'Meeting' },
      ],
      faker: 'random.arrayElement',
    },
    notes: { label: 'Notes', type: 'text', multiline: true, rows: 4, faker: 'lorem.paragraph' },
    tags: {
      label: 'Tags',
      type: 'select',
      options: [
        { id: 'high-priority', label: 'High Priority' },
        { id: 'follow-up', label: 'Follow-Up' },
        { id: 'resolved', label: 'Resolved' },
        { id: 'pending', label: 'Pending' },
        { id: 'customer-feedback', label: 'Customer Feedback' },
        { id: 'new-opportunity', label: 'New Opportunity' },
      ],
      multiple: true,
      faker: 'lorem.words',
    },
    createdBy: { label: 'Created By', type: 'text', faker: 'name.fullName' },
    createdDate: { label: 'Created Date', type: 'date', faker: 'date.past' },
  };
  
  export const entityName = 'Customer History';
  export const collectionName = 'customer-history';
  