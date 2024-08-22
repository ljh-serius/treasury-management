export const fieldsConfig = {
    reviewId: { label: 'Review ID', type: 'text', faker: 'datatype.uuid' },
    employeeId: { label: 'Employee ID', type: 'text', faker: 'datatype.uuid' },
    reviewDate: { label: 'Review Date', type: 'date', faker: 'date.past' },
    reviewer: { label: 'Reviewer', type: 'text', faker: 'name.fullName' },
    performanceRating: { label: 'Performance Rating', type: 'number', faker: 'datatype.number' },
    comments: { label: 'Comments', type: 'text', multiline: true, rows: 4, faker: 'lorem.paragraph' },
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

    createdBy: { label: 'Created By', type: 'text', faker: 'name.fullName' },
    lastModifiedBy: { label: 'Last Modified By', type: 'text', faker: 'name.fullName' },
    createdDate: { label: 'Created Date', type: 'date', faker: 'date.past' },
    lastModifiedDate: { label: 'Last Modified Date', type: 'date', faker: 'date.recent' },
};

export const entityName = 'Review Schedules';
export const collectionName = 'review-schedules';

