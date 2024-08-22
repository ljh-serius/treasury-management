export const fieldsConfig = {
    assessmentId: { label: 'Assessment ID', type: 'text', faker: 'datatype.uuid' },
    employeeId: { label: 'Employee ID', type: 'text', faker: 'datatype.uuid' },
    skillName: { label: 'Skill Name', type: 'text', faker: 'lorem.word' },
    assessmentDate: { label: 'Assessment Date', type: 'date', faker: 'date.past' },
    score: { label: 'Score', type: 'number', faker: 'finance.amount' },
    proficiencyLevel: {
        label: 'Proficiency Level',
        type: 'select',
        options: [
            { id: 'beginner', label: 'Beginner' },
            { id: 'intermediate', label: 'Intermediate' },
            { id: 'advanced', label: 'Advanced' },
        ],
        faker: 'random.arrayElement',
    },
    assessor: { label: 'Assessor', type: 'text', faker: 'name.fullName' },
    createdBy: { label: 'Created By', type: 'text', faker: 'name.fullName' },
    createdDate: { label: 'Created Date', type: 'date', faker: 'date.past' },
};

export const entityName = 'Skill Assessments';
export const collectionName = 'skill-assessments';
