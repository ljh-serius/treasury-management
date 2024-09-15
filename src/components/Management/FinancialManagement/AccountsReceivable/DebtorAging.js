export const fieldsConfig = {
  customerId: { label: 'Customer ID', type: 'text', faker: 'datatype.uuid' },
  invoiceId: { label: 'Invoice ID', type: 'text', faker: 'datatype.uuid' },
  dueDate: { label: 'Due Date', type: 'date', faker: 'date.future' },
  overdueDays: { label: 'Overdue Days', type: 'number', faker: 'datatype.number' },
  amount: { label: 'Amount', type: 'number', faker: 'finance.amount' },
  currency: {
    label: 'Currency',
    type: 'select',
    options: [
      { id: 'USD', label: 'USD' },
      { id: 'EUR', label: 'EUR' },
      { id: 'GBP', label: 'GBP' },
      { id: 'JPY', label: 'JPY' },
      { id: 'AUD', label: 'AUD' },
    ],
    faker: 'finance.currencyCode',
  },
  riskLevel: {
    label: 'Risk Level',
    type: 'select',
    options: [
      { id: 'low', label: 'Low' },
      { id: 'medium', label: 'Medium' },
      { id: 'high', label: 'High' },
    ],
    faker: 'random.arrayElement',
  },
  latePaymentFee: { label: 'Late Payment Fee', type: 'number', faker: 'finance.amount' },  // Late payment penalty field
  ecoContribution: { label: 'Eco Contribution', type: 'number', faker: 'finance.amount' },  // French-specific eco-tax contribution field
  tags: {
    label: 'Tags',
    type: 'select',
    options: [
      { id: 'urgent', label: 'Urgent' },
      { id: 'review', label: 'Review' },
      { id: 'important', label: 'Important' },
      { id: 'completed', label: 'Completed' },
      { id: 'follow-up', label: 'Follow-Up' },
    ],
    multiple: true,
    faker: 'random.arrayElement',
  },
  createdBy: { label: 'Created By', type: 'text', faker: 'name.fullName' },
  lastModifiedBy: { label: 'Last Modified By', type: 'text', faker: 'name.fullName' },
  createdDate: { label: 'Created Date', type: 'date', faker: 'date.past' },
  lastModifiedDate: { label: 'Last Modified Date', type: 'date', faker: 'date.recent' },
};

export const entityName = 'Debtor Aging';
export const collectionName = 'debtor-aging';

