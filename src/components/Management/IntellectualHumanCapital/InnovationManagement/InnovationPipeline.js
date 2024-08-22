export const fieldsConfig = {
    pipelineId: { label: 'Pipeline ID', type: 'text', faker: 'datatype.uuid' },
    ideaTitle: { label: 'Idea Title', type: 'text', faker: 'lorem.sentence' },
    stage: {
        label: 'Stage',
        type: 'select',
        options: [
            { id: 'idea-generation', label: 'Idea Generation' },
            { id: 'concept-development', label: 'Concept Development' },
            { id: 'prototype', label: 'Prototype' },
            { id: 'market-testing', label: 'Market Testing' },
            { id: 'commercialization', label: 'Commercialization' },
        ],
        faker: 'random.arrayElement',
    },
    assignedTo: { label: 'Assigned To', type: 'text', faker: 'name.fullName' },
    progressPercentage: { label: 'Progress (%)', type: 'number', faker: 'finance.amount' },
    expectedCompletionDate: { label: 'Expected Completion Date', type: 'date', faker: 'date.future' },
    createdBy: { label: 'Created By', type: 'text', faker: 'name.fullName' },
    createdDate: { label: 'Created Date', type: 'date', faker: 'date.past' },
};

export const entityName = 'Innovation Pipeline';
export const collectionName = 'innovation-pipeline';
