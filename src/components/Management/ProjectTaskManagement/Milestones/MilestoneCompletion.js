export const fieldsConfig = {
    completionId: { label: 'Completion ID', type: 'text', faker: 'datatype.uuid' },
    milestoneId: { label: 'Milestone ID', type: 'text', faker: 'datatype.uuid' },
    completionDate: { label: 'Completion Date', type: 'date', faker: 'date.past' },
    status: {
      label: 'Status',
      type: 'select',
      options: [
        { id: 'completed', label: 'Completed' },
        { id: 'in-progress', label: 'In Progress' },
        { id: 'delayed', label: 'Delayed' },
      ],
      faker: 'random.arrayElement',
    },
    remarks: { label: 'Remarks', type: 'text', multiline: true, rows: 4, faker: 'lorem.paragraph' },
    tags: {
      label: 'Tags',
      type: 'select',
      options: [],
      multiple: true,
      faker: 'lorem.words',
    },
    createdBy: { label: 'Created By', type: 'text', faker: 'name.fullName' },
    createdDate: { label: 'Created Date', type: 'date', faker: 'date.past' },
  };
  
export const entityName = 'Milestone Completion';
export const collectionName = 'milestone-completion';