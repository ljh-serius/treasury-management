import {
    fetchDocuments, addDocument, updateDocument, deleteDocument
  } from '../utils/firebaseCrudHelpers';
  
export const fieldsConfig = {
    cost: { label: 'Cost', type: 'number' },
    description: { label: 'Description', type: 'text' },
    productIds: {
        label: 'Products',
        type: 'select',
        options: [],
        multiple: true
    },
    employeeIds: {
        label: 'Employees',
        type: 'select',
        options: [],
        multiple: true
    },
    projectIds: {
        label: 'Projects',
        type: 'select',
        options: [],
        multiple: true
    },
    partnerIds: {
        label: 'Partners',
        type: 'select',
        options: [],
        multiple: true
    },
    providerIds: {
        label: 'Providers',
        type: 'select',
        options: [],
        multiple: true
    },
    allocationDate: { label: 'Allocation Date', type: 'date' },
    allocationType: {
        label: 'Allocation Type',
        type: 'select',
        options: [
            { id: '1', label: 'Type 1' },
            { id: '2', label: 'Type 2' },
            { id: '3', label: 'Type 3' }
        ]
    },
    notes: { label: 'Notes', type: 'text' },
    department: {
        label: 'Department',
        type: 'select',
        options: [
            { id: 'finance', label: 'Finance' },
            { id: 'hr', label: 'Human Resources' },
            { id: 'it', label: 'IT' }
        ]
    },
    priority: {
        label: 'Priority',
        type: 'select',
        options: [
            { id: 'high', label: 'High' },
            { id: 'medium', label: 'Medium' },
            { id: 'low', label: 'Low' }
        ]
    },
    status: {
        label: 'Status',
        type: 'select',
        options: [
            { id: 'active', label: 'Active' },
            { id: 'inactive', label: 'Inactive' }
        ]
    },
    duration: { label: 'Duration', type: 'number' },
    currency: { label: 'Currency', type: 'text' },
    approvedBy: { label: 'Approved By', type: 'text' },
    allocationCode: { label: 'Allocation Code', type: 'text' },
    fundingSource: { label: 'Funding Source', type: 'text' },
    costCenter: { label: 'Cost Center', type: 'text' },
    budgetCode: { label: 'Budget Code', type: 'text' },
    financialYear: { label: 'Financial Year', type: 'number' },
    quarter: {
        label: 'Quarter',
        type: 'select',
        options: [
            { id: 'q1', label: 'Q1' },
            { id: 'q2', label: 'Q2' },
            { id: 'q3', label: 'Q3' },
            { id: 'q4', label: 'Q4' }
        ]
    },
    allocationMethod: { label: 'Allocation Method', type: 'text' },
    roiEstimate: { label: 'ROI Estimate', type: 'number' },
    taxImplications: { label: 'Tax Implications', type: 'text' },
    capexOrOpex: {
        label: 'Capex/Opex',
        type: 'select',
        options: [
            { id: 'capex', label: 'Capex' },
            { id: 'opex', label: 'Opex' }
        ]
    },
    riskAssessment: { label: 'Risk Assessment', type: 'text' },
    complianceStatus: {
        label: 'Compliance Status',
        type: 'select',
        options: [
            { id: 'compliant', label: 'Compliant' },
            { id: 'non_compliant', label: 'Non-compliant' }
        ]
    },
    paymentTerms: { label: 'Payment Terms', type: 'text' },
    invoiceNumber: { label: 'Invoice Number', type: 'text' },
    vatAmount: { label: 'VAT Amount', type: 'number' },
    vatPercentage: { label: 'VAT Percentage', type: 'number' },
    discountApplied: { label: 'Discount Applied', type: 'number' },
    totalCostAfterDiscount: { label: 'Total Cost After Discount', type: 'number' },
    exchangeRate: { label: 'Exchange Rate', type: 'number' },
    costAllocationFactor: { label: 'Cost Allocation Factor', type: 'number' },
    approvalStatus: {
        label: 'Approval Status',
        type: 'select',
        options: [
            { id: 'pending', label: 'Pending' },
            { id: 'approved', label: 'Approved' },
            { id: 'rejected', label: 'Rejected' }
        ]
    },
    auditTrail: { label: 'Audit Trail', type: 'text' },
};

// Generate head cells dynamically from the config object
export const headCells = Object.keys(fieldsConfig).map(key => ({
    id: key,
    label: fieldsConfig[key].label,
}));

export const entityName = 'Cost Allocation';

const organizationId = JSON.parse(localStorage.getItem('userData')).organizationId;

export const fetchItems = () => fetchDocuments('costs', organizationId);
export const addItem = (item) => addDocument('costs', item);
export const updateItem = (id, item) => updateDocument('costs', id, item);
export const deleteItem = (id) => deleteDocument('costs', id);