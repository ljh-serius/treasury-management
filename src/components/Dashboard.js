import React, { useState, useEffect } from 'react';
import TreasuryTable from './TreasuryTable';
import TransactionSelect from './TransactionSelect';
import { initialTransactions } from './transactionHelpers';
import { useTheme } from '@mui/material/styles';
import { AppBar, Toolbar, useMediaQuery, Typography, Grid, Snackbar, Container, Box, Menu, MenuItem, Button } from '@mui/material';
import { Add as AddIcon, Refresh as RefreshIcon } from '@mui/icons-material';
import BudgetSummary from './BudgetSummary'; 
import Header from './Header'; 
import AddTransactionModal from './AddTransactionModal'; 

const Dashboard = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const [transactions, setTransactions] = useState(() => {
    const savedBooks = JSON.parse(localStorage.getItem('books')) || {};
    return savedBooks['Main transaction book'] || JSON.parse(JSON.stringify(initialTransactions));
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

  // Load available transactions and the current transaction set
  useEffect(() => {
    const savedBooks = JSON.parse(localStorage.getItem('books')) || {};
    setAvailableTransactions(Object.keys(savedBooks));
  }, []);

  // Update transactions state when the transactionName changes
  useEffect(() => {
    const savedBooks = JSON.parse(localStorage.getItem('books')) || {};
    setTransactions(savedBooks[transactionName] || JSON.parse(JSON.stringify(initialTransactions)));
  }, [transactionName]);

  // Handle transaction selection change
  const handleTransactionChange = (name) => {
    setTransactionName(name);
  };

  // Handle creation of a new transaction set
  const handleNewTransaction = () => {
    const name = prompt('Enter name for new transaction set:');
    if (name) {
      const savedBooks = JSON.parse(localStorage.getItem('books')) || {};
      savedBooks[name] = JSON.parse(JSON.stringify(initialTransactions)); // Use deep copy to ensure fresh data
      localStorage.setItem('books', JSON.stringify(savedBooks));
      setAvailableTransactions([...availableTransactions, name]);
      setTransactionName(name);
      setTransactions(savedBooks[name]); // Set the new transaction set
    }
  };

  const generateRandomTransactions = () => {
    if (!transactionName) {
      console.error('No transaction book is currently selected.');
      return;
    }
  
    // Generate random transactions for the currently selected book
    const randomTransactions = {
      encaissements: Array.from({ length: 5 }, (_, i) => ({
        nature: `Encaissement ${i + 1}`,
        montantInitial: Math.floor(Math.random() * 1000), // Initial amount
        montants: Array.from({ length: 12 }, () => Math.floor(Math.random() * 500)) // Monthly amounts
      })),
      decaissements: Array.from({ length: 5 }, (_, i) => ({
        nature: `Décaissement ${i + 1}`,
        montantInitial: Math.floor(Math.random() * 1000), // Initial amount
        montants: Array.from({ length: 12 }, () => Math.floor(Math.random() * 500)) // Monthly amounts
      }))
    };
  
    // Retrieve existing books from localStorage
    const savedBooks = JSON.parse(localStorage.getItem('books')) || {};
  
    // Update the currently selected book with the generated data
    savedBooks[transactionName] = randomTransactions;
  
    // Save updated books back to localStorage
    localStorage.setItem('books', JSON.stringify(savedBooks));
  
    // Update the state to reflect the changes, ensuring a new object reference
    setTransactions({ ...randomTransactions });
  };
  
  // Handle snackbar close
  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
    setSnackbarMessage('');
  };

  // Handle Add Transaction menu actions
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
    const updatedTransactions = { ...transactions };

    const initializeMonths = (transaction) => {
        if (!transaction.montants) {
            transaction.montants = Array(12).fill(0);
        }
    };

    const processTransaction = (type, name, amount, months) => {
        const existingTransaction = updatedTransactions[type]?.find(t => t.nature === name);

        if (existingTransaction) {
            initializeMonths(existingTransaction);
            months.forEach(monthIndex => {
                existingTransaction.montants[monthIndex] = amount;
            });
        } else {
            const newTransaction = {
                nature: name,
                montantInitial: 0,
                montants: Array(12).fill(0)
            };

            months.forEach(monthIndex => {
                newTransaction.montants[monthIndex] = amount;
            });

            updatedTransactions[type] = [...(updatedTransactions[type] || []), newTransaction];
        }
    };

    processTransaction(newTransactionType, newTransactionName, newTransactionAmount, selectedMonths);
    setTransactions({ ...updatedTransactions }); // Ensure a new object reference
    handleModalClose();
  };

  const getRelevantTransactions = () => {
    if (transactions && transactions[newTransactionType]) {
      return transactions[newTransactionType].map(transaction => transaction.nature);
    }
    return [];
  };

  return (
    <Box sx={{ overflowX: 'hidden' }}>
      <Header
        isMobile={isMobile}
        handleAddClick={handleAddClick}
        generateRandomTransactions={generateRandomTransactions}
        transactionName={transactionName}
        availableTransactions={availableTransactions}
        handleTransactionChange={handleTransactionChange}
        handleNewTransaction={handleNewTransaction}
      />
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
            <BudgetSummary transactions={transactions} />
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
