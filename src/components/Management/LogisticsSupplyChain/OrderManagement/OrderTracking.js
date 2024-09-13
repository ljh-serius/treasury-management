export const fieldsConfig = {
    orderId: { label: 'Order ID', type: 'text', faker: 'datatype.uuid' },
    status: {
      label: 'Status',
      type: 'select',
      options: [
        { id: 'ordered', label: 'Ordered' },
        { id: 'shipped', label: 'Shipped' },
        { id: 'in-transit', label: 'In Transit' },
        { id: 'delivered', label: 'Delivered' },
      ],
      faker: 'random.arrayElement',
    },
    trackingNumber: { label: 'Tracking Number', type: 'text', faker: 'datatype.uuid' },
    estimatedDeliveryDate: { label: 'Estimated Delivery Date', type: 'date', faker: 'date.future' },
    actualDeliveryDate: { label: 'Actual Delivery Date', type: 'date', faker: 'date.future' },
    tags: {
      label: 'Tags',
      type: 'select',
      options: [
        { id: 'urgent', label: 'Urgent' },
        { id: 'pending', label: 'Pending' },
        { id: 'delivered', label: 'Delivered' },
        { id: 'in-transit', label: 'In Transit' },
      ],
      multiple: true,
      faker: 'random.arrayElement',
    },
    createdBy: { label: 'Created By', type: 'text', faker: 'name.fullName' },
    createdDate: { label: 'Created Date', type: 'date', faker: 'date.past' },
  };
  
  export const entityName = 'Order Tracking';
  export const collectionName = 'order-tracking';
  