export const fieldsConfig = {
    developmentId: { label: 'Development ID', type: 'text', faker: 'datatype.uuid' },
    productName: { label: 'Product Name', type: 'text', faker: 'commerce.productName' },
    developmentStage: {
      label: 'Development Stage',
      type: 'select',
      options: [
        { id: 'concept', label: 'Concept' },
        { id: 'prototype', label: 'Prototype' },
        { id: 'testing', label: 'Testing' },
        { id: 'launch', label: 'Launch' }
      ],
      faker: 'random.arrayElement',
    },
    tags: {
      label: 'Tags',
      type: 'select',
      options: [
        { id: 'innovation', label: 'Innovation' },
        { id: 'research', label: 'Research' },
        { id: 'high_priority', label: 'High Priority' },
        { id: 'confidential', label: 'Confidential' }
      ],
      multiple: true,
      faker: 'random.arrayElement',
    },
    createdBy: { label: 'Created By', type: 'text', faker: 'name.fullName' },
    lastModifiedBy: { label: 'Last Modified By', type: 'text', faker: 'name.fullName' },
    createdDate: { label: 'Created Date', type: 'date', faker: 'date.past' },
    lastModifiedDate: { label: 'Last Modified Date', type: 'date', faker: 'date.recent' },
};

export const entityName = 'New Product Development';
export const collectionName = 'new-product-development';
