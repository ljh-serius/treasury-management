export const fieldsConfig = {
    reviewId: { label: 'Review ID', type: 'text', faker: 'datatype.uuid' },
    employeeId: { label: 'Employee ID', type: 'text', faker: 'datatype.uuid' },
    reviewDate: { label: 'Review Date', type: 'date', faker: 'date.future' },
    reviewerName: { label: 'Reviewer Name', type: 'text', faker: 'name.fullName' },
    reviewType: {
        label: 'Review Type',
        type: 'select',
        options: [
            { id: 'annual', label: 'Annual' },
            { id: 'semi_annual', label: 'Semi-Annual' },
            { id: 'quarterly', label: 'Quarterly' },
        ],
        faker: 'random.arrayElement',
    },
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

export const entityName = 'Review Schedules';
export const collectionName = 'review-schedules';
