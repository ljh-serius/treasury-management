import {
    fetchDocuments,
    addDocument,
    updateDocument,
    deleteDocument,
    fetchDocumentsBySelectValue,
    fetchDocumentsByFieldValue,
    fetchDocumentById
} from '../../utils/firebaseCrudHelpers';

export const fieldsConfig = {
    costId: { label: 'Cost ID', type: 'text', faker: 'datatype.uuid' },
    costName: { label: 'Cost Name', type: 'text', faker: 'company.name' },
    cost: { label: 'Cost', type: 'number', faker: 'finance.amount' },
    description: { label: 'Description', type: 'text', faker: 'lorem.sentence' },
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
export const costsHeadCells = Object.keys(fieldsConfig).map(key => ({
    id: key,
    label: fieldsConfig[key].label,
}));

export const entityName = 'Costs';

export const fetchItems = () => fetchDocuments('costs');
export const addItem = (item) => addDocument('costs', item);
export const updateItem = (costId, item) => updateDocument('costs', costId, item);
export const deleteItem = (costId) => deleteDocument('costs', costId);

export async function fetchItemById(id) {
    return await fetchDocumentById('costs', id);
}
  