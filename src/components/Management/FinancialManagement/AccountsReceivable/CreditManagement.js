import {
    fetchDocuments,
    addDocument,
    updateDocument,
    deleteDocument,
    fetchDocumentsBySelectValue,
    fetchDocumentsByFieldValue,
    fetchDocumentById
} from '../../../../utils/firebaseCrudHelpers';


export const fieldsConfig = {
    creditId: { label: 'Credit ID', type: 'text', faker: 'datatype.uuid' },
    customerId: { label: 'Customer ID', type: 'text', faker: 'datatype.uuid' },
    creditLimit: { label: 'Credit Limit', type: 'number', faker: 'finance.amount' },
    outstandingBalance: { label: 'Outstanding Balance', type: 'number', faker: 'finance.amount' },
    currency: {
        label: 'Currency',
        type: 'select',
        options: [],  // Populate with actual currency options
        faker: 'finance.currencyCode',
    },
    riskLevel: {
        label: 'Risk Level',
        type: 'select',
        options: [
            { id: 'low', label: 'Low' },
            { id: 'medium', label: 'Medium' },
            { id: 'high', label: 'High' },
        ],
        faker: 'random.arrayElement',
    },
    tags: {
        label: 'Tags',
        type: 'select',
        options: [],  // Populate with actual tags
        multiple: true,
        faker: 'lorem.words',
    },
    createdBy: { label: 'Created By', type: 'text', faker: 'name.fullName' },
    lastModifiedBy: { label: 'Last Modified By', type: 'text', faker: 'name.fullName' },
    createdDate: { label: 'Created Date', type: 'date', faker: 'date.past' },
    lastModifiedDate: { label: 'Last Modified Date', type: 'date', faker: 'date.recent' },
};

export const headCells = Object.keys(fieldsConfig).map(key => ({
    id: key,
    label: fieldsConfig[key].label,
}));


export const entityName = 'Credit Management';

export const fetchItems = () => fetchDocuments('credit-management');
export const addItem = (item) => addDocument('credit-management', item);
export const updateItem = (id, item) => updateDocument('credit-management', id, item);
export const deleteItem = (id) => deleteDocument('credit-management', id);

export async function fetchItemById(id) {
    return await fetchDocumentById('credit-management', id);
}

