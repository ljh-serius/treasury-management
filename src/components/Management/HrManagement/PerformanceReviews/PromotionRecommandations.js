export const fieldsConfig = {
    recommendationId: { label: 'Recommendation ID', type: 'text', faker: 'datatype.uuid' },
    employeeId: { label: 'Employee ID', type: 'text', faker: 'datatype.uuid' },
    promotionTitle: { label: 'Promotion Title', type: 'text', faker: 'name.jobTitle' },
    promotionDate: { label: 'Promotion Date', type: 'date', faker: 'date.future' },
    reviewerName: { label: 'Reviewer Name', type: 'text', faker: 'name.fullName' },
    status: {
        label: 'Status',
        type: 'select',
        options: [
            { id: 'recommended', label: 'Recommended' },
            { id: 'approved', label: 'Approved' },
            { id: 'declined', label: 'Declined' },
        ],
        faker: 'random.arrayElement',
    },
    tags: {
        label: 'Tags',
        type: 'select',
        options: [
            { id: 'urgent', label: 'Urgent' },
            { id: 'priority', label: 'Priority' },
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

export const entityName = 'Promotion Recommendations';
export const collectionName = 'promotion-recommendations';
