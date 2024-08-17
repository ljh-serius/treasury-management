import {
  fetchDocuments, addDocument, updateDocument, deleteDocument
} from '../utils/firebaseCrudHelpers';

export const fieldsConfig = {
  name: { label: 'Provider Name', type: 'text' },
  taxId: { label: 'Tax ID', type: 'text' },
  address: { label: 'Address', type: 'text' },
  contactEmail: { label: 'Email', type: 'email' },
  contactPhone: { label: 'Phone', type: 'text' },
  companyType: { label: 'Company Type', type: 'text' },
  country: { label: 'Country', type: 'text' },
  state: { label: 'State/Province', type: 'text' },
  zipCode: { label: 'Zip/Postal Code', type: 'text' },
  website: { label: 'Website', type: 'text' },
  industry: { label: 'Industry', type: 'text' },
  establishedDate: { label: 'Established Date', type: 'date' },
  contractValue: { label: 'Contract Value', type: 'number' },
  paymentTerms: { label: 'Payment Terms', type: 'text' },
  bankAccount: { label: 'Bank Account', type: 'text' },
  swiftCode: { label: 'SWIFT Code', type: 'text' },
  accountManager: { label: 'Account Manager', type: 'text' },
  servicesProvided: { label: 'Services Provided', type: 'text' },
  preferredContactMethod: { label: 'Preferred Contact Method', type: 'text' },
  rating: { label: 'Rating', type: 'number' },
  regulatoryCompliance: { label: 'Regulatory Compliance', type: 'text' },
  businessRegistrationNumber: { label: 'Business Registration Number', type: 'text' },
  additionalContactName: { label: 'Additional Contact Name', type: 'text' },
  additionalContactEmail: { label: 'Additional Contact Email', type: 'email' },
  additionalContactPhone: { label: 'Additional Contact Phone', type: 'text' },
  businessHours: { label: 'Business Hours', type: 'text' },
  emergencyContactName: { label: 'Emergency Contact Name', type: 'text' },
  emergencyContactPhone: { label: 'Emergency Contact Phone', type: 'text' },
  customerSupportEmail: { label: 'Customer Support Email', type: 'email' },
  customerSupportPhone: { label: 'Customer Support Phone', type: 'text' },
  supportHours: { label: 'Support Hours', type: 'text' },
  tradeLicenseNumber: { label: 'Trade License Number', type: 'text' },
  vatNumber: { label: 'VAT Number', type: 'text' },
  businessInsurance: { label: 'Business Insurance', type: 'text' },
  legalEntity: { label: 'Legal Entity', type: 'text' },
  keyPersonnel: { label: 'Key Personnel', type: 'text' },
  socialMediaLinks: { label: 'Social Media Links', type: 'text' },
  annualRevenue: { label: 'Annual Revenue', type: 'number' },
  numberOfEmployees: { label: 'Number of Employees', type: 'number' },
  headquartersLocation: { label: 'Headquarters Location', type: 'text' },
  branchOffices: { label: 'Branch Offices', type: 'text' },
  certifications: { label: 'Certifications', type: 'text' },
  environmentalPolicy: { label: 'Environmental Policy', type: 'text' },
};


export const headCells = Object.keys(fieldsConfig).map(key => ({
  id: key,
  label: fieldsConfig[key].label,
}));

export const entityName = 'Provider';

const organizationId = JSON.parse(localStorage.getItem('userData')).organizationId;

export const fetchItems = () => fetchDocuments('providers', organizationId);
export const addItem = (item) => addDocument('providers', item, organizationId);
export const updateItem = (id, item) => updateDocument('providers', id, item);
export const deleteItem = (id) => deleteDocument('providers', id);