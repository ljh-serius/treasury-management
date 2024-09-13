export const fieldsConfig = {
    campaignId: { label: 'Campaign ID', type: 'text', faker: 'datatype.uuid' },
    campaignName: { label: 'Campaign Name', type: 'text', faker: 'commerce.productName' },
    startDate: { label: 'Start Date', type: 'date', faker: 'date.past' },
    endDate: { label: 'End Date', type: 'date', faker: 'date.future' },
    budget: { label: 'Budget', type: 'number', faker: 'finance.amount' },
    goals: { label: 'Goals', type: 'text', multiline: true, rows: 4, faker: 'lorem.paragraph' },
    tags: {
      label: 'Tags',
      type: 'select',
      options: [
        { id: 'strategy', label: 'Strategy' },
        { id: 'target-audience', label: 'Target Audience' },
        { id: 'budget-allocation', label: 'Budget Allocation' },
        { id: 'timeline', label: 'Timeline' },
        { id: 'objectives', label: 'Objectives' },
        { id: 'creative', label: 'Creative' },
        { id: 'channel', label: 'Channel' },
      ],
      multiple: true,
      faker: 'lorem.words',
    },
    createdBy: { label: 'Created By', type: 'text', faker: 'name.fullName' },
    createdDate: { label: 'Created Date', type: 'date', faker: 'date.past' },
  };
  
  export const entityName = 'Campaign Planning';
  export const collectionName = 'campaign-planning';
  