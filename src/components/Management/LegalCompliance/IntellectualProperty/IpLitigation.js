export const fieldsConfig = {
    litigationId: { label: 'Litigation ID', type: 'text', faker: 'datatype.uuid' },
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
    court: { label: 'Court', type: 'text', faker: 'company.name' },
    judge: { label: 'Judge', type: 'text', faker: 'name.fullName' },
    startDate: { label: 'Start Date', type: 'date', faker: 'date.past' },
    status: {
        label: 'Status',
        type: 'select',
        options: [
            { id: 'pending', label: 'Pending' },
            { id: 'in-progress', label: 'In Progress' },
            { id: 'resolved', label: 'Resolved' },
        ],
        faker: 'random.arrayElement',
    },
    outcome: { label: 'Outcome', type: 'text', faker: 'lorem.sentence' },
    createdBy: { label: 'Created By', type: 'text', faker: 'name.fullName' },
    createdDate: { label: 'Created Date', type: 'date', faker: 'date.past' },
};

export const entityName = 'IP Litigation';
export const collectionName = 'ip-litigation';
