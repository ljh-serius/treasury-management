export const fieldsConfig = {
  analysisId: { label: 'Analysis ID', type: 'text', faker: 'datatype.uuid' },
  opportunityId: { label: 'Opportunity ID', type: 'text', faker: 'datatype.uuid' },
  result: {
    label: 'Result',
    type: 'select',
    options: [
      { id: 'won', label: 'Won' },
      { id: 'lost', label: 'Lost' },
    ],
    faker: 'random.arrayElement',
  },
  analysisDate: { label: 'Analysis Date', type: 'date', faker: 'date.past' },
  reasons: { label: 'Reasons', type: 'text', multiline: true, rows: 4, faker: 'lorem.paragraph' },
  tags: {
    label: 'Tags',
    type: 'select',
    options: [
      { id: 'high-value', label: 'High Value' },
      { id: 'competitor-loss', label: 'Competitor Loss' },
      { id: 'price-sensitive', label: 'Price Sensitive' },
      { id: 'customer-retained', label: 'Customer Retained' },
      { id: 'follow-up-needed', label: 'Follow-up Needed' },
    ],
    multiple: true,
    faker: 'lorem.words',
  },
  createdBy: { label: 'Created By', type: 'text', faker: 'name.fullName' },
  createdDate: { label: 'Created Date', type: 'date', faker: 'date.past' },
};

export const entityName = 'Win/Loss Analysis';
export const collectionName = 'win-loss-analysis';
