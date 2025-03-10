export const fieldsConfig = {
    orderId: { label: 'Order ID', type: 'text', faker: 'datatype.uuid' },
    customerId: { label: 'Customer ID', type: 'text', faker: 'datatype.uuid' },
    orderDate: { label: 'Order Date', type: 'date', faker: 'date.past' },
    deliveryDate: { label: 'Delivery Date', type: 'date', faker: 'date.future' },
    status: {
      label: 'Status',
      type: 'select',
      options: [
        { id: 'processing', label: 'Processing' },
        { id: 'shipped', label: 'Shipped' },
        { id: 'delivered', label: 'Delivered' },
      ],
      faker: 'random.arrayElement',
    },
    totalAmount: { label: 'Total Amount', type: 'number', faker: 'finance.amount' },
    currency: {
      label: 'Currency',
      type: 'select',
      options: [
        { id: 'usd', label: 'USD' },
        { id: 'eur', label: 'EUR' },
        { id: 'gbp', label: 'GBP' },
      ],
      faker: 'finance.currencyCode',
    },
    tags: {
      label: 'Tags',
      type: 'select',
      options: [
        { id: 'urgent', label: 'Urgent' },
        { id: 'high-priority', label: 'High Priority' },
        { id: 'pending-review', label: 'Pending Review' },
        { id: 'completed', label: 'Completed' },
      ],
      multiple: true,
      faker: 'random.arrayElement',
    },
    createdBy: { label: 'Created By', type: 'text', faker: 'name.fullName' },
    createdDate: { label: 'Created Date', type: 'date', faker: 'date.past' },
  };
  
  export const entityName = 'Order Processing';
  export const collectionName = 'order-processing';
  