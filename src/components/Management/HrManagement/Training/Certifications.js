export const fieldsConfig = {
    certificationId: { label: 'Certification ID', type: 'text', faker: 'datatype.uuid' },
    certificationName: { label: 'Certification Name', type: 'text', faker: 'company.catchPhrase' },
    employeeId: { label: 'Employee ID', type: 'text', faker: 'datatype.uuid' },
    issueDate: { label: 'Issue Date', type: 'date', faker: 'date.past' },
    expiryDate: { label: 'Expiry Date', type: 'date', faker: 'date.future' },
    status: {
        label: 'Status',
        type: 'select',
        options: [
            { id: 'valid', label: 'Valid' },
            { id: 'expired', label: 'Expired' },
        ],
        faker: 'random.arrayElement',
    },
    tags: {
        label: 'Tags',
        type: 'select',
        options: [
            { id: 'urgent', label: 'Urgent' },
            { id: 'important', label: 'Important' },
            { id: 'review', label: 'Review' },
        ],
        multiple: true,
        faker: 'random.arrayElement',
    },
    createdBy: { label: 'Created By', type: 'text', faker: 'name.fullName' },
    lastModifiedBy: { label: 'Last Modified By', type: 'text', faker: 'name.fullName' },
    createdDate: { label: 'Created Date', type: 'date', faker: 'date.past' },
    lastModifiedDate: { label: 'Last Modified Date', type: 'date', faker: 'date.recent' },
};

export const entityName = 'Certifications';
export const collectionName = 'certifications';
