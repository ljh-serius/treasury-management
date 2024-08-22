export const fieldsConfig = {
    riskId: { label: 'Risk ID', type: 'text', faker: 'datatype.uuid' },
    riskTitle: { label: 'Risk Title', type: 'text', faker: 'lorem.sentence' },
    description: { label: 'Description', type: 'text', faker: 'lorem.paragraph' },
    riskCategory: {
        label: 'Risk Category',
        type: 'select',
        options: [
            { id: 'financial', label: 'Financial' },
            { id: 'operational', label: 'Operational' },
            { id: 'strategic', label: 'Strategic' },
            { id: 'compliance', label: 'Compliance' },
        ],
        faker: 'random.arrayElement',
    },
    likelihood: {
        label: 'Likelihood',
        type: 'select',
        options: [
            { id: 'high', label: 'High' },
            { id: 'medium', label: 'Medium' },
            { id: 'low', label: 'Low' },
        ],
        faker: 'random.arrayElement',
    },
    impact: {
        label: 'Impact',
        type: 'select',
        options: [
            { id: 'high', label: 'High' },
            { id: 'medium', label: 'Medium' },
            { id: 'low', label: 'Low' },
        ],
        faker: 'random.arrayElement',
    },
    mitigationStrategy: { label: 'Mitigation Strategy', type: 'text', faker: 'lorem.paragraph' },
    responsiblePerson: { label: 'Responsible Person', type: 'text', faker: 'name.fullName' },
    status: {
        label: 'Status',
        type: 'select',
        options: [
            { id: 'identified', label: 'Identified' },
            { id: 'mitigated', label: 'Mitigated' },
            { id: 'ongoing', label: 'Ongoing' },
        ],
        faker: 'random.arrayElement',
    },
    identificationDate: { label: 'Identification Date', type: 'date', faker: 'date.past' },
    createdBy: { label: 'Created By', type: 'text', faker: 'name.fullName' },
    createdDate: { label: 'Created Date', type: 'date', faker: 'date.past' },
};

export const entityName = 'Risk Identification';
export const collectionName = 'risk-identification';
