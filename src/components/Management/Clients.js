import {
  fetchDocuments,
  addDocument,
  updateDocument,
  deleteDocument,
  fetchDocumentsBySelectValue,
  fetchDocumentById,
  fetchDocumentsByFieldValue
} from '../../utils/firebaseCrudHelpers';

import languages from '../../data/languages';
import nationalities from '../../data/nationalities';
import industries from '../../data/industries';
import countries from '../../data/countries';

import { fetchItems as fetchProjects } from './Projects';

const organizationId = JSON.parse(localStorage.getItem('userData')).organizationId;

const projectsOptions = (await fetchProjects()).map((project) => {
  return {
    id: project.id,
    label: project.projectName
  }
})

console.log("Projcts listing ", projectsOptions)
export const fieldsConfig = {
  clientId: { label: 'Client ID', type: 'text', faker: 'datatype.uuid' },
  clientName: { label: 'Client Name', type: 'text', faker: 'company.name' },
  contactPerson: { label: 'Contact Person', type: 'text', faker: 'name.fullName' },
  email: { label: 'Email', type: 'email', faker: 'internet.email' },
  phoneNumber: { label: 'Phone Number', type: 'text', faker: 'phone.imei' },
  address: { label: 'Address', type: 'text', faker: 'address.streetAddress' },
  city: { label: 'City', type: 'text', faker: 'address.city' },
  state: { label: 'State', type: 'text', faker: 'address.state' },
  country: {
    label: 'Country',
    type: 'select',
    multiple: true,
    options: countries,
    faker: 'random.arrayElement'
  },
  zipCode: { label: 'ZIP Code', type: 'text', faker: 'address.zipCode' },
  nationality: {
    label: 'Nationality',
    multiple: true,
    type: 'select',
    multiple: true,
    options: nationalities,
    faker: 'random.arrayElement',
  },
  industry: {
    label: 'Industry',
    multiple: true,
    type: 'select',
    multiple: true,
    options: industries,
    faker: 'random.arrayElement',
  },
  website: { label: 'Website', type: 'text', faker: 'internet.url' },
  companySize: { label: 'Company Size', type: 'select', options: [], faker: 'random.arrayElement' },
  clientStatus: {
    label: 'Status',
    type: 'select',
    options: [
      { id: 'active', label: 'Active' },
      { id: 'inactive', label: 'Inactive' },
      { id: 'prospect', label: 'Prospect' },
    ],
    faker: 'random.arrayElement',
  },
  annualRevenue: { label: 'Annual Revenue', type: 'number', faker: 'finance.amount' },
  numberOfEmployees: { label: 'Number of Employees', type: 'number', faker: 'datatype.number' },
  preferredContactMethod: {
    label: 'Preferred Contact Method',
    type: 'select',
    options: [
      { id: 'email', label: 'Email' },
      { id: 'phone', label: 'Phone' },
      { id: 'in_person', label: 'In Person' },
    ],
    faker: 'random.arrayElement',
  },
  timeZone: { label: 'Time Zone', type: 'text', faker: 'address.timeZone' },
  currency: { label: 'Preferred Currency', type: 'select', options: [], faker: 'finance.currencyCode' },
  paymentTerms: {
    label: 'Payment Terms',
    type: 'select',
    options: [
      { id: 'net_30', label: 'Net 30' },
      { id: 'net_60', label: 'Net 60' },
      { id: 'net_90', label: 'Net 90' },
    ],
    faker: 'random.arrayElement',
  },
  taxId: { label: 'Tax ID', type: 'text', faker: 'datatype.uuid' },
  contractStartDate: { label: 'Contract Start Date', type: 'date', faker: 'date.past' },
  contractEndDate: { label: 'Contract End Date', type: 'date', faker: 'date.future' },
  clientSegment: {
    label: 'Client Segment',
    type: 'select',
    options: [
      { id: 'enterprise', label: 'Enterprise' },
      { id: 'mid_market', label: 'Mid-Market' },
      { id: 'smb', label: 'SMB' },
    ],
    faker: 'random.arrayElement',
  },
  accountManager: {
    label: 'Account Manager',
    type: 'select',
    options: [],
    faker: 'random.arrayElement',
  },
  clientType: {
    label: 'Client Type',
    type: 'select',
    options: [
      { id: 'direct', label: 'Direct' },
      { id: 'reseller', label: 'Reseller' },
      { id: 'partner', label: 'Partner' },
    ],
    faker: 'random.arrayElement',
  },
  preferredLanguage: { label: 'Preferred Language', type: 'select', options: languages, faker: 'random.arrayElement' },
  socialMediaLinks: { label: 'Social Media Links', type: 'text', faker: 'internet.url' },
  businessModel: {
    label: 'Business Model',
    type: 'select',
    options: [
      { id: 'b2b', label: 'B2B' },
      { id: 'b2c', label: 'B2C' },
      { id: 'd2c', label: 'D2C' },
    ],
    faker: 'random.arrayElement',
  },
  communicationPreferences: {
    label: 'Communication Preferences',
    type: 'select',
    options: [
      { id: 'email', label: 'Email' },
      { id: 'phone', label: 'Phone' },
      { id: 'sms', label: 'SMS' },
    ],
    multiple: true,
    faker: 'random.arrayElement',
  },
  projectCount: { label: 'Number of Projects', type: 'number', faker: 'datatype.number' },
  currentProjects: {
    label: 'Current Projects',
    type: 'select',
    link: '/projects',
    options: projectsOptions,
    multiple: true,
    faker: 'random.arrayElement',
  },
  clientRating: { label: 'Client Rating', type: 'number', faker: 'datatype.number' },
  preferredBillingCycle: {
    label: 'Preferred Billing Cycle',
    type: 'select',
    options: [
      { id: 'monthly', label: 'Monthly' },
      { id: 'quarterly', label: 'Quarterly' },
      { id: 'annually', label: 'Annually' },
    ],
    faker: 'random.arrayElement',
  },
  SLAAgreement: { label: 'SLA Agreement', type: 'text', faker: 'lorem.sentence' },
  discountRate: { label: 'Discount Rate (%)', type: 'number', faker: 'datatype.number' },
  referralSource: { label: 'Referral Source', type: 'text', faker: 'company.name' },
  notes: { label: 'Notes', type: 'text', multiline: true, rows: 4, faker: 'lorem.paragraphs' },
  invoicingEmail: { label: 'Invoicing Email', type: 'email', faker: 'internet.email' },
  creditLimit: { label: 'Credit Limit', type: 'number', faker: 'finance.amount' },
  preferredShippingMethod: {
    label: 'Preferred Shipping Method',
    type: 'select',
    options: [
      { id: 'ground', label: 'Ground' },
      { id: 'air', label: 'Air' },
      { id: 'sea', label: 'Sea' },
    ],
    faker: 'random.arrayElement',
  },
  onboardingStatus: {
    label: 'Onboarding Status',
    type: 'select',
    options: [
      { id: 'not_started', label: 'Not Started' },
      { id: 'in_progress', label: 'In Progress' },
      { id: 'completed', label: 'Completed' },
    ],
    faker: 'random.arrayElement',
  },
  renewalDate: { label: 'Renewal Date', type: 'date', faker: 'date.future' },
  lastContactDate: { label: 'Last Contact Date', type: 'date', faker: 'date.recent' },
  satisfactionScore: { label: 'Satisfaction Score', type: 'number', faker: 'datatype.number' },
};


export const headCells = Object.keys(fieldsConfig).map(key => ({
  id: key,
  label: fieldsConfig[key].label,
}));

export const entityName = 'Clients';

export async function fetchItems() {
  return await fetchDocuments('clients');
}

export const addItem = (item) => addDocument('clients', item);
export const updateItem = (id, item) => updateDocument('clients', id, item);
export const deleteItem = (id) => deleteDocument('clients', id);

export async function fetchItemById(id) {
  return await fetchDocumentById('clients', id);
}





