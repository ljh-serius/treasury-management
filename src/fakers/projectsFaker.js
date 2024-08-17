import { faker } from '@faker-js/faker';
import { projectFieldConfig } from '../components/ProjectsManagement';

const getRandomElementId = (arr) => {
  if (!Array.isArray(arr) || arr.length === 0) return null;
  const randomIndex = Math.floor(Math.random() * arr.length);
  const element = arr[randomIndex];
  return element && element.id ? element.id : null;
};

export const generateFakeProjectData = () => {
  return {
    name: faker.commerce.productName(),
    description: faker.lorem.paragraph(),
    startDate: faker.date.past().toISOString().split('T')[0],
    endDate: faker.date.future().toISOString().split('T')[0],
    status: getRandomElementId(projectFieldConfig.status.options),
    managerName: faker.name.fullName(),
    managerEmail: faker.internet.email(),
    teamMembers: faker.datatype.number({ min: 1, max: 50 }),
    budget: faker.datatype.number({ min: 1000, max: 1000000 }),
    priority: getRandomElementId(projectFieldConfig.priority.options),
    projectType: getRandomElementId(projectFieldConfig.projectType.options),
    clientName: getRandomElementId(projectFieldConfig.clientName.options),
    phase: getRandomElementId(projectFieldConfig.phase.options),
    progress: faker.datatype.number({ min: 0, max: 100 }),
    risks: faker.lorem.sentence(),
    lastUpdated: faker.date.recent().toISOString().split('T')[0],
    estimatedCompletion: faker.date.future().toISOString().split('T')[0],
    actualCompletion: faker.date.future().toISOString().split('T')[0],
    revenueGenerated: faker.datatype.number({ min: 5000, max: 10000000 }),
    dependencies: getRandomElementId(projectFieldConfig.dependencies.options),
    projectCategory: getRandomElementId(projectFieldConfig.projectCategory.options),
    resourceAllocation: faker.lorem.words(),
    technologyStack: getRandomElementId(projectFieldConfig.technologyStack.options),
    stakeholders: getRandomElementId(projectFieldConfig.stakeholders.options),
    complianceRequirements: faker.lorem.sentence(),
    riskMitigation: faker.lorem.sentence(),
    criticalPath: getRandomElementId(projectFieldConfig.criticalPath.options),
    milestones: faker.lorem.words(),
    KPIs: faker.lorem.words(),
    projectSponsor: getRandomElementId(projectFieldConfig.projectSponsor.options),
    businessImpact: getRandomElementId(projectFieldConfig.businessImpact.options),
    operatingCosts: faker.datatype.number({ min: 10000, max: 1000000 }),
    userStories: faker.lorem.sentences(),
    codeRepository: faker.internet.url(),
    documentation: faker.internet.url(),
  };
};
