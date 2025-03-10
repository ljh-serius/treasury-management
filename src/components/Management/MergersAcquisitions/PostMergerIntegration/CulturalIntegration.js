export const fieldsConfig = {
    culturalIntegrationId: { label: 'Cultural Integration ID', type: 'text', faker: 'datatype.uuid' },
    integrationPlanId: { label: 'Integration Plan ID', type: 'text', faker: 'datatype.uuid' },
    targetId: { label: 'Target ID', type: 'text', faker: 'datatype.uuid' },
    companyName: { label: 'Company Name', type: 'text', faker: 'company.name' },
    integrationStrategy: { label: 'Integration Strategy', type: 'text', faker: 'lorem.paragraph' },
    activities: { label: 'Activities', type: 'text', faker: 'lorem.sentences' },
    startDate: { label: 'Start Date', type: 'date', faker: 'date.past' },
    endDate: { label: 'End Date', type: 'date', faker: 'date.future' },
    progress: { label: 'Progress (%)', type: 'number', faker: 'finance.amount' },
    responsiblePerson: { label: 'Responsible Person', type: 'text', faker: 'name.fullName' },
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
      options: [
        { id: 'urgent', label: 'Urgent' },
        { id: 'high-priority', label: 'High Priority' },
        { id: 'in-progress', label: 'In Progress' },
        { id: 'completed', label: 'Completed' },
      ],
      multiple: true,
      faker: 'random.arrayElement',
    },
    createdBy: { label: 'Created By', type: 'text', faker: 'name.fullName' },
    createdDate: { label: 'Created Date', type: 'date', faker: 'date.past' },
  };
  
  export const entityName = 'Cultural Integration';
  export const collectionName = 'cultural-integration';
  