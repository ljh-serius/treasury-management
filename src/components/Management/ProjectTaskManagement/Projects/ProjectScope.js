export const fieldsConfig = {
    scopeId: { label: 'Scope ID', type: 'text', faker: 'datatype.uuid' },
    projectId: { label: 'Project ID', type: 'text', faker: 'datatype.uuid' },
    scopeDescription: { label: 'Scope Description', type: 'text', multiline: true, rows: 4, faker: 'lorem.paragraph' },
    deliverables: { label: 'Deliverables', type: 'text', multiline: true, rows: 4, faker: 'lorem.sentence' },
    constraints: { label: 'Constraints', type: 'text', multiline: true, rows: 4, faker: 'lorem.sentence' },
    assumptions: { label: 'Assumptions', type: 'text', multiline: true, rows: 4, faker: 'lorem.sentence' },
    tags: {
      label: 'Tags',
      type: 'select',
      options: [
        { id: 'high-priority', label: 'High Priority' },
        { id: 'low-priority', label: 'Low Priority' },
        { id: 'urgent', label: 'Urgent' },
        { id: 'pending', label: 'Pending' },
        { id: 'completed', label: 'Completed' },
      ],
      multiple: true,
      faker: 'random.arrayElement',
    },
    createdBy: { label: 'Created By', type: 'text', faker: 'name.fullName' },
    createdDate: { label: 'Created Date', type: 'date', faker: 'date.past' },
  };
  
  export const entityName = 'Project Scopes';
  export const collectionName = 'project-scopes';
  