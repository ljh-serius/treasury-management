export const fieldsConfig = {
    certificationId: { label: 'Certification ID', type: 'text', faker: 'datatype.uuid' },
    employeeId: { label: 'Employee ID', type: 'text', faker: 'datatype.uuid' },
    certificationName: { label: 'Certification Name', type: 'text', faker: 'lorem.sentence' },
    issuingOrganization: { label: 'Issuing Organization', type: 'text', faker: 'company.name' },
    issueDate: { label: 'Issue Date', type: 'date', faker: 'date.past' },
    expirationDate: { label: 'Expiration Date', type: 'date', faker: 'date.future' },
    status: {
        label: 'Status',
        type: 'select',
        options: [
            { id: 'valid', label: 'Valid' },
            { id: 'expired', label: 'Expired' },
            { id: 'renewed', label: 'Renewed' },
        ],
        faker: 'random.arrayElement',
    },
    createdBy: { label: 'Created By', type: 'text', faker: 'name.fullName' },
    createdDate: { label: 'Created Date', type: 'date', faker: 'date.past' },
};

export const entityName = 'Certification Tracking';
export const collectionName = 'certification-tracking';
