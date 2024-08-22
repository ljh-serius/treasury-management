export const fieldsConfig = {
    analysisId: { label: 'Analysis ID', type: 'text', faker: 'datatype.uuid' },
    stakeholderName: { label: 'Stakeholder Name', type: 'text', faker: 'name.fullName' },
    analysisDate: { label: 'Analysis Date', type: 'date', faker: 'date.past' },
    influenceLevel: {
        label: 'Influence Level',
        type: 'select',
        options: [
            { id: 'high', label: 'High' },
            { id: 'medium', label: 'Medium' },
            { id: 'low', label: 'Low' },
        ],
        faker: 'random.arrayElement',
    },
    interestLevel: {
        label: 'Interest Level',
        type: 'select',
        options: [
            { id: 'high', label: 'High' },
            { id: 'medium', label: 'Medium' },
            { id: 'low', label: 'Low' },
        ],
        faker: 'random.arrayElement',
    },
    strategy: { label: 'Strategy', type: 'text', faker: 'lorem.paragraph' },
    outcomes: { label: 'Outcomes', type: 'text', faker: 'lorem.sentence' },
    createdBy: { label: 'Created By', type: 'text', faker: 'name.fullName' },
    createdDate: { label: 'Created Date', type: 'date', faker: 'date.past' },
    tags: {
        label: 'Tags',
        type: 'select',
        options: [
            { id: 'urgent', label: 'Urgent' },
            { id: 'review', label: 'Review' },
            { id: 'important', label: 'Important' },
            { id: 'completed', label: 'Completed' },
            { id: 'follow-up', label: 'Follow-Up' },
        ],
        multiple: true,
        faker: 'random.arrayElement',
    },
};

export const entityName = 'Stakeholder Analysis';
export const collectionName = 'stakeholder-analysis';
