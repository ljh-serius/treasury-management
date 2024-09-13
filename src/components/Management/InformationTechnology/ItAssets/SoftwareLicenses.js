export const fieldsConfig = {
    licenseId: { label: 'License ID', type: 'text', faker: 'datatype.uuid' },
    softwareName: { label: 'Software Name', type: 'text', faker: 'company.bs' },
    licenseKey: { label: 'License Key', type: 'text', faker: 'datatype.uuid' },
    purchaseDate: { label: 'Purchase Date', type: 'date', faker: 'date.past' },
    expirationDate: { label: 'Expiration Date', type: 'date', faker: 'date.future' },
    assignedTo: { label: 'Assigned To', type: 'text', faker: 'name.fullName' },
    status: {
        label: 'Status',
        type: 'select',
        options: [
            { id: 'active', label: 'Active' },
            { id: 'expired', label: 'Expired' },
            { id: 'revoked', label: 'Revoked' },
        ],
        faker: 'random.arrayElement',
    },
    tags: {
        label: 'Tags',
        type: 'select',
        options: [
            { id: 'critical', label: 'Critical' },
            { id: 'expired', label: 'Expired' },
            { id: 'active', label: 'Active' },
            { id: 'license-management', label: 'License Management' },
        ],
        multiple: true,
        faker: 'lorem.words',
    },
    createdBy: { label: 'Created By', type: 'text', faker: 'name.fullName' },
    createdDate: { label: 'Created Date', type: 'date', faker: 'date.past' },
};

export const entityName = 'Software Licenses';
export const collectionName = 'software-licenses';
