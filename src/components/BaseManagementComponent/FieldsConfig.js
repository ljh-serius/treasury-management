import {
  fetchDocuments,
  addDocument,
  updateDocument,
  deleteDocument,
  fetchDocumentsBySelectValue,
  fetchDocumentsByFieldValue
} from '../../utils/firebaseCrudHelpers';

import languages from '../../data/languages';
import nationalities from '../../data/nationalities';
import skills from '../../data/skills';

const organizationId = JSON.parse(localStorage.getItem('userData')).organizationId;

const productsOptions = (await fetchProducts()).map((product) => {
  return {
    id: product.id,
    label: product.name
  }
})

const employeesOptions = (await fetchEmployees()).map((employee) => {
  return {
    id: employee.id,
    label: employee.name
  }
})

const projectsOptions = (await fetchProjects()).map((project) => {
  return {
    id: project.id,
    label: project.name
  }
})

const partnersOptions = (await fetchPartners()).map((partner) => {
  return {
    id: partner.id,
    label: partner.name
  }
})

const providersOptions = (await fetchProviders()).map((provider) => {
  return {
    id: provider.id,
    label: provider.name
  }
})

console.log(productsOptions)
export const costsFieldsConfig = {
  cost: { label: 'Cost', type: 'number', faker: 'finance.amount' },
  description: { label: 'Description', type: 'text', faker: 'lorem.sentence' },
  productIds: {
    label: 'Cost for Products',
    link: '/products',
    type: 'select',
    options: productsOptions,
    multiple: true,
    faker: 'random.arrayElements'
  },
  employeeIds: {
    label: 'Cost for Employees',
    link: '/employees',
    type: 'select',
    options: employeesOptions,
    multiple: true,
    faker: 'random.arrayElements'
  },
  projectIds: {
    label: 'Cost for Projects',
    link: '/projects',
    type: 'select',
    options: projectsOptions,
    multiple: true,
    faker: 'random.arrayElements'
  },
  partnerIds: {
    label: 'Cost for Partners',
    link: '/partners',
    type: 'select',
    link: true,
    options: partnersOptions,
    multiple: true,
    faker: 'random.arrayElements'
  },
  providerIds: {
    link: '/providers',
    label: 'Cost for Providers',
    type: 'select',
    link: true,
    options: providersOptions,
    multiple: true,
    faker: 'random.arrayElements'
  },
  allocationDate: { label: 'Allocation Date', type: 'date', faker: 'date.past' },
  allocationType: {
    label: 'Allocation Type',
    type: 'select',
    options: [
      { id: '1', label: 'Type 1' },
      { id: '2', label: 'Type 2' },
      { id: '3', label: 'Type 3' }
    ],
    faker: 'random.arrayElement'
  },
  notes: { label: 'Notes', type: 'text', faker: 'lorem.paragraph' },
  department: {
    label: 'Department',
    type: 'select',
    options: [
      { id: 'finance', label: 'Finance' },
      { id: 'hr', label: 'Human Resources' },
      { id: 'it', label: 'IT' }
    ],
    faker: 'random.arrayElement'
  },
  priority: {
    label: 'Priority',
    type: 'select',
    options: [
      { id: 'high', label: 'High' },
      { id: 'medium', label: 'Medium' },
      { id: 'low', label: 'Low' }
    ],
    faker: 'random.arrayElement'
  },
  status: {
    label: 'Status',
    type: 'select',
    options: [
      { id: 'active', label: 'Active' },
      { id: 'inactive', label: 'Inactive' }
    ],
    faker: 'random.arrayElement'
  },
  duration: { label: 'Duration', type: 'number', faker: 'datatype.number' },
  currency: { label: 'Currency', type: 'text', faker: 'finance.currencyCode' },
  approvedBy: { label: 'Approved By', type: 'text', faker: 'name.fullName' },
  allocationCode: { label: 'Allocation Code', type: 'text', faker: 'datatype.uuid' },
  fundingSource: { label: 'Funding Source', type: 'text', faker: 'company.name' },
  costCenter: { label: 'Cost Center', type: 'text', faker: 'commerce.department' },
  budgetCode: { label: 'Budget Code', type: 'text', faker: 'finance.bic' },
  financialYear: { label: 'Financial Year', type: 'number', faker: 'date.past' },
  quarter: {
    label: 'Quarter',
    type: 'select',
    options: [
      { id: 'q1', label: 'Q1' },
      { id: 'q2', label: 'Q2' },
      { id: 'q3', label: 'Q3' },
      { id: 'q4', label: 'Q4' }
    ],
    faker: 'random.arrayElement'
  },
  allocationMethod: { label: 'Allocation Method', type: 'text', faker: 'lorem.word' },
  roiEstimate: { label: 'ROI Estimate', type: 'number', faker: 'datatype.float' },
  taxImplications: { label: 'Tax Implications', type: 'text', faker: 'lorem.sentence' },
  capexOrOpex: {
    label: 'Capex/Opex',
    type: 'select',
    options: [
      { id: 'capex', label: 'Capex' },
      { id: 'opex', label: 'Opex' }
    ],
    faker: 'random.arrayElement'
  },
  riskAssessment: { label: 'Risk Assessment', type: 'text', faker: 'lorem.sentence' },
  complianceStatus: {
    label: 'Compliance Status',
    type: 'select',
    options: [
      { id: 'compliant', label: 'Compliant' },
      { id: 'non_compliant', label: 'Non-compliant' }
    ],
    faker: 'random.arrayElement'
  },
  paymentTerms: { label: 'Payment Terms', type: 'text', faker: 'finance.transactionType' },
  invoiceNumber: { label: 'Invoice Number', type: 'text', faker: 'finance.account' },
  vatAmount: { label: 'VAT Amount', type: 'number', faker: 'datatype.float' },
  vatPercentage: { label: 'VAT Percentage', type: 'number', faker: 'datatype.float' },
  discountApplied: { label: 'Discount Applied', type: 'number', faker: 'datatype.float' },
  totalCostAfterDiscount: { label: 'Total Cost After Discount', type: 'number', faker: 'finance.amount' },
  exchangeRate: { label: 'Exchange Rate', type: 'number', faker: 'datatype.float' },
  costAllocationFactor: { label: 'Cost Allocation Factor', type: 'number', faker: 'datatype.float' },
  approvalStatus: {
    label: 'Approval Status',
    type: 'select',
    options: [
      { id: 'pending', label: 'Pending' },
      { id: 'approved', label: 'Approved' },
      { id: 'rejected', label: 'Rejected' }
    ],
    faker: 'random.arrayElement'
  },
  auditTrail: { label: 'Audit Trail', type: 'text', faker: 'lorem.paragraphs' },
};

export const costsHeadCells = Object.keys(costsFieldsConfig).map(key => ({
  id: key,
  label: costsFieldsConfig[key].label,
}));

export const costsEntityName = 'Costs';

