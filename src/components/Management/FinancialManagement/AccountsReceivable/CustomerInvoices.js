export const fieldsConfig = {
  invoiceId: { label: 'Invoice ID', type: 'text', faker: 'datatype.uuid' },
  invoiceName: { label: 'Invoice Name', type: 'text', faker: 'company.name' },
  customerDetails: { label: 'Customer Details', type: 'text', faker: 'company.name' },
  issuedAt: { label: 'Issued At', type: 'date', faker: 'date.past' },
  serviceProductDescription: { label: 'Service/Product Description', type: 'text', faker: 'commerce.productDescription' },
  quantity: { label: 'Quantity', type: 'number', faker: 'datatype.number' },
  unitPrice: { label: 'Unit Price', type: 'number', faker: 'finance.amount' },
  totalAmountExclVAT: { label: 'Total Amount (Excl. VAT)', type: 'number', faker: 'finance.amount' },
  vatRate: { label: 'VAT Rate', type: 'number', faker: 'datatype.float' },
  vatAmount: { label: 'VAT Amount', type: 'number', faker: 'finance.amount' },  // EU VAT Amount
  totalAmountInclVAT: { label: 'Total Amount (Incl. VAT)', type: 'number', faker: 'finance.amount' },
  paymentTerms: { label: 'Payment Terms', type: 'text', faker: 'finance.transactionType' },
  preferredCurrency: {
    label: 'Preferred Currency',
    type: 'select',
    options: [
      { id: 'USD', label: 'USD' },
      { id: 'EUR', label: 'EUR' },
      { id: 'GBP', label: 'GBP' },
      { id: 'JPY', label: 'JPY' },
      { id: 'AUD', label: 'AUD' },
    ],
    faker: 'finance.currencyCode',
  },
  discountRate: { label: 'Discount Rate', type: 'number', faker: 'datatype.float' },
  contactName: { label: 'Contact Name', type: 'text', faker: 'name.fullName' },
  contactEmail: { label: 'Contact Email', type: 'email', faker: 'internet.email' },
  contactPhone: { label: 'Contact Phone', type: 'tel', faker: 'phone.imei' },
  dueDate: { label: 'Due Date', type: 'date', faker: 'date.future' },
  latePaymentFee: { label: 'Late Payment Fee', type: 'number', faker: 'finance.amount' },  // Late payment penalty for EU compliance
  ecoContribution: { label: 'Eco Contribution', type: 'number', faker: 'finance.amount' },  // Eco-tax contribution (French-specific)
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

export const entityName = 'Customer Invoices';
export const collectionName = 'customer-invoices';

