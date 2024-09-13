export const fieldsConfig = {
    applicantId: { label: 'Applicant ID', type: 'text', faker: 'datatype.uuid' },
    jobId: { label: 'Job ID', type: 'text', faker: 'datatype.uuid' },
    applicantName: { label: 'Applicant Name', type: 'text', faker: 'name.fullName' },
    applicationDate: { label: 'Application Date', type: 'date', faker: 'date.past' },
    interviewStatus: {
        label: 'Interview Status',
        type: 'select',
        options: [
            { id: 'pending', label: 'Pending' },
            { id: 'scheduled', label: 'Scheduled' },
            { id: 'completed', label: 'Completed' },
            { id: 'rejected', label: 'Rejected' },
        ],
        faker: 'random.arrayElement',
    },
    notes: { label: 'Notes', type: 'text', multiline: true, rows: 4, faker: 'lorem.paragraph' },
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

export const entityName = 'Application Tracking';
export const collectionName = 'applicant-tracking';

