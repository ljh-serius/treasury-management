export const fieldsConfig = {
    updateId: { label: 'Update ID', type: 'text', faker: 'datatype.uuid' },
    productName: { label: 'Product Name', type: 'text', faker: 'commerce.productName' },
    updateType: {
      label: 'Update Type',
      type: 'select',
      options: [
        { id: 'bug_fix', label: 'Bug Fix' },
        { id: 'feature_addition', label: 'Feature Addition' },
        { id: 'performance_improvement', label: 'Performance Improvement' }
      ],
      faker: 'random.arrayElement',
    },
    description: { label: 'Description', type: 'text', multiline: true, rows: 4, faker: 'lorem.sentence' },
    tags: {
      label: 'Tags',
      type: 'select',
      options: [
        { id: 'critical', label: 'Critical' },
        { id: 'optional', label: 'Optional' },
        { id: 'mandatory', label: 'Mandatory' }
      ],
      multiple: true,
      faker: 'random.arrayElement',
    },
    createdBy: { label: 'Created By', type: 'text', faker: 'name.fullName' },
    lastModifiedBy: { label: 'Last Modified By', type: 'text', faker: 'name.fullName' },
    createdDate: { label: 'Created Date', type: 'date', faker: 'date.past' },
    lastModifiedDate: { label: 'Last Modified Date', type: 'date', faker: 'date.recent' },
};

export const entityName = 'Product Updates';
export const collectionName = 'product-updates';
