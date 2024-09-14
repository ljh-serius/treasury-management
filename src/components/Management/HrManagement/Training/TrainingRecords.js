export const fieldsConfig = {
    recordId: { label: 'Record ID', type: 'text', faker: 'datatype.uuid' },
    employeeId: { label: 'Employee ID', type: 'text', faker: 'datatype.uuid' },
    programName: { label: 'Program Name', type: 'text', faker: 'company.bsNoun' },
    completionDate: { label: 'Completion Date', type: 'date', faker: 'date.past' },
    result: {
        label: 'Result',
        type: 'select',
        options: [
            { id: 'pass', label: 'Pass' },
            { id: 'fail', label: 'Fail' },
        ],
        faker: 'random.arrayElement',
    },
    score: { label: 'Score', type: 'number', faker: 'datatype.number' },
    status: {
        label: 'Status',
        type: 'select',
        options: [
            { id: 'completed', label: 'Completed' },
            { id: 'pending', label: 'Pending' },
            { id: 'failed', label: 'Failed' },
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

export const entityName = 'Training Records';
export const collectionName = 'training-records';
