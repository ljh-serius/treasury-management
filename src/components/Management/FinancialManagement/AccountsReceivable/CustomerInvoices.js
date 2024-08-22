export const fieldsConfig = {
  invoiceId: { label: 'Invoice ID', type: 'text', faker: 'datatype.uuid' },
  invoiceName: { label: 'Invoice Name', type: 'text', faker: 'company.name' },
  customerDetails: { label: 'Customer Details', type: 'text', faker: 'company.name' },
  issuedAt: { label: 'Issued At', type: 'date', faker: 'date.past' },
  serviceProductDescription: { label: 'Service/Product Description', type: 'text', faker: 'commerce.productDescription' },
  quantity: { label: 'Quantity', type: 'number', faker: 'datatype.number' },
  unitPrice: { label: 'Unit Price', type: 'number', faker: 'finance.amount' },
  totalAmountExclVAT: { label: 'Total Amount (Excl. VAT)', type: 'number', faker: 'finance.amount' },
  vatRate: { label: 'VAT Rate', type: 'number', faker: 'datatype.number' },
  totalAmountInclVAT: { label: 'Total Amount (Incl. VAT)', type: 'number', faker: 'finance.amount' },
  paymentTerms: { label: 'Payment Terms', type: 'text', faker: 'finance.transactionType' },
  preferredCurrency: { label: 'Preferred Currency', type: 'text', faker: 'finance.currencyCode' },
  discountRate: { label: 'Discount Rate', type: 'number', faker: 'datatype.float' },
  contactName: { label: 'Contact Name', type: 'text', faker: 'name.fullName' },
  contactEmail: { label: 'Contact Email', type: 'email', faker: 'internet.email' },
  contactPhone: { label: 'Contact Phone', type: 'tel', faker: 'phone.imei' },
  dueDate: { label: 'Due Date', type: 'date', faker: 'date.future' },
  notes: { label: 'Notes', type: 'text', multiline: true, rows: 4, faker: 'lorem.paragraph' },
  tags: {
    label: 'Tags',
    type: 'select',
    options: [
        { id: 'urgent', label: 'Urgent' },
        { id: 'review', label: 'Review' },
        { id: 'important', label: 'Important' },
        { id: 'completed', label: 'Completed' },
        { id: 'follow-up', label: 'Follow-Up' },
    ],
    multiple: true,
    faker: 'random.arrayElement',
},
};

export const headCells = Object.keys(fieldsConfig).map(key => ({
  id: key,
  label: fieldsConfig[key].label,
}));


export const entityName = 'Customer Invoices';

export const collectionName = 'customer-invoices';

