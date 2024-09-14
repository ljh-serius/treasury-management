export const fieldsConfig = {
    applicationId: { label: 'Application ID', type: 'text', faker: 'datatype.uuid' },
    jobTitle: { label: 'Job Title', type: 'text', faker: 'name.jobTitle' },
    applicantName: { label: 'Applicant Name', type: 'text', faker: 'name.fullName' },
    applicationDate: { label: 'Application Date', type: 'date', faker: 'date.past' },
    status: {
        label: 'Application Status',
        type: 'select',
        options: [
            { id: 'applied', label: 'Applied' },
            { id: 'interview_scheduled', label: 'Interview Scheduled' },
            { id: 'rejected', label: 'Rejected' },
            { id: 'hired', label: 'Hired' },
        ],
        faker: 'random.arrayElement',
    },
    tags: {
        label: 'Tags',
        type: 'select',
        options: [
            { id: 'urgent', label: 'Urgent' },
            { id: 'qualified', label: 'Qualified' },
            { id: 'rejected', label: 'Rejected' },
            { id: 'under_review', label: 'Under Review' },
        ],
        multiple: true,
        faker: 'random.arrayElement',
    },
    createdBy: { label: 'Created By', type: 'text', faker: 'name.fullName' },
    lastModifiedBy: { label: 'Last Modified By', type: 'text', faker: 'name.fullName' },
    createdDate: { label: 'Created Date', type: 'date', faker: 'date.past' },
    lastModifiedDate: { label: 'Last Modified Date', type: 'date', faker: 'date.recent' },
};

export const entityName = 'Applicant Tracking';
export const collectionName = 'applicant-tracking';
