import {
    fetchDocuments,
    addDocument,
    updateDocument,
    deleteDocument,
    fetchDocumentsBySelectValue,
    fetchDocumentsByFieldValue,
    fetchDocumentById
} from '../../../../utils/firebaseCrudHelpers';

import industries from '../../../../data/industries';

export const fieldsConfig = {
    accountId: { label: 'Account ID', type: 'text', faker: 'datatype.uuid' },
    accountName: { label: 'Account Name', type: 'text', faker: 'finance.accountName' },
    accountType: {
        label: 'Account Type',
        type: 'select',
        options: [
            { id: 'asset', label: 'Asset' },
            { id: 'liability', label: 'Liability' },
            { id: 'equity', label: 'Equity' },
            { id: 'revenue', label: 'Revenue' },
            { id: 'expense', label: 'Expense' },
        ],
        faker: 'random.arrayElement',
    },
    balance: { label: 'Balance', type: 'number', faker: 'finance.amount' },
    currency: {
        label: 'Currency',
        type: 'select',
        options: [],  // Populate with actual currency options
        faker: 'finance.currencyCode',
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


export const entityName = 'Chart Of Accounts';

export const collectionName = 'chart-of-accounts';

