export const fieldsConfig = {
    communicationId: { label: 'Communication ID', type: 'text', faker: 'datatype.uuid' },
    stakeholderName: { label: 'Stakeholder Name', type: 'text', faker: 'name.fullName' },
    communicationDate: { label: 'Communication Date', type: 'date', faker: 'date.past' },
    communicationMethod: {
        label: 'Communication Method',
        type: 'select',
        options: [
            { id: 'email', label: 'Email' },
            { id: 'meeting', label: 'Meeting' },
            { id: 'phone-call', label: 'Phone Call' },
            { id: 'presentation', label: 'Presentation' },
        ],
        faker: 'random.arrayElement',
    },
    message: { label: 'Message', type: 'text', faker: 'lorem.paragraph' },
    outcome: { label: 'Outcome', type: 'text', faker: 'lorem.sentence' },
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

export const entityName = 'Stakeholder Communication';
export const collectionName = 'stakeholder-communication';
