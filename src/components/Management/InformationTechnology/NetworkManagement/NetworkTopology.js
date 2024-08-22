export const fieldsConfig = {
    topologyId: { label: 'Topology ID', type: 'text', faker: 'datatype.uuid' },
    networkName: { label: 'Network Name', type: 'text', faker: 'company.name' },
    topologyType: {
        label: 'Topology Type',
        type: 'select',
        options: [
            { id: 'star', label: 'Star' },
            { id: 'mesh', label: 'Mesh' },
            { id: 'bus', label: 'Bus' },
            { id: 'ring', label: 'Ring' },
        ],
        faker: 'random.arrayElement',
    },
    deviceCount: { label: 'Device Count', type: 'number', faker: 'finance.amount' },
    createdBy: { label: 'Created By', type: 'text', faker: 'name.fullName' },
    createdDate: { label: 'Created Date', type: 'date', faker: 'date.past' },
};

export const entityName = 'Network Topology';
export const collectionName = 'network-topology';
