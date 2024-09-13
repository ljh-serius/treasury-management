export const fieldsConfig = {
    orderId: { label: 'Order ID', type: 'text', faker: 'datatype.uuid' },
    productName: { label: 'Product Name', type: 'text', faker: 'commerce.productName' },
    quantity: { label: 'Quantity', type: 'number', faker: 'datatype.number' },
    orderStatus: {
      label: 'Order Status',
      type: 'select',
      options: [
        { id: 'processing', label: 'Processing' },
        { id: 'shipped', label: 'Shipped' },
        { id: 'delivered', label: 'Delivered' },
      ],
      faker: 'random.arrayElement',
    },
    deliveryDate: { label: 'Delivery Date', type: 'date', faker: 'date.future' },
    tags: {
      label: 'Tags',
      type: 'select',
      options: [
        { id: 'rush_order', label: 'Rush Order' },
        { id: 'backorder', label: 'Backorder' },
        { id: 'on_schedule', label: 'On Schedule' }
      ],
      multiple: true,
      faker: 'random.arrayElement',
    },
    createdBy: { label: 'Created By', type: 'text', faker: 'name.fullName' },
    lastModifiedBy: { label: 'Last Modified By', type: 'text', faker: 'name.fullName' },
    createdDate: { label: 'Created Date', type: 'date', faker: 'date.past' },
    lastModifiedDate: { label: 'Last Modified Date', type: 'date', faker: 'date.recent' },
};

export const entityName = 'Order Fulfillment';
export const collectionName = 'order-fulfillment';
