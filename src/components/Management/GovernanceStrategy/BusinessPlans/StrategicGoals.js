export const fieldsConfig = {
    goalId: { label: 'Goal ID', type: 'text', faker: 'datatype.uuid' },
    goalName: { label: 'Goal Name', type: 'text', faker: 'company.bs' },
    goalDescription: { label: 'Goal Description', type: 'text', multiline: true, rows: 4, faker: 'lorem.paragraph' },
    targetDate: { label: 'Target Date', type: 'date', faker: 'date.future' },
    progress: { label: 'Progress', type: 'number', faker: 'datatype.number' },
    status: {
        label: 'Status',
        type: 'select',
        options: [
            { id: 'on-track', label: 'On Track' },
            { id: 'delayed', label: 'Delayed' },
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
    createdBy: { label: 'Created By', type: 'text', faker: 'name.fullName' },
    createdDate: { label: 'Created Date', type: 'date', faker: 'date.past' },
};

export const entityName = 'Strategic Goals';
export const collectionName = 'strategic-goals'