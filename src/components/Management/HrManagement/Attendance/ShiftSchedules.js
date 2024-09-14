export const fieldsConfig = {
    scheduleId: { label: 'Schedule ID', type: 'text', faker: 'datatype.uuid' },
    employeeId: { label: 'Employee ID', type: 'text', faker: 'datatype.uuid' },
    shiftStart: { label: 'Shift Start', type: 'date', faker: 'date.future' },
    shiftEnd: { label: 'Shift End', type: 'date', faker: 'date.future' },
    shiftType: {
        label: 'Shift Type',
        type: 'select',
        options: [
            { id: 'morning', label: 'Morning' },
            { id: 'afternoon', label: 'Afternoon' },
            { id: 'night', label: 'Night' },
        ],
        faker: 'random.arrayElement',
    },
    hoursWorked: { label: 'Hours Worked', type: 'number', faker: 'datatype.number' },
    overtimeHours: { label: 'Overtime Hours', type: 'number', faker: 'datatype.number' },
    status: {
        label: 'Status',
        type: 'select',
        options: [
            { id: 'scheduled', label: 'Scheduled' },
            { id: 'completed', label: 'Completed' },
            { id: 'cancelled', label: 'Cancelled' },
        ],
        faker: 'random.arrayElement',
    },
    tags: {
        label: 'Tags',
        type: 'select',
        options: [
            { id: 'priority', label: 'Priority' },
            { id: 'urgent', label: 'Urgent' },
        ],
        multiple: true,
        faker: 'random.arrayElement',
    },
    createdBy: { label: 'Created By', type: 'text', faker: 'name.fullName' },
    lastModifiedBy: { label: 'Last Modified By', type: 'text', faker: 'name.fullName' },
    createdDate: { label: 'Created Date', type: 'date', faker: 'date.past' },
    lastModifiedDate: { label: 'Last Modified Date', type: 'date', faker: 'date.recent' },
};

export const entityName = 'Shift Schedules';
export const collectionName = 'shift-schedules';
