export const fieldsConfig = {
    analysisId: { label: 'Analysis ID', type: 'text', faker: 'datatype.uuid' },
    processName: { label: 'Process Name', type: 'text', faker: 'company.bs' },
    description: { label: 'Description', type: 'text', faker: 'lorem.paragraph' },
    impactLevel: {
        label: 'Impact Level',
        type: 'select',
        options: [
            { id: 'high', label: 'High' },
            { id: 'medium', label: 'Medium' },
            { id: 'low', label: 'Low' },
        ],
        faker: 'random.arrayElement',
    },
    recoveryTimeObjective: { label: 'Recovery Time Objective', type: 'text', faker: 'lorem.sentence' },
    financialImpact: { label: 'Financial Impact', type: 'number', faker: 'finance.amount' },
    responsiblePerson: { label: 'Responsible Person', type: 'text', faker: 'name.fullName' },
    analysisDate: { label: 'Analysis Date', type: 'date', faker: 'date.past' },
    createdBy: { label: 'Created By', type: 'text', faker: 'name.fullName' },
    createdDate: { label: 'Created Date', type: 'date', faker: 'date.past' },
};

export const entityName = 'Business Impact Analysis';
export const collectionName = 'business-impact-analysis';
