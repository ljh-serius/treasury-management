export const fieldsConfig = {
    agreementId: { label: 'Agreement ID', type: 'text', faker: 'datatype.uuid' },
    partnerId: { label: 'Partner ID', type: 'text', faker: 'datatype.uuid' },
    startDate: { label: 'Start Date', type: 'date', faker: 'date.past' },
    endDate: { label: 'End Date', type: 'date', faker: 'date.future' },
    contractValue: { label: 'Contract Value', type: 'number', faker: 'finance.amount' },
    serviceDetails: { label: 'Service Details', type: 'text', faker: 'lorem.paragraph' },
    complianceStatus: {
        label: 'Compliance Status',
        type: 'select',
        options: [
            { id: 'compliant', label: 'Compliant' },
            { id: 'non-compliant', label: 'Non-Compliant' },
        ],
        faker: 'random.arrayElement',
    },
    createdBy: { label: 'Created By', type: 'text', faker: 'name.fullName' },
    createdDate: { label: 'Created Date', type: 'date', faker: 'date.past' },
};

export const entityName = 'Partner Agreements';
export const collectionName = 'partner-agreements';
