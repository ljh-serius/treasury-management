export const fieldsConfig = {
    complianceId: { label: 'Compliance ID', type: 'text', faker: 'datatype.uuid' },
    supplierId: { label: 'Supplier ID', type: 'text', faker: 'datatype.uuid' },
    complianceDate: { label: 'Compliance Date', type: 'date', faker: 'date.past' },
    complianceStatus: {
        label: 'Compliance Status',
        type: 'select',
        options: [
            { id: 'compliant', label: 'Compliant' },
            { id: 'non-compliant', label: 'Non-Compliant' },
        ],
        faker: 'random.arrayElement',
    },
    complianceDetails: { label: 'Compliance Details', type: 'text', faker: 'lorem.paragraph' },
    createdBy: { label: 'Created By', type: 'text', faker: 'name.fullName' },
    createdDate: { label: 'Created Date', type: 'date', faker: 'date.past' },
};

export const entityName = 'Contract Compliance';
export const collectionName = 'contract-compliance';
