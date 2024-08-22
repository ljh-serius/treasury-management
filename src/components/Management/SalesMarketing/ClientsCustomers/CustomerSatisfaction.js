export const fieldsConfig = {
    satisfactionId: { label: 'Satisfaction ID', type: 'text', faker: 'datatype.uuid' },
    customerId: { label: 'Customer ID', type: 'text', faker: 'datatype.uuid' },
    surveyDate: { label: 'Survey Date', type: 'date', faker: 'date.past' },
    satisfactionScore: { label: 'Satisfaction Score', type: 'number', faker: 'datatype.number' },
    feedback: { label: 'Feedback', type: 'text', multiline: true, rows: 4, faker: 'lorem.paragraph' },
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
  

        
export const entityName = 'Customer Satisfaction';
export const collectionName = 'customer-satisfaction';
