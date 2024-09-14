export const fieldsConfig = {
    metricId: { label: 'Metric ID', type: 'text', faker: 'datatype.uuid' },
    employeeId: { label: 'Employee ID', type: 'text', faker: 'datatype.uuid' },
    metricName: { label: 'Metric Name', type: 'text', faker: 'company.bsBuzz' },
    score: { label: 'Score', type: 'number', faker: 'datatype.number' },
    metricCategory: {
        label: 'Metric Category',
        type: 'select',
        options: [
            { id: 'productivity', label: 'Productivity' },
            { id: 'quality', label: 'Quality' },
            { id: 'timeliness', label: 'Timeliness' },
        ],
        faker: 'random.arrayElement',
    },
    status: {
        label: 'Status',
        type: 'select',
        options: [
            { id: 'measured', label: 'Measured' },
            { id: 'pending', label: 'Pending' },
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

export const entityName = 'Performance Metrics';
export const collectionName = 'performance-metrics';
