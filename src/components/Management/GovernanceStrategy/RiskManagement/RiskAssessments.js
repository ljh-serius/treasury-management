export const fieldsConfig = {
    assessmentId: { label: 'Assessment ID', type: 'text', faker: 'datatype.uuid' },
    riskDescription: { label: 'Risk Description', type: 'text', multiline: true, rows: 4, faker: 'lorem.paragraph' },
    likelihood: {
      label: 'Likelihood',
      type: 'select',
      options: [
        { id: 'low', label: 'Low' },
        { id: 'medium', label: 'Medium' },
        { id: 'high', label: 'High' },
      ],
      faker: 'random.arrayElement',
    },
    impact: {
      label: 'Impact',
      type: 'select',
      options: [
        { id: 'low', label: 'Low' },
        { id: 'medium', label: 'Medium' },
        { id: 'high', label: 'High' },
      ],
      faker: 'random.arrayElement',
    },
    riskScore: { label: 'Risk Score', type: 'number', faker: 'datatype.number' },
    assessmentDate: { label: 'Assessment Date', type: 'date', faker: 'date.past' },
    assessor: { label: 'Assessor', type: 'text', faker: 'name.fullName' },
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
  
export const entityName = 'Risk Assessments';
export const collectionName = 'risk-assessments'