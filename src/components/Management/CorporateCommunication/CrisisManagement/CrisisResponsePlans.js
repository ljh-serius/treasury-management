export const fieldsConfig = {
    planId: { label: 'Plan ID', type: 'text', faker: 'datatype.uuid' },
    planTitle: { label: 'Plan Title', type: 'text', faker: 'lorem.sentence' },
    description: { label: 'Description', type: 'text', faker: 'lorem.paragraphs' },
    creationDate: { label: 'Creation Date', type: 'date', faker: 'date.past' },
    lastUpdated: { label: 'Last Updated', type: 'date', faker: 'date.recent' },
    responsibleTeam: { label: 'Responsible Team', type: 'text', faker: 'company.name' },
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
    createdBy: { label: 'Created By', type: 'text', faker: 'name.fullName' },
    createdDate: { label: 'Created Date', type: 'date', faker: 'date.past' },
};

export const entityName = 'Crisis Response Plans';
export const collectionName = 'crisis-response-plans';
