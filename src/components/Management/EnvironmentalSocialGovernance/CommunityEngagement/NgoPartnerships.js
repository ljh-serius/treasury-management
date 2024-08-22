export const fieldsConfig = {
    partnershipId: { label: 'Partnership ID', type: 'text', faker: 'datatype.uuid' },
    ngoName: { label: 'NGO Name', type: 'text', faker: 'company.name' },
    startDate: { label: 'Start Date', type: 'date', faker: 'date.past' },
    endDate: { label: 'End Date', type: 'date', faker: 'date.future' },
    partnershipScope: { label: 'Partnership Scope', type: 'text', faker: 'lorem.paragraph' },
    budget: { label: 'Budget', type: 'number', faker: 'finance.amount' },
    outcome: { label: 'Outcome', type: 'text', faker: 'lorem.paragraph' },
    createdBy: { label: 'Created By', type: 'text', faker: 'name.fullName' },
    createdDate: { label: 'Created Date', type: 'date', faker: 'date.past' },
};

export const entityName = 'Partnerships with NGOs';
export const collectionName = 'ngo-partnerships';
