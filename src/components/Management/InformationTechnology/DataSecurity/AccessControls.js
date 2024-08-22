export const fieldsConfig = {
    accessControlId: { label: 'Access Control ID', type: 'text', faker: 'datatype.uuid' },
    userId: { label: 'User ID', type: 'text', faker: 'datatype.uuid' },
    resource: { label: 'Resource', type: 'text', faker: 'lorem.word' },
    accessLevel: {
        label: 'Access Level',
        type: 'select',
        options: [
            { id: 'read', label: 'Read' },
            { id: 'write', label: 'Write' },
            { id: 'admin', label: 'Admin' },
        ],
        faker: 'random.arrayElement',
    },
    grantedBy: { label: 'Granted By', type: 'text', faker: 'name.fullName' },
    grantedDate: { label: 'Granted Date', type: 'date', faker: 'date.past' },
    expirationDate: { label: 'Expiration Date', type: 'date', faker: 'date.future' },
    createdBy: { label: 'Created By', type: 'text', faker: 'name.fullName' },
    createdDate: { label: 'Created Date', type: 'date', faker: 'date.past' },
};

export const entityName = 'Access Controls';
export const collectionName = 'access-controls';
