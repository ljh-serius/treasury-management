
import {
    fetchDocuments,
    addDocument,
    updateDocument,
    deleteDocument,
    fetchDocumentsBySelectValue,
    fetchDocumentsByFieldValue
} from '../../utils/firebaseCrudHelpers';

import industries from '../../data/industries';

const organizationId = JSON.parse(localStorage.getItem('userData')).organizationId;

export const fieldsConfig = {
    name: { label: 'Partner Name', type: 'text', faker: 'company.name' },
    service: { label: 'Service', type: 'text', faker: 'commerce.department' },
    partnerType: { label: 'Partner Type', type: 'text', faker: 'company.bs' },
    contactName: { label: 'Contact Name', type: 'text', faker: 'name.fullName' },
    contactEmail: { label: 'Contact Email', type: 'email', faker: 'internet.email' },
    contactPhone: { label: 'Contact Phone', type: 'tel', faker: 'phone.imei' },
    address: { label: 'Address', type: 'text', faker: 'address.streetAddress' },
    website: { label: 'Website', type: 'url', faker: 'internet.url' },
    industry: { 
        label: 'Industry',
        type: 'select',
        multiple: true,
        options: industries,
        faker: 'random.arrayElement',
    },
    agreementDate: { label: 'Agreement Date', type: 'date', faker: 'date.past' },
    contractValue: { label: 'Contract Value', type: 'number', faker: 'finance.amount' },
    startDate: { label: 'Start Date', type: 'date', faker: 'date.past' },
    endDate: { label: 'End Date', type: 'date', faker: 'date.future' },
    renewalDate: { label: 'Renewal Date', type: 'date', faker: 'date.future' },
    riskLevel: {
      label: 'Risk Level',
      type: 'select',
      options: [
        { id: 'low', label: 'Low' },
        { id: 'medium', label: 'Medium' },
        { id: 'high', label: 'High' },
        { id: 'critical', label: 'Critical' },
      ],
      multiple: false,
      faker: 'random.arrayElement',
    },
    region: { label: 'Region', type: 'text', faker: 'address.state' },
    paymentTerms: { label: 'Payment Terms', type: 'text', faker: 'finance.transactionType' },
    complianceStatus: {
      label: 'Compliance Status',
      type: 'select',
      options: [
        { id: 'compliant', label: 'Compliant' },
        { id: 'non_compliant', label: 'Non-compliant' },
        { id: 'pending', label: 'Pending' },
      ],
      multiple: false,
      faker: 'random.arrayElement',
    },
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
        { id: "english", label: "English" },
        { id: "french", label: "Français" }
      ],
      multiple: false,
      faker: 'random.arrayElement'
    },
    taxExemptionStatus: { label: 'Tax Exemption Status', type: 'text', faker: 'random.word' },
  
    // New Fields for Invoices
    invoiceType: {
      label: 'Invoice Type',
      type: 'select',
      options: [
        { id: 'issued', label: 'Issued' },
        { id: 'received', label: 'Received' }
      ],
      multiple: false,
      faker: 'random.arrayElement',
    },
    invoiceCategory: {
      label: 'Invoice Category',
      type: 'select',
      options: [
        { id: 'goods', label: 'Goods' },
        { id: 'services', label: 'Services' },
        { id: 'consulting', label: 'Consulting' },
        { id: 'maintenance', label: 'Maintenance' },
        { id: 'software', label: 'Software' },
        { id: 'subscription', label: 'Subscription' },
        { id: 'licensing', label: 'Licensing' },
        { id: 'training', label: 'Training' },
        { id: 'rent', label: 'Rent' },
        { id: 'utilities', label: 'Utilities' },
        { id: 'marketing', label: 'Marketing' },
        { id: 'logistics', label: 'Logistics' },
        { id: 'travel', label: 'Travel' },
        { id: 'legal', label: 'Legal' },
        { id: 'insurance', label: 'Insurance' },
        { id: 'taxes', label: 'Taxes' },
        { id: 'equipment', label: 'Equipment' },
        { id: 'raw_materials', label: 'Raw Materials' },
        { id: 'advertising', label: 'Advertising' },
        { id: 'research', label: 'Research & Development' }
      ],
      multiple: false,
      faker: 'random.arrayElement',
    },
    issuedAt: { label: 'Issued At', type: 'date', faker: 'date.past' },
    receivedAt: { label: 'Received At', type: 'date', faker: 'date.past' },
  
    // Necessary fields when invoice comes from a provider
    providerDetails: {
      label: 'Provider Details',
      type: 'text',
      faker: 'company.name',
    },
    providerInvoiceNumber: {
      label: 'Provider Invoice Number',
      type: 'text',
      faker: 'datatype.uuid',
    },
  };
  export const headCells = Object.keys(fieldsConfig).map(key => ({
    id: key,
    label: fieldsConfig[key].label,
  }));
  
  export const entityName = 'Invoices';
  
  
  export const fetchItems = () => fetchDocuments(organizationId, 'invoices');
  export const addItem = (item) => addDocument(organizationId, 'invoices', item);
  export const updateItem = (id, item) => updateDocument(organizationId, 'invoices', id, item);
  export const deleteItem = (id) => deleteDocument(organizationId, 'invoices', id);
  
  
  
  