export const fieldsConfig = {
    synergyId: { label: 'Synergy ID', type: 'text', faker: 'datatype.uuid' },
    integrationPlanId: { label: 'Integration Plan ID', type: 'text', faker: 'datatype.uuid' },
    targetId: { label: 'Target ID', type: 'text', faker: 'datatype.uuid' },
    expectedSynergies: { label: 'Expected Synergies', type: 'text', faker: 'lorem.sentences' },
    achievedSynergies: { label: 'Achieved Synergies', type: 'text', faker: 'lorem.sentences' },
    synergyValue: { label: 'Synergy Value', type: 'number', faker: 'finance.amount' },
    trackingDate: { label: 'Tracking Date', type: 'date', faker: 'date.past' },
    responsiblePerson: { label: 'Responsible Person', type: 'text', faker: 'name.fullName' },
    status: {
        label: 'Status',
        type: 'select',
        options: [
            { id: 'ongoing', label: 'Ongoing' },
            { id: 'achieved', label: 'Achieved' },
            { id: 'not-achieved', label: 'Not Achieved' },
        ],
        faker: 'random.arrayElement',
    },
    createdBy: { label: 'Created By', type: 'text', faker: 'name.fullName' },
    createdDate: { label: 'Created Date', type: 'date', faker: 'date.past' },
};

export const entityName = 'Synergy Tracking';
export const collectionName = 'synergy-tracking';
