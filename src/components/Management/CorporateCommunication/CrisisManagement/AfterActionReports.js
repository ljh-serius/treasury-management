export const fieldsConfig = {
    reportId: { label: 'Report ID', type: 'text', faker: 'datatype.uuid' },
    crisisId: { label: 'Crisis ID', type: 'text', faker: 'datatype.uuid' },
    reportTitle: { label: 'Report Title', type: 'text', faker: 'lorem.sentence' },
    findings: { label: 'Findings', type: 'text', faker: 'lorem.paragraphs' },
    recommendations: { label: 'Recommendations', type: 'text', faker: 'lorem.paragraphs' },
    reportDate: { label: 'Report Date', type: 'date', faker: 'date.past' },
    preparedBy: { label: 'Prepared By', type: 'text', faker: 'name.fullName' },
    approvedBy: { label: 'Approved By', type: 'text', faker: 'name.fullName' },
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
    createdBy: { label: 'Created By', type: 'text', faker: 'name.fullName' },
    createdDate: { label: 'Created Date', type: 'date', faker: 'date.past' },
};

export const entityName = 'After-Action Reports';
export const collectionName = 'after-action-reports';
