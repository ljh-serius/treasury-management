import {
    fetchDocuments,
    addDocument,
    updateDocument,
    deleteDocument,
    fetchDocumentsBySelectValue,
    fetchDocumentsByFieldValue
} from '../../utils/firebaseCrudHelpers';

// partners
const organizationId = JSON.parse(localStorage.getItem('userData')).organizationId;

export const fieldsConfig = {
    name: { label: 'Partner Name', type: 'text', faker: 'company.name' },
    service: {
      label: 'Service',
      type: 'select',
      options: [
        { id: 'consulting', label: 'Consulting' },
        { id: 'development', label: 'Development' },
        { id: 'design', label: 'Design' },
        { id: 'marketing', label: 'Marketing' },
        { id: 'support', label: 'Support' },
      ],
      faker: 'random.arrayElement',
    },
    partnerType: {
      label: 'Partner Type',
      type: 'select',
      options: [
        { id: 'strategic', label: 'Strategic' },
        { id: 'channel', label: 'Channel' },
        { id: 'technology', label: 'Technology' },
        { id: 'alliance', label: 'Alliance' },
        { id: 'health_inssurance', label: 'Health Insurance' },
      ],
      faker: 'random.arrayElement',
    },
    contactName: { label: 'Contact Name', type: 'text', faker: 'name.fullName' },
    contactEmail: { label: 'Contact Email', type: 'email', faker: 'internet.email' },
    contactPhone: { label: 'Contact Phone', type: 'tel', faker: 'phone.imei' },
    address: { label: 'Address', type: 'text', faker: 'address.streetAddress' },
    website: { label: 'Website', type: 'url', faker: 'internet.url' },
    servicesProvided: {
      label: 'Services Provided',
      type: 'select',
      multiple: true,
      options: [
        { id: 'health_insurance', label: 'Health Insurance' },
        { id: 'software_development', label: 'Software Development' },
      ],
      faker: 'random.arrayElement',
    },
    industry: {
      label: 'Industry',
      type: 'select',
      options: [
        { id: 'finance', label: 'Finance' },
        { id: 'technology', label: 'Technology' },
        { id: 'healthcare', label: 'Healthcare' },
        { id: 'retail', label: 'Retail' },
        { id: 'education', label: 'Education' },
      ],
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
      faker: 'random.arrayElement',
    },
    region: {
      label: 'Region',
      type: 'select',
      options: [
        { id: 'north_america', label: 'North America' },
        { id: 'europe', label: 'Europe' },
        { id: 'asia_pacific', label: 'Asia Pacific' },
        { id: 'latin_america', label: 'Latin America' },
        { id: 'middle_east_africa', label: 'Middle East & Africa' },
      ],
      faker: 'random.arrayElement',
    },
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
    complianceStatus: {
      label: 'Compliance Status',
      type: 'select',
      options: [
        { id: 'compliant', label: 'Compliant' },
        { id: 'non_compliant', label: 'Non-compliant' },
        { id: 'under_review', label: 'Under Review' },
      ],
      faker: 'random.arrayElement',
    },
    notes: { label: 'Notes', type: 'text', multiline: true, rows: 4, faker: 'lorem.paragraph' },
    vendorCode: { label: 'Vendor Code', type: 'text', faker: 'datatype.uuid' },
    billingCycle: {
      label: 'Billing Cycle',
      type: 'select',
      options: [
        { id: 'monthly', label: 'Monthly' },
        { id: 'quarterly', label: 'Quarterly' },
        { id: 'annually', label: 'Annually' },
      ],
      faker: 'random.arrayElement',
    },
    sla: { label: 'Service Level Agreement (SLA)', type: 'text', faker: 'lorem.sentence' },
    paymentMethod: {
      label: 'Payment Method',
      type: 'select',
      options: [
        { id: 'bank_transfer', label: 'Bank Transfer' },
        { id: 'credit_card', label: 'Credit Card' },
        { id: 'paypal', label: 'PayPal' },
        { id: 'crypto', label: 'Cryptocurrency' },
      ],
      faker: 'random.arrayElement',
    },
    discountRate: { label: 'Discount Rate', type: 'number', faker: 'datatype.float' },
    preferredCurrency: {
      label: 'Preferred Currency',
      type: 'select',
      options: [
        { id: 'usd', label: 'USD' },
        { id: 'eur', label: 'EUR' },
        { id: 'gbp', label: 'GBP' },
        { id: 'jpy', label: 'JPY' },
      ],
      faker: 'random.arrayElement',
    },
    lastAuditDate: { label: 'Last Audit Date', type: 'date', faker: 'date.past' },
    supportContact: { label: 'Support Contact', type: 'text', faker: 'name.fullName' },
    supportEmail: { label: 'Support Email', type: 'email', faker: 'internet.email' },
    supportPhone: { label: 'Support Phone', type: 'tel', faker: 'phone.imei' },
    accountManager: { label: 'Account Manager', type: 'text', faker: 'name.fullName' },
    partnerRating: {
      label: 'Partner Rating',
      type: 'select',
      options: [
        { id: 'excellent', label: 'Excellent' },
        { id: 'good', label: 'Good' },
        { id: 'average', label: 'Average' },
        { id: 'poor', label: 'Poor' },
      ],
      faker: 'random.arrayElement',
    },
    partnershipStartDate: { label: 'Partnership Start Date', type: 'date', faker: 'date.past' },
    partnershipEndDate: { label: 'Partnership End Date', type: 'date', faker: 'date.future' },
    numberOfEmployees: { label: 'Number of Employees', type: 'number', faker: 'datatype.number' },
    annualRevenue: { label: 'Annual Revenue', type: 'number', faker: 'finance.amount' },
    partnershipLevel: {
      label: 'Partnership Level',
      type: 'select',
      options: [
        { id: 'bronze', label: 'Bronze' },
        { id: 'silver', label: 'Silver' },
        { id: 'gold', label: 'Gold' },
        { id: 'platinum', label: 'Platinum' },
      ],
      faker: 'random.arrayElement',
    },
    preferredLanguage: {
      label: 'Preferred Language',
      type: 'select',
      options: [
        { id: 'english', label: 'English' },
        { id: 'french', label: 'Français' },
        { id: 'spanish', label: 'Español' },
        { id: 'german', label: 'Deutsch' },
      ],
      multiple: false,
      faker: 'random.arrayElement',
    },
    taxExemptionStatus: {
      label: 'Tax Exemption Status',
      type: 'select',
      options: [
        { id: 'exempt', label: 'Exempt' },
        { id: 'non_exempt', label: 'Non-Exempt' },
      ],
      faker: 'random.arrayElement',
    },
  };
  // Generate head cells dynamically from the config object
  export const headCells = Object.keys(fieldsConfig).map(key => ({
    id: key,
    label: fieldsConfig[key].label,
  }));
  
  export const entityName = 'Partners';
  
  export async function fetchItems() {
    return await fetchDocuments(organizationId, 'partners');
  }
  
  export async function fetchItemsBySelectValue(selectMenu, value) {
    return await fetchDocumentsBySelectValue(organizationId, 'partners', selectMenu, value);
  }
  
  export const addItem = (item) => addDocument(organizationId, 'partners', item);
  export const updateItem = (id, item) => updateDocument(organizationId, 'partners', id, item);
  export const deleteItem = (id) => deleteDocument(organizationId, 'partners', id);
  