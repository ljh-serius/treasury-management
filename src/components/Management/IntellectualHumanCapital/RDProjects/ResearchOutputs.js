export const fieldsConfig = {
    outputId: { label: 'Output ID', type: 'text', faker: 'datatype.uuid' },
    projectName: { label: 'Project Name', type: 'text', faker: 'company.catchPhrase' },
    outputTitle: { label: 'Output Title', type: 'text', faker: 'lorem.sentence' },
    outputType: {
      label: 'Output Type',
      type: 'select',
      options: [
        { id: 'publication', label: 'Publication' },
        { id: 'prototype', label: 'Prototype' },
        { id: 'patent', label: 'Patent' },
        { id: 'presentation', label: 'Presentation' },
      ],
      faker: 'random.arrayElement',
    },
    description: { label: 'Description', type: 'text', faker: 'lorem.paragraph' },
    completionDate: { label: 'Completion Date', type: 'date', faker: 'date.past' },
    tags: {
      label: 'Tags',
      type: 'select',
      options: [
        { id: 'important', label: 'Important' },
        { id: 'urgent', label: 'Urgent' },
        { id: 'completed', label: 'Completed' },
        { id: 'in-progress', label: 'In Progress' },
      ],
      multiple: true,
      faker: 'random.arrayElement',
    },
    createdBy: { label: 'Created By', type: 'text', faker: 'name.fullName' },
    createdDate: { label: 'Created Date', type: 'date', faker: 'date.past' },
  };
  
  export const entityName = 'Research Outputs';
  export const collectionName = 'research-outputs';
  