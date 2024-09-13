export const fieldsConfig = {
    performanceId: { label: 'Performance ID', type: 'text', faker: 'datatype.uuid' },
    campaignId: { label: 'Campaign ID', type: 'text', faker: 'datatype.uuid' },
    metricName: { label: 'Metric Name', type: 'text', faker: 'commerce.productName' },
    value: { label: 'Value', type: 'number', faker: 'datatype.number' },
    tags: {
      label: 'Tags',
      type: 'select',
      options: [
        { id: 'engagement', label: 'Engagement' },
        { id: 'conversion', label: 'Conversion' },
        { id: 'clicks', label: 'Clicks' },
        { id: 'impressions', label: 'Impressions' },
        { id: 'reach', label: 'Reach' },
        { id: 'demographics', label: 'Demographics' },
        { id: 'geography', label: 'Geography' },
        { id: 'budget', label: 'Budget' },
        { id: 'roi', label: 'ROI' },
        { id: 'cost-per-click', label: 'Cost Per Click' },
        { id: 'cost-per-acquisition', label: 'Cost Per Acquisition' },
        { id: 'traffic', label: 'Traffic' },
        { id: 'sales', label: 'Sales' },
      ],
      multiple: true,
      faker: 'lorem.words',
    },
    recordedDate: { label: 'Recorded Date', type: 'date', faker: 'date.past' },
    createdBy: { label: 'Created By', type: 'text', faker: 'name.fullName' },
    createdDate: { label: 'Created Date', type: 'date', faker: 'date.past' },
  };
  
  export const entityName = 'Campaign Performance';
  export const collectionName = 'campaign-performance';
  