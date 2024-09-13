export const fieldsConfig = {
    metricId: { label: 'Metric ID', type: 'text', faker: 'datatype.uuid' },
    partnerId: { label: 'Partner ID', type: 'text', faker: 'datatype.uuid' },
    metricName: { label: 'Metric Name', type: 'text', faker: 'lorem.words' },
    metricValue: { label: 'Metric Value', type: 'number', faker: 'finance.amount' },
    evaluationDate: { label: 'Evaluation Date', type: 'date', faker: 'date.past' },
    tags: {
      label: 'Tags',
      type: 'select',
      options: [
        { id: 'performance', label: 'Performance' },
        { id: 'high-priority', label: 'High Priority' },
        { id: 'evaluation', label: 'Evaluation' },
        { id: 'completed', label: 'Completed' },
      ],
      multiple: true,
      faker: 'random.arrayElement',
    },
    createdBy: { label: 'Created By', type: 'text', faker: 'name.fullName' },
    createdDate: { label: 'Created Date', type: 'date', faker: 'date.past' },
  };
  
  export const entityName = 'Performance Metrics';
  export const collectionName = 'performance-metrics';
  