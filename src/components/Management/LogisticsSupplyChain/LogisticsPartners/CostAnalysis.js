export const fieldsConfig = {
    analysisId: { label: 'Analysis ID', type: 'text', faker: 'datatype.uuid' },
    partnerId: { label: 'Partner ID', type: 'text', faker: 'datatype.uuid' },
    analysisDate: { label: 'Analysis Date', type: 'date', faker: 'date.past' },
    totalCost: { label: 'Total Cost', type: 'number', faker: 'finance.amount' },
    costBreakdown: { label: 'Cost Breakdown', type: 'text', faker: 'lorem.paragraph' },
    tags: {
      label: 'Tags',
      type: 'select',
      options: [
        { id: 'high-priority', label: 'High Priority' },
        { id: 'urgent', label: 'Urgent' },
        { id: 'completed', label: 'Completed' },
        { id: 'pending-review', label: 'Pending Review' },
      ],
      multiple: true,
      faker: 'random.arrayElement',
    },
    createdBy: { label: 'Created By', type: 'text', faker: 'name.fullName' },
    createdDate: { label: 'Created Date', type: 'date', faker: 'date.past' },
};

export const entityName = 'Cost Analysis';
export const collectionName = 'cost-analysis';
