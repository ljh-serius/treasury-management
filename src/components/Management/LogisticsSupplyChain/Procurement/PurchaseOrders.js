export const fieldsConfig = {
    orderId: { label: 'Order ID', type: 'text', faker: 'datatype.uuid' },
    supplierId: { label: 'Supplier ID', type: 'text', faker: 'datatype.uuid' },
    orderDate: { label: 'Order Date', type: 'date', faker: 'date.past' },
    deliveryDate: { label: 'Delivery Date', type: 'date', faker: 'date.future' },
    itemDescription: { label: 'Item Description', type: 'text', faker: 'commerce.productDescription' },
    quantity: { label: 'Quantity', type: 'number', faker: 'commerce.price' },
    unitPrice: { label: 'Unit Price', type: 'number', faker: 'commerce.price' },
    totalAmount: { label: 'Total Amount', type: 'number', faker: 'finance.amount' },
    tags: {
      label: 'Tags',
      type: 'select',
      options: [
        { id: 'high-priority', label: 'High Priority' },
        { id: 'urgent', label: 'Urgent' },
        { id: 'review', label: 'Review' },
        { id: 'completed', label: 'Completed' },
      ],
      multiple: true,
      faker: 'random.arrayElement',
    },
    createdBy: { label: 'Created By', type: 'text', faker: 'name.fullName' },
    createdDate: { label: 'Created Date', type: 'date', faker: 'date.past' },
  };
  
  export const entityName = 'Purchase Orders';
  export const collectionName = 'purchase-orders';
  