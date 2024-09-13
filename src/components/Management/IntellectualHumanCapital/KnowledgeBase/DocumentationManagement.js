export const fieldsConfig = {
    documentId: { label: 'Document ID', type: 'text', faker: 'datatype.uuid' },
    documentTitle: { label: 'Document Title', type: 'text', faker: 'lorem.sentence' },
    documentType: {
      label: 'Document Type',
      type: 'select',
      options: [
        { id: 'policy', label: 'Policy' },
        { id: 'procedure', label: 'Procedure' },
        { id: 'manual', label: 'Manual' },
        { id: 'guideline', label: 'Guideline' },
      ],
      faker: 'random.arrayElement',
    },
    author: { label: 'Author', type: 'text', faker: 'name.fullName' },
    creationDate: { label: 'Creation Date', type: 'date', faker: 'date.past' },
    lastUpdated: { label: 'Last Updated', type: 'date', faker: 'date.recent' },
    version: { label: 'Version', type: 'text', faker: 'finance.amount' },
    fileLocation: { label: 'File Location', type: 'text', faker: 'internet.url' },
    tags: {
      label: 'Tags',
      type: 'select',
      options: [
        { id: 'compliance', label: 'Compliance' },
        { id: 'standard', label: 'Standard' },
        { id: 'procedure', label: 'Procedure' },
        { id: 'guideline', label: 'Guideline' },
      ],
      multiple: true,
      faker: 'random.arrayElement',
    },
    createdBy: { label: 'Created By', type: 'text', faker: 'name.fullName' },
    createdDate: { label: 'Created Date', type: 'date', faker: 'date.past' },
  };
  
  export const entityName = 'Documentation Management';
  export const collectionName = 'documentation-management';
  