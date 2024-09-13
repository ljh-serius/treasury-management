export const fieldsConfig = {
    backorderId: { label: 'Backorder ID', type: 'text', faker: 'datatype.uuid' },
    productId: { label: 'Product ID', type: 'text', faker: 'datatype.uuid' },
    quantity: { label: 'Quantity', type: 'number', faker: 'datatype.number' },
    expectedRestockDate: { label: 'Expected Restock Date', type: 'date', faker: 'date.future' },
    tags: {
      label: 'Tags',
      type: 'select',
      options: [
        { id: 'urgent', label: 'Urgent' },
        { id: 'high-priority', label: 'High Priority' },
        { id: 'low-stock', label: 'Low Stock' },
        { id: 'delayed', label: 'Delayed' },
        { id: 'bulk-order', label: 'Bulk Order' },
      ],
      multiple: true,
      faker: 'lorem.words',
    },
    createdBy: { label: 'Created By', type: 'text', faker: 'name.fullName' },
    createdDate: { label: 'Created Date', type: 'date', faker: 'date.past' },
  };
  
  export const entityName = 'Backorder';
  export const collectionName = 'backorder';
  