export const fieldsConfig = {
    ticketId: { label: 'Ticket ID', type: 'text', faker: 'datatype.uuid' },
    issueType: { label: 'Issue Type', type: 'text', faker: 'lorem.word' },
    assignedTo: { label: 'Assigned To', type: 'text', faker: 'name.fullName' },
    priority: {
        label: 'Priority',
        type: 'select',
        options: [
            { id: 'low', label: 'Low' },
            { id: 'medium', label: 'Medium' },
            { id: 'high', label: 'High' },
            { id: 'urgent', label: 'Urgent' },
        ],
        faker: 'random.arrayElement',
    },
    reportedDate: { label: 'Reported Date', type: 'date', faker: 'date.past' },
    resolutionDate: { label: 'Resolution Date', type: 'date', faker: 'date.future' },
    resolutionTime: { label: 'Resolution Time (hours)', type: 'number', faker: 'finance.amount' },
    createdBy: { label: 'Created By', type: 'text', faker: 'name.fullName' },
    createdDate: { label: 'Created Date', type: 'date', faker: 'date.past' },
};

export const entityName = 'Resolution Time Tracking';
export const collectionName = 'resolution-time-tracking';
