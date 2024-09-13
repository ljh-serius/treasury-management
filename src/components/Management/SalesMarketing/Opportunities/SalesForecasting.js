export const fieldsConfig = {
    forecastId: { label: 'Forecast ID', type: 'text', faker: 'datatype.uuid' },
    opportunityId: { label: 'Opportunity ID', type: 'text', faker: 'datatype.uuid' },
    forecastDate: { label: 'Forecast Date', type: 'date', faker: 'date.past' },
    expectedRevenue: { label: 'Expected Revenue', type: 'number', faker: 'finance.amount' },
    probability: { label: 'Probability (%)', type: 'number', faker: 'datatype.number' },
    notes: { label: 'Notes', type: 'text', multiline: true, rows: 4, faker: 'lorem.paragraph' },
    tags: {
      label: 'Tags',
      type: 'select',
      options: [
        { id: 'high-value', label: 'High Value Forecast' },
        { id: 'low-value', label: 'Low Value Forecast' },
        { id: 'high-probability', label: 'High Probability' },
        { id: 'low-probability', label: 'Low Probability' },
        { id: 'in-progress', label: 'In Progress' },
        { id: 'won', label: 'Won' },
      ],
      multiple: true,
      faker: 'lorem.words',
    },
    createdBy: { label: 'Created By', type: 'text', faker: 'name.fullName' },
    createdDate: { label: 'Created Date', type: 'date', faker: 'date.past' },
};

export const entityName = 'Sales Forecasting';
export const collectionName = 'sales-forecasting';
   