export const fieldsConfig = {
    auditId: { label: 'Audit ID', type: 'text', faker: 'datatype.uuid' },
    auditName: { label: 'Audit Name', type: 'text', faker: 'company.bs' },
    auditScope: { label: 'Audit Scope', type: 'text', multiline: true, rows: 4, faker: 'lorem.paragraph' },
    auditDate: { label: 'Audit Date', type: 'date', faker: 'date.past' },
    findings: { label: 'Findings', type: 'text', multiline: true, rows: 4, faker: 'lorem.paragraph' },
    auditStatus: {
        label: 'Audit Status',
        type: 'select',
        options: [
            { id: 'completed', label: 'Completed' },
            { id: 'in-progress', label: 'In Progress' },
            { id: 'planned', label: 'Planned' },
        ],
        faker: 'random.arrayElement',
    },
    auditor: { label: 'Auditor', type: 'text', faker: 'name.fullName' },
    tags: {
        label: 'Tags',
        type: 'select',
        options: [],
        multiple: true,
        faker: 'lorem.words',
    },
    createdBy: { label: 'Created By', type: 'text', faker: 'name.fullName' },
    createdDate: { label: 'Created Date', type: 'date', faker: 'date.past' },
};

export const entityName = 'Internal Audits';
export const collectionName = 'internal-audits'