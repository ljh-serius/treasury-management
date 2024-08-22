export const fieldsConfig = {
    planId: { label: 'Plan ID', type: 'text', faker: 'datatype.uuid' },
    riskId: { label: 'Risk ID', type: 'text', faker: 'datatype.uuid' },
    mitigationStrategy: { label: 'Mitigation Strategy', type: 'text', multiline: true, rows: 4, faker: 'lorem.paragraph' },
    responsibleParty: { label: 'Responsible Party', type: 'text', faker: 'name.fullName' },
    implementationDate: { label: 'Implementation Date', type: 'date', faker: 'date.future' },
    status: {
      label: 'Status',
      type: 'select',
      options: [
        { id: 'not-started', label: 'Not Started' },
        { id: 'in-progress', label: 'In Progress' },
        { id: 'completed', label: 'Completed' },
      ],
      faker: 'random.arrayElement',
    },
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
    
export const entityName = 'Risk Mitigation Plans';
export const collectionName = 'risk-mitigation-plans'
  