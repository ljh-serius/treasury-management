import {
  fetchDocuments,
  addDocument,
  updateDocument,
  deleteDocument,
  fetchDocumentsBySelectValue,
  fetchDocumentsByFieldValue,
} from '../../utils/firebaseCrudHelpers';

import { fetchItemsByField as fetchEmployeesByField } from './Employees';

const managers = (await fetchEmployeesByField('position', 'manager')).map((manager) => {
  return {
      id: manager.id,
      label: manager.name
  }
})

const organizationId = JSON.parse(localStorage.getItem('userData')).organizationId;

export const fieldsConfig = {
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


export const headCells = Object.keys(fieldsConfig).map(key => ({
  id: key,
  label: fieldsConfig[key].label,
}));

export const entityName = 'Marketing CAmap';

export async function fetchItems() {
  return await fetchDocuments(organizationId, 'campaigns');
}

export const addItem = (item) => addDocument(organizationId, 'campaigns', item);
export const updateItem = (id, item) => updateDocument(organizationId, 'campaigns', id, item);
export const deleteItem = (id) => deleteDocument(organizationId, 'campaigns', id);




