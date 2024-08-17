import {
  fetchDocuments, addDocument, updateDocument, deleteDocument
} from '../../utils/firebaseCrudHelpers';

export const fieldsConfig = {
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
  managerName: { label: 'Manager Name', type: 'text', faker: 'name.fullName' },
  managerEmail: { label: 'Manager Email', type: 'email', faker: 'internet.email' },
  teamMembers: { label: 'Team Members', type: 'number', faker: 'datatype.number' },
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
  risks: { label: 'Risks Identified', type: 'text', faker: 'lorem.sentence' },
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

export const headCells = Object.keys(fieldsConfig).map(key => ({
  id: key,
  label: fieldsConfig[key].label,
}));

export const entityName = 'Projects';

const organizationId = JSON.parse(localStorage.getItem('userData')).organizationId;

export const fetchItems = () => fetchDocuments(organizationId, 'projects');
export const addItem = (item) => addDocument(organizationId, 'projects', item);
export const updateItem = (id, item) => updateDocument(organizationId, 'projects', id, item);
export const deleteItem = (id) => deleteDocument(organizationId, 'projects', id);