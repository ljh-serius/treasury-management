import {
  fetchDocuments, addDocument, updateDocument, deleteDocument
} from '../../utils/firebaseCrudHelpers';

export const fieldsConfig = {
  name: { label: 'Provider Name', type: 'text', faker: 'company.name' },
  taxId: { label: 'Tax ID', type: 'text', faker: 'finance.iban' },
  address: { label: 'Address', type: 'text', faker: 'address.streetAddress' },
  contactEmail: { label: 'Email', type: 'email', faker: 'internet.email' },
  contactPhone: { label: 'Phone', type: 'text', faker: 'phone.imei' },
  companyType: {
    label: 'Company Type',
    type: 'select',
    options: [
      { id: 'public', label: 'Public' },
      { id: 'private', label: 'Private' },
      { id: 'partnership', label: 'Partnership' },
      { id: 'non_profit', label: 'Non-Profit' },
    ],
    faker: 'random.arrayElement',
  },
  country: {
    label: 'Country',
    type: 'select',
    options: [
      { id: 'us', label: 'United States' },
      { id: 'ca', label: 'Canada' },
      { id: 'uk', label: 'United Kingdom' },
      { id: 'au', label: 'Australia' },
      { id: 'in', label: 'India' },
    ],
    faker: 'random.arrayElement',
  },
  state: { label: 'State/Province', type: 'text', faker: 'address.state' },
  zipCode: { label: 'Zip/Postal Code', type: 'text', faker: 'address.zipCode' },
  website: { label: 'Website', type: 'text', faker: 'internet.url' },
  industry: {
    label: 'Industry',
    type: 'select',
    options: [
      { id: 'finance', label: 'Finance' },
      { id: 'healthcare', label: 'Healthcare' },
      { id: 'it', label: 'IT' },
      { id: 'manufacturing', label: 'Manufacturing' },
      { id: 'retail', label: 'Retail' },
    ],
    faker: 'random.arrayElement',
  },
  establishedDate: { label: 'Established Date', type: 'date', faker: 'date.past' },
  contractValue: { label: 'Contract Value', type: 'number', faker: 'finance.amount' },
  paymentTerms: {
    label: 'Payment Terms',
    type: 'select',
    options: [
      { id: 'net_30', label: 'Net 30' },
      { id: 'net_60', label: 'Net 60' },
      { id: 'net_90', label: 'Net 90' },
      { id: 'upon_receipt', label: 'Upon Receipt' },
    ],
    faker: 'random.arrayElement',
  },
  bankAccount: { label: 'Bank Account', type: 'text', faker: 'finance.account' },
  swiftCode: { label: 'SWIFT Code', type: 'text', faker: 'finance.bic' },
  accountManager: { label: 'Account Manager', type: 'text', faker: 'name.fullName' },
  servicesProvided: { label: 'Services Provided', type: 'text', faker: 'lorem.words' },
  preferredContactMethod: {
    label: 'Preferred Contact Method',
    type: 'select',
    options: [
      { id: 'email', label: 'Email' },
      { id: 'phone', label: 'Phone' },
      { id: 'in_person', label: 'In Person' },
      { id: 'online_chat', label: 'Online Chat' },
    ],
    faker: 'random.arrayElement',
  },
  rating: { label: 'Rating', type: 'number', faker: 'datatype.float' },
  regulatoryCompliance: {
    label: 'Regulatory Compliance',
    type: 'select',
    options: [
      { id: 'compliant', label: 'Compliant' },
      { id: 'non_compliant', label: 'Non-Compliant' },
    ],
    faker: 'random.arrayElement',
  },
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
  businessInsurance: {
    label: 'Business Insurance',
    type: 'select',
    options: [
      { id: 'insured', label: 'Insured' },
      { id: 'not_insured', label: 'Not Insured' },
    ],
    faker: 'random.arrayElement',
  },
  legalEntity: {
    label: 'Legal Entity',
    type: 'select',
    options: [
      { id: 'corporation', label: 'Corporation' },
      { id: 'llc', label: 'LLC' },
      { id: 'sole_proprietorship', label: 'Sole Proprietorship' },
      { id: 'partnership', label: 'Partnership' },
    ],
    faker: 'random.arrayElement',
  },
  keyPersonnel: { label: 'Key Personnel', type: 'text', faker: 'name.jobTitle' },
  socialMediaLinks: { label: 'Social Media Links', type: 'text', faker: 'internet.url' },
  annualRevenue: { label: 'Annual Revenue', type: 'number', faker: 'finance.amount' },
  numberOfEmployees: { label: 'Number of Employees', type: 'number', faker: 'datatype.number' },
  headquartersLocation: { label: 'Headquarters Location', type: 'text', faker: 'address.city' },
  branchOffices: { label: 'Branch Offices', type: 'text', faker: 'address.streetAddress' },
  certifications: { label: 'Certifications', type: 'text', faker: 'lorem.words' },
  environmentalPolicy: {
    label: 'Environmental Policy',
    type: 'select',
    options: [
      { id: 'green', label: 'Green' },
      { id: 'non_green', label: 'Non-Green' },
    ],
    faker: 'random.arrayElement',
  },
};

export const headCells = Object.keys(fieldsConfig).map(key => ({
  id: key,
  label: fieldsConfig[key].label,
}));

export const entityName = 'Providers';

const organizationId = JSON.parse(localStorage.getItem('userData')).organizationId;

export const fetchItems = () => fetchDocuments(organizationId, 'providers');
export const addItem = (item) => addDocument(organizationId, 'providers', item);
export const updateItem = (id, item) => updateDocument(organizationId, 'providers', id, item);
export const deleteItem = (id) => deleteDocument(organizationId, 'providers', id);