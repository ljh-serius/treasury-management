export const fieldsConfig = {
    collaborationId: { label: 'Collaboration ID', type: 'text', faker: 'datatype.uuid' },
    partnerName: { label: 'Partner Name', type: 'text', faker: 'company.name' },
    projectTitle: { label: 'Project Title', type: 'text', faker: 'lorem.sentence' },
    startDate: { label: 'Start Date', type: 'date', faker: 'date.past' },
    endDate: { label: 'End Date', type: 'date', faker: 'date.future' },
    role: { label: 'Role', type: 'text', faker: 'company.bs' },
    outcomes: { label: 'Outcomes', type: 'text', faker: 'lorem.paragraph' },
    status: {
        label: 'Status',
        type: 'select',
        options: [
            { id: 'active', label: 'Active' },
            { id: 'completed', label: 'Completed' },
            { id: 'terminated', label: 'Terminated' },
        ],
        faker: 'random.arrayElement',
    },
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

export const entityName = 'Partner Collaboration';
export const collectionName = 'partner-collaboration';
