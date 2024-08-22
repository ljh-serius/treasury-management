export const fieldsConfig = {
    ventureId: { label: 'Venture ID', type: 'text', faker: 'datatype.uuid' },
    ventureName: { label: 'Venture Name', type: 'text', faker: 'company.name' },
    partnerName: { label: 'Partner Name', type: 'text', faker: 'company.name' },
    startDate: { label: 'Start Date', type: 'date', faker: 'date.past' },
    endDate: { label: 'End Date', type: 'date', faker: 'date.future' },
    ventureType: {
        label: 'Venture Type',
        type: 'select',
        options: [
            { id: 'equity', label: 'Equity' },
            { id: 'contractual', label: 'Contractual' },
            { id: 'partnership', label: 'Partnership' },
        ],
        faker: 'random.arrayElement',
    },
    capitalInvested: { label: 'Capital Invested', type: 'number', faker: 'finance.amount' },
    revenueShare: { label: 'Revenue Share (%)', type: 'number', faker: 'finance.amount' },
    outcomes: { label: 'Outcomes', type: 'text', faker: 'lorem.paragraph' },
    status: {
        label: 'Status',
        type: 'select',
        options: [
            { id: 'active', label: 'Active' },
            { id: 'closed', label: 'Closed' },
            { id: 'dissolved', label: 'Dissolved' },
        ],
        faker: 'random.arrayElement',
    },
    createdBy: { label: 'Created By', type: 'text', faker: 'name.fullName' },
    createdDate: { label: 'Created Date', type: 'date', faker: 'date.past' },
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
};

export const entityName = 'Joint Ventures';
export const collectionName = 'joint-ventures';
