import {
  fetchDocuments, addDocument, updateDocument, deleteDocument
} from '../utils/firebaseCrudHelpers';

export const fieldsConfig = {
  name: { label: 'Partner Name', type: 'text', faker: 'company.name' },
  service: { label: 'Service', type: 'text', faker: 'commerce.department' },
  partnerType: { label: 'Partner Type', type: 'text', faker: 'company.bs' },
  contactName: { label: 'Contact Name', type: 'text', faker: 'name.fullName' },
  contactEmail: { label: 'Contact Email', type: 'email', faker: 'internet.email' },
  contactPhone: { label: 'Contact Phone', type: 'tel', faker: 'phone.imei' },
  address: { label: 'Address', type: 'text', faker: 'address.streetAddress' },
  website: { label: 'Website', type: 'url', faker: 'internet.url' },
  industry: { label: 'Industry', type: 'text', faker: 'company.bs' },
  agreementDate: { label: 'Agreement Date', type: 'date', faker: 'date.past' },
  contractValue: { label: 'Contract Value', type: 'number', faker: 'finance.amount' },
  startDate: { label: 'Start Date', type: 'date', faker: 'date.past' },
  endDate: { label: 'End Date', type: 'date', faker: 'date.future' },
  renewalDate: { label: 'Renewal Date', type: 'date', faker: 'date.future' },
  riskLevel: { label: 'Risk Level', type: 'text', faker: 'random.word' },
  region: { label: 'Region', type: 'text', faker: 'address.state' },
  paymentTerms: { label: 'Payment Terms', type: 'text', faker: 'finance.transactionType' },
  complianceStatus: { label: 'Compliance Status', type: 'text', faker: 'random.word' },
  notes: { label: 'Notes', type: 'text', multiline: true, rows: 4, faker: 'lorem.paragraph' },
  vendorCode: { label: 'Vendor Code', type: 'text', faker: 'datatype.uuid' },
  billingCycle: { label: 'Billing Cycle', type: 'text', faker: 'random.word' },
  sla: { label: 'Service Level Agreement (SLA)', type: 'text', faker: 'lorem.sentence' },
  paymentMethod: { label: 'Payment Method', type: 'text', faker: 'finance.transactionType' },
  discountRate: { label: 'Discount Rate', type: 'number', faker: 'datatype.float' },
  preferredCurrency: { label: 'Preferred Currency', type: 'text', faker: 'finance.currencyCode' },
  lastAuditDate: { label: 'Last Audit Date', type: 'date', faker: 'date.past' },
  supportContact: { label: 'Support Contact', type: 'text', faker: 'name.fullName' },
  supportEmail: { label: 'Support Email', type: 'email', faker: 'internet.email' },
  supportPhone: { label: 'Support Phone', type: 'tel', faker: 'phone.imei' },
  accountManager: { label: 'Account Manager', type: 'text', faker: 'name.fullName' },
  partnerRating: { label: 'Partner Rating', type: 'text', faker: 'random.word' },
  partnershipStartDate: { label: 'Partnership Start Date', type: 'date', faker: 'date.past' },
  partnershipEndDate: { label: 'Partnership End Date', type: 'date', faker: 'date.future' },
  numberOfEmployees: { label: 'Number of Employees', type: 'number', faker: 'datatype.number' },
  annualRevenue: { label: 'Annual Revenue', type: 'number', faker: 'finance.amount' },
  partnershipLevel: { label: 'Partnership Level', type: 'text', faker: 'random.word' },
  preferredLanguage: { 
    label: 'Preferred Language', 
    type: 'select',
    options: [
      { id: 'english', label: 'English' },
      { id: 'french', label: 'Français' },
      { id: 'spanish', label: 'Español' },
      { id: 'german', label: 'Deutsch' },
    ],
    multiple: true,
    faker: 'random.arrayElements',
  },
  taxExemptionStatus: { label: 'Tax Exemption Status', type: 'text', faker: 'random.word' },
};

// Generate head cells dynamically from the config object
export const headCells = Object.keys(fieldsConfig).map(key => ({
  id: key,
  label: fieldsConfig[key].label,
}));

export const entityName = 'Partner';

const organizationId = JSON.parse(localStorage.getItem('userData')).organizationId;

export const fetchItems = () => fetchDocuments('partners', organizationId);
export const addItem = (item) => addDocument('partners', item, organizationId);
export const updateItem = (id, item) => updateDocument('partners', id, item);
export const deleteItem = (id) => deleteDocument('partners', id);
