export const fieldsConfig = {
    descriptionId: { label: 'Description ID', type: 'text', faker: 'datatype.uuid' },
    jobTitle: { label: 'Job Title', type: 'text', faker: 'name.jobTitle' },
    department: { label: 'Department', type: 'select', options: [], faker: 'commerce.department' },
    responsibilities: { label: 'Responsibilities', type: 'text', multiline: true, rows: 4, faker: 'lorem.paragraph' },
    qualifications: { label: 'Qualifications', type: 'text', multiline: true, rows: 4, faker: 'lorem.paragraph' },
    numberOfApplicants: { label: 'Number of Applicants', type: 'number', faker: 'datatype.number' },
    positionOpenDate: { label: 'Position Open Date', type: 'date', faker: 'date.past' },
    positionCloseDate: { label: 'Position Close Date', type: 'date', faker: 'date.future' },
    tags: {
        label: 'Tags',
        type: 'select',
        options: [
            { id: 'urgent', label: 'Urgent' },
            { id: 'important', label: 'Important' },
            { id: 'closed', label: 'Closed' },
            { id: 'open', label: 'Open' },
            { id: 'on_hold', label: 'On Hold' },
        ],
        multiple: true,
        faker: 'random.arrayElement',
    },
    createdBy: { label: 'Created By', type: 'text', faker: 'name.fullName' },
    lastModifiedBy: { label: 'Last Modified By', type: 'text', faker: 'name.fullName' },
    createdDate: { label: 'Created Date', type: 'date', faker: 'date.past' },
    lastModifiedDate: { label: 'Last Modified Date', type: 'date', faker: 'date.recent' },
};

export const entityName = 'Job Descriptions';
export const collectionName = 'job-descriptions';
