export const fieldsConfig = {
    auditId: { label: 'Audit ID', type: 'text', faker: 'datatype.uuid' },
    auditDate: { label: 'Audit Date', type: 'date', faker: 'date.past' },
    auditorName: { label: 'Auditor Name', type: 'text', faker: 'name.fullName' },
    auditScope: { label: 'Audit Scope', type: 'text', faker: 'lorem.paragraph' },
    findings: { label: 'Findings', type: 'text', faker: 'lorem.paragraph' },
    recommendations: { label: 'Recommendations', type: 'text', faker: 'lorem.paragraph' },
    createdBy: { label: 'Created By', type: 'text', faker: 'name.fullName' },
    createdDate: { label: 'Created Date', type: 'date', faker: 'date.past' },
};

export const entityName = 'Energy Audits';
export const collectionName = 'energy-audits';
