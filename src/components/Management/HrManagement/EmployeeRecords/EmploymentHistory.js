export const fieldsConfig = {
    historyId: { label: 'History ID', type: 'text', faker: 'datatype.uuid' },
    employeeId: { label: 'Employee ID', type: 'text', faker: 'datatype.uuid' },
    companyName: { label: 'Company Name', type: 'text', faker: 'company.name' },
    position: { label: 'Position', type: 'text', faker: 'name.jobTitle' },
    startDate: { label: 'Start Date', type: 'date', faker: 'date.past' },
    endDate: { label: 'End Date', type: 'date', faker: 'date.past' },
    tags: {
        label: 'Tags',
        type: 'select',
        options: [
            { id: 'relevant', label: 'Relevant' },
            { id: 'outdated', label: 'Outdated' },
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

export const entityName = 'Employment History';
export const collectionName = 'employment-history';
