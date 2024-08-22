export const fieldsConfig = {
    dependencyId: { label: 'Dependency ID', type: 'text', faker: 'datatype.uuid' },
    milestoneId: { label: 'Milestone ID', type: 'text', faker: 'datatype.uuid' },
    dependentMilestoneId: { label: 'Dependent Milestone ID', type: 'text', faker: 'datatype.uuid' },
    relationshipType: {
      label: 'Relationship Type',
      type: 'select',
      options: [
        { id: 'finish-to-start', label: 'Finish to Start' },
        { id: 'start-to-start', label: 'Start to Start' },
        { id: 'finish-to-finish', label: 'Finish to Finish' },
        { id: 'start-to-finish', label: 'Start to Finish' },
      ],
      faker: 'random.arrayElement',
    },
    createdBy: { label: 'Created By', type: 'text', faker: 'name.fullName' },
    createdDate: { label: 'Created Date', type: 'date', faker: 'date.past' },
  };
  
      
export const entityName = 'Milestone Dependencies';
export const collectionName = 'milestone-dependencies';