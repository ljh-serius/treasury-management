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
    invoiceId: { label: 'Invoice ID', type: 'text', faker: 'datatype.uuid' },
    providerDetails: { label: 'Provider Details', type: 'text', faker: 'company.name' },
    providerInvoiceNumber: { label: 'Provider Invoice Number', type: 'text', faker: 'datatype.uuid' },
    issuedAt: { label: 'Issued At', type: 'date', faker: 'date.past' },
    receivedAt: { label: 'Received At', type: 'date', faker: 'date.past' },
    serviceProductDescription: { label: 'Service/Product Description', type: 'text', faker: 'commerce.productDescription' },
    quantity: { label: 'Quantity', type: 'number', faker: 'datatype.number' },
    unitPrice: { label: 'Unit Price', type: 'number', faker: 'finance.amount' },
    totalAmountExclVAT: { label: 'Total Amount (Excl. VAT)', type: 'number', faker: 'finance.amount' },
    vatRate: { label: 'VAT Rate', type: 'number', faker: 'finance.vatRate' },
    totalAmountInclVAT: { label: 'Total Amount (Incl. VAT)', type: 'number', faker: 'finance.amount' },
    paymentTerms: { label: 'Payment Terms', type: 'text', faker: 'finance.transactionType' },
    preferredCurrency: { label: 'Preferred Currency', type: 'text', faker: 'finance.currencyCode' },
    discountRate: { label: 'Discount Rate', type: 'number', faker: 'datatype.float' },
    vendorCode: { label: 'Vendor Code', type: 'text', faker: 'datatype.uuid' },
    taxExemptionStatus: { label: 'Tax Exemption Status', type: 'text', faker: 'random.word' },
    notes: { label: 'Notes', type: 'text', multiline: true, rows: 4, faker: 'lorem.paragraph' }
};

export const headCells = Object.keys(fieldsConfig).map(key => ({
    id: key,
    label: fieldsConfig[key].label,
}));

export const entityName = 'Vendor Invoices';

export const fetchItems = () => fetchDocuments('vendor-invoices');
export const addItem = (item) => addDocument('vendor-invoices', item);
export const updateItem = (id, item) => updateDocument('vendor-invoices', id, item);
export const deleteItem = (id) => deleteDocument('vendor-invoices', id);

export async function fetchItemById(id) {
    return await fetchDocumentById('vendor-invoices', id);
}
