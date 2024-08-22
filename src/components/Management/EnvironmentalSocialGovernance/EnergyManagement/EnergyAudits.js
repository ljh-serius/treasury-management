export const fieldsConfig = {
    auditId: { label: 'Audit ID', type: 'text', faker: 'datatype.uuid' },
    auditDate: { label: 'Audit Date', type: 'date', faker: 'date.past' },
    auditorName: { label: 'Auditor Name', type: 'text', faker: 'name.fullName' },
    auditScope: { label: 'Audit Scope', type: 'text', faker: 'lorem.paragraph' },
    findings: { label: 'Findings', type: 'text', faker: 'lorem.paragraph' },
    recommendations: { label: 'Recommendations', type: 'text', faker: 'lorem.paragraph' },
    createdBy: { label: 'Created By', type: 'text', faker: 'name.fullName' },
    createdDate: { label: 'Created Date', type: 'date', faker: 'date.past' },
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

export const entityName = 'Energy Audits';
export const collectionName = 'energy-audits';
