export const fieldsConfig = {
    monitoringId: { label: 'Monitoring ID', type: 'text', faker: 'datatype.uuid' },
    ipType: {
        label: 'IP Type',
        type: 'select',
        options: [
            { id: 'patent', label: 'Patent' },
            { id: 'trademark', label: 'Trademark' },
            { id: 'copyright', label: 'Copyright' },
        ],
        faker: 'random.arrayElement',
    },
    assetName: { label: 'Asset Name', type: 'text', faker: 'company.bs' },
    registrationNumber: { label: 'Registration Number', type: 'text', faker: 'datatype.uuid' },
    jurisdiction: { label: 'Jurisdiction', type: 'text', faker: 'address.country' },
    monitoringDate: { label: 'Monitoring Date', type: 'date', faker: 'date.past' },
    findings: { label: 'Findings', type: 'text', faker: 'lorem.paragraph' },
    status: {
        label: 'Status',
        type: 'select',
        options: [
            { id: 'active', label: 'Active' },
            { id: 'inactive', label: 'Inactive' },
        ],
        faker: 'random.arrayElement',
    },
    createdBy: { label: 'Created By', type: 'text', faker: 'name.fullName' },
    createdDate: { label: 'Created Date', type: 'date', faker: 'date.past' },
};

export const entityName = 'IP Monitoring';
export const collectionName = 'ip-monitoring';
