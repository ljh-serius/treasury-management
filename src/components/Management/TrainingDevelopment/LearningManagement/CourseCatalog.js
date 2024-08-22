export const fieldsConfig = {
    courseId: { label: 'Course ID', type: 'text', faker: 'datatype.uuid' },
    courseTitle: { label: 'Course Title', type: 'text', faker: 'lorem.sentence' },
    description: { label: 'Description', type: 'text', faker: 'lorem.paragraph' },
    department: { label: 'Department', type: 'text', faker: 'company.bs' },
    instructor: { label: 'Instructor', type: 'text', faker: 'name.fullName' },
    duration: { label: 'Duration (hours)', type: 'number', faker: 'finance.amount' },
    startDate: { label: 'Start Date', type: 'date', faker: 'date.future' },
    endDate: { label: 'End Date', type: 'date', faker: 'date.future' },
    status: {
        label: 'Status',
        type: 'select',
        options: [
            { id: 'upcoming', label: 'Upcoming' },
            { id: 'ongoing', label: 'Ongoing' },
            { id: 'completed', label: 'Completed' },
        ],
        faker: 'random.arrayElement',
    },
    createdBy: { label: 'Created By', type: 'text', faker: 'name.fullName' },
    createdDate: { label: 'Created Date', type: 'date', faker: 'date.past' },
};

export const entityName = 'Course Catalog';
export const collectionName = 'course-catalog';
