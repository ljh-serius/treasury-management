export const fieldsConfig = {
  termId: { label: 'Term ID', type: 'text', faker: 'datatype.uuid' },
  termName: { label: 'Term Name', type: 'text', faker: 'finance.transactionType' },
  description: { label: 'Description', type: 'text', faker: 'lorem.sentence' },
  netDays: { label: 'Net Days', type: 'number', faker: 'datatype.number' },
  isActive: {
    label: 'Is Active',
    type: 'select',
    options: [
      { id: 'yes', label: 'Yes' },
      { id: 'no', label: 'No' },
    ],
    faker: 'random.arrayElement',
  },
  discountRate: { label: 'Discount Rate', type: 'number', faker: 'datatype.float' }, // Additional field for discount
  gracePeriodDays: { label: 'Grace Period Days', type: 'number', faker: 'datatype.number' }, // Grace period option
  penaltyRate: { label: 'Penalty Rate', type: 'number', faker: 'datatype.float' }, // Penalty rate for late payments
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

export const entityName = 'Payment Terms';
export const collectionName = 'payment-terms';