export const fetchCosts = () => fetchDocuments(organizationId, 'costs');
export const addCost = (item) => addDocument(organizationId, 'costs', item);
// export const fetchRelativeCosts = (foreignKey, foreignValue) => fetchDocumentsBySelectValue(organizationId, 'costs', foreignKey, foreignValue);
export const updateCost = (costId, item) => updateDocument(organizationId, 'costs', costId, item);
export const deleteCost = (costId) => deleteDocument(organizationId, 'costs', costId);










// partners

export const partnersFieldsConfig = {
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
export const partnerHeadCells = Object.keys(partnersFieldsConfig).map(key => ({
  id: key,
  label: partnersFieldsConfig[key].label,
}));

export const partnersEntityName = 'Partners';

export async function fetchPartners() {
  return await fetchDocuments(organizationId, 'partners');
}

export async function fetchPartnersBySelectValue(selectMenu, value) {
  return await fetchDocumentsBySelectValue(organizationId, 'partners', selectMenu, value);
}

export const addPartner = (item) => addDocument(organizationId, 'partners', item);
export const updatePartner = (id, item) => updateDocument(organizationId, 'partners', id, item);
export const deletePartner = (id) => deleteDocument(organizationId, 'partners', id);







// employees
const costs = (await fetchCosts()).map((cost) => {
  return {
    id: cost.id,
    label: cost.name
  }
})

const managers = (await fetchEmployeesByField('position', 'manager')).map((manager) => {
  return {
    id: manager.id,
    label: manager.name
  }
})

const employees = (await fetchEmployees()).map((manager) => {
  return {
    id: manager.id,
    label: manager.name
  }
})

const healthInsurances = (await fetchPartnersBySelectValue('servicesProvided', 'health_insurance')).map((partner) => {
  return {
    id: partner.id,
    label: partner.name
  }
})

console.log(' fetchPartnersBySelectValue', healthInsurances)

export const employeesFieldsConfig = {
  name: { label: 'Name', type: 'text', faker: 'name.fullName' },
  position: {
    label: 'Position',
    type: 'select',
    options: [
      { id: 'developer', label: 'Developer' },
      { id: 'designer', label: 'Designer' },
      { id: 'manager', label: 'Manager' },
      { id: 'qa', label: 'QA Engineer' },
      { id: 'hr', label: 'HR Specialist' },
    ],
    faker: 'random.arrayElement',
  },
  email: { label: 'Email', type: 'email', faker: 'internet.email' },
  phone: { label: 'Phone', type: 'text', faker: 'phone.imei' },
  department: {
    label: 'Department',
    type: 'select',
    options: [
      { id: 'engineering', label: 'Engineering' },
      { id: 'design', label: 'Design' },
      { id: 'hr', label: 'HR' },
      { id: 'marketing', label: 'Marketing' },
      { id: 'sales', label: 'Sales' },
    ],
    faker: 'random.arrayElement',
  },
  costsId: {
    label: 'Costs Allocated',
    type: 'select',
    multiple: true,
    link: '/costs',
    options: costs,
    faker: 'random.arrayElement',
  },
  hireDate: { label: 'Hire Date', type: 'date', faker: 'date.past' },
  salary: { label: 'Salary', type: 'number', faker: 'finance.amount' },
  status: {
    label: 'Status',
    type: 'select',
    options: [
      { id: 'active', label: 'Active' },
      { id: 'inactive', label: 'Inactive' },
      { id: 'terminated', label: 'Terminated' },
      { id: 'on_leave', label: 'On Leave' },
    ],
    faker: 'random.arrayElement',
  },
  manager: {
    id: 'Manager',
    label: 'Manager',
    type: 'select',
    options: managers,
    faker: 'random.arrayElement',
  },
  location: {
    label: 'Location',
    type: 'select',
    options: [
      { id: 'new_york', label: 'New York' },
      { id: 'san_francisco', label: 'San Francisco' },
      { id: 'london', label: 'London' },
      { id: 'berlin', label: 'Berlin' },
      { id: 'tokyo', label: 'Tokyo' },
    ],
    faker: 'random.arrayElement',
  },
  address: { label: 'Address', type: 'text', faker: 'address.streetAddress' },
  dateOfBirth: { label: 'Date of Birth', type: 'date', faker: 'date.past' },
  gender: {
    label: 'Gender',
    type: 'select',
    options: [
      { id: 'male', label: 'Male' },
      { id: 'female', label: 'Female' },
      { id: 'other', label: 'Other' },
    ],
    faker: 'random.arrayElement',
  },
  maritalStatus: {
    label: 'Marital Status',
    type: 'select',
    options: [
      { id: 'single', label: 'Single' },
      { id: 'married', label: 'Married' },
      { id: 'divorced', label: 'Divorced' },
    ],
    faker: 'random.arrayElement',
  },
  nationality: {
    label: 'Nationality',
    multiple: true,
    type: 'select',
    options: nationalities,
    faker: 'random.arrayElement',
  },
  emergencyContactName: { label: 'Emergency Contact Name', type: 'text', faker: 'name.fullName' },
  emergencyContactPhone: { label: 'Emergency Contact Phone', type: 'text', faker: 'phone.imei' },
  bankAccountNumber: { label: 'Bank Account Number', type: 'text', faker: 'finance.account' },
  socialSecurityNumber: { label: 'Social Security Number', type: 'text', faker: 'finance.iban' },
  taxId: { label: 'Tax ID', type: 'text', faker: 'finance.account' },
  jobTitle: { label: 'Job Title', type: 'text', faker: 'name.jobTitle' },
  employmentType: {
    label: 'Employment Type',
    type: 'select',
    options: [
      { id: 'full_time', label: 'Full-Time' },
      { id: 'part_time', label: 'Part-Time' },
      { id: 'contract', label: 'Contract' },
      { id: 'intern', label: 'Intern' },
    ],
    faker: 'random.arrayElement',
  },
  workSchedule: {
    label: 'Work Schedule',
    type: 'select',
    options: [
      { id: '9_to_5', label: '9 to 5' },
      { id: 'flexible', label: 'Flexible' },
      { id: 'night_shift', label: 'Night Shift' },
    ],
    faker: 'random.arrayElement',
  },
  yearsOfExperience: { label: 'Years of Experience', type: 'number', faker: 'datatype.number' },
  highestEducation: {
    label: 'Highest Education',
    type: 'select',
    options: [
      { id: 'high_school', label: 'High School' },
      { id: 'bachelors', label: "Bachelor's Degree" },
      { id: 'masters', label: "Master's Degree" },
      { id: 'phd', label: 'PhD' },
    ],
    faker: 'random.arrayElement',
  },
  certifications: { label: 'Certifications', type: 'text', faker: 'random.words' },
  languagesSpoken: {
    label: 'Languages Spoken',
    type: 'select',
    multiple: true,
    options: languages,
    faker: 'random.arrayElement',
  },
  skills: {
    label: 'Skills',
    type: 'select',
    multiple: true,
    options: skills,
    faker: 'random.arrayElement'
  },
  performanceRating: { label: 'Performance Rating', type: 'number', faker: 'datatype.number' },
  probationEndDate: { label: 'Probation End Date', type: 'date', faker: 'date.future' },
  healthInsuranceProvider: {
    label: 'Health Insurance Provider',
    type: 'select',
    options: healthInsurances,
    faker: 'random.arrayElement',
  },
  healthInsuranceNumber: { label: 'Health Insurance Number', type: 'text', faker: 'finance.account' },
  additionalNotes: { label: 'Additional Notes', type: 'text', faker: 'lorem.paragraph' },
};

export const employeesHeadCells = Object.keys(employeesFieldsConfig).map(key => ({
  id: key,
  label: employeesFieldsConfig[key].label,
}));

export const employeesEntityName = 'Employees';

export function fetchEmployees() {
  return fetchDocuments(organizationId, 'employees');
}
export async function fetchEmployeesBySelectOption(selectMenu, value) {
  return await fetchDocumentsBySelectValue(organizationId, 'employees', selectMenu, value);
}

export async function fetchEmployeesByField(fieldName, fieldValue) {
  return await fetchDocumentsByFieldValue(organizationId, 'employees', fieldName, fieldValue);
}

export const addEmployee = (item) => addDocument(organizationId, 'employees', item);
export const updateEmployee = (employeeId, item) => updateDocument(organizationId, 'employees', employeeId, item);
export const deleteEmployee = (employeeId) => deleteDocument(organizationId, 'employees', employeeId);
















// Entities

export const fetchEntities = () => fetchDocuments(organizationId, 'entities');
export const addEntity = (item) => addDocument(organizationId, 'entities', item);
export const updateEntity = (id, item) => updateDocument(organizationId, 'entities', id, item);
export const deleteEntity = (id) => deleteDocument(organizationId, 'entities', id);

const getEntitiesOptions = async (types) => {
  return (await fetchEntities()).filter((entity) => {
    return types.includes(entity.type);
  }).map((entity) => {
    return {
      id: entity.id,
      label: entity.name
    }
  });
}

export const entitiesFieldsConfig = {
  name: { label: 'name', type: 'text', faker: 'company.name' },
  type: {
    label: 'Manager ID',
    type: 'select',
    options: [
      {
        id: 'store',
        label: 'Store'
      },
      {
        id: 'agency',
        label: 'Agency'
      },
      {
        id: 'department',
        label: 'Department'
      },
      {
        id: 'service',
        label: 'Service'
      },
    ],
    multiple: false,
    faker: 'random.arrayElement'
  },
  entityId: { label: 'Entity ID', type: 'text', faker: 'datatype.uuid' },
  parentId: {
    label: 'Parent Entity ID',
    type: 'select',
    options: await getEntitiesOptions(['store', 'agency', 'department', 'service']), // Populated with relevant parent entities
    multiple: true,
    faker: 'random.arrayElement'
  },
  storeId: {
    label: 'Parent Entity ID',
    type: 'select',
    options: await getEntitiesOptions(['store']), // Populated with relevant parent entities
    multiple: true,
    faker: 'random.arrayElement'
  },
  agencyId: {
    label: 'Parent Entity ID',
    type: 'select',
    options: await getEntitiesOptions(['agency']), // Populated with relevant parent entities
    multiple: true,
    faker: 'random.arrayElement'
  },
  departmentId: {
    label: 'Parent Entity ID',
    type: 'select',
    options: await getEntitiesOptions(['department']), // Populated with relevant parent entities
    multiple: true,
    faker: 'random.arrayElement'
  },
  serviceId: {
    label: 'Parent Entity ID',
    type: 'select',
    options: await getEntitiesOptions(['service']), // Populated with relevant parent entities
    multiple: true,
    faker: 'random.arrayElement'
  },
  locationId: { label: 'Location ID', type: 'text', faker: 'datatype.uuid' },
  regionId: { label: 'Region ID', type: 'text', faker: 'datatype.uuid' },
  countryId: { label: 'Country ID', type: 'text', faker: 'address.countryCode' },
  managerId: {
    label: 'Manager ID',
    type: 'select',
    options: [], // Populated with relevant managers
    multiple: false,
    faker: 'random.arrayElement'
  },
  status: {
    label: 'Status',
    type: 'select',
    options: [
      { id: 'active', label: 'Active' },
      { id: 'inactive', label: 'Inactive' }
    ],
    faker: 'random.arrayElement'
  },
  creationDate: { label: 'Creation Date', type: 'date', faker: 'date.past' },
  modifiedDate: { label: 'Modified Date', type: 'date', faker: 'date.recent' },
  notes: { label: 'Notes', type: 'text', faker: 'lorem.paragraph' },
};

export const entitiesHeadCells = Object.keys(entitiesFieldsConfig).map(key => ({
  id: key,
  label: entitiesFieldsConfig[key].label,
}));

export const entitiesName = 'Entities';











// Invoices


export const invoiceFieldsConfig = {
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

export const invoiceHeadCells = Object.keys(invoiceFieldsConfig).map(key => ({
  id: key,
  label: invoiceFieldsConfig[key].label,
}));

export const invoicesEntityName = 'Invoices';


export const fetchInvoices = () => fetchDocuments(organizationId, 'invoices');
export const addInvoice = (item) => addDocument(organizationId, 'invoices', item);
export const updateInvoice = (id, item) => updateDocument(organizationId, 'invoices', id, item);
export const deleteInvoice = (id) => deleteDocument(organizationId, 'invoices', id);





















// providers


export const providersFieldsConfig = {
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

export const providersHeadCells = Object.keys(providersFieldsConfig).map(key => ({
  id: key,
  label: providersFieldsConfig[key].label,
}));

export const providersEntityName = 'Providers';


export async function fetchProviders() {
  return await fetchDocuments(organizationId, 'providers');
}


export async function fetchProvidersBySelectValue(selectMenu, value) {
  return await fetchDocumentsBySelectValue(organizationId, 'providers', selectMenu, value);
}


export const addProvider = (item) => addDocument(organizationId, 'providers', item);
export const updateProvider = (id, item) => updateDocument(organizationId, 'providers', id, item);
export const deleteProvider = (id) => deleteDocument(organizationId, 'providers', id);


// projects

export const projectFieldsConfig = {
  name: { label: 'Project Name', type: 'text', faker: 'commerce.productName' },
  description: { label: 'Description', type: 'text', multiline: true, rows: 4, faker: 'lorem.paragraphs' },
  startDate: { label: 'Start Date', type: 'date', faker: 'date.past' },
  endDate: { label: 'End Date', type: 'date', faker: 'date.future' },
  status: {
    label: 'Status',
    type: 'select',
    options: [
      { id: 'not_started', label: 'Not Started' },
      { id: 'in_progress', label: 'In Progress' },
      { id: 'completed', label: 'Completed' },
      { id: 'on_hold', label: 'On Hold' },
    ],
    faker: 'random.arrayElement',
  },
  managerName: {
    label: 'Manager Name',
    type: 'select',
    options: managers,
    faker: 'random.arrayElement',
  },
  teamMembers: {
    label: 'Team Members',
    type: 'select',
    options: employees,
    multiple: true,
    faker: 'random.arrayElement',
  },
  budget: { label: 'Budget', type: 'number', faker: 'finance.amount' },
  priority: {
    label: 'Priority',
    type: 'select',
    options: [
      { id: 'low', label: 'Low' },
      { id: 'medium', label: 'Medium' },
      { id: 'high', label: 'High' },
    ],
    faker: 'random.arrayElement',
  },
  projectType: {
    label: 'Project Type',
    type: 'select',
    options: [
      { id: 'internal', label: 'Internal' },
      { id: 'client', label: 'Client' },
      { id: 'rnd', label: 'R&D' },
    ],
    faker: 'random.arrayElement',
  },
  clientName: {
    label: 'Client Name',
    type: 'select',
    options: [
      { id: 'client1', label: 'Client 1' },
      { id: 'client2', label: 'Client 2' },
      { id: 'client3', label: 'Client 3' },
      { id: 'client4', label: 'Client 4' },
    ],
    faker: 'random.arrayElement',
  },
  phase: {
    label: 'Project Phase',
    type: 'select',
    options: [
      { id: 'planning', label: 'Planning' },
      { id: 'execution', label: 'Execution' },
      { id: 'closure', label: 'Closure' },
    ],
    faker: 'random.arrayElement',
  },
  progress: { label: 'Progress (%)', type: 'number', faker: 'datatype.number' },
  risks: {
    label: 'Risks Identified',
    type: 'select',
    link: '/risks',
    options: [
      { id: 'internal', label: 'Internal' },
      { id: 'client', label: 'Client' },
      { id: 'rnd', label: 'R&D' },
    ],
    multiple: true,
    faker: 'random.arrayElement',
  },
  lastUpdated: { label: 'Last Updated', type: 'date', faker: 'date.recent' },
  estimatedCompletion: { label: 'Estimated Completion', type: 'date', faker: 'date.future' },
  actualCompletion: { label: 'Actual Completion', type: 'date', faker: 'date.future' },
  revenueGenerated: { label: 'Revenue Generated', type: 'number', faker: 'finance.amount' },
  dependencies: {
    label: 'Dependencies',
    type: 'select',
    options: [
      { id: 'dep1', label: 'Dependency 1' },
      { id: 'dep2', label: 'Dependency 2' },
      { id: 'dep3', label: 'Dependency 3' },
    ],
    faker: 'random.arrayElement',
  },
  projectCategory: {
    label: 'Project Category',
    type: 'select',
    options: [
      { id: 'category1', label: 'Category 1' },
      { id: 'category2', label: 'Category 2' },
      { id: 'category3', label: 'Category 3' },
    ],
    faker: 'random.arrayElement',
  },
  resourceAllocation: { label: 'Resource Allocation', type: 'text', faker: 'lorem.words' },
  technologyStack: {
    label: 'Technology Stack',
    type: 'select',
    options: [
      { id: 'tech1', label: 'Tech Stack 1' },
      { id: 'tech2', label: 'Tech Stack 2' },
      { id: 'tech3', label: 'Tech Stack 3' },
    ],
    faker: 'random.arrayElement',
  },
  stakeholders: {
    label: 'Stakeholders',
    type: 'select',
    options: [
      { id: 'stakeholder1', label: 'Stakeholder 1' },
      { id: 'stakeholder2', label: 'Stakeholder 2' },
      { id: 'stakeholder3', label: 'Stakeholder 3' },
    ],
    faker: 'random.arrayElement',
  },
  complianceRequirements: { label: 'Compliance Requirements', type: 'text', faker: 'lorem.sentence' },
  riskMitigation: { label: 'Risk Mitigation', type: 'text', faker: 'lorem.sentence' },
  criticalPath: {
    label: 'Critical Path',
    type: 'select',
    options: [
      { id: 'present', label: 'Present' },
      { id: 'absent', label: 'Absent' },
    ],
    faker: 'random.arrayElement',
  },
  milestones: { label: 'Milestones', type: 'text', faker: 'lorem.words' },
  KPIs: { label: 'KPIs', type: 'text', faker: 'lorem.words' },
  projectSponsor: {
    label: 'Project Sponsor',
    type: 'select',
    options: [
      { id: 'sponsor1', label: 'Sponsor 1' },
      { id: 'sponsor2', label: 'Sponsor 2' },
      { id: 'sponsor3', label: 'Sponsor 3' },
    ],
    faker: 'random.arrayElement',
  },
  businessImpact: {
    label: 'Business Impact',
    type: 'select',
    options: [
      { id: 'low', label: 'Low Impact' },
      { id: 'medium', label: 'Medium Impact' },
      { id: 'high', label: 'High Impact' },
      { id: 'critical', label: 'Critical Impact' },
    ],
    faker: 'random.arrayElement',
  },
  operatingCosts: { label: 'Operating Costs', type: 'number', faker: 'finance.amount' },
  userStories: {
    label: 'User Stories',
    type: 'text',
    multiline: true,
    rows: 4,
    faker: 'lorem.paragraphs',
  },
  codeRepository: { label: 'Code Repository', type: 'text', faker: 'internet.url' },
  documentation: { label: 'Documentation', type: 'text', faker: 'lorem.paragraph' },
};

export const headCells = Object.keys(projectFieldsConfig).map(key => ({
  id: key,
  label: projectFieldsConfig[key].label,
}));

export const projectsEntityName = 'Projects';

export async function fetchProjects() {
  return await fetchDocuments(organizationId, 'projects');
} export const addProject = (item) => addDocument(organizationId, 'projects', item);
export const updateProject = (id, item) => updateDocument(organizationId, 'projects', id, item);
export const deleteProject = (id) => deleteDocument(organizationId, 'projects', id);



















// products

export const productsFieldsConfig = {
  name: { label: 'Name', type: 'text', faker: 'commerce.productName' },
  description: { label: 'Description', type: 'text', multiline: true, rows: 4, faker: 'lorem.paragraphs' },
  price: { label: 'Price', type: 'number', faker: 'commerce.price' },
  sku: { label: 'SKU', type: 'text', faker: 'datatype.uuid' },
  category: {
    label: 'Category',
    type: 'select',
    options: [
      { id: 'electronics', label: 'Electronics' },
      { id: 'furniture', label: 'Furniture' },
      { id: 'apparel', label: 'Apparel' },
      { id: 'toys', label: 'Toys' },
      { id: 'food', label: 'Food' },
    ],
    faker: 'random.arrayElement',
  },
  supplier: {
    label: 'Supplier',
    type: 'select',
    options: [
      { id: 'supplierA', label: 'Supplier A' },
      { id: 'supplierB', label: 'Supplier B' },
      { id: 'supplierC', label: 'Supplier C' },
    ],
    faker: 'random.arrayElement',
  },
  stock: { label: 'Stock Quantity', type: 'number', faker: 'datatype.number' },
  minOrderQuantity: { label: 'Min Order Quantity', type: 'number', faker: 'datatype.number' },
  maxOrderQuantity: { label: 'Max Order Quantity', type: 'number', faker: 'datatype.number' },
  weight: { label: 'Weight', type: 'text', faker: 'commerce.productMaterial' },
  dimensions: { label: 'Dimensions', type: 'text', faker: 'lorem.words' },
  color: {
    label: 'Color',
    type: 'select',
    options: [
      { id: 'red', label: 'Red' },
      { id: 'blue', label: 'Blue' },
      { id: 'green', label: 'Green' },
      { id: 'yellow', label: 'Yellow' },
      { id: 'black', label: 'Black' },
    ],
    faker: 'random.arrayElement',
  },
  material: {
    label: 'Material',
    type: 'select',
    options: [
      { id: 'cotton', label: 'Cotton' },
      { id: 'plastic', label: 'Plastic' },
      { id: 'metal', label: 'Metal' },
      { id: 'wood', label: 'Wood' },
      { id: 'leather', label: 'Leather' },
    ],
    faker: 'random.arrayElement',
  },
  warranty: {
    label: 'Warranty',
    type: 'select',
    options: [
      { id: '6_months', label: '6 Months' },
      { id: '1_year', label: '1 Year' },
      { id: '2_years', label: '2 Years' },
      { id: 'lifetime', label: 'Lifetime' },
    ],
    faker: 'random.arrayElement',
  },
  returnPolicy: {
    label: 'Return Policy',
    type: 'select',
    options: [
      { id: '30_days', label: '30 Days' },
      { id: '60_days', label: '60 Days' },
      { id: 'no_returns', label: 'No Returns' },
    ],
    faker: 'random.arrayElement',
  },
  manufactureDate: { label: 'Manufacture Date', type: 'date', faker: 'date.past' },
  expirationDate: { label: 'Expiration Date', type: 'date', faker: 'date.future' },
  location: { label: 'Location', type: 'text', faker: 'address.city' },
  brand: { label: 'Brand', type: 'text', faker: 'company.name' },
  modelNumber: { label: 'Model Number', type: 'text', faker: 'datatype.uuid' },
  barcode: { label: 'Barcode', type: 'text', faker: 'datatype.uuid' },
  countryOfOrigin: { label: 'Country of Origin', type: 'text', faker: 'address.country' },
  batchNumber: { label: 'Batch Number', type: 'text', faker: 'datatype.uuid' },
  productionDate: { label: 'Production Date', type: 'date', faker: 'date.past' },
  expirationPeriod: { label: 'Expiration Period', type: 'text', faker: 'lorem.words' },
  leadTime: { label: 'Lead Time', type: 'text', faker: 'lorem.sentence' },
  shippingWeight: { label: 'Shipping Weight', type: 'text', faker: 'commerce.productMaterial' },
  packagingType: {
    label: 'Packaging Type',
    type: 'select',
    options: [
      { id: 'box', label: 'Box' },
      { id: 'bag', label: 'Bag' },
      { id: 'pallet', label: 'Pallet' },
      { id: 'wrap', label: 'Wrap' },
    ],
    faker: 'random.arrayElement',
  },
  shelfLife: { label: 'Shelf Life', type: 'text', faker: 'lorem.words' },
  certification: { label: 'Certification', type: 'text', faker: 'lorem.words' },
  recyclable: {
    label: 'Recyclable',
    type: 'select',
    options: [
      { id: 'yes', label: 'Yes' },
      { id: 'no', label: 'No' },
    ],
    faker: 'random.arrayElement',
  },
  hazardousMaterial: {
    label: 'Returnable',
    type: 'select',
    options: [
      { id: 'yes', label: 'Yes' },
      { id: 'no', label: 'No' },
    ],
    faker: 'random.arrayElement',
  },
  temperatureRequirements: {
    label: 'Temperature Requirements',
    type: 'select',
    options: [
      { id: 'ambient', label: 'Ambient' },
      { id: 'cold', label: 'Cold' },
      { id: 'frozen', label: 'Frozen' },
    ],
    faker: 'random.arrayElement',
  },
  storageInstructions: { label: 'Storage Instructions', type: 'text', faker: 'lorem.sentence' },
  safetyInstructions: { label: 'Safety Instructions', type: 'text', faker: 'lorem.sentence' },
  assemblyRequired: { label: 'Assembly Required', type: 'checkbox', faker: 'datatype.boolean' },
  instructionsIncluded: { label: 'Instructions Included', type: 'checkbox', faker: 'datatype.boolean' },
  energyConsumption: {
    label: 'Energy Consumption',
    type: 'select',
    multiple: false,
    options: [
      { id: 'low', label: 'Low' },
      { id: 'medium', label: 'Medium' },
      { id: 'high', label: 'High' },
    ],
    faker: 'random.arrayElement',
  },
  waterResistance: { label: 'Water Resistance', type: 'text', faker: 'lorem.word' },
  fireResistance: { label: 'Fire Resistance', type: 'text', faker: 'lorem.word' },
  chemicalResistance: { label: 'Chemical Resistance', type: 'text', faker: 'lorem.word' },
  uvResistance: { label: 'UV Resistance', type: 'text', faker: 'lorem.word' },
  warrantyPeriod: { label: 'Warranty Period', type: 'text', faker: 'lorem.words' },
  serviceSupport: { label: 'Service & Support', type: 'text', faker: 'lorem.sentence' },
  returnable: {
    label: 'Returnable',
    type: 'select',
    options: [
      { id: 'yes', label: 'Yes' },
      { id: 'no', label: 'No' },
    ],
    faker: 'random.arrayElement',
  },
  discount: { label: 'Discount', type: 'text', faker: 'commerce.price' },
  promotionalOffer: { label: 'Promotional Offer', type: 'text', faker: 'lorem.words' },
  rating: { label: 'Rating', type: 'number', faker: 'datatype.float' },
  reviewCount: { label: 'Review Count', type: 'number', faker: 'datatype.number' },
  bestBeforeDate: { label: 'Best Before Date', type: 'date', faker: 'date.future' },
  salesStartDate: { label: 'Sales Start Date', type: 'date', faker: 'date.past' },
  salesEndDate: { label: 'Sales End Date', type: 'date', faker: 'date.future' },
  legalDisclaimer: { label: 'Legal Disclaimer', type: 'text', faker: 'lorem.sentence' },
  productManual: { label: 'Product Manual', type: 'text', faker: 'lorem.paragraph' },
  videoTutorialLink: { label: 'Video Tutorial Link', type: 'text', faker: 'internet.url' },
  warrantyDetails: { label: 'Warranty Details', type: 'text', faker: 'lorem.paragraph' },
  customizable: {
    label: 'Customizable',
    type: 'select',
    options: [
      { id: 'yes', label: 'Yes' },
      { id: 'no', label: 'No' },
    ],
    faker: 'random.arrayElement',
  },
  availableColors: {
    label: 'Available Colors',
    type: 'select',
    options: [
      { id: 'red', label: 'Red' },
      { id: 'blue', label: 'Blue' },
      { id: 'green', label: 'Green' },
      { id: 'yellow', label: 'Yellow' },
      { id: 'black', label: 'Black' },
    ],
    faker: 'random.arrayElement',
  },
  availableSizes: {
    label: 'Available Sizes',
    type: 'select',
    multiple: false,
    options: [
      { id: 'small', label: 'Small' },
      { id: 'medium', label: 'Medium' },
      { id: 'large', label: 'Large' },
      { id: 'xl', label: 'XL' },
      { id: 'xxl', label: 'XXL' },
    ],
    faker: 'random.arrayElements',
  },
};

// Generate head cells dynamically from the config object
export const productsHeadCells = Object.keys(productsFieldsConfig).map(key => ({
  id: key,
  label: productsFieldsConfig[key].label,
}));


export const productEntityName = 'Products';

export async function fetchProducts() {
  return await fetchDocuments(organizationId, 'products');
}
export const addProduct = (item) => addDocument(organizationId, 'products', item);
export const updateProduct = (id, item) => updateDocument(organizationId, 'products', id, item);
export const deleteProduct = (id) => deleteDocument(organizationId, 'products', id);







// risks


export const risksFieldsConfig = {
  riskId: { label: 'Risk ID', type: 'text', faker: 'datatype.uuid' },
  riskName: { label: 'Risk Name', type: 'text', faker: 'lorem.words' },
  description: { label: 'Description', type: 'text', faker: 'lorem.paragraph' },
  riskType: {
    label: 'Risk Type',
    type: 'select',
    options: [
      { id: 'financial', label: 'Financial' },
      { id: 'operational', label: 'Operational' },
      { id: 'compliance', label: 'Compliance' },
      { id: 'strategic', label: 'Strategic' },
      { id: 'market', label: 'Market' },
      { id: 'reputational', label: 'Reputational' }
    ],
    faker: 'random.arrayElement'
  },
  severity: {
    label: 'Severity',
    type: 'select',
    options: [
      { id: 'low', label: 'Low' },
      { id: 'medium', label: 'Medium' },
      { id: 'high', label: 'High' },
      { id: 'critical', label: 'Critical' }
    ],
    faker: 'random.arrayElement'
  },
  likelihood: {
    label: 'Likelihood',
    type: 'select',
    options: [
      { id: 'rare', label: 'Rare' },
      { id: 'unlikely', label: 'Unlikely' },
      { id: 'possible', label: 'Possible' },
      { id: 'likely', label: 'Likely' },
      { id: 'almost_certain', label: 'Almost Certain' }
    ],
    faker: 'random.arrayElement'
  },
  impact: {
    label: 'Impact',
    type: 'select',
    options: [
      { id: 'low', label: 'Low' },
      { id: 'moderate', label: 'Moderate' },
      { id: 'high', label: 'High' },
      { id: 'extreme', label: 'Extreme' }
    ],
    faker: 'random.arrayElement'
  },
  detection: {
    label: 'Detection',
    type: 'select',
    options: [
      { id: 'high', label: 'High' },
      { id: 'medium', label: 'Medium' },
      { id: 'low', label: 'Low' }
    ],
    faker: 'random.arrayElement'
  },
  owner: { label: 'Risk Owner', type: 'text', faker: 'name.fullName' },
  department: {
    label: 'Department',
    type: 'select',
    options: [
      { id: 'finance', label: 'Finance' },
      { id: 'hr', label: 'Human Resources' },
      { id: 'it', label: 'IT' },
      { id: 'legal', label: 'Legal' },
      { id: 'operations', label: 'Operations' }
    ],
    faker: 'random.arrayElement'
  },
  productIds: {
    label: 'Cost for Products',
    link: '/products',
    type: 'select',
    options: productsOptions,
    multiple: true,
    faker: 'random.arrayElements'
  },
  employeeIds: {
    label: 'Cost for Employees',
    link: '/employees',
    type: 'select',
    options: employeesOptions,
    multiple: true,
    faker: 'random.arrayElements'
  },
  projectIds: {
    label: 'Cost for Projects',
    link: '/projects',
    type: 'select',
    options: projectsOptions,
    multiple: true,
    faker: 'random.arrayElements'
  },
  partnerIds: {
    label: 'Cost for Partners',
    link: '/partners',
    type: 'select',
    link: true,
    options: partnersOptions,
    multiple: true,
    faker: 'random.arrayElements'
  },
  providerIds: {
    link: '/providers',
    label: 'Cost for Providers',
    type: 'select',
    link: true,
    options: providersOptions,
    multiple: true,
    faker: 'random.arrayElements'
  },
  riskCategory: {
    label: 'Risk Category',
    type: 'select',
    options: [
      { id: 'internal', label: 'Internal' },
      { id: 'external', label: 'External' },
      { id: 'regulatory', label: 'Regulatory' },
      { id: 'environmental', label: 'Environmental' }
    ],
    faker: 'random.arrayElement'
  },
  mitigationPlan: { label: 'Mitigation Plan', type: 'text', faker: 'lorem.paragraph' },
  contingencyPlan: { label: 'Contingency Plan', type: 'text', faker: 'lorem.paragraph' },
  responseStrategy: {
    label: 'Response Strategy',
    type: 'select',
    options: [
      { id: 'avoid', label: 'Avoid' },
      { id: 'mitigate', label: 'Mitigate' },
      { id: 'transfer', label: 'Transfer' },
      { id: 'accept', label: 'Accept' }
    ],
    faker: 'random.arrayElement'
  },
  riskAppetite: {
    label: 'Risk Appetite',
    type: 'select',
    options: [
      { id: 'low', label: 'Low' },
      { id: 'medium', label: 'Medium' },
      { id: 'high', label: 'High' }
    ],
    faker: 'random.arrayElement'
  },
  financialImpact: { label: 'Financial Impact', type: 'number', faker: 'finance.amount' },
  reputationalImpact: { label: 'Reputational Impact', type: 'text', faker: 'lorem.sentence' },
  operationalImpact: { label: 'Operational Impact', type: 'text', faker: 'lorem.sentence' },
  complianceImpact: { label: 'Compliance Impact', type: 'text', faker: 'lorem.sentence' },
  lastAssessmentDate: { label: 'Last Assessment Date', type: 'date', faker: 'date.past' },
  nextReviewDate: { label: 'Next Review Date', type: 'date', faker: 'date.future' },
  escalationLevel: {
    label: 'Escalation Level',
    type: 'select',
    options: [
      { id: 'low', label: 'Low' },
      { id: 'medium', label: 'Medium' },
      { id: 'high', label: 'High' },
      { id: 'urgent', label: 'Urgent' }
    ],
    faker: 'random.arrayElement'
  },
  relatedRegulations: {
    label: 'Related Regulations',
    type: 'select',
    options: [],
    multiple: true,
    faker: 'random.arrayElements'
  },
  auditStatus: {
    label: 'Audit Status',
    type: 'select',
    options: [
      { id: 'not_started', label: 'Not Started' },
      { id: 'in_progress', label: 'In Progress' },
      { id: 'completed', label: 'Completed' }
    ],
    faker: 'random.arrayElement'
  },
  auditDate: { label: 'Audit Date', type: 'date', faker: 'date.past' },
  auditor: { label: 'Auditor', type: 'text', faker: 'name.fullName' },
  auditFindings: { label: 'Audit Findings', type: 'text', faker: 'lorem.paragraph' },
  complianceStatus: {
    label: 'Compliance Status',
    type: 'select',
    options: [
      { id: 'compliant', label: 'Compliant' },
      { id: 'non_compliant', label: 'Non-compliant' },
      { id: 'pending', label: 'Pending' }
    ],
    faker: 'random.arrayElement'
  },
  controlEffectiveness: {
    label: 'Control Effectiveness',
    type: 'select',
    options: [
      { id: 'effective', label: 'Effective' },
      { id: 'partially_effective', label: 'Partially Effective' },
      { id: 'ineffective', label: 'Ineffective' }
    ],
    faker: 'random.arrayElement'
  },
  costOfMitigation: { label: 'Cost of Mitigation', type: 'number', faker: 'finance.amount' },
  riskOwnerContact: { label: 'Risk Owner Contact', type: 'text', faker: 'phone.imei' },
  escalationContact: { label: 'Escalation Contact', type: 'text', faker: 'phone.imei' },
  residualRisk: {
    label: 'Residual Risk',
    type: 'select',
    options: [
      { id: 'low', label: 'Low' },
      { id: 'medium', label: 'Medium' },
      { id: 'high', label: 'High' }
    ],
    faker: 'random.arrayElement'
  },
  riskStatus: {
    label: 'Risk Status',
    type: 'select',
    options: [
      { id: 'open', label: 'Open' },
      { id: 'closed', label: 'Closed' },
      { id: 'under_review', label: 'Under Review' }
    ],
    faker: 'random.arrayElement'
  },
  riskExposure: {
    label: 'Risk Exposure',
    type: 'select',
    options: [
      { id: 'low', label: 'Low' },
      { id: 'moderate', label: 'Moderate' },
      { id: 'high', label: 'High' }
    ],
    faker: 'random.arrayElement'
  },
  scenarioAnalysis: { label: 'Scenario Analysis', type: 'text', faker: 'lorem.paragraphs' },
  riskScore: { label: 'Risk Score', type: 'number', faker: 'datatype.number' },
  reviewFrequency: {
    label: 'Review Frequency',
    type: 'select',
    options: [
      { id: 'monthly', label: 'Monthly' },
      { id: 'quarterly', label: 'Quarterly' },
      { id: 'annually', label: 'Annually' }
    ],
    faker: 'random.arrayElement'
  },
  createdBy: { label: 'Created By', type: 'text', faker: 'name.fullName' },
  createdDate: { label: 'Created Date', type: 'date', faker: 'date.past' },
  lastUpdatedBy: { label: 'Last Updated By', type: 'text', faker: 'name.fullName' },
  lastUpdatedDate: { label: 'Last Updated Date', type: 'date', faker: 'date.recent' }
};

export const risksHeadCells = Object.keys(risksFieldsConfig).map(key => ({
  id: key,
  label: risksFieldsConfig[key].label,
}));

export const risksEntityName = 'Risks';

export const fetchRisks = () => fetchDocuments(organizationId, 'risks');
export const addRisk = (item) => addDocument(organizationId, 'risks', item);
export const updateRisk = (id, item) => updateDocument(organizationId, 'risks', id, item);
export const deleteRisk = (id) => deleteDocument(organizationId, 'risks', id);

















// Campaigns


export const campaignFieldsConfig = {
  campaignId: { label: 'Campaign ID', type: 'text', faker: 'datatype.uuid' },
  campaignName: { label: 'Campaign Name', type: 'text', faker: 'commerce.productName' },
  description: { label: 'Description', type: 'text', multiline: true, rows: 4, faker: 'lorem.paragraphs' },
  startDate: { label: 'Start Date', type: 'date', faker: 'date.past' },
  endDate: { label: 'End Date', type: 'date', faker: 'date.future' },
  status: {
    label: 'Status',
    type: 'select',
    options: [
      { id: 'planned', label: 'Planned' },
      { id: 'active', label: 'Active' },
      { id: 'completed', label: 'Completed' },
      { id: 'on_hold', label: 'On Hold' },
      { id: 'cancelled', label: 'Cancelled' },
    ],
    faker: 'random.arrayElement',
  },
  targetAudience: { label: 'Target Audience', type: 'text', faker: 'lorem.words' },
  budget: { label: 'Budget', type: 'number', faker: 'finance.amount' },
  actualSpend: { label: 'Actual Spend', type: 'number', faker: 'finance.amount' },
  roi: { label: 'ROI (%)', type: 'number', faker: 'datatype.float' },
  marketingChannel: {
    label: 'Marketing Channel',
    type: 'select',
    options: [
      { id: 'email', label: 'Email' },
      { id: 'social_media', label: 'Social Media' },
      { id: 'seo', label: 'SEO' },
      { id: 'ppc', label: 'PPC' },
      { id: 'content', label: 'Content Marketing' },
    ],
    faker: 'random.arrayElement',
  },
  campaignManager: {
    label: 'Campaign Manager',
    type: 'select',
    options: managers,
    faker: 'random.arrayElement',
  },
  objectives: { label: 'Objectives', type: 'text', multiline: true, rows: 4, faker: 'lorem.sentences' },
  KPIs: { label: 'KPIs', type: 'text', faker: 'lorem.words' },
  contentStrategy: { label: 'Content Strategy', type: 'text', multiline: true, rows: 4, faker: 'lorem.paragraphs' },
  creativeAssets: { label: 'Creative Assets', type: 'text', faker: 'lorem.words' },
  callToAction: { label: 'Call to Action', type: 'text', faker: 'lorem.words' },
  landingPage: { label: 'Landing Page URL', type: 'text', faker: 'internet.url' },
  emailTemplate: { label: 'Email Template', type: 'text', faker: 'lorem.words' },
  socialMediaPosts: { label: 'Social Media Posts', type: 'text', multiline: true, rows: 4, faker: 'lorem.sentences' },
  ppcKeywords: { label: 'PPC Keywords', type: 'text', faker: 'lorem.words' },
  seoKeywords: { label: 'SEO Keywords', type: 'text', faker: 'lorem.words' },
  targetLocations: { label: 'Target Locations', type: 'text', faker: 'address.city' },
  targetAgeGroup: {
    label: 'Target Age Group',
    type: 'select',
    options: [
      { id: '18_24', label: '18-24' },
      { id: '25_34', label: '25-34' },
      { id: '35_44', label: '35-44' },
      { id: '45_54', label: '45-54' },
      { id: '55_64', label: '55-64' },
      { id: '65_plus', label: '65+' },
    ],
    faker: 'random.arrayElement',
  },
  demographics: { label: 'Demographics', type: 'text', faker: 'lorem.words' },
  competitors: { label: 'Competitors', type: 'text', faker: 'company.name' },
  marketResearch: { label: 'Market Research', type: 'text', multiline: true, rows: 4, faker: 'lorem.paragraphs' },
  conversionRate: { label: 'Conversion Rate (%)', type: 'number', faker: 'datatype.float' },
  clickThroughRate: { label: 'Click-Through Rate (%)', type: 'number', faker: 'datatype.float' },
  openRate: { label: 'Open Rate (%)', type: 'number', faker: 'datatype.float' },
  bounceRate: { label: 'Bounce Rate (%)', type: 'number', faker: 'datatype.float' },
  leadGeneration: { label: 'Lead Generation', type: 'number', faker: 'datatype.number' },
  customerAcquisitionCost: { label: 'Customer Acquisition Cost', type: 'number', faker: 'finance.amount' },
  salesGenerated: { label: 'Sales Generated', type: 'number', faker: 'finance.amount' },
  leadNurturing: { label: 'Lead Nurturing Strategy', type: 'text', multiline: true, rows: 4, faker: 'lorem.sentences' },
  remarketingStrategy: { label: 'Remarketing Strategy', type: 'text', multiline: true, rows: 4, faker: 'lorem.sentences' },
  emailOpenRate: { label: 'Email Open Rate (%)', type: 'number', faker: 'datatype.float' },
  smsClickRate: { label: 'SMS Click Rate (%)', type: 'number', faker: 'datatype.float' },
  adSpend: { label: 'Ad Spend', type: 'number', faker: 'finance.amount' },
  impressions: { label: 'Impressions', type: 'number', faker: 'datatype.number' },
  engagements: { label: 'Engagements', type: 'number', faker: 'datatype.number' },
  shares: { label: 'Shares', type: 'number', faker: 'datatype.number' },
  likes: { label: 'Likes', type: 'number', faker: 'datatype.number' },
  comments: { label: 'Comments', type: 'number', faker: 'datatype.number' },
  brandAwarenessScore: { label: 'Brand Awareness Score', type: 'number', faker: 'datatype.float' },
  sentimentAnalysis: { label: 'Sentiment Analysis', type: 'text', faker: 'lorem.sentences' },
  userGeneratedContent: { label: 'User Generated Content', type: 'text', faker: 'lorem.words' },
  partnerships: { label: 'Partnerships', type: 'text', faker: 'company.name' },
  influencers: { label: 'Influencers', type: 'text', faker: 'name.fullName' },
  lastUpdated: { label: 'Last Updated', type: 'date', faker: 'date.recent' },
};

export const campaignsHeadCells = Object.keys(campaignFieldsConfig).map(key => ({
  id: key,
  label: campaignFieldsConfig[key].label,
}));

export const campaignsEntityName = 'Marketing Campaigns';

export async function fetchCampaigns() {
  return await fetchDocuments(organizationId, 'campaigns');
}

export const addCampaign = (item) => addDocument(organizationId, 'campaigns', item);
export const updateCampaign = (id, item) => updateDocument(organizationId, 'campaigns', id, item);
export const deleteCampaign = (id) => deleteDocument(organizationId, 'campaigns', id);






















// teams

// Teams

export const fetchTeams = () => fetchDocuments(organizationId, 'teams');
export const addTeam = (item) => addDocument(organizationId, 'teams', item);
export const updateTeam = (id, item) => updateDocument(organizationId, 'teams', id, item);
export const deleteTeam = (id) => deleteDocument(organizationId, 'teams', id);

const getTeamsOptions = async (types) => {
  return (await fetchTeams()).filter((team) => {
    return types.includes(team.type);
  }).map((team) => {
    return {
      id: team.id,
      label: team.name
    }
  });
}

export const teamsFieldsConfig = {
  name: { label: 'Name', type: 'text', faker: 'company.name' },
  type: {
    label: 'Team Type',
    type: 'select',
    options: [
      {
        id: 'project',
        label: 'Project'
      },
      {
        id: 'department',
        label: 'Department'
      },
      {
        id: 'service',
        label: 'Service'
      },
      {
        id: 'taskforce',
        label: 'Taskforce'
      },
    ],
    multiple: false,
    faker: 'random.arrayElement'
  },
  teamId: { label: 'Team ID', type: 'text', faker: 'datatype.uuid' },
  parentId: {
    label: 'Parent Team ID',
    type: 'select',
    options: await getTeamsOptions(['project', 'department', 'service', 'taskforce']), // Populated with relevant parent teams
    multiple: true,
    faker: 'random.arrayElement'
  },
  projectId: {
    label: 'Parent Project ID',
    type: 'select',
    options: await getTeamsOptions(['project']), // Populated with relevant parent teams
    multiple: true,
    faker: 'random.arrayElement'
  },
  departmentId: {
    label: 'Parent Department ID',
    type: 'select',
    options: await getTeamsOptions(['department']), // Populated with relevant parent teams
    multiple: true,
    faker: 'random.arrayElement'
  },
  serviceId: {
    label: 'Parent Service ID',
    type: 'select',
    options: await getTeamsOptions(['service']), // Populated with relevant parent teams
    multiple: true,
    faker: 'random.arrayElement'
  },
  locationId: { label: 'Location ID', type: 'text', faker: 'datatype.uuid' },
  regionId: { label: 'Region ID', type: 'text', faker: 'datatype.uuid' },
  countryId: { label: 'Country ID', type: 'text', faker: 'address.countryCode' },
  managerId: {
    label: 'Manager ID',
    type: 'select',
    options: [], // Populated with relevant managers
    multiple: false,
    faker: 'random.arrayElement'
  },
  status: {
    label: 'Status',
    type: 'select',
    options: [
      { id: 'active', label: 'Active' },
      { id: 'inactive', label: 'Inactive' }
    ],
    faker: 'random.arrayElement'
  },
  creationDate: { label: 'Creation Date', type: 'date', faker: 'date.past' },
  modifiedDate: { label: 'Modified Date', type: 'date', faker: 'date.recent' },
  notes: { label: 'Notes', type: 'text', faker: 'lorem.paragraph' },
};

export const teamsHeadCells = Object.keys(teamsFieldsConfig).map(key => ({
  id: key,
  label: teamsFieldsConfig[key].label,
}));

export const teamsName = 'Teams';
