export const fieldsConfig = {
    templateId: { label: 'Template ID', type: 'text', faker: 'datatype.uuid' },
    contractName: { label: 'Contract Name', type: 'text', faker: 'company.catchPhrase' },
    contractType: {
        label: 'Contract Type',
        type: 'select',
        options: [
            { id: 'standard', label: 'Standard' },
            { id: 'non_disclosure', label: 'Non-Disclosure' },
            { id: 'service_agreement', label: 'Service Agreement' },
        ],
        faker: 'random.arrayElement',
    },
    validFrom: { label: 'Valid From', type: 'date', faker: 'date.past' },
    validTo: { label: 'Valid To', type: 'date', faker: 'date.future' },
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

    createdBy: { label: 'Created By', type: 'text', faker: 'name.fullName' },
    lastModifiedBy: { label: 'Last Modified By', type: 'text', faker: 'name.fullName' },
    createdDate: { label: 'Created Date', type: 'date', faker: 'date.past' },
    lastModifiedDate: { label: 'Last Modified Date', type: 'date', faker: 'date.recent' },
};

export const entityName = 'Contract Templates';
export const collectionName = 'contract-templates';