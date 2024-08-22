export const fieldsConfig = {
    contractId: { label: 'Contract ID', type: 'text', faker: 'datatype.uuid' },
    employeeId: { label: 'Employee ID', type: 'text', faker: 'datatype.uuid' },
    contractType: {
        label: 'Contract Type',
        type: 'select',
        options: [
            { id: 'full_time', label: 'Full Time' },
            { id: 'part_time', label: 'Part Time' },
            { id: 'contract', label: 'Contract' },
            { id: 'temporary', label: 'Temporary' },
        ],
        faker: 'random.arrayElement',
    },
    startDate: { label: 'Start Date', type: 'date', faker: 'date.past' },
    endDate: { label: 'End Date', type: 'date', faker: 'date.future' },
    salary: { label: 'Salary', type: 'number', faker: 'finance.amount' },
    status: {
        label: 'Status',
        type: 'select',
        options: [
            { id: 'active', label: 'Active' },
            { id: 'terminated', label: 'Terminated' },
            { id: 'completed', label: 'Completed' },
        ],
        faker: 'random.arrayElement',
    },
    tags: {
        label: 'Tags',
        type: 'select',
        options: [],  // Populate with actual tags
        multiple: true,
        faker: 'lorem.words',
    },
    createdBy: { label: 'Created By', type: 'text', faker: 'name.fullName' },
    lastModifiedBy: { label: 'Last Modified By', type: 'text', faker: 'name.fullName' },
    createdDate: { label: 'Created Date', type: 'date', faker: 'date.past' },
    lastModifiedDate: { label: 'Last Modified Date', type: 'date', faker: 'date.recent' },
};

export const entityName = 'Contract Types';
export const collectionName = 'contract-types';

