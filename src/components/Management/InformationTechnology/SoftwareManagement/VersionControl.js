export const fieldsConfig = {
    versionControlId: { label: 'Version Control ID', type: 'text', faker: 'datatype.uuid' },
    repositoryName: { label: 'Repository Name', type: 'text', faker: 'company.name' },
    branchName: { label: 'Branch Name', type: 'text', faker: 'lorem.word' },
    commitId: { label: 'Commit ID', type: 'text', faker: 'datatype.uuid' },
    author: { label: 'Author', type: 'text', faker: 'name.fullName' },
    commitMessage: { label: 'Commit Message', type: 'text', faker: 'lorem.sentence' },
    commitDate: { label: 'Commit Date', type: 'date', faker: 'date.past' },
    createdBy: { label: 'Created By', type: 'text', faker: 'name.fullName' },
    createdDate: { label: 'Created Date', type: 'date', faker: 'date.past' },
};

export const entityName = 'Version Control';
export const collectionName = 'version-control';
