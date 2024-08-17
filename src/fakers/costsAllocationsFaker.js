import { faker } from '@faker-js/faker';

export const generateRandomCostsAllocations = (employeeIds, productIds, partnerIds, providerIds) => {
  const getRandomElement = (arr) => faker.helpers.arrayElement(arr);

  return {
    cost: faker.finance.amount(1000, 100000, 2),
    description: faker.lorem.sentence(),
    productIds: [getRandomElement(productIds)],
    employeeIds: [getRandomElement(employeeIds)],
    projectIds: [getRandomElement(partnerIds)], 
    partnerIds: [getRandomElement(partnerIds)],
    providerIds: [getRandomElement(providerIds)],
    allocationDate: faker.date.past().toISOString().split('T')[0],
    allocationType: faker.lorem.word(),
    notes: faker.lorem.paragraph(),
    department: faker.commerce.department(),
    priority: getRandomElement(['High', 'Medium', 'Low']),
    status: getRandomElement(['Active', 'Inactive']),
    duration: faker.number.int({ min: 1, max: 24 }),
    currency: faker.finance.currencyCode(),
    approvedBy: faker.person.fullName(), // Ensure this is a string
    allocationCode: faker.string.uuid(),
    fundingSource: faker.company.name(),
    costCenter: faker.lorem.word(),
    budgetCode: faker.string.uuid(),
    financialYear: faker.number.int({ min: 2000, max: 2024 }),
    quarter: getRandomElement(['Q1', 'Q2', 'Q3', 'Q4']),
    allocationMethod: faker.finance.transactionType(),
    roiEstimate: faker.finance.amount(1, 100, 2),
    taxImplications: faker.lorem.sentence(),
    capexOrOpex: getRandomElement(['Capex', 'Opex']),
    riskAssessment: faker.lorem.sentence(),
    complianceStatus: getRandomElement(['Compliant', 'Non-compliant']),
    paymentTerms: faker.lorem.sentence(),
    invoiceNumber: faker.finance.account(),
    vatAmount: faker.finance.amount(100, 10000, 2),
    vatPercentage: faker.number.float({ min: 0, max: 25, precision: 0.01 }),
    discountApplied: faker.finance.amount(0, 5000, 2),
    totalCostAfterDiscount: faker.finance.amount(1000, 95000, 2),
    exchangeRate: faker.finance.amount(0.5, 1.5, 4),
    costAllocationFactor: faker.finance.amount(1, 10, 2),
    approvalStatus: getRandomElement(['Pending', 'Approved', 'Rejected']),
    auditTrail: faker.lorem.paragraph(),
  };
};
