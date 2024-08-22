export const fieldsConfig = {
    systemsIntegrationId: { label: 'Systems Integration ID', type: 'text', faker: 'datatype.uuid' },
    integrationPlanId: { label: 'Integration Plan ID', type: 'text', faker: 'datatype.uuid' },
    targetId: { label: 'Target ID', type: 'text', faker: 'datatype.uuid' },
    itSystemsInvolved: { label: 'IT Systems Involved', type: 'text', faker: 'lorem.words' },
    integrationStrategy: { label: 'Integration Strategy', type: 'text', faker: 'lorem.paragraph' },
    startDate: { label: 'Start Date', type: 'date', faker: 'date.past' },
    endDate: { label: 'End Date', type: 'date', faker: 'date.future' },
    responsibleTeam: { label: 'Responsible Team', type: 'text', faker: 'company.name' },
    progress: { label: 'Progress (%)', type: 'number', faker: 'finance.amount' },
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
    createdBy: { label: 'Created By', type: 'text', faker: 'name.fullName' },
    createdDate: { label: 'Created Date', type: 'date', faker: 'date.past' },
};

export const entityName = 'Systems Integration';
export const collectionName = 'systems-integration';
