export const fieldsConfig = {
    phaseId: { label: 'Phase ID', type: 'text', faker: 'datatype.uuid' },
    projectId: { label: 'Project ID', type: 'text', faker: 'datatype.uuid' },
    phaseName: { label: 'Phase Name', type: 'text', faker: 'commerce.productName' },
    startDate: { label: 'Start Date', type: 'date', faker: 'date.past' },
    endDate: { label: 'End Date', type: 'date', faker: 'date.future' },
    phaseStatus: {
      label: 'Phase Status',
      type: 'select',
      options: [],
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
  
export const entityName = 'Project Phases';
export const collectionName = 'project-phases';