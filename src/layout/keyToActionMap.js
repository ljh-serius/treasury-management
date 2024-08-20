export const keyToActionMap = {
    // Financial Management
    "vendor-invoices": ["fetchItems", "addItem", "updateItem", "deleteItem", "validateAccordingToEULawDirective2010", "sendItemsByEmail", "exportItems", "importItems"],
    "payment-terms": ["fetchItems", "updateItem", "validateAccordingToEULawDirective2010"],
    "creditors-ledger": ["fetchItems", "generateLedgerReport", "validateAccordingToIFRS9"],
    "customer-invoices": ["fetchItems", "addItem", "updateItem", "deleteItem", "sendItemsByEmail", "validateAccordingToEULawDirective2010", "exportItems", "importItems"],
    "credit-management": ["fetchItems", "updateItem", "generateCreditScore", "validateAccordingToEULawDirective2010"],
    "debtor-aging": ["fetchItems", "generateAgingReport", "validateAccordingToIFRS9"],
    "journal-entries": ["fetchItems", "addItem", "updateItem", "deleteItem", "validateAccordingToIAS2"],
    "chart-of-accounts": ["fetchItems", "updateItem", "validateAccordingToIAS2"],
    "trial-balance": ["fetchItems", "generateTrialBalanceReport", "validateAccordingToIFRS"],
    "fiscal-periods": ["fetchItems", "updateItem", "validateAccordingToIAS1"],
    "reconciliation-statements": ["fetchItems", "addItem", "updateItem", "generateReconciliationReport", "validateAccordingToEULawDirective2013"],
    "bank-transfers": ["fetchItems", "addItem", "updateItem", "deleteItem", "generateTransferReport", "validateAccordingToSWIFTRegulations"],
    "foreign-currency-accounts": ["fetchItems", "addItem", "updateItem", "deleteItem", "validateAccordingToIFRS9"],
  
    // Operations and Asset Management
    "product-catalog": ["fetchItems", "addItem", "updateItem", "deleteItem", "validateProductDescriptionsAccordingToISO9001"],
    "pricing-management": ["fetchItems", "updateItem", "validateAccordingToEUCompetitionLaw"],
    "inventory": ["fetchItems", "updateItem", "generateInventoryReport", "validateStockLevelsAccordingToIAS2"],
    "assets": ["fetchItems", "addItem", "updateItem", "deleteItem", "validateDepreciationAccordingToIAS16"],
    "maintenance": ["fetchItems", "scheduleMaintenance", "updateMaintenanceRecords", "validateMaintenanceSchedulesAccordingToISO55000"],
    "supply-chain": ["fetchItems", "generateSupplyChainReport", "validateSupplyChainAccordingToISO28000"],
    "warehouses": ["fetchItems", "addItem", "updateItem", "deleteItem", "generateWarehouseLayoutReport", "validateAccordingToISO45001"],
    "quality-control": ["fetchItems", "addItem", "updateItem", "generateQualityReport", "validateAccordingToISO9001"],
  
    // Human Resources Management
    "employee-records": ["fetchItems", "addItem", "updateItem", "deleteItem", "validateAccordingToGDPR"],
    "work-contracts": ["fetchItems", "addItem", "updateItem", "deleteItem", "validateAccordingToEUEmploymentLaw"],
    "payroll": ["fetchItems", "addItem", "updateItem", "generatePayrollReport", "validateAccordingToEUEmploymentLaw"],
    "recruitment": ["fetchItems", "addItem", "updateItem", "deleteItem", "generateApplicantReport", "validateAccordingToGDPR"],
    "training": ["fetchItems", "addItem", "updateItem", "generateTrainingCompletionReport", "validateAccordingToISO30401"],
    "performance-reviews": ["fetchItems", "addItem", "updateItem", "generatePerformanceReviewReport", "validateAccordingToISO30414"],
    "attendance": ["fetchItems", "updateItem", "generateAttendanceReport", "validateAccordingToEUWorkingTimeDirective"],
    "health-safety": ["fetchItems", "addItem", "updateItem", "generateSafetyIncidentReport", "validateAccordingToISO45001"],
  
    // Compliance and Legal
    "contracts": ["fetchItems", "addItem", "updateItem", "deleteItem", "validateAccordingToContractLaw"],
    "regulatory-compliance": ["fetchItems", "generateComplianceAudit", "validateAccordingToISO19600"],
    "insurance": ["fetchItems", "addItem", "updateItem", "deleteItem", "generateClaimsReport", "validateAccordingToInsuranceRegulations"],
    "intellectual-property": ["fetchItems", "addItem", "updateItem", "deleteItem", "validateAccordingToTRIPSAgreement"],
    "disputes": ["fetchItems", "addItem", "updateItem", "deleteItem", "generateLegalDisputeReport", "validateAccordingToContractLaw"],
  
    // Sales and Marketing
    "clients-customers": ["fetchItems", "addItem", "updateItem", "deleteItem", "validateCustomerDataAccordingToGDPR"],
    "leads": ["fetchItems", "addItem", "updateItem", "generateLeadConversionReport", "validateLeadDataAccordingToGDPR"],
    "opportunities": ["fetchItems", "addItem", "updateItem", "generateOpportunityReport"],
    "campaigns": ["fetchItems", "addItem", "updateItem", "generateCampaignPerformanceReport", "validateMarketingCampaignsAccordingToEULaw"],
    "pricing": ["fetchItems", "updateItem", "validatePricingAccordingToEUCompetitionLaw"],
    "sales-orders": ["fetchItems", "addItem", "updateItem", "deleteItem", "generateSalesOrderReport", "validateAccordingToContractLaw"],
    "invoices": ["fetchItems", "addItem", "updateItem", "deleteItem", "sendItemsByEmail", "validateAccordingToEULawDirective2010", "exportItems", "importItems"],
  
    // Project and Task Management
    "projects": ["fetchItems", "addItem", "updateItem", "deleteItem", "generateProjectStatusReport", "validateProjectDocumentationAccordingToPMBOK"],
    "tasks": ["fetchItems", "addItem", "updateItem", "generateTaskCompletionReport", "validateAccordingToISO21500"],
    "milestones": ["fetchItems", "addItem", "updateItem", "generateMilestoneReport"],
    "timesheets": ["fetchItems", "addItem", "updateItem", "generateTimesheetReport", "validateAccordingToEUWorkingTimeDirective"],
  
    // Governance and Strategy
    "business-plans": ["fetchItems", "addItem", "updateItem", "generateBusinessPlanReport"],
    "corporate-governance": ["fetchItems", "addItem", "updateItem", "validateAccordingToOECDPrinciples"],
    "risk-management": ["fetchItems", "addItem", "updateItem", "generateRiskAssessmentReport", "validateAccordingToISO31000"],
    "audit-trails": ["fetchItems", "generateAuditTrailReport", "validateAccordingToISO27001"],
    "kpis-analytics": ["fetchItems", "generateKPIReport", "validateAccordingToISO30414"],
  
    // Logistics and Supply Chain
    "shipping": ["fetchItems", "addItem", "updateItem", "deleteItem", "generateShipmentTrackingReport", "validateShippingAccordingToIMORegulations"],
    "order-management": ["fetchItems", "addItem", "updateItem", "deleteItem", "generateOrderManagementReport", "validateOrderProcessingAccordingToEULaw"],
    "logistics-partners": ["fetchItems", "addItem", "updateItem", "generateLogisticsPerformanceReport", "validateAccordingToISO28000"],
    "procurement": ["fetchItems", "addItem", "updateItem", "deleteItem", "validateAccordingToEUProcurementLaw"],
    "supplier-contracts": ["fetchItems", "addItem", "updateItem", "deleteItem", "validateAccordingToContractLaw"],
  
    // Real Estate and Property Management
    "buildings": ["fetchItems", "addItem", "updateItem", "deleteItem", "generatePropertyReport", "validateAccordingToISO55001"],
    "facilities-management": ["fetchItems", "addItem", "updateItem", "generateFacilityManagementReport", "validateAccordingToISO41001"],
    "leases": ["fetchItems", "addItem", "updateItem", "deleteItem", "validateAccordingToContractLaw"],
  
    // Information Technology
    "it-assets": ["fetchItems", "addItem", "updateItem", "deleteItem", "generateITAssetReport", "validateAccordingToISO27001"],
    "data-security": ["fetchItems", "generateSecurityAudit", "validateAccordingToISO27001"],
    "network-management": ["fetchItems", "addItem", "updateItem", "generateNetworkReport", "validateAccordingToISO27001"],
    "software-management": ["fetchItems", "addItem", "updateItem", "deleteItem", "generateSoftwareManagementReport", "validateAccordingToISO90003"],
  
    // Customer Support
    "support-tickets": ["fetchItems", "addItem", "updateItem", "deleteItem", "generateTicketReport", "validateAccordingToISO10002"],
    "service-contracts": ["fetchItems", "addItem", "updateItem", "deleteItem", "validateAccordingToContractLaw"],
    "feedback": ["fetchItems", "addItem", "updateItem", "generateFeedbackReport", "validateAccordingToISO10004"],
  
    // Environmental and Social Governance
    "sustainability-reports": ["fetchItems", "generateSustainabilityReport", "validateAccordingToGRIStandards"],
    "community-engagement": ["fetchItems", "addItem", "updateItem", "generateCommunityEngagementReport"],
    "energy-management": ["fetchItems", "addItem", "updateItem", "generateEnergyReport", "validateAccordingToISO50001"],
  
    // Intellectual and Human Capital
    "knowledge-base": ["fetchItems", "addItem", "updateItem", "generateKnowledgeReport", "validateAccordingToISO30401"],
    "r-d-projects": ["fetchItems", "addItem", "updateItem", "generateR&DReport", "validateAccordingToISO9001"],
    "innovation-management": ["fetchItems", "addItem", "updateItem", "generateInnovationReport", "validateAccordingToISO56002"],
  
    // External Relationships
    "partners": ["fetchItems", "addItem", "updateItem", "generatePartnerCollaborationReport", "validateAccordingToContractLaw"],
    "vendor-management": ["fetchItems", "addItem", "updateItem", "generateVendorPerformanceReport", "validateAccordingToISO20400"],
    "stakeholder-management": ["fetchItems", "addItem", "updateItem", "generateStakeholderReport", "validateAccordingToISO26000"],
  
    // Legal and Compliance
    "legal-cases": ["fetchItems", "addItem", "updateItem", "deleteItem", "generateLegalCaseReport", "validateAccordingToInternationalLegalStandards"],
    "intellectual-property": ["fetchItems", "addItem", "updateItem", "deleteItem", "validateAccordingToTRIPSAgreement"],
    "compliance-obligations": ["fetchItems", "generateComplianceReport", "validateAccordingToISO19600"],
  
    // Corporate Communication
    "internal-communication": ["fetchItems", "addItem", "updateItem", "generateInternalCommunicationReport"],
    "external-communication": ["fetchItems", "addItem", "updateItem", "generateExternalCommunicationReport"],
    "crisis-management": ["fetchItems", "generateCrisisManagementReport", "validateAccordingToISO22301"],
  
    // Training and Development
    "learning-management": ["fetchItems", "addItem", "updateItem", "generateLearningReport", "validateAccordingToISO21001"],
    "skill-development": ["fetchItems", "addItem", "updateItem", "generateSkillAssessmentReport", "validateAccordingToISO30401"],
    "leadership-programs": ["fetchItems", "addItem", "updateItem", "generateLeadershipReport"],
  
    // Corporate Social Responsibility
    "sustainability-initiatives": ["fetchItems", "addItem", "updateItem", "generateSustainabilityReport", "validateAccordingToGRIStandards"],
    "community-outreach": ["fetchItems", "addItem", "updateItem", "generateCommunityOutreachReport"],
  
    // Mergers and Acquisitions
    "m-a-strategy": ["fetchItems", "addItem", "updateItem", "generateMAStrategyReport", "validateAccordingToOECDGuidelines"],
    "post-merger-integration": ["fetchItems", "addItem", "updateItem", "generatePostMergerReport"],
  
    // Crisis and Risk Management
    "risk-assessments": ["fetchItems", "generateRiskAssessmentReport", "validateAccordingToISO31000"],
    "crisis-management": ["fetchItems", "generateCrisisManagementReport", "validateAccordingToISO22301"],
    "business-continuity": ["fetchItems", "generateBusinessContinuityReport", "validateAccordingToISO22301"]
  };
  