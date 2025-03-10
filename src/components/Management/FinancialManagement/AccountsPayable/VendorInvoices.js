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
    vatRate: { label: 'VAT Rate', type: 'number', faker: 'datatype.float' },
    vatAmount: { label: 'VAT Amount', type: 'number', faker: 'finance.amount' },  // For tracking VAT
    totalAmountInclVAT: { label: 'Total Amount (Incl. VAT)', type: 'number', faker: 'finance.amount' },
    paymentTerms: { label: 'Payment Terms', type: 'text', faker: 'finance.transactionType' },
    preferredCurrency: { label: 'Preferred Currency', type: 'text', faker: 'finance.currencyCode' },
    discountRate: { label: 'Discount Rate', type: 'number', faker: 'datatype.float' },
    vendorCode: { label: 'Vendor Code', type: 'text', faker: 'datatype.uuid' },
    taxExemptionStatus: { label: 'Tax Exemption Status', type: 'text', faker: 'random.word' },
    ecoContribution: { label: 'Eco Contribution', type: 'number', faker: 'finance.amount' },  // Eco-tax contribution field (French-specific)
    dueDate: { label: 'Due Date', type: 'date', faker: 'date.future' },  // Common requirement in France for invoicing
    latePaymentFee: { label: 'Late Payment Fee', type: 'number', faker: 'finance.amount' },  // Penalty for late payments
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

export const entityName = 'Vendor Invoices';
export const collectionName = 'vendor-invoices';
