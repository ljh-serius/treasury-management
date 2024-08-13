const article2_en = `# Quick overview of our software

### Home Page - '/'

#### Overview:
The Home Page serves as the central hub of the application, providing an overview of your financial transactions and offering quick access to various functionalities within the system. Upon logging in, users are directed to this dashboard where they can view summaries of their financial data, navigate to specific sections, and perform various tasks.

#### Key Functionalities:
- **Dashboard Overview:** Get a quick glance at your overall financial status, including balance summaries, recent transactions, and notifications.
- **Quick Navigation:** Access different sections of the application, such as Transaction Books, Analytics, and the Blog, through the navigation panel.
- **Customization:** Customize the layout and display of your dashboard elements according to your preferences.
- **Notifications and Updates:** View recent updates or notifications related to your account and transactions.

#### User Scenarios:
- **Scenario 1: Reviewing the Dashboard Overview**
  - Upon accessing the Home Page, the user sees a summary of their financial data, including balances, recent transactions, and key metrics.
  - The user can click on any of these metrics to navigate to a more detailed view of that data.

- **Scenario 2: Navigating to Other Sections**
  - From the Home Page, the user can use the navigation panel to access Transaction Books, Analytics, the Blog, and other features.

- **Scenario 3: Customizing the Dashboard**
  - The user decides to rearrange or customize the widgets on the dashboard to better suit their needs. They can drag and drop elements, add new widgets, or remove existing ones.

---

### Transaction Books - '/books'

#### Overview:
The Transaction Books page is where users manage their financial records. This section allows users to create, view, and manage multiple transaction books, each containing detailed records of transactions categorized by nature, such as income and expenses.

#### Key Functionalities:
- **View Transaction Books:** Access a list of all your transaction books. Each book contains detailed transaction records.
- **Add New Transaction Book:** Create new transaction books to organize your financial data better.
- **Edit Transactions:** Modify existing transaction records to ensure accuracy.
- **Generate Random Transactions:** Populate transaction books with random data for testing or exploratory purposes.
- **Detailed View:** Dive into specific transaction books to review or manage individual transactions.
- **Add Transactions:** Add new transactions to any of your books, specifying details like transaction type, amount, and applicable months.

#### User Scenarios:
- **Scenario 1: Viewing and Managing Transaction Books**
  - The user navigates to the Transaction Books page and views all their transaction books listed.
  - They click on a specific book to see all transactions within it.

- **Scenario 2: Creating a New Transaction Book**
  - The user clicks on the "Add New Transaction Book" button, names the book, and starts populating it with transactions.

- **Scenario 3: Editing Existing Transactions**
  - The user selects a transaction to update its details, such as correcting an amount or changing the nature of the transaction.

- **Scenario 4: Adding New Transactions**
  - The user adds a new transaction by selecting the book, entering details like the transaction type (income or expense), the amount, and the relevant months.

- **Scenario 5: Generating Random Transactions**
  - The user opts to generate random transactions for a selected book, allowing them to quickly populate it with data for analysis or testing.

---

### Analytics - '/comparatives'

#### Overview:
The Analytics page provides a detailed comparative analysis of your financial data across different transaction books. Users can visualize trends, compare budgets, and generate insightful reports based on their transaction history.

#### Key Functionalities:
- **Comparative Analysis:** Compare financial data across different transaction books, including initial balances, total income, total expenses, and final treasury amounts.
- **Graphical Insights:** View and interact with charts and graphs that visualize your financial data, including bar charts, line graphs, pie charts, and heatmaps.
- **Customizable Views:** Select which transaction books and months you want to include in the analysis.
- **Export Data:** Export the analyzed data and visualizations for external use, such as in presentations or reports.

#### User Scenarios:
- **Scenario 1: Viewing Comparative Analysis**
  - The user selects multiple transaction books to compare. The system displays a summary comparison of key metrics like initial balance, total income, and final treasury.

- **Scenario 2: Customizing Chart Displays**
  - The user selects specific months or books to be included in the analysis, refining the displayed data in the charts.

- **Scenario 3: Exploring Different Charts**
  - The user switches between various types of charts—bar, line, pie, and heatmap—to explore different aspects of their financial data.

- **Scenario 4: Exporting Analytical Data**
  - The user exports the analysis results as a spreadsheet or image file for further use in external tools or presentations.

---

### Transaction Details - '/details'

#### Overview:
The Transaction Details page allows users to dive deep into the specifics of individual transactions. This page provides a detailed breakdown of transactions, including individual items, work units, and other subcomponents.

#### Key Functionalities:
- **Detailed Transaction Breakdown:** View a detailed analysis of a selected transaction, including product units, work units, and other financial details.
- **Edit Transaction Details:** Modify the components of a transaction, such as changing the quantity of items or adjusting rates for work units.
- **View Graphs and Trends:** Visualize the detailed transaction data in various chart formats to identify patterns or trends.

#### User Scenarios:
- **Scenario 1: Reviewing Detailed Transaction Information**
  - The user selects a transaction to view its detailed breakdown, including individual items and work units.

- **Scenario 2: Editing a Transaction**
  - The user edits a specific component of the transaction, such as updating the price of a product or changing the hours worked.

- **Scenario 3: Viewing Trends and Patterns**
  - The user views charts that display trends and patterns in the transaction data, such as changes in costs over time or product profitability.`;
  
export default article2_en;