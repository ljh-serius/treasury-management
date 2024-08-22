export const fieldsConfig = {
    evaluationId: { label: 'Evaluation ID', type: 'text', faker: 'datatype.uuid' },
    supplierId: { label: 'Supplier ID', type: 'text', faker: 'datatype.uuid' },
    evaluationDate: { label: 'Evaluation Date', type: 'date', faker: 'date.past' },
    performanceScore: { label: 'Performance Score', type: 'number', faker: 'finance.amount' },
    evaluationSummary: { label: 'Evaluation Summary', type: 'text', faker: 'lorem.paragraph' },
    createdBy: { label: 'Created By', type: 'text', faker: 'name.fullName' },
    createdDate: { label: 'Created Date', type: 'date', faker: 'date.past' },
};

export const entityName = 'Supplier Performance Evaluation';
export const collectionName = 'supplier-performance-evaluation';
