export const fieldsConfig = {
    overtimeId: { label: 'Overtime ID', type: 'text', faker: 'datatype.uuid' },
    employeeId: { label: 'Employee ID', type: 'text', faker: 'datatype.uuid' },
    overtimeHours: { label: 'Overtime Hours', type: 'number', faker: 'datatype.number' },
    ratePerHour: { label: 'Rate Per Hour', type: 'number', faker: 'finance.amount' },
    totalOvertimePay: { label: 'Total Overtime Pay', type: 'number', faker: 'finance.amount' },
    overtimeDate: { label: 'Overtime Date', type: 'date', faker: 'date.past' },
    approvedBy: { label: 'Approved By', type: 'text', faker: 'name.fullName' },
    approvalDate: { label: 'Approval Date', type: 'date', faker: 'date.past' },
    status: {
        label: 'Status',
        type: 'select',
        options: [
            { id: 'approved', label: 'Approved' },
            { id: 'pending', label: 'Pending' },
            { id: 'denied', label: 'Denied' },
        ],
        faker: 'random.arrayElement',
    },
    tags: {
        label: 'Tags',
        type: 'select',
        options: [
            { id: 'urgent', label: 'Urgent' },
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

export const entityName = 'Overtime Management';
export const collectionName = 'overtime-management';
