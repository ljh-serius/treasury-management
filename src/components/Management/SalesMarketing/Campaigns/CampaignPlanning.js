export const fieldsConfig = {
    campaignId: { label: 'Campaign ID', type: 'text', faker: 'datatype.uuid' },
    campaignName: { label: 'Campaign Name', type: 'text', faker: 'commerce.productName' },
    startDate: { label: 'Start Date', type: 'date', faker: 'date.past' },
    endDate: { label: 'End Date', type: 'date', faker: 'date.future' },
    budget: { label: 'Budget', type: 'number', faker: 'finance.amount' },
    goals: { label: 'Goals', type: 'text', multiline: true, rows: 4, faker: 'lorem.paragraph' },
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

export const entityName = 'Campaign Planning';
export const collectionName = 'campaign-planning';
