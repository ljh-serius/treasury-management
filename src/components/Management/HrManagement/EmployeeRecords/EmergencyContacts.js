export const fieldsConfig = {
    contactId: { label: 'Contact ID', type: 'text', faker: 'datatype.uuid' },
    employeeId: { label: 'Employee ID', type: 'text', faker: 'datatype.uuid' },
    firstName: { label: 'First Name', type: 'text', faker: 'name.firstName' },
    lastName: { label: 'Last Name', type: 'text', faker: 'name.lastName' },
    phone: { label: 'Phone', type: 'text', faker: 'phone.imei' },
    relationship: { label: 'Relationship', type: 'text', faker: 'lorem.word' },
    tags: {
        label: 'Tags',
        type: 'select',
        options: [
            { id: 'primary', label: 'Primary' },
            { id: 'secondary', label: 'Secondary' },
            { id: 'urgent', label: 'Urgent' },
            { id: 'important', label: 'Important' },
        ],
        multiple: true,
        faker: 'random.arrayElement',
    },
    createdBy: { label: 'Created By', type: 'text', faker: 'name.fullName' },
    lastModifiedBy: { label: 'Last Modified By', type: 'text', faker: 'name.fullName' },
    createdDate: { label: 'Created Date', type: 'date', faker: 'date.past' },
    lastModifiedDate: { label: 'Last Modified Date', type: 'date', faker: 'date.recent' },
};

export const entityName = 'Emergency Contacts';
export const collectionName = 'emergency-contacts';
