export const fieldsConfig = {
    approvalId: { label: 'Approval ID', type: 'text', faker: 'datatype.uuid' },
    employeeId: { label: 'Employee ID', type: 'text', faker: 'datatype.uuid' },
    timesheetDate: { label: 'Timesheet Date', type: 'date', faker: 'date.past' },
    hoursWorked: { label: 'Hours Worked', type: 'number', faker: 'datatype.number' },
    approvalStatus: {
        label: 'Approval Status',
        type: 'select',
        options: [
            { id: 'approved', label: 'Approved' },
            { id: 'pending', label: 'Pending' },
            { id: 'denied', label: 'Denied' },
        ],
        faker: 'random.arrayElement',
    },
    approverName: { label: 'Approver Name', type: 'text', faker: 'name.fullName' },
    tags: {
        label: 'Tags',
        type: 'select',
        options: [
            { id: 'urgent', label: 'Urgent' },
            { id: 'priority', label: 'Priority' },
        ],
        multiple: true,
        faker: 'random.arrayElement',
    },
    createdBy: { label: 'Created By', type: 'text', faker: 'name.fullName' },
    lastModifiedBy: { label: 'Last Modified By', type: 'text', faker: 'name.fullName' },
    createdDate: { label: 'Created Date', type: 'date', faker: 'date.past' },
    lastModifiedDate: { label: 'Last Modified Date', type: 'date', faker: 'date.recent' },
};

export const entityName = 'Timesheet Approvals';
export const collectionName = 'timesheet-approvals';
