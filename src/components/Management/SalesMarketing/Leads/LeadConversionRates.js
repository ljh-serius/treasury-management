export const fieldsConfig = {
    leadId: { label: 'Lead ID', type: 'text', faker: 'datatype.uuid' },
    conversionDate: { label: 'Conversion Date', type: 'date', faker: 'date.past' },
    conversionRate: { label: 'Conversion Rate (%)', type: 'number', faker: 'datatype.number' },
    tags: {
        label: 'Tags',
        type: 'select',
        options: [],
        multiple: true,
        faker: 'lorem.words',
    },
    createdBy: { label: 'Created By', type: 'text', faker: 'name.fullName' },
    createdDate: { label: 'Created Date', type: 'date', faker: 'date.past' },
};

export const entityName = 'Lead Conversion Rates';
export const collectionName = 'lead-conversion-rate';
