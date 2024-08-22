export const fieldsConfig = {
    integrationPlanId: { label: 'Integration Plan ID', type: 'text', faker: 'datatype.uuid' },
    targetId: { label: 'Target ID', type: 'text', faker: 'datatype.uuid' },
    integrationTitle: { label: 'Integration Title', type: 'text', faker: 'lorem.sentence' },
    description: { label: 'Description', type: 'text', faker: 'lorem.paragraph' },
    startDate: { label: 'Start Date', type: 'date', faker: 'date.past' },
    endDate: { label: 'End Date', type: 'date', faker: 'date.future' },
    responsibleTeam: { label: 'Responsible Team', type: 'text', faker: 'company.name' },
    goals: { label: 'Goals', type: 'text', faker: 'lorem.sentences' },
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

export const entityName = 'Integration Plans';
export const collectionName = 'integration-plans';
