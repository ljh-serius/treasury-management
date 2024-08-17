import {
  fetchDocuments, addDocument, updateDocument, deleteDocument
} from '../utils/firebaseCrudHelpers';

export const fieldsConfig = {
  name: { label: 'Name', type: 'text', faker: 'name.fullName' },
  position: { label: 'Position', type: 'text', faker: 'name.jobTitle' },
  email: { label: 'Email', type: 'email', faker: 'internet.email' },
  phone: { label: 'Phone', type: 'text', faker: 'phone.imei' },
  department: { label: 'Department', type: 'text', faker: 'commerce.department' },
  hireDate: { label: 'Hire Date', type: 'date', faker: 'date.past' },
  salary: { label: 'Salary', type: 'number', faker: 'finance.amount' },
  status: { label: 'Status', type: 'text', faker: 'random.word' },
  manager: { label: 'Manager', type: 'text', faker: 'name.fullName' },
  location: { label: 'Location', type: 'text', faker: 'address.city' },
  address: { label: 'Address', type: 'text', faker: 'address.streetAddress' },
  dateOfBirth: { label: 'Date of Birth', type: 'date', faker: 'date.past' },
  gender: { label: 'Gender', type: 'text', faker: 'name.gender' },
  maritalStatus: { label: 'Marital Status', type: 'text', faker: 'random.word' },
  nationality: { label: 'Nationality', type: 'text', faker: 'address.country' },
  emergencyContactName: { label: 'Emergency Contact Name', type: 'text', faker: 'name.fullName' },
  emergencyContactPhone: { label: 'Emergency Contact Phone', type: 'text', faker: 'phone.imei' },
  bankAccountNumber: { label: 'Bank Account Number', type: 'text', faker: 'finance.account' },
  socialSecurityNumber: { label: 'Social Security Number', type: 'text', faker: 'finance.iban' },
  taxId: { label: 'Tax ID', type: 'text', faker: 'finance.account' },
  jobTitle: { label: 'Job Title', type: 'text', faker: 'name.jobTitle' },
  employmentType: { label: 'Employment Type', type: 'text', faker: 'random.word' },
  workSchedule: { label: 'Work Schedule', type: 'text', faker: 'random.word' },
  yearsOfExperience: { label: 'Years of Experience', type: 'number', faker: 'datatype.number' },
  highestEducation: { label: 'Highest Education', type: 'text', faker: 'random.word' },
  certifications: { label: 'Certifications', type: 'text', faker: 'random.words' },
  languagesSpoken: { label: 'Languages Spoken', type: 'text', faker: 'random.words' },
  skills: { label: 'Skills', type: 'text', faker: 'random.words' },
  performanceRating: { label: 'Performance Rating', type: 'number', faker: 'datatype.number' },
  probationEndDate: { label: 'Probation End Date', type: 'date', faker: 'date.future' },
  healthInsuranceProvider: { label: 'Health Insurance Provider', type: 'text', faker: 'company.name' },
  healthInsuranceNumber: { label: 'Health Insurance Number', type: 'text', faker: 'finance.account' },
  additionalNotes: { label: 'Additional Notes', type: 'text', faker: 'lorem.paragraph' },
};

export const headCells = Object.keys(fieldsConfig).map(key => ({
  id: key,
  label: fieldsConfig[key].label,
}));

export const entityName = 'Employee';

const organizationId = JSON.parse(localStorage.getItem('userData')).organizationId;

export const fetchItems = () => fetchDocuments('employees', organizationId);
export const addItem = (item) => addDocument('employees', item, organizationId);
export const updateItem = (id, item) => updateDocument('employees', id, item);
export const deleteItem = (id) => deleteDocument('employees', id);
