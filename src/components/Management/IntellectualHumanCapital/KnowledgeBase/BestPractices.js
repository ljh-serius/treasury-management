export const fieldsConfig = {
    practiceId: { label: 'Practice ID', type: 'text', faker: 'datatype.uuid' },
    practiceTitle: { label: 'Practice Title', type: 'text', faker: 'lorem.sentence' },
    description: { label: 'Description', type: 'text', faker: 'lorem.paragraph' },
    department: { label: 'Department', type: 'text', faker: 'company.bs' },
    author: { label: 'Author', type: 'text', faker: 'name.fullName' },
    implementationDate: { label: 'Implementation Date', type: 'date', faker: 'date.past' },
    reviewDate: { label: 'Review Date', type: 'date', faker: 'date.future' },
    status: {
      label: 'Status',
      type: 'select',
      options: [
        { id: 'recommended', label: 'Recommended' },
        { id: 'mandatory', label: 'Mandatory' },
        { id: 'optional', label: 'Optional' },
      ],
      faker: 'random.arrayElement',
    },
    tags: {
      label: 'Tags',
      type: 'select',
      options: [
        { id: 'compliance', label: 'Compliance' },
        { id: 'quality', label: 'Quality' },
        { id: 'efficiency', label: 'Efficiency' },
        { id: 'innovation', label: 'Innovation' },
        { id: 'standardization', label: 'Standardization' },
      ],
      multiple: true,
      faker: 'random.arrayElement',
    },
    createdBy: { label: 'Created By', type: 'text', faker: 'name.fullName' },
    createdDate: { label: 'Created Date', type: 'date', faker: 'date.past' },
  };
  
  export const entityName = 'Best Practices';
  export const collectionName = 'best-practices';
  