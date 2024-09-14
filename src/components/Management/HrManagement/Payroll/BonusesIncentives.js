export const fieldsConfig = {
    incentiveId: { label: 'Incentive ID', type: 'text', faker: 'datatype.uuid' },
    employeeId: { label: 'Employee ID', type: 'text', faker: 'datatype.uuid' },
    bonusAmount: { label: 'Bonus Amount', type: 'number', faker: 'finance.amount' },
    incentiveType: {
        label: 'Incentive Type',
        type: 'select',
        options: [
            { id: 'performance', label: 'Performance' },
            { id: 'sales', label: 'Sales' },
            { id: 'referral', label: 'Referral' },
        ],
        faker: 'random.arrayElement',
    },
    issueDate: { label: 'Issue Date', type: 'date', faker: 'date.past' },
    bonusPercentage: { label: 'Bonus Percentage', type: 'number', faker: 'datatype.number' },
    frequency: {
        label: 'Frequency',
        type: 'select',
        options: [
            { id: 'monthly', label: 'Monthly' },
            { id: 'quarterly', label: 'Quarterly' },
            { id: 'annually', label: 'Annually' },
        ],
        faker: 'random.arrayElement',
    },
    status: {
        label: 'Status',
        type: 'select',
        options: [
            { id: 'issued', label: 'Issued' },
            { id: 'pending', label: 'Pending' },
            { id: 'cancelled', label: 'Cancelled' },
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

export const entityName = 'Bonuses and Incentives';
export const collectionName = 'bonuses-and-incentives';
