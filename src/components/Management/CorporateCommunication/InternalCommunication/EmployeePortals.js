export const fieldsConfig = {
    portalId: { label: 'Portal ID', type: 'text', faker: 'datatype.uuid' },
    portalName: { label: 'Portal Name', type: 'text', faker: 'internet.domainWord' },
    description: { label: 'Description', type: 'text', faker: 'lorem.paragraph' },
    url: { label: 'URL', type: 'text', faker: 'internet.url' },
    launchDate: { label: 'Launch Date', type: 'date', faker: 'date.past' },
    status: {
        label: 'Status',
        type: 'select',
        options: [
            { id: 'active', label: 'Active' },
            { id: 'maintenance', label: 'Under Maintenance' },
            { id: 'decommissioned', label: 'Decommissioned' },
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
    administrator: { label: 'Administrator', type: 'text', faker: 'name.fullName' },
    createdBy: { label: 'Created By', type: 'text', faker: 'name.fullName' },
    createdDate: { label: 'Created Date', type: 'date', faker: 'date.past' },
};

export const entityName = 'Employee Portals';
export const collectionName = 'employee-portals';
