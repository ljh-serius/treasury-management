export const fieldsConfig = {
    teamId: { label: 'Team ID', type: 'text', faker: 'datatype.uuid' },
    teamName: { label: 'Team Name', type: 'text', faker: 'company.catchPhrase' },
    description: { label: 'Description', type: 'text', faker: 'lorem.paragraph' },
    teamLeader: { label: 'Team Leader', type: 'text', faker: 'name.fullName' },
    members: { label: 'Members', type: 'text', faker: 'name.fullName' },
    responsibilities: { label: 'Responsibilities', type: 'text', faker: 'lorem.sentences' },
    status: {
        label: 'Status',
        type: 'select',
        options: [
            { id: 'active', label: 'Active' },
            { id: 'inactive', label: 'Inactive' },
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

export const entityName = 'Crisis Response Teams';
export const collectionName = 'crisis-response-teams';
