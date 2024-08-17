import {
  fetchDocuments, addDocument, updateDocument, deleteDocument
} from '../utils/firebaseCrudHelpers';

export const fieldsConfig = {
  name: { label: 'Project Name', type: 'text' },
  description: { label: 'Description', type: 'text', multiline: true, rows: 4 },
  startDate: { label: 'Start Date', type: 'date' },
  endDate: { label: 'End Date', type: 'date' },
  status: {
    label: 'Status',
    type: 'select',
    options: [
      { id: 'not_started', label: 'Not Started' },
      { id: 'in_progress', label: 'In Progress' },
      { id: 'completed', label: 'Completed' },
      { id: 'on_hold', label: 'On Hold' },
    ],
  },
  managerName: { label: 'Manager Name', type: 'text' },
  managerEmail: { label: 'Manager Email', type: 'email' },
  teamMembers: { label: 'Team Members', type: 'number' },
  budget: { label: 'Budget', type: 'number' },
  priority: {
    label: 'Priority',
    type: 'select',
    options: [
      { id: 'low', label: 'Low' },
      { id: 'medium', label: 'Medium' },
      { id: 'high', label: 'High' },
    ],
  },
  projectType: {
    label: 'Project Type',
    type: 'select',
    options: [
      { id: 'internal', label: 'Internal' },
      { id: 'client', label: 'Client' },
      { id: 'rnd', label: 'R&D' },
    ],
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
  },
  phase: {
    label: 'Project Phase',
    type: 'select',
    options: [
      { id: 'planning', label: 'Planning' },
      { id: 'execution', label: 'Execution' },
      { id: 'closure', label: 'Closure' },
    ],
  },
  progress: { label: 'Progress (%)', type: 'number' },
  risks: { label: 'Risks Identified', type: 'text' },
  lastUpdated: { label: 'Last Updated', type: 'date' },
  estimatedCompletion: { label: 'Estimated Completion', type: 'date' },
  actualCompletion: { label: 'Actual Completion', type: 'date' },
  revenueGenerated: { label: 'Revenue Generated', type: 'number' },
  dependencies: {
    label: 'Dependencies',
    type: 'select',
    options: [
      { id: 'dep1', label: 'Dependency 1' },
      { id: 'dep2', label: 'Dependency 2' },
      { id: 'dep3', label: 'Dependency 3' },
    ],
  },
  projectCategory: {
    label: 'Project Category',
    type: 'select',
    options: [
      { id: 'category1', label: 'Category 1' },
      { id: 'category2', label: 'Category 2' },
      { id: 'category3', label: 'Category 3' },
    ],
  },
  resourceAllocation: { label: 'Resource Allocation', type: 'text' },
  technologyStack: {
    label: 'Technology Stack',
    type: 'select',
    options: [
      { id: 'tech1', label: 'Tech Stack 1' },
      { id: 'tech2', label: 'Tech Stack 2' },
      { id: 'tech3', label: 'Tech Stack 3' },
    ],
  },
  stakeholders: {
    label: 'Stakeholders',
    type: 'select',
    options: [
      { id: 'stakeholder1', label: 'Stakeholder 1' },
      { id: 'stakeholder2', label: 'Stakeholder 2' },
      { id: 'stakeholder3', label: 'Stakeholder 3' },
    ],
  },
  complianceRequirements: { label: 'Compliance Requirements', type: 'text' },
  riskMitigation: { label: 'Risk Mitigation', type: 'text' },
  criticalPath: {
    label: 'Critical Path',
    type: 'select',
    options: [
      { id: 'present', label: 'Present' },
      { id: 'absent', label: 'Absent' },
    ],
  },
  milestones: { label: 'Milestones', type: 'text' },
  KPIs: { label: 'KPIs', type: 'text' },
  projectSponsor: {
    label: 'Project Sponsor',
    type: 'select',
    options: [
      { id: 'sponsor1', label: 'Sponsor 1' },
      { id: 'sponsor2', label: 'Sponsor 2' },
      { id: 'sponsor3', label: 'Sponsor 3' },
    ],
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
  },
  operatingCosts: { label: 'Operating Costs', type: 'number' },
  userStories: {
    label: 'User Stories',
    type: 'text',
    multiline: true,
    rows: 4,
  },
  codeRepository: { label: 'Code Repository', type: 'text' },
  documentation: { label: 'Documentation', type: 'text' },
};

export const headCells = Object.keys(fieldsConfig).map(key => ({
  id: key,
  label: fieldsConfig[key].label,
}));

export const entityName = 'Project';

const organizationId = JSON.parse(localStorage.getItem('userData')).organizationId;

export const fetchItems = () => fetchDocuments('projects', organizationId);
export const addItem = (item) => addDocument('projects', item, organizationId);
export const updateItem = (id, item) => updateDocument('projects', id, item);
export const deleteItem = (id) => deleteDocument('projects', id);