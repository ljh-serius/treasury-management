export const fieldsConfig = {
    analysisId: { label: 'Analysis ID', type: 'text', faker: 'datatype.uuid' },
    analysisName: { label: 'Analysis Name', type: 'text', faker: 'company.bs' },
    dataSource: { label: 'Data Source', type: 'text', faker: 'internet.url' },
    analysisDate: { label: 'Analysis Date', type: 'date', faker: 'date.past' },
    predictionOutcome: { label: 'Prediction Outcome', type: 'text', multiline: true, rows: 4, faker: 'lorem.paragraph' },
    accuracyScore: { label: 'Accuracy Score', type: 'number', faker: 'datatype.float' },
    analyst: { label: 'Analyst', type: 'text', faker: 'name.fullName' },
    tags: {
      label: 'Tags',
      type: 'select',
      options: [],
      multiple: true,
      faker: 'lorem.words',
    },
    createdBy: { label: 'Created By', type: 'text', faker: 'name.fullName' },
    createdDate: { label: 'Created Date', type: 'date', faker: 'date.past' },
  };
  
  export const entityName = 'Predictive Analytics';
export const collectionName = 'predictive-analytics'