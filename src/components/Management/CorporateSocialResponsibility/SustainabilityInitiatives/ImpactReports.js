export const fieldsConfig = {
    reportId: { label: 'Report ID', type: 'text', faker: 'datatype.uuid' },
    reportTitle: { label: 'Report Title', type: 'text', faker: 'lorem.sentence' },
    description: { label: 'Description', type: 'text', faker: 'lorem.paragraph' },
    reportingPeriod: { label: 'Reporting Period', type: 'text', faker: 'date.past' },
    environmentalImpact: { label: 'Environmental Impact', type: 'text', faker: 'lorem.paragraph' },
    socialImpact: { label: 'Social Impact', type: 'text', faker: 'lorem.paragraph' },
    financialImpact: { label: 'Financial Impact', type: 'number', faker: 'finance.amount' },
    recommendations: { label: 'Recommendations', type: 'text', faker: 'lorem.sentences' },
    status: {
        label: 'Status',
        type: 'select',
        options: [
            { id: 'draft', label: 'Draft' },
            { id: 'final', label: 'Final' },
            { id: 'archived', label: 'Archived' },
        ],
        faker: 'random.arrayElement',
    },
    preparedBy: { label: 'Prepared By', type: 'text', faker: 'name.fullName' },
    approvedBy: { label: 'Approved By', type: 'text', faker: 'name.fullName' },
    createdBy: { label: 'Created By', type: 'text', faker: 'name.fullName' },
    createdDate: { label: 'Created Date', type: 'date', faker: 'date.past' },
};

export const entityName = 'Impact Reports';
export const collectionName = 'impact-reports';
