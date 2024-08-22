export const fieldsConfig = {
    patentId: { label: 'Patent ID', type: 'text', faker: 'datatype.uuid' },
    patentTitle: { label: 'Patent Title', type: 'text', faker: 'lorem.sentence' },
    inventorName: { label: 'Inventor Name', type: 'text', faker: 'name.fullName' },
    filingDate: { label: 'Filing Date', type: 'date', faker: 'date.past' },
    approvalDate: { label: 'Approval Date', type: 'date', faker: 'date.future' },
    expirationDate: { label: 'Expiration Date', type: 'date', faker: 'date.future' },
    status: {
        label: 'Status',
        type: 'select',
        options: [
            { id: 'filed', label: 'Filed' },
            { id: 'approved', label: 'Approved' },
            { id: 'rejected', label: 'Rejected' },
            { id: 'expired', label: 'Expired' },
        ],
        faker: 'random.arrayElement',
    },
    patentNumber: { label: 'Patent Number', type: 'text', faker: 'finance.amount' },
    createdBy: { label: 'Created By', type: 'text', faker: 'name.fullName' },
    createdDate: { label: 'Created Date', type: 'date', faker: 'date.past' },
};

export const entityName = 'Patent Management';
export const collectionName = 'patent-management';
