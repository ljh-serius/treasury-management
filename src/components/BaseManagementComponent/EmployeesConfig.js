import {
  fetchDocuments, addDocument, updateDocument, deleteDocument
} from '../../utils/firebaseCrudHelpers';

export const fieldsConfig = {
  name: { label: 'Name', type: 'text', faker: 'name.fullName' },
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
  manager: { label: 'Manager', type: 'text', faker: 'name.fullName' },
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
  nationality: { label: 'Nationality', type: 'text', faker: 'address.country' },
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
  languagesSpoken: { label: 'Languages Spoken', type: 'text', faker: 'random.words' },
  skills: { label: 'Skills', type: 'text', faker: 'random.words' },
  performanceRating: { label: 'Performance Rating', type: 'number', faker: 'datatype.number' },
  probationEndDate: { label: 'Probation End Date', type: 'date', faker: 'date.future' },
  healthInsuranceProvider: {
    label: 'Health Insurance Provider',
    type: 'select',
    options: [
      { id: 'provider_a', label: 'Provider A' },
      { id: 'provider_b', label: 'Provider B' },
      { id: 'provider_c', label: 'Provider C' },
    ],
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

const organizationId = JSON.parse(localStorage.getItem('userData')).organizationId;

export const fetchItems = () => fetchDocuments('employees', organizationId);
export const addItem = (item) => addDocument('employees', item, organizationId);
export const updateItem = (id, item) => updateDocument('employees', id, item);
export const deleteItem = (id) => deleteDocument('employees', id);
