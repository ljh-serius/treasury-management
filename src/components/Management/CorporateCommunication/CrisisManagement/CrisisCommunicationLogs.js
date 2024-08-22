export const fieldsConfig = {
    logId: { label: 'Log ID', type: 'text', faker: 'datatype.uuid' },
    crisisId: { label: 'Crisis ID', type: 'text', faker: 'datatype.uuid' },
    communicationDate: { label: 'Communication Date', type: 'date', faker: 'date.past' },
    communicationMethod: {
        label: 'Communication Method',
        type: 'select',
        options: [
            { id: 'email', label: 'Email' },
            { id: 'phone-call', label: 'Phone Call' },
            { id: 'press-conference', label: 'Press Conference' },
        ],
        faker: 'random.arrayElement',
    },
    message: { label: 'Message', type: 'text', faker: 'lorem.paragraph' },
    sender: { label: 'Sender', type: 'text', faker: 'name.fullName' },
    recipient: { label: 'Recipient', type: 'text', faker: 'name.fullName' },
    status: {
        label: 'Status',
        type: 'select',
        options: [
            { id: 'sent', label: 'Sent' },
            { id: 'received', label: 'Received' },
            { id: 'pending', label: 'Pending' },
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

export const entityName = 'Crisis Communication Logs';
export const collectionName = 'crisis-communication-logs';
