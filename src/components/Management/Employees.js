import {
    fetchDocuments,
    addDocument,
    updateDocument,
    deleteDocument,
    fetchDocumentsBySelectValue,
    fetchDocumentsByFieldValue,
    fetchDocumentById
} from '../../utils/firebaseCrudHelpers';

import languages from '../../data/languages';
import nationalities from '../../data/nationalities';
import skills from '../../data/skills';

import { fetchItemsBySelectValue as fetchPartnersBySelectValue } from './Partners';
import { fetchItems as fetchCosts } from './Costs';

export const fetchItems = () => {
    return fetchDocuments('employees');
}

// employees
const getCostsOptions = async () => {
    const options = (await fetchCosts()).map((cost) => {
        return {
            id: cost.id,
            label: cost.costName
        }
    })

    console.log("Options ", options)

    return options;
}

const managers = (await fetchItemsByField('position', 'manager')).map((manager) => {
    return {
        id: manager.id,
        label: manager.name
    }
})

const employees = (await fetchItems()).map((manager) => {
    return {
        id: manager.id,
        label: manager.name
    }
})

const healthInsurances = (await fetchPartnersBySelectValue('servicesProvided', 'health_insurance')).map((partner) => {
    return {
        id: partner.id,
        label: partner.partnerName
    }
})

