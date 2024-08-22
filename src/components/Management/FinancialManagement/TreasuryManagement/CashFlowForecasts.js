export const fieldsConfig = {
    forecastId: { label: 'Forecast ID', type: 'text', faker: 'datatype.uuid' },
    forecastPeriod: { label: 'Forecast Period', type: 'text', faker: 'date.month' },
    projectedInflows: { label: 'Projected Inflows', type: 'number', faker: 'finance.amount' },
    projectedOutflows: { label: 'Projected Outflows', type: 'number', faker: 'finance.amount' },
    netCashFlow: { label: 'Net Cash Flow', type: 'number', faker: 'finance.amount' },
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
        { id: 'approved', label: 'Approved' },
        { id: 'pending', label: 'Pending' },
        { id: 'revised', label: 'Revised' },
      ],
      faker: 'random.arrayElement',
    },
    createdBy: { label: 'Created By', type: 'text', faker: 'name.fullName' },
    lastModifiedBy: { label: 'Last Modified By', type: 'text', faker: 'name.fullName' },
    createdDate: { label: 'Created Date', type: 'date', faker: 'date.past' },
    lastModifiedDate: { label: 'Last Modified Date', type: 'date', faker: 'date.recent' },
  };
  
  
export const entityName = 'Cash Flow Forecasts';
export const collectionName = 'cashflow-forecasts';
