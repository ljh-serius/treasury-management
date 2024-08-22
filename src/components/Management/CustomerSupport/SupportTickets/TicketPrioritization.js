export const fieldsConfig = {
    ticketId: { label: 'Ticket ID', type: 'text', faker: 'datatype.uuid' },
    customerId: { label: 'Customer ID', type: 'text', faker: 'datatype.uuid' },
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
    issueType: { label: 'Issue Type', type: 'text', faker: 'lorem.word' },
    status: {
        label: 'Status',
        type: 'select',
        options: [
            { id: 'open', label: 'Open' },
            { id: 'in-progress', label: 'In Progress' },
            { id: 'resolved', label: 'Resolved' },
            { id: 'closed', label: 'Closed' },
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
    assignedTo: { label: 'Assigned To', type: 'text', faker: 'name.fullName' },
    createdDate: { label: 'Created Date', type: 'date', faker: 'date.past' },
    resolvedDate: { label: 'Resolved Date', type: 'date', faker: 'date.future' },
    description: { label: 'Description', type: 'text', faker: 'lorem.paragraph' },
    createdBy: { label: 'Created By', type: 'text', faker: 'name.fullName' },
};

export const entityName = 'Ticket Prioritization';
export const collectionName = 'ticket-prioritization';
