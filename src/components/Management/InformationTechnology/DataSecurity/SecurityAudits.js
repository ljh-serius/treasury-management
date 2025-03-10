export const fieldsConfig = {
    auditId: { label: 'Audit ID', type: 'text', faker: 'datatype.uuid' },
    auditDate: { label: 'Audit Date', type: 'date', faker: 'date.past' },
    auditorName: { label: 'Auditor Name', type: 'text', faker: 'name.fullName' },
    findings: { label: 'Findings', type: 'text', faker: 'lorem.paragraph' },
    severityLevel: {
        label: 'Severity Level',
        type: 'select',
        options: [
            { id: 'low', label: 'Low' },
            { id: 'medium', label: 'Medium' },
            { id: 'high', label: 'High' },
            { id: 'critical', label: 'Critical' },
        ],
        faker: 'random.arrayElement',
    },
    remediationStatus: {
        label: 'Remediation Status',
        type: 'select',
        options: [
            { id: 'not-started', label: 'Not Started' },
            { id: 'in-progress', label: 'In Progress' },
            { id: 'completed', label: 'Completed' },
        ],
        faker: 'random.arrayElement',
    },
    tags: {
        label: 'Tags',
        type: 'select',
        options: [
            { id: 'security', label: 'Security' },
            { id: 'compliance', label: 'Compliance' },
            { id: 'audit', label: 'Audit' },
            { id: 'remediation', label: 'Remediation' },
        ],
        multiple: true,
        faker: 'lorem.words',
    },
    createdBy: { label: 'Created By', type: 'text', faker: 'name.fullName' },
    createdDate: { label: 'Created Date', type: 'date', faker: 'date.past' },
};

export const entityName = 'Security Audits';
export const collectionName = 'security-audits';
