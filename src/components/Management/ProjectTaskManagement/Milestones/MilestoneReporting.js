export const fieldsConfig = {
    reportId: { label: 'Report ID', type: 'text', faker: 'datatype.uuid' },
    milestoneId: { label: 'Milestone ID', type: 'text', faker: 'datatype.uuid' },
    reportContent: { label: 'Report Content', type: 'text', multiline: true, rows: 4, faker: 'lorem.paragraph' },
    reportingDate: { label: 'Reporting Date', type: 'date', faker: 'date.past' },
    tags: {
      label: 'Tags',
      type: 'select',
      options: [],
      multiple: true,
      faker: 'lorem.words',
    },
    reportedBy: { label: 'Reported By', type: 'text', faker: 'name.fullName' },
    createdDate: { label: 'Created Date', type: 'date', faker: 'date.past' },
  };
  
    
export const entityName = 'Milestone Reporting';
export const collectionName = 'milestone-reporting';