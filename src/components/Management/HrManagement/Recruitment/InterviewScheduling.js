export const fieldsConfig = {
    interviewId: { label: 'Interview ID', type: 'text', faker: 'datatype.uuid' },
    applicantName: { label: 'Applicant Name', type: 'text', faker: 'name.fullName' },
    interviewDate: { label: 'Interview Date', type: 'date', faker: 'date.future' },
    interviewerName: { label: 'Interviewer Name', type: 'text', faker: 'name.fullName' },
    interviewType: {
        label: 'Interview Type',
        type: 'select',
        options: [
            { id: 'phone', label: 'Phone' },
            { id: 'in_person', label: 'In-Person' },
            { id: 'video_call', label: 'Video Call' },
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
            { id: 'rescheduled', label: 'Rescheduled' },
            { id: 'confirmed', label: 'Confirmed' },
        ],
        multiple: true,
        faker: 'random.arrayElement',
    },
    createdBy: { label: 'Created By', type: 'text', faker: 'name.fullName' },
    lastModifiedBy: { label: 'Last Modified By', type: 'text', faker: 'name.fullName' },
    createdDate: { label: 'Created Date', type: 'date', faker: 'date.past' },
    lastModifiedDate: { label: 'Last Modified Date', type: 'date', faker: 'date.recent' },
};

export const entityName = 'Interview Scheduling';
export const collectionName = 'interview-scheduling';
