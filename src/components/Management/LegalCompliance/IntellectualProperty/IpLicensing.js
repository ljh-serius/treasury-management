export const fieldsConfig = {
    licenseId: { label: 'License ID', type: 'text', faker: 'datatype.uuid' },
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
    licenseeName: { label: 'Licensee Name', type: 'text', faker: 'name.fullName' },
    licenseStartDate: { label: 'License Start Date', type: 'date', faker: 'date.past' },
    licenseEndDate: { label: 'License End Date', type: 'date', faker: 'date.future' },
    terms: { label: 'Terms', type: 'text', faker: 'lorem.paragraph' },
    status: {
        label: 'Status',
        type: 'select',
        options: [
            { id: 'active', label: 'Active' },
            { id: 'expired', label: 'Expired' },
            { id: 'terminated', label: 'Terminated' },
        ],
        faker: 'random.arrayElement',
    },
    createdBy: { label: 'Created By', type: 'text', faker: 'name.fullName' },
    createdDate: { label: 'Created Date', type: 'date', faker: 'date.past' },
};

export const entityName = 'IP Licensing';
export const collectionName = 'ip-licensing';
