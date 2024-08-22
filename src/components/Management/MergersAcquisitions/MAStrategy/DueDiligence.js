export const fieldsConfig = {
    dueDiligenceId: { label: 'Due Diligence ID', type: 'text', faker: 'datatype.uuid' },
    targetId: { label: 'Target ID', type: 'text', faker: 'datatype.uuid' },
    companyName: { label: 'Company Name', type: 'text', faker: 'company.name' },
    financialReview: { label: 'Financial Review', type: 'text', faker: 'lorem.paragraph' },
    legalReview: { label: 'Legal Review', type: 'text', faker: 'lorem.paragraph' },
    operationalReview: { label: 'Operational Review', type: 'text', faker: 'lorem.paragraph' },
    riskAssessment: { label: 'Risk Assessment', type: 'text', faker: 'lorem.paragraph' },
    findings: { label: 'Findings', type: 'text', faker: 'lorem.paragraph' },
    conductedBy: { label: 'Conducted By', type: 'text', faker: 'name.fullName' },
    startDate: { label: 'Start Date', type: 'date', faker: 'date.past' },
    endDate: { label: 'End Date', type: 'date', faker: 'date.past' },
    status: {
        label: 'Status',
        type: 'select',
        options: [
            { id: 'in-progress', label: 'In Progress' },
            { id: 'completed', label: 'Completed' },
            { id: 'on-hold', label: 'On Hold' },
        ],
        faker: 'random.arrayElement',
    },
    approvedBy: { label: 'Approved By', type: 'text', faker: 'name.fullName' },
    createdBy: { label: 'Created By', type: 'text', faker: 'name.fullName' },
    createdDate: { label: 'Created Date', type: 'date', faker: 'date.past' },
};

export const entityName = 'Due Diligence';
export const collectionName = 'due-diligence';
