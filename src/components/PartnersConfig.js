import {
  fetchDocuments, addDocument, updateDocument, deleteDocument
} from '../utils/firebaseCrudHelpers';

export const fieldsConfig = {
  name: { label: 'Partner Name', type: 'text' },
  service: { label: 'Service', type: 'text' },
  partnerType: { label: 'Partner Type', type: 'text' },
  contactName: { label: 'Contact Name', type: 'text' },
  contactEmail: { label: 'Contact Email', type: 'email' },
  contactPhone: { label: 'Contact Phone', type: 'tel' },
  address: { label: 'Address', type: 'text' },
  website: { label: 'Website', type: 'url' },
  industry: { label: 'Industry', type: 'text' },
  agreementDate: { label: 'Agreement Date', type: 'date' },
  contractValue: { label: 'Contract Value', type: 'number' },
  startDate: { label: 'Start Date', type: 'date' },
  endDate: { label: 'End Date', type: 'date' },
  renewalDate: { label: 'Renewal Date', type: 'date' },
  riskLevel: { label: 'Risk Level', type: 'text' },
  region: { label: 'Region', type: 'text' },
  paymentTerms: { label: 'Payment Terms', type: 'text' },
  complianceStatus: { label: 'Compliance Status', type: 'text' },
  notes: { label: 'Notes', type: 'text', multiline: true, rows: 4 },
  vendorCode: { label: 'Vendor Code', type: 'text' },
  billingCycle: { label: 'Billing Cycle', type: 'text' },
  sla: { label: 'Service Level Agreement (SLA)', type: 'text' },
  paymentMethod: { label: 'Payment Method', type: 'text' },
  discountRate: { label: 'Discount Rate', type: 'number' },
  preferredCurrency: { label: 'Preferred Currency', type: 'text' },
  lastAuditDate: { label: 'Last Audit Date', type: 'date' },
  supportContact: { label: 'Support Contact', type: 'text' },
  supportEmail: { label: 'Support Email', type: 'email' },
  supportPhone: { label: 'Support Phone', type: 'tel' },
  accountManager: { label: 'Account Manager', type: 'text' },
  partnerRating: { label: 'Partner Rating', type: 'text' },
  partnershipStartDate: { label: 'Partnership Start Date', type: 'date' },
  partnershipEndDate: { label: 'Partnership End Date', type: 'date' },
  numberOfEmployees: { label: 'Number of Employees', type: 'number' },
  annualRevenue: { label: 'Annual Revenue', type: 'number' },
  partnershipLevel: { label: 'Partnership Level', type: 'text' },
  preferredLanguage: { label: 'Preferred Language', type: 'text' },
  taxExemptionStatus: { label: 'Tax Exemption Status', type: 'text' },
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