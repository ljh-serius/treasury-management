import {
  fetchDocuments, addDocument, updateDocument, deleteDocument
} from '../utils/firebaseCrudHelpers';

export const fieldsConfig = {
  name: { label: 'Provider Name', type: 'text', faker: 'company.name' },
  taxId: { label: 'Tax ID', type: 'text', faker: 'finance.iban' },
  address: { label: 'Address', type: 'text', faker: 'address.streetAddress' },
  contactEmail: { label: 'Email', type: 'email', faker: 'internet.email' },
  contactPhone: { label: 'Phone', type: 'text', faker: 'phone.imei' },
  companyType: { label: 'Company Type', type: 'text', faker: 'company.bs' },
  country: { label: 'Country', type: 'text', faker: 'address.country' },
  state: { label: 'State/Province', type: 'text', faker: 'address.state' },
  zipCode: { label: 'Zip/Postal Code', type: 'text', faker: 'address.zipCode' },
  website: { label: 'Website', type: 'text', faker: 'internet.url' },
  industry: { label: 'Industry', type: 'text', faker: 'company.bs' },
  establishedDate: { label: 'Established Date', type: 'date', faker: 'date.past' },
  contractValue: { label: 'Contract Value', type: 'number', faker: 'finance.amount' },
  paymentTerms: { label: 'Payment Terms', type: 'text', faker: 'finance.transactionType' },
  bankAccount: { label: 'Bank Account', type: 'text', faker: 'finance.account' },
  swiftCode: { label: 'SWIFT Code', type: 'text', faker: 'finance.bic' },
  accountManager: { label: 'Account Manager', type: 'text', faker: 'name.fullName' },
  servicesProvided: { label: 'Services Provided', type: 'text', faker: 'lorem.words' },
  preferredContactMethod: { label: 'Preferred Contact Method', type: 'text', faker: 'lorem.word' },
  rating: { label: 'Rating', type: 'number', faker: 'datatype.float' },
  regulatoryCompliance: { label: 'Regulatory Compliance', type: 'text', faker: 'lorem.words' },
  businessRegistrationNumber: { label: 'Business Registration Number', type: 'text', faker: 'finance.account' },
  additionalContactName: { label: 'Additional Contact Name', type: 'text', faker: 'name.fullName' },
  additionalContactEmail: { label: 'Additional Contact Email', type: 'email', faker: 'internet.email' },
  additionalContactPhone: { label: 'Additional Contact Phone', type: 'text', faker: 'phone.imei' },
  businessHours: { label: 'Business Hours', type: 'text', faker: 'lorem.sentence' },
  emergencyContactName: { label: 'Emergency Contact Name', type: 'text', faker: 'name.fullName' },
  emergencyContactPhone: { label: 'Emergency Contact Phone', type: 'text', faker: 'phone.imei' },
  customerSupportEmail: { label: 'Customer Support Email', type: 'email', faker: 'internet.email' },
  customerSupportPhone: { label: 'Customer Support Phone', type: 'text', faker: 'phone.imei' },
  supportHours: { label: 'Support Hours', type: 'text', faker: 'lorem.sentence' },
  tradeLicenseNumber: { label: 'Trade License Number', type: 'text', faker: 'finance.account' },
  vatNumber: { label: 'VAT Number', type: 'text', faker: 'finance.iban' },
  businessInsurance: { label: 'Business Insurance', type: 'text', faker: 'lorem.sentence' },
  legalEntity: { label: 'Legal Entity', type: 'text', faker: 'company.companySuffix' },
  keyPersonnel: { label: 'Key Personnel', type: 'text', faker: 'name.jobTitle' },
  socialMediaLinks: { label: 'Social Media Links', type: 'text', faker: 'internet.url' },
  annualRevenue: { label: 'Annual Revenue', type: 'number', faker: 'finance.amount' },
  numberOfEmployees: { label: 'Number of Employees', type: 'number', faker: 'datatype.number' },
  headquartersLocation: { label: 'Headquarters Location', type: 'text', faker: 'address.city' },
  branchOffices: { label: 'Branch Offices', type: 'text', faker: 'address.streetAddress' },
  certifications: { label: 'Certifications', type: 'text', faker: 'lorem.words' },
  environmentalPolicy: { label: 'Environmental Policy', type: 'text', faker: 'lorem.sentence' },
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
