export const fieldsConfig = {
    scenarioId: { label: 'Scenario ID', type: 'text', faker: 'datatype.uuid' },
    scenarioTitle: { label: 'Scenario Title', type: 'text', faker: 'lorem.sentence' },
    description: { label: 'Description', type: 'text', faker: 'lorem.paragraph' },
    potentialImpact: { label: 'Potential Impact', type: 'text', faker: 'lorem.paragraph' },
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
    mitigationStrategy: { label: 'Mitigation Strategy', type: 'text', faker: 'lorem.paragraph' },
    responsiblePerson: { label: 'Responsible Person', type: 'text', faker: 'name.fullName' },
    status: {
        label: 'Status',
        type: 'select',
        options: [
            { id: 'active', label: 'Active' },
            { id: 'archived', label: 'Archived' },
        ],
        faker: 'random.arrayElement',
    },
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
    createdBy: { label: 'Created By', type: 'text', faker: 'name.fullName' },
    createdDate: { label: 'Created Date', type: 'date', faker: 'date.past' },
};

export const entityName = 'Crisis Scenarios';
export const collectionName = 'crisis-scenarios';
