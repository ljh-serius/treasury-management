export const fieldsConfig = {
    reportId: { label: 'Report ID', type: 'text', faker: 'datatype.uuid' },
    reportName: { label: 'Report Name', type: 'text', faker: 'company.bs' },
    reportDate: { label: 'Report Date', type: 'date', faker: 'date.past' },
    status: {
        label: 'Status',
        type: 'select',
        options: [
            { id: 'draft', label: 'Draft' },
            { id: 'submitted', label: 'Submitted' },
            { id: 'approved', label: 'Approved' },
        ],
        faker: 'random.arrayElement',
    },
    findings: { label: 'Findings', type: 'text', faker: 'lorem.paragraph' },
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
    createdBy: { label: 'Created By', type: 'text', faker: 'name.fullName' },
    lastModifiedBy: { label: 'Last Modified By', type: 'text', faker: 'name.fullName' },
    createdDate: { label: 'Created Date', type: 'date', faker: 'date.past' },
    lastModifiedDate: { label: 'Last Modified Date', type: 'date', faker: 'date.recent' },
};

export const entityName = 'Compliance Reporting';
export const collectionName = 'compliance-reporting';
