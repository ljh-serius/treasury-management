export const fieldsConfig = {
    fulfillmentId: { label: 'Fulfillment ID', type: 'text', faker: 'datatype.uuid' },
    orderId: { label: 'Order ID', type: 'text', faker: 'datatype.uuid' },
    status: {
      label: 'Status',
      type: 'select',
      options: [
        { id: 'pending', label: 'Pending' },
        { id: 'processing', label: 'Processing' },
        { id: 'completed', label: 'Completed' },
        { id: 'canceled', label: 'Canceled' },
      ],
      faker: 'random.arrayElement',
    },
    fulfillmentDate: { label: 'Fulfillment Date', type: 'date', faker: 'date.past' },
    warehouseLocation: { label: 'Warehouse Location', type: 'text', faker: 'address.streetAddress' },
    tags: {
      label: 'Tags',
      type: 'select',
      options: [
        { id: 'urgent', label: 'Urgent' },
        { id: 'completed', label: 'Completed' },
        { id: 'pending', label: 'Pending' },
        { id: 'high-priority', label: 'High Priority' },
      ],
      multiple: true,
      faker: 'random.arrayElement',
    },
    createdBy: { label: 'Created By', type: 'text', faker: 'name.fullName' },
    createdDate: { label: 'Created Date', type: 'date', faker: 'date.past' },
  };
  
  export const entityName = 'Order Fulfillment';
  export const collectionName = 'order-fulfillment';
  