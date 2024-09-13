export const fieldsConfig = {
    paymentId: { label: 'Payment ID', type: 'text', faker: 'datatype.uuid' },
    invoiceId: { label: 'Invoice ID', type: 'text', faker: 'datatype.uuid' },
    paymentDate: { label: 'Payment Date', type: 'date', faker: 'date.past' },
    amountPaid: { label: 'Amount Paid', type: 'number', faker: 'finance.amount' },
    paymentMethod: {
      label: 'Payment Method',
      type: 'select',
      options: [
        { id: 'credit_card', label: 'Credit Card' },
        { id: 'bank_transfer', label: 'Bank Transfer' },
        { id: 'paypal', label: 'PayPal' },
      ],
      faker: 'random.arrayElement',
    },
    status: {
      label: 'Status',
      type: 'select',
      options: [
        { id: 'paid', label: 'Paid' },
        { id: 'pending', label: 'Pending' },
        { id: 'failed', label: 'Failed' },
      ],
      faker: 'random.arrayElement',
    },
    tags: {
      label: 'Tags',
      type: 'select',
      options: [
        { id: 'successful', label: 'Successful Payment' },
        { id: 'pending', label: 'Pending Payment' },
        { id: 'failed', label: 'Failed Payment' },
        { id: 'credit_card', label: 'Credit Card' },
        { id: 'bank_transfer', label: 'Bank Transfer' },
        { id: 'paypal', label: 'PayPal' },
      ],
      multiple: true,
      faker: 'lorem.words',
    },
    createdBy: { label: 'Created By', type: 'text', faker: 'name.fullName' },
    createdDate: { label: 'Created Date', type: 'date', faker: 'date.past' },
  };
  
  export const entityName = 'Payment Tracking';
  export const collectionName = 'payment-tracking';
  