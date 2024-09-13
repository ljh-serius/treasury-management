export const fieldsConfig = {
    leadId: { label: 'Lead ID', type: 'text', faker: 'datatype.uuid' },
    conversionDate: { label: 'Conversion Date', type: 'date', faker: 'date.past' },
    conversionRate: { label: 'Conversion Rate (%)', type: 'number', faker: 'datatype.number' },
    tags: {
      label: 'Tags',
      type: 'select',
      options: [
        { id: 'high-conversion', label: 'High Conversion' },
        { id: 'low-conversion', label: 'Low Conversion' },
        { id: 'recurring', label: 'Recurring Conversion' },
        { id: 'one-time', label: 'One-time Conversion' },
        { id: 'overview', label: 'Overview' },
      ],
      multiple: true,
      faker: 'lorem.words',
    },
    createdBy: { label: 'Created By', type: 'text', faker: 'name.fullName' },
    createdDate: { label: 'Created Date', type: 'date', faker: 'date.past' },
  };
  
  export const entityName = 'Lead Conversion Rates';
  export const collectionName = 'lead-conversion-rate';
  