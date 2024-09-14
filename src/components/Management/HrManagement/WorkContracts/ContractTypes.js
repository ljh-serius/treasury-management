export const fieldsConfig = {
    contractTypeId: { label: 'Contract Type ID', type: 'text', faker: 'datatype.uuid' },
    contractTypeName: { label: 'Contract Type Name', type: 'text', faker: 'company.bsNoun' },
    description: { label: 'Description', type: 'text', faker: 'lorem.sentence' },
    validFrom: { label: 'Valid From', type: 'date', faker: 'date.past' },
    validTo: { label: 'Valid To', type: 'date', faker: 'date.future' },
    contractStatus: {
        label: 'Contract Status',
        type: 'select',
        options: [
            { id: 'active', label: 'Active' },
            { id: 'expired', label: 'Expired' },
            { id: 'terminated', label: 'Terminated' },
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

export const entityName = 'Contract Types';
export const collectionName = 'contract-types';
