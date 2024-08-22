export const fieldsConfig = {
    programId: { label: 'Program ID', type: 'text', faker: 'datatype.uuid' },
    programName: { label: 'Program Name', type: 'text', faker: 'company.catchPhrase' },
    startDate: { label: 'Start Date', type: 'date', faker: 'date.past' },
    endDate: { label: 'End Date', type: 'date', faker: 'date.future' },
    description: { label: 'Description', type: 'text', faker: 'lorem.paragraph' },
    budget: { label: 'Budget', type: 'number', faker: 'finance.amount' },
    spentAmount: { label: 'Spent Amount', type: 'number', faker: 'finance.amount' },
    outcome: { label: 'Outcome', type: 'text', faker: 'lorem.paragraph' },
    createdBy: { label: 'Created By', type: 'text', faker: 'name.fullName' },
    createdDate: { label: 'Created Date', type: 'date', faker: 'date.past' },
};

export const entityName = 'Corporate Social Responsibility Programs';
export const collectionName = 'csr-programs';
