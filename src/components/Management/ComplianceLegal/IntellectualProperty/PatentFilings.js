export const fieldsConfig = {
    patentId: { label: 'Patent ID', type: 'text', faker: 'datatype.uuid' },
    inventionName: { label: 'Invention Name', type: 'text', faker: 'company.catchPhrase' },
    filingDate: { label: 'Filing Date', type: 'date', faker: 'date.past' },
    approvalDate: { label: 'Approval Date', type: 'date', faker: 'date.future' },
    status: {
        label: 'Status',
        type: 'select',
        options: [
            { id: 'pending', label: 'Pending' },
            { id: 'approved', label: 'Approved' },
            { id: 'rejected', label: 'Rejected' },
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
    inventorName: { label: 'Inventor Name', type: 'text', faker: 'name.fullName' },
    notes: { label: 'Notes', type: 'text', multiline: true, rows: 4, faker: 'lorem.paragraph' },
    createdBy: { label: 'Created By', type: 'text', faker: 'name.fullName' },
    lastModifiedBy: { label: 'Last Modified By', type: 'text', faker: 'name.fullName' },
    createdDate: { label: 'Created Date', type: 'date', faker: 'date.past' },
    lastModifiedDate: { label: 'Last Modified Date', type: 'date', faker: 'date.recent' },
};

export const entityName = 'Patent Filings';
export const collectionName = 'patent-filings';