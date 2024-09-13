export const fieldsConfig = {
  cashFlowId: { label: 'Cash Flow ID', type: 'text', faker: 'datatype.uuid' },
  inflows: { label: 'Inflows', type: 'number', faker: 'finance.amount' },
  outflows: { label: 'Outflows', type: 'number', faker: 'finance.amount' },
  netCashFlow: { label: 'Net Cash Flow', type: 'number', faker: 'finance.amount' },
  fiscalPeriod: { label: 'Fiscal Period', type: 'text', faker: 'date.month' },
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
  status: {
      label: 'Status',
      type: 'select',
      options: [
          { id: 'positive', label: 'Positive' },
          { id: 'negative', label: 'Negative' },
      ],
      faker: 'random.arrayElement',
  },
  createdBy: { label: 'Created By', type: 'text', faker: 'name.fullName' },
  lastModifiedBy: { label: 'Last Modified By', type: 'text', faker: 'name.fullName' },
  createdDate: { label: 'Created Date', type: 'date', faker: 'date.past' },
  lastModifiedDate: { label: 'Last Modified Date', type: 'date', faker: 'date.recent' },
};

export const entityName = 'Cash Flow Forecasts';
export const collectionName = 'cash-flow-forecasts';
