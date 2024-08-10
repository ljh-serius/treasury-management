import React, { useState, useEffect } from 'react';
import TreasuryTable from './TreasuryTable';
import TransactionSelect from './TransactionSelect';
import { initialTransactions } from './transactionHelpers';
import TransactionActionsMenu from './TransactionActionsMenu';
import { AppBar, Toolbar, useMediaQuery, Typography, Grid, Fab, Snackbar, Container, Box, Menu, MenuItem } from '@mui/material';
import { useTheme, styled } from '@mui/material/styles';
import { Add as AddIcon } from '@mui/icons-material';
import BudgetSummary from './BudgetSummary'; 
import AddTransactionModal from './AddTransactionModal'; 

const StyledFab = styled(Fab)({
  position: 'absolute',
  zIndex: 1,
  right: 0,
  height: 36,
  width: 36,
  margin: '20px'
});

const Dashboard = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const [transactions, setTransactions] = useState(() => {
    const savedBooks = JSON.parse(localStorage.getItem('books')) || {};
    return savedBooks['Main transaction book'] || JSON.parse(JSON.stringify(initialTransactions)); // Provide a fresh copy of initialTransactions
  });

  const [transactionName, setTransactionName] = useState('Main transaction book');
  const [availableTransactions, setAvailableTransactions] = useState([]);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [menuAnchorEl, setMenuAnchorEl] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [newTransactionType, setNewTransactionType] = useState('');
  const [newTransactionName, setNewTransactionName] = useState('');
  const [newTransactionAmount, setNewTransactionAmount] = useState(0);
  const [selectedMonths, setSelectedMonths] = useState([]);

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June', 
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  useEffect(() => {
    const savedBooks = JSON.parse(localStorage.getItem('books')) || {};
    savedBooks[transactionName] = transactions;
    localStorage.setItem('books', JSON.stringify(savedBooks));
  }, [transactions, transactionName]);

  useEffect(() => {
    const savedBooks = JSON.parse(localStorage.getItem('books')) || {};
    setAvailableTransactions(Object.keys(savedBooks));
  }, []);

  const handleTransactionChange = (name) => {
    const savedBooks = JSON.parse(localStorage.getItem('books')) || {};
    setTransactionName(name);
    setTransactions(savedBooks[name] || JSON.parse(JSON.stringify(initialTransactions)));
  };

  const handleNewTransaction = () => {
    const name = prompt('Enter name for new transaction set:');
    if (name) {
      const savedBooks = JSON.parse(localStorage.getItem('books')) || {};
      savedBooks[name] = JSON.parse(JSON.stringify(initialTransactions)); // Use deep copy to ensure fresh data
      localStorage.setItem('books', JSON.stringify(savedBooks));
      setAvailableTransactions([...availableTransactions, name]);
      setTransactionName(name);
      setTransactions(JSON.parse(JSON.stringify(initialTransactions))); // Reset transactions to a fresh copy of initialTransactions
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
    setSnackbarMessage('');
  };

  const handleAddClick = (event) => {
    setMenuAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setMenuAnchorEl(null);
  };

  const openTransactionModal = (type) => {
    setNewTransactionType(type);
    setModalOpen(true);
  };

  const handleAddTransaction = (type) => {
    handleMenuClose();
    openTransactionModal(type);
  };

  const handleModalClose = () => {
    setModalOpen(false);
    setNewTransactionName('');
    setNewTransactionAmount(0);
    setSelectedMonths([]);
  };
  const handleModalSubmit = () => {
    // Ensure we have a fresh copy of the transactions state
    const updatedTransactions = { ...transactions };

    // Initialize all months if not already present
    const initializeMonths = (transaction) => {
        if (!transaction.montants) {
            transaction.montants = Array(12).fill(0);
        }
    };

    // Handle new or existing transaction
    const processTransaction = (type, name, amount, months) => {
        // Find if the transaction already exists
        const existingTransaction = updatedTransactions[type]?.find(t => t.nature === name);

        if (existingTransaction) {
            // Update the existing transaction's amount for selected months
            initializeMonths(existingTransaction);
            months.forEach(monthIndex => {
                existingTransaction.montants[monthIndex] = amount;
            });
        } else {
            // Create a new transaction entry
            const newTransaction = {
                nature: name,
                montantInitial: 0, // Or set an appropriate initial amount if required
                montants: Array(12).fill(0) // Initialize all months with zero
            };

            // Set the amount for the selected months
            months.forEach(monthIndex => {
                newTransaction.montants[monthIndex] = amount;
            });

            // Add the new transaction to the relevant type array
            updatedTransactions[type] = [...(updatedTransactions[type] || []), newTransaction];
        }
    };

    // Process the new transaction
    processTransaction(newTransactionType, newTransactionName, newTransactionAmount, selectedMonths);

    // Update the state with the newly updated transactions
    setTransactions(updatedTransactions);

    // Close the modal
    handleModalClose();
};


  const getRelevantTransactions = () => {
    if (transactions && transactions[newTransactionType]) {
      return transactions[newTransactionType].map(transaction => transaction.nature);
    }
    return []; // Return an empty array if transactions or newTransactionType is not defined
  };

  return (
    <Box sx={{ overflowX: 'hidden' }}>
      <AppBar position="fixed" color="primary" sx={{ top: isMobile ? 'auto' : 0, bottom: isMobile ? 0 : 'auto' }}>
        <Toolbar>
          <StyledFab color="secondary" aria-label="add" onClick={handleAddClick}>
            <AddIcon />
          </StyledFab>
          <TransactionSelect
            transactionName={transactionName}
            availableTransactions={availableTransactions}
            handleTransactionChange={handleTransactionChange}
            handleNewTransaction={handleNewTransaction}
          />
        </Toolbar>
      </AppBar>

      <Menu
        anchorEl={menuAnchorEl}
        open={Boolean(menuAnchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={() => handleAddTransaction('encaissements')}>Encaissements</MenuItem>
        <MenuItem onClick={() => handleAddTransaction('decaissements')}>Décaissements</MenuItem>
      </Menu>

      <AddTransactionModal
        modalOpen={modalOpen}
        handleModalClose={handleModalClose}
        newTransactionType={newTransactionType}
        newTransactionName={newTransactionName}
        setNewTransactionName={setNewTransactionName}
        availableTransactions={getRelevantTransactions()}
        newTransactionAmount={newTransactionAmount}
        setNewTransactionAmount={setNewTransactionAmount}
        selectedMonths={selectedMonths}
        setSelectedMonths={setSelectedMonths}
        handleModalSubmit={handleModalSubmit}
        monthNames={monthNames}
        transactions={transactions} // Pass the transactions prop
      />

      <Container maxWidth="xl" sx={{ paddingTop: isMobile ? 3 : 10, paddingBottom: isMobile ? 7 : 0, maxWidth: '100%' }}>
        <Typography variant="h4" align="left" gutterBottom>
          {transactionName}
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <BudgetSummary transactions={transactions}></BudgetSummary>
          </Grid>
          <Grid item xs={12} style={{ margin: '0 auto' }}>
            <TreasuryTable
              transactions={transactions}
              setTransactions={setTransactions}
              transactionName={transactionName}
              setSnackbarMessage={setSnackbarMessage}
              setSnackbarOpen={setSnackbarOpen}
            />
          </Grid>
        </Grid>
      </Container>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        message={snackbarMessage}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      />
    </Box>
  );
};

export default Dashboard;
