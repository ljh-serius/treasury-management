import {
  fetchDocuments, addDocument, updateDocument, deleteDocument
} from '../utils/firebaseCrudHelpers';

export const fieldsConfig = {
  name: { label: 'Name', type: 'text' },
  position: { label: 'Position', type: 'text' },
  email: { label: 'Email', type: 'email' },
  phone: { label: 'Phone', type: 'text' },
  department: { label: 'Department', type: 'text' },
  hireDate: { label: 'Hire Date', type: 'date' },
  salary: { label: 'Salary', type: 'number' },
  status: { label: 'Status', type: 'text' },
  manager: { label: 'Manager', type: 'text' },
  location: { label: 'Location', type: 'text' },
  address: { label: 'Address', type: 'text' },
  dateOfBirth: { label: 'Date of Birth', type: 'date' },
  gender: { label: 'Gender', type: 'text' },
  maritalStatus: { label: 'Marital Status', type: 'text' },
  nationality: { label: 'Nationality', type: 'text' },
  emergencyContactName: { label: 'Emergency Contact Name', type: 'text' },
  emergencyContactPhone: { label: 'Emergency Contact Phone', type: 'text' },
  bankAccountNumber: { label: 'Bank Account Number', type: 'text' },
  socialSecurityNumber: { label: 'Social Security Number', type: 'text' },
  taxId: { label: 'Tax ID', type: 'text' },
  jobTitle: { label: 'Job Title', type: 'text' },
  employmentType: { label: 'Employment Type', type: 'text' },
  workSchedule: { label: 'Work Schedule', type: 'text' },
  yearsOfExperience: { label: 'Years of Experience', type: 'number' },
  highestEducation: { label: 'Highest Education', type: 'text' },
  certifications: { label: 'Certifications', type: 'text' },
  languagesSpoken: { label: 'Languages Spoken', type: 'text' },
  skills: { label: 'Skills', type: 'text' },
  performanceRating: { label: 'Performance Rating', type: 'number' },
  probationEndDate: { label: 'Probation End Date', type: 'date' },
  healthInsuranceProvider: { label: 'Health Insurance Provider', type: 'text' },
  healthInsuranceNumber: { label: 'Health Insurance Number', type: 'text' },
  additionalNotes: { label: 'Additional Notes', type: 'text' },
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
export const deleteItem = (id) => deleteDocument('costemployeess', id);