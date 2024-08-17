import { faker, } from '@faker-js/faker';

import { costAllocationFieldConfig } from '../pages/CostAllocation';

export const generateRandomCostsAllocations = (
  employeeIds,
  productIds,
  partnerIds,
  providerIds,
  projectIds
) => {

  console.log('WHATS NEXT',[
    employeeIds,
    productIds,
    partnerIds,
    providerIds,
    projectIds
  ] )
  const getRandomElementId = (arr) => {
    if (!Array.isArray(arr) || arr.length === 0) return null; // Return null if input is invalid
    const randomIndex = Math.floor(Math.random() * arr.length); // Generate a random index
    const element = arr[randomIndex]; // Get the element at the random index
    return element && element.id ? element.id : null; // Return the id if it exists, otherwise return null
  };
  
  const getMultipleRandomElementIds = (arr) => {
    if (!Array.isArray(arr) || arr.length === 0) return []; // Return an empty array if input is invalid
  
    const randomCount = Math.floor(Math.random() * arr.length) + 1; // Random number between 1 and arr.length
    
    let result = [];
    for(let i = 0; i < randomCount; i++){
      result.push(getRandomElementId(arr));
    }

    return result;
  };
  

  return {
    cost: faker.finance.amount(),
    description: faker.lorem.sentence(),
    productIds: getMultipleRandomElementIds(productIds),
    employeeIds: getMultipleRandomElementIds(employeeIds),
    projectIds: getMultipleRandomElementIds(projectIds),
    partnerIds: getMultipleRandomElementIds(partnerIds),
    providerIds: getMultipleRandomElementIds(providerIds),
    allocationDate: faker.date.past().toISOString().split('T')[0],
    allocationType: getRandomElementId(costAllocationFieldConfig.allocationType.options),
    notes: faker.lorem.paragraph(),
    department: getRandomElementId(costAllocationFieldConfig.department.options),
    priority: getRandomElementId(costAllocationFieldConfig.priority.options),
    status: getRandomElementId(costAllocationFieldConfig.status.options),
    duration: faker.datatype.number({ min: 1, max: 12 }),
    currency: faker.finance.currencyCode(),
    approvedBy: faker.name.fullName(),
    allocationCode: faker.datatype.uuid(),
    fundingSource: faker.company.name(),
    costCenter: faker.commerce.department(),
    budgetCode: faker.finance.bic(),
    financialYear: faker.date.past().getFullYear(),
    quarter: getRandomElementId(costAllocationFieldConfig.quarter.options),
    allocationMethod: faker.lorem.word(),
    roiEstimate: faker.datatype.float({ min: 0, max: 100, precision: 0.01 }),
    taxImplications: faker.lorem.sentence(),
    capexOrOpex: getRandomElementId(costAllocationFieldConfig.capexOrOpex.options),
    riskAssessment: faker.lorem.sentence(),
    complianceStatus: getRandomElementId(costAllocationFieldConfig.complianceStatus.options),
    paymentTerms: faker.finance.transactionType(),
    invoiceNumber: faker.finance.account(),
    vatAmount: faker.datatype.float({ min: 0, max: 20, precision: 0.01 }),
    vatPercentage: faker.datatype.float({ min: 0, max: 20, precision: 0.01 }),
    discountApplied: faker.datatype.float({ min: 0, max: 50, precision: 0.01 }),
    totalCostAfterDiscount: faker.finance.amount(),
    exchangeRate: faker.datatype.float({ min: 0.5, max: 1.5, precision: 0.0001 }),
    costAllocationFactor: faker.datatype.float({ min: 0, max: 100, precision: 0.01 }),
    approvalStatus: getRandomElementId(costAllocationFieldConfig.approvalStatus.options),
    auditTrail: faker.lorem.paragraphs(2),
  };
};
