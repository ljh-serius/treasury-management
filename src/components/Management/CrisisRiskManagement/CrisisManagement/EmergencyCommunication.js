export const fieldsConfig = {
    communicationId: { label: 'Communication ID', type: 'text', faker: 'datatype.uuid' },
    crisisId: { label: 'Crisis ID', type: 'text', faker: 'datatype.uuid' },
    communicationMethod: {
        label: 'Communication Method',
        type: 'select',
        options: [
            { id: 'email', label: 'Email' },
            { id: 'sms', label: 'SMS' },
            { id: 'phone-call', label: 'Phone Call' },
            { id: 'press-conference', label: 'Press Conference' },
        ],
        faker: 'random.arrayElement',
    },
    messageContent: { label: 'Message Content', type: 'text', faker: 'lorem.paragraph' },
    sender: { label: 'Sender', type: 'text', faker: 'name.fullName' },
    recipients: { label: 'Recipients', type: 'text', faker: 'name.fullName' },
    status: {
        label: 'Status',
        type: 'select',
        options: [
            { id: 'sent', label: 'Sent' },
            { id: 'pending', label: 'Pending' },
            { id: 'failed', label: 'Failed' },
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
    sentDate: { label: 'Sent Date', type: 'date', faker: 'date.past' },
    createdBy: { label: 'Created By', type: 'text', faker: 'name.fullName' },
    createdDate: { label: 'Created Date', type: 'date', faker: 'date.past' },
};

export const entityName = 'Emergency Communication';
export const collectionName = 'emergency-communication';
