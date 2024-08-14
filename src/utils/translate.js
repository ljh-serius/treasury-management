export const translate =  (key, lanauge) => {
  const french = {
    // General$
    "Switch Language": "Changer de langue",
    "Treasury Evolution Over Time" : "Évolution de la trésorerie à travers le temps",
    "Monthly Transction Heatmap": "Heatmap des transactions mensuelles",
    "Comparative Analytics": "Analyse comparative",
    "Select Books": "Sélectionnez les livres",
    "Select Months": "Sélectionnez les mois",
    "Global Annual": "Annuel global",
    "Book": "Livre",
    "Initial Balance": "Solde initial",
    "Total Receipts": "Encaissements totaux",
    "Total Disbursements": "Décaissements totaux",
    "Final Treasury": "Trésorerie finale",
    "Financial Overview": "Vue d'ensemble financière",
    "Receipts Breakdown": "Répartition des encaissements",
    "Disbursements Breakdown": "Répartition des décaissements",
    "Monthly Totals": "Totaux mensuels",
    "Monthly Transaction Heatmap": "Heatmap des transactions mensuelles",
    "Treasury Evolution Over Time": "Évolution de la trésorerie au fil du temps",
    "Accumulated Treasury": "Trésorerie Accumulée",
    "Treasury Balance": "Solde de Trésorerie",
    "Percentage of Treasury vs Receipts": "Percentage of Treasury vs Encaissements",
    "Percentage of Treasury vs Encaissements": "Pourcentage de (Trésororie vs Encaissements)",
    // Dashboard and Navigation
    "Transaction Books": "Livres de transactions",
    "Generate Random Summary": "Générer un résumé aléatoire",
    "Add New Summary": "Ajouter un nouveau résumé",
    "Analytics": "Analytique",
    "Units": "Unités",
    "Summary": "Résumé",
    "Logout": "Déconnexion",
    "Login": "Connexion",
    "Register": "S'inscrire",
    "Help Center": "Centre d'aide",
    "Privacy Policy": "Politique de confidentialité",
    "Follow Us": "Suivez-nous",
    
    // Forms and Buttons
    "Submit": "Soumettre",
    "Cancel": "Annuler",
    "Select Location": "Sélectionnez l'emplacement",
    "Select Store": "Sélectionnez le magasin",
    "Select Duration": "Sélectionnez la durée",
    "Justification": "Justification",
    "Provision Product": "Approvisionner le produit",
    "Request Another Intervention": "Demander une autre intervention",
    "Stop Scheduling Interventions": "Arrêter de planifier des interventions",
    "Stop Selling Product": "Arrêter de vendre le produit",
    "Export as Spreadsheet": "Exporter en tant que feuille de calcul",
    "Generate Units": "Générer des unités",
    "Generate SEPA XML for Expenses": "Générer un XML SEPA pour les dépenses",
    
    // Financial Terms
    "Initial Outflow Amount": "Montant initial de sortie",
    "Product Purchases": "Achats de produits",
    "Work Payments": "Paiements de travail",
    "Expenditure Overview": "Vue d'ensemble des dépenses",
    "Most Expensive Products": "Produits les plus chers",
    "Purchase Frequency Heatmap": "Heatmap de fréquence d'achat",
    "Product Purchase Trends": "Tendances d'achat de produits",
    "Initial Inflow Amount": "Montant initial d'entrée",
    "Product Sales": "Ventes de produits",
    "Work Earnings": "Gains de travail",
    "Revenue Overview": "Vue d'ensemble des revenus",
    "Most Profitable Products": "Produits les plus rentables",
    "Sales Heatmap": "Heatmap des ventes",
    "Product Sales Trends": "Tendances de vente de produits",

    // Table Headers
    "Type": "Type",
    "Nature of transaction": "Nature de la transaction",
    "Initial Balance": "Solde Initial",
    "Total": "Total",
    "Accumulated Treasury": "Trésorerie Accumulée",
    "Percentage of Treasury vs Receipts": "Percentage of Treasury vs Encaissements",

    // Specific for Units
    "Intervention Location": "Lieu d'intervention",
    "Hours Requested": "Heures demandées",
    "Status": "Statut",
    "Actions": "Actions",
    "Duration": "Durée",
    "Units": "Unités",
    "Store": "Magasin",
    "Requested": "Demandé",
    "Stop Duration": "Durée d'arrêt",
    "Call": "Appel",
    "Email": "Email",
    "Final Amount": "Montant final",
    "Purchase Date": "Date d'achat",
    "Notes": "Remarques",
    "Hourly Rate": "Taux horaire",
    "Hours Worked": "Heures travaillées",
    "Total Earnings": "Gains totaux",
    "Description": "Description",
    "Rate": "Taux",
    "Unit Price": "Prix unitaire",
    "Total Amount": "Montant total",
    "Category": "Catégorie",
    "Select Unit Type": "Sélectionnez le type d'unité",
    "Revenues": "Revenus",
    "Expenses": "Dépenses",
    "Generate": "Générer",
    "All Categories": "Toutes catégories",
    "All Types": "Tous les types",
    "Filter by Category": "Filtrer par catégorie",
    "Filter by Type": "Filtrer par type",
    "Filter by Month": "Filtrer par mois",
    "Filter by Year": "Filtrer par année",
    "January": "Janvier",
    "February": "Février",
    "March": "Mars",
    "April": "Avril",
    "May": "Mai",
    "June": "Juin",
    "July": "Juillet",
    "August": "Août",
    "September": "Septembre",
    "October": "Octobre",
    "November": "Novembre",
    "December": "Décembre",
    "Encaissements": "Encaissements",
    "Decaissements": "Décaissements",

    "Manage Users": "Gestion des utilisateurs",

    "Manage Organization": "Gestion de l'organization"
  };

  if(lanauge == 'fr') {
    return french[key];
  }
  
  return key; 
};
