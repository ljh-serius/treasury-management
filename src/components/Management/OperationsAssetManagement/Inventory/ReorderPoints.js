export const fieldsConfig = {
    reorderId: { label: 'Reorder ID', type: 'text', faker: 'datatype.uuid' },
    productName: { label: 'Product Name', type: 'text', faker: 'commerce.productName' },
    reorderPoint: { label: 'Reorder Point', type: 'number', faker: 'datatype.number' },
    reorderQuantity: { label: 'Reorder Quantity', type: 'number', faker: 'datatype.number' },
    tags: {
      label: 'Tags',
      type: 'select',
      options: [
        { id: 'critical', label: 'Critical' },
        { id: 'buffer_stock', label: 'Buffer Stock' },
        { id: 'just_in_time', label: 'Just in Time' },
      ],
      multiple: true,
      faker: 'random.arrayElement',
    },
    createdBy: { label: 'Created By', type: 'text', faker: 'name.fullName' },
    lastModifiedBy: { label: 'Last Modified By', type: 'text', faker: 'name.fullName' },
    createdDate: { label: 'Created Date', type: 'date', faker: 'date.past' },
    lastModifiedDate: { label: 'Last Modified Date', type: 'date', faker: 'date.recent' },
};

export const entityName = 'Reorder Points';
export const collectionName = 'reorder-points';
