export const fieldsConfig = {
    forecastId: { label: 'Forecast ID', type: 'text', faker: 'datatype.uuid' },
    department: { label: 'Department', type: 'text', faker: 'commerce.department' },
    forecastAmount: { label: 'Forecast Amount', type: 'number', faker: 'finance.amount' },
    actualAmount: { label: 'Actual Amount', type: 'number', faker: 'finance.amount' },
    fiscalYear: { label: 'Fiscal Year', type: 'number', faker: 'date.past' },
    accuracyPercentage: { label: 'Accuracy Percentage', type: 'number', faker: 'datatype.float' },
    ecoContribution: { label: 'Eco Contribution', type: 'number', faker: 'finance.amount' },  // Eco-tax contribution (French-specific)
    variance: { label: 'Variance', type: 'number', faker: 'finance.amount' },  // Forecast vs actual variance
    status: {
        label: 'Status',
        type: 'select',
        options: [
            { id: 'accurate', label: 'Accurate' },
            { id: 'inaccurate', label: 'Inaccurate' },
        ],
        faker: 'random.arrayElement',
    },
    createdBy: { label: 'Created By', type: 'text', faker: 'name.fullName' },
    lastModifiedBy: { label: 'Last Modified By', type: 'text', faker: 'name.fullName' },
    createdDate: { label: 'Created Date', type: 'date', faker: 'date.past' },
    lastModifiedDate: { label: 'Last Modified Date', type: 'date', faker: 'date.recent' },
};

export const entityName = 'Forecasting';
export const collectionName = 'forecasting';
