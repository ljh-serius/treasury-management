import {
    fetchDocuments, addDocument, updateDocument, deleteDocument
} from '../../utils/firebaseCrudHelpers';

export const fieldsConfig = {
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
    relatedProjects: {
        label: 'Related Projects',
        type: 'select',
        options: [],
        multiple: true,
        faker: 'random.arrayElements'
    },
    relatedProducts: {
        label: 'Related Products',
        type: 'select',
        options: [],
        multiple: true,
        faker: 'random.arrayElements'
    },
    relatedPartners: {
        label: 'Related Partners',
        type: 'select',
        options: [],
        multiple: true,
        faker: 'random.arrayElements'
    },
    relatedProviders: {
        label: 'Related Providers',
        type: 'select',
        options: [],
        multiple: true,
        faker: 'random.arrayElements'
    },
    relatedEmployees: {
        label: 'Related Employees',
        type: 'select',
        options: [],
        multiple: true,
        faker: 'random.arrayElements'
    },
    relatedDepartments: {
        label: 'Related Departments',
        type: 'select',
        options: [],
        multiple: true,
        faker: 'random.arrayElements'
    },
    relatedGovernments: {
        label: 'Related Governments',
        type: 'select',
        options: [],
        multiple: true,
        faker: 'random.arrayElements'
    },
    relatedMarkets: {
        label: 'Related Markets',
        type: 'select',
        options: [],
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

export const headCells = Object.keys(fieldsConfig).map(key => ({
    id: key,
    label: fieldsConfig[key].label,
}));

export const entityName = 'Risks';

const organizationId = JSON.parse(localStorage.getItem('userData')).organizationId;

export const fetchItems = () => fetchDocuments(organizationId, 'risks');
export const addItem = (item) => addDocument(organizationId, 'risks', item);
export const updateItem = (id, item) => updateDocument(organizationId, 'risks', id, item);
export const deleteItem = (id) => deleteDocument(organizationId, 'risks', id);