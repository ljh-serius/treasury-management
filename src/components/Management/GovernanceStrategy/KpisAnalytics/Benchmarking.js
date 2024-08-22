export const fieldsConfig = {
    benchmarkId: { label: 'Benchmark ID', type: 'text', faker: 'datatype.uuid' },
    benchmarkName: { label: 'Benchmark Name', type: 'text', faker: 'company.bs' },
    benchmarkDescription: { label: 'Benchmark Description', type: 'text', multiline: true, rows: 4, faker: 'lorem.paragraph' },
    industryStandard: { label: 'Industry Standard', type: 'text', faker: 'company.bsBuzz' },
    companyPerformance: { label: 'Company Performance', type: 'text', faker: 'company.bsAdjective' },
    gapAnalysis: { label: 'Gap Analysis', type: 'text', multiline: true, rows: 4, faker: 'lorem.paragraph' },
    benchmarkDate: { label: 'Benchmark Date', type: 'date', faker: 'date.past' },
    tags: {
        label: 'Tags',
        type: 'select',
        options: [
            { id: 'urgent', label: 'Urgent' },
            { id: 'review', label: 'Review' },
            { id: 'important', label: 'Important' },
            { id: 'completed', label: 'Completed' },
            { id: 'follow-up', label: 'Follow-Up' },
        ],
        multiple: true,
        faker: 'random.arrayElement',
    },
    createdBy: { label: 'Created By', type: 'text', faker: 'name.fullName' },
    createdDate: { label: 'Created Date', type: 'date', faker: 'date.past' },
  };

  
    
export const entityName = 'Benchmarking';
export const collectionName = 'benchmarking'