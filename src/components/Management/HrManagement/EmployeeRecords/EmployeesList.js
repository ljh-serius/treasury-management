export const fieldsConfig = {
    employeeId: { label: 'Employee ID', type: 'text', faker: 'datatype.uuid' },
    firstName: { label: 'First Name', type: 'text', faker: 'name.firstName' },
    lastName: { label: 'Last Name', type: 'text', faker: 'name.lastName' },
    email: { label: 'Email', type: 'email', faker: 'internet.email' },
    phone: { label: 'Phone', type: 'text', faker: 'phone.imei' },
    position: { label: 'Position', type: 'text', faker: 'name.jobTitle' },
    department: {
        label: 'Department',
        type: 'select',
        options: [],  // Populate with actual departments
        faker: 'commerce.department',
    },
    hireDate: { label: 'Hire Date', type: 'date', faker: 'date.past' },
    employmentStatus: {
        label: 'Employment Status',
        type: 'select',
        options: [
            { id: 'active', label: 'Active' },
            { id: 'inactive', label: 'Inactive' },
            { id: 'terminated', label: 'Terminated' },
        ],
        faker: 'random.arrayElement',
    },
    salary: { label: 'Salary', type: 'number', faker: 'finance.amount' },
    tags: {
        label: 'Tags',
        type: 'select',
        options: [],  // Populate with actual tags
        multiple: true,
        faker: 'lorem.words',
    },
    notes: { label: 'Notes', type: 'text', multiline: true, rows: 4, faker: 'lorem.paragraph' },
    createdBy: { label: 'Created By', type: 'text', faker: 'name.fullName' },
    lastModifiedBy: { label: 'Last Modified By', type: 'text', faker: 'name.fullName' },
    createdDate: { label: 'Created Date', type: 'date', faker: 'date.past' },
    lastModifiedDate: { label: 'Last Modified Date', type: 'date', faker: 'date.recent' },
};

export const entityName = 'Employees List';

export const collectionName = 'employees-list';

