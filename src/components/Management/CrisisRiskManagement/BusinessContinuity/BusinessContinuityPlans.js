export const fieldsConfig = {
    planId: { label: 'Plan ID', type: 'text', faker: 'datatype.uuid' },
    planTitle: { label: 'Plan Title', type: 'text', faker: 'lorem.sentence' },
    description: { label: 'Description', type: 'text', faker: 'lorem.paragraph' },
    criticalProcesses: { label: 'Critical Processes', type: 'text', faker: 'lorem.sentences' },
    responsibleTeam: { label: 'Responsible Team', type: 'text', faker: 'company.name' },
    startDate: { label: 'Start Date', type: 'date', faker: 'date.past' },
    reviewDate: { label: 'Review Date', type: 'date', faker: 'date.future' },
    status: {
        label: 'Status',
        type: 'select',
        options: [
            { id: 'draft', label: 'Draft' },
            { id: 'active', label: 'Active' },
            { id: 'archived', label: 'Archived' },
        ],
        faker: 'random.arrayElement',
    },
    approvedBy: { label: 'Approved By', type: 'text', faker: 'name.fullName' },
    createdBy: { label: 'Created By', type: 'text', faker: 'name.fullName' },
    createdDate: { label: 'Created Date', type: 'date', faker: 'date.past' },
};

export const entityName = 'Business Continuity Plans';
export const collectionName = 'business-continuity-plans';