export const fieldsConfig = {
    employeeId: { label: 'Cost ID', type: 'text', faker: 'datatype.uuid' },
    employeeName: { label: 'Cost Name', type: 'text', faker: 'name.fullName' },
    position: {
        label: 'Position',
        type: 'select',
        options: [
            { id: 'developer', label: 'Developer' },
            { id: 'designer', label: 'Designer' },
            { id: 'manager', label: 'Manager' },
            { id: 'qa', label: 'QA Engineer' },
            { id: 'hr', label: 'HR Specialist' },
        ],
        faker: 'random.arrayElement',
    },
    email: { label: 'Email', type: 'email', faker: 'internet.email' },
    phone: { label: 'Phone', type: 'text', faker: 'phone.imei' },
    department: {
        label: 'Department',
        type: 'select',
        options: [
            { id: 'engineering', label: 'Engineering' },
            { id: 'design', label: 'Design' },
            { id: 'hr', label: 'HR' },
            { id: 'marketing', label: 'Marketing' },
            { id: 'sales', label: 'Sales' },
        ],
        faker: 'random.arrayElement',
    },
    hireDate: { label: 'Hire Date', type: 'date', faker: 'date.past' },
    salary: { label: 'Salary', type: 'number', faker: 'finance.amount' },
    status: {
        label: 'Status',
        type: 'select',
        options: [
            { id: 'active', label: 'Active' },
            { id: 'inactive', label: 'Inactive' },
            { id: 'terminated', label: 'Terminated' },
            { id: 'on_leave', label: 'On Leave' },
        ],
        faker: 'random.arrayElement',
    },
    costIds: {
        label: 'Allocated Costs',
        link: '/costs',
        type: 'select',
        options: await getCostsOptions(),
        multiple: true,
        faker: 'random.arrayElements',
        refreshOptions: async () => {
            return await getCostsOptions();
        }
    },
    manager: {
        id: 'Manager',
        label: 'Manager',
        type: 'select',
        options: managers,
        faker: 'random.arrayElement',
    },
    location: {
        label: 'Location',
        type: 'select',
        options: [
            { id: 'new_york', label: 'New York' },
            { id: 'san_francisco', label: 'San Francisco' },
            { id: 'london', label: 'London' },
            { id: 'berlin', label: 'Berlin' },
            { id: 'tokyo', label: 'Tokyo' },
        ],
        faker: 'random.arrayElement',
    },
    address: { label: 'Address', type: 'text', faker: 'address.streetAddress' },
    dateOfBirth: { label: 'Date of Birth', type: 'date', faker: 'date.past' },
    gender: {
        label: 'Gender',
        type: 'select',
        options: [
            { id: 'male', label: 'Male' },
            { id: 'female', label: 'Female' },
            { id: 'other', label: 'Other' },
        ],
        faker: 'random.arrayElement',
    },
    maritalStatus: {
        label: 'Marital Status',
        type: 'select',
        options: [
            { id: 'single', label: 'Single' },
            { id: 'married', label: 'Married' },
            { id: 'divorced', label: 'Divorced' },
        ],
        faker: 'random.arrayElement',
    },
    nationality: {
        label: 'Nationality',
        multiple: true,
        type: 'select',
        options: nationalities,
        faker: 'random.arrayElement',
    },
    emergencyContactName: { label: 'Emergency Contact Name', type: 'text', faker: 'name.fullName' },
    emergencyContactPhone: { label: 'Emergency Contact Phone', type: 'text', faker: 'phone.imei' },
    bankAccountNumber: { label: 'Bank Account Number', type: 'text', faker: 'finance.account' },
    socialSecurityNumber: { label: 'Social Security Number', type: 'text', faker: 'finance.iban' },
    taxId: { label: 'Tax ID', type: 'text', faker: 'finance.account' },
    jobTitle: { label: 'Job Title', type: 'text', faker: 'name.jobTitle' },
    employmentType: {
        label: 'Employment Type',
        type: 'select',
        options: [
            { id: 'full_time', label: 'Full-Time' },
            { id: 'part_time', label: 'Part-Time' },
            { id: 'contract', label: 'Contract' },
            { id: 'intern', label: 'Intern' },
        ],
        faker: 'random.arrayElement',
    },
    workSchedule: {
        label: 'Work Schedule',
        type: 'select',
        options: [
            { id: '9_to_5', label: '9 to 5' },
            { id: 'flexible', label: 'Flexible' },
            { id: 'night_shift', label: 'Night Shift' },
        ],
        faker: 'random.arrayElement',
    },
    yearsOfExperience: { label: 'Years of Experience', type: 'number', faker: 'datatype.number' },
    highestEducation: {
        label: 'Highest Education',
        type: 'select',
        options: [
            { id: 'high_school', label: 'High School' },
            { id: 'bachelors', label: "Bachelor's Degree" },
            { id: 'masters', label: "Master's Degree" },
            { id: 'phd', label: 'PhD' },
        ],
        faker: 'random.arrayElement',
    },
    certifications: { label: 'Certifications', type: 'text', faker: 'random.words' },
    languagesSpoken: {
        label: 'Languages Spoken',
        type: 'select',
        multiple: true,
        options: languages,
        faker: 'random.arrayElement',
    },
    skills: {
        label: 'Skills',
        type: 'select',
        multiple: true,
        options: skills,
        faker: 'random.arrayElement'
    },
    performanceRating: { label: 'Performance Rating', type: 'number', faker: 'datatype.number' },
    probationEndDate: { label: 'Probation End Date', type: 'date', faker: 'date.future' },
    healthInsuranceProvider: {
        label: 'Health Insurance Provider',
        type: 'select',
        options: healthInsurances,
        faker: 'random.arrayElement',
    },
    healthInsuranceNumber: { label: 'Health Insurance Number', type: 'text', faker: 'finance.account' },
    additionalNotes: { label: 'Additional Notes', type: 'text', faker: 'lorem.paragraph' },
};

export const headCells = Object.keys(fieldsConfig).map(key => ({
    id: key,
    label: fieldsConfig[key].label,
}));

export const entityName = 'Employees';

export async function fetchItemsBySelectOption(selectMenu, value) {
    return await fetchDocumentsBySelectValue('employees', selectMenu, value);
}

export async function fetchItemsByField(fieldName, fieldValue) {
    return await fetchDocumentsByFieldValue('employees', fieldName, fieldValue);
}

export const addItem = (item) => addDocument('employees', item);
export const updateItem = (employeeId, item) => updateDocument('employees', employeeId, item);
export const deleteItem = (employeeId) => deleteDocument('employees', employeeId);

export const fetchItemById = async (id) => {
    return await fetchDocumentById('employees', id);
}
  