export const fieldsConfig = {
    sopId: { label: 'SOP ID', type: 'text', faker: 'datatype.uuid' },
    sopTitle: { label: 'SOP Title', type: 'text', faker: 'lorem.sentence' },
    department: { label: 'Department', type: 'text', faker: 'company.bs' },
    author: { label: 'Author', type: 'text', faker: 'name.fullName' },
    creationDate: { label: 'Creation Date', type: 'date', faker: 'date.past' },
    reviewDate: { label: 'Review Date', type: 'date', faker: 'date.future' },
    version: { label: 'Version', type: 'text', faker: 'finance.amount' },
    status: {
      label: 'Status',
      type: 'select',
      options: [
        { id: 'draft', label: 'Draft' },
        { id: 'active', label: 'Active' },
        { id: 'archived', label: 'Archived' },
      ],
      faker: 'random.arrayElement',
    },
    fileLocation: { label: 'File Location', type: 'text', faker: 'internet.url' },
    tags: {
      label: 'Tags',
      type: 'select',
      options: [
        { id: 'compliance', label: 'Compliance' },
        { id: 'quality', label: 'Quality' },
        { id: 'safety', label: 'Safety' },
        { id: 'procedure', label: 'Procedure' },
      ],
      multiple: true,
      faker: 'random.arrayElement',
    },
    createdBy: { label: 'Created By', type: 'text', faker: 'name.fullName' },
    createdDate: { label: 'Created Date', type: 'date', faker: 'date.past' },
  };
  
  export const entityName = 'Standard Operating Procedures';
  export const collectionName = 'standard-operating-procedures';
  