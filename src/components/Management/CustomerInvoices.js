import {
  fetchDocuments,
  addDocument,
  updateDocument,
  deleteDocument,
  fetchDocumentsBySelectValue,
  fetchDocumentsByFieldValue,
  fetchDocumentById
} from '../../utils/firebaseCrudHelpers';

import industries from '../../data/industries';

export const fieldsConfig = {
  invoiceId: { label: 'Invoice ID', type: 'text', faker: 'datatype.uuid' },
  invoiceName: { label: 'Invoice Name', type: 'text', faker: 'company.name' },
  customerDetails: { label: 'Customer Details', type: 'text', faker: 'company.name' },
  issuedAt: { label: 'Issued At', type: 'date', faker: 'date.past' },
  serviceProductDescription: { label: 'Service/Product Description', type: 'text', faker: 'commerce.productDescription' },
  quantity: { label: 'Quantity', type: 'number', faker: 'datatype.number' },
  unitPrice: { label: 'Unit Price', type: 'number', faker: 'finance.amount' },
  totalAmountExclVAT: { label: 'Total Amount (Excl. VAT)', type: 'number', faker: 'finance.amount' },
  vatRate: { label: 'VAT Rate', type: 'number', faker: 'finance.vatRate' },
  totalAmountInclVAT: { label: 'Total Amount (Incl. VAT)', type: 'number', faker: 'finance.amount' },
  paymentTerms: { label: 'Payment Terms', type: 'text', faker: 'finance.transactionType' },
  preferredCurrency: { label: 'Preferred Currency', type: 'text', faker: 'finance.currencyCode' },
  discountRate: { label: 'Discount Rate', type: 'number', faker: 'datatype.float' },
  contactName: { label: 'Contact Name', type: 'text', faker: 'name.fullName' },
  contactEmail: { label: 'Contact Email', type: 'email', faker: 'internet.email' },
  contactPhone: { label: 'Contact Phone', type: 'tel', faker: 'phone.imei' },
  dueDate: { label: 'Due Date', type: 'date', faker: 'date.future' },
  notes: { label: 'Notes', type: 'text', multiline: true, rows: 4, faker: 'lorem.paragraph' }
};

export const headCells = Object.keys(fieldsConfig).map(key => ({
  id: key,
  label: fieldsConfig[key].label,
}));


export const entityName = 'Customer Invoices';

export const fetchItems = () => fetchDocuments('customer-invoices');
export const addItem = (item) => addDocument('customer-invoices', item);
export const updateItem = (id, item) => updateDocument('customer-invoices', id, item);
export const deleteItem = (id) => deleteDocument('customer-invoices', id);

export async function fetchItemById(id) {
  return await fetchDocumentById('customer-invoices', id);
}

