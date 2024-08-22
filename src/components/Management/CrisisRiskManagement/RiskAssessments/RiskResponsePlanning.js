export const fieldsConfig = {
    responsePlanId: { label: 'Response Plan ID', type: 'text', faker: 'datatype.uuid' },
    riskId: { label: 'Risk ID', type: 'text', faker: 'datatype.uuid' },
    riskTitle: { label: 'Risk Title', type: 'text', faker: 'lorem.sentence' },
    responseStrategy: { label: 'Response Strategy', type: 'text', faker: 'lorem.paragraph' },
    actionItems: { label: 'Action Items', type: 'text', faker: 'lorem.sentences' },
    responsiblePerson: { label: 'Responsible Person', type: 'text', faker: 'name.fullName' },
    timeline: { label: 'Timeline', type: 'text', faker: 'lorem.sentence' },
    status: {
        label: 'Status',
        type: 'select',
        options: [
            { id: 'not-started', label: 'Not Started' },
            { id: 'in-progress', label: 'In Progress' },
            { id: 'completed', label: 'Completed' },
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
    planDate: { label: 'Plan Date', type: 'date', faker: 'date.past' },
    createdBy: { label: 'Created By', type: 'text', faker: 'name.fullName' },
    createdDate: { label: 'Created Date', type: 'date', faker: 'date.past' },
};

export const entityName = 'Risk Response Planning';
export const collectionName = 'risk-response-planning';
