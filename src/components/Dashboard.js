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
    setAvailableTransactions(Object.keys(savedBooks));
  }, []);

  useEffect(() => {
    const savedBooks = JSON.parse(localStorage.getItem('books')) || {};
    setTransactions(savedBooks[transactionName] || JSON.parse(JSON.stringify(initialTransactions)));
  }, [transactionName]);

  const handleTransactionChange = (name) => {
    setTransactionName(name);
  };

  const handleNewTransaction = () => {
    const name = prompt('Enter name for new transaction set:');
    if (name) {
      const savedBooks = JSON.parse(localStorage.getItem('books')) || {};
      savedBooks[name] = JSON.parse(JSON.stringify(initialTransactions)); 
      localStorage.setItem('books', JSON.stringify(savedBooks));
      setAvailableTransactions([...availableTransactions, name]);
      setTransactionName(name);
      setTransactions(savedBooks[name]);
    }
  };

  const generateRandomTransactions = () => {
    if (!transactionName) {
      console.error('No transaction book is currently selected.');
      return;
    }
  
    const randomTransactions = {
      encaissements: Array.from({ length: 5 }, (_, i) => ({
        nature: `Encaissement ${i + 1}`,
        montantInitial: Math.floor(Math.random() * 1000), 
        montants: Array.from({ length: 12 }, () => Math.floor(Math.random() * 500)) 
      })),
      decaissements: Array.from({ length: 5 }, (_, i) => ({
        nature: `Décaissement ${i + 1}`,
        montantInitial: Math.floor(Math.random() * 1000),
        montants: Array.from({ length: 12 }, () => Math.floor(Math.random() * 500))
      }))
    };
  
    const savedBooks = JSON.parse(localStorage.getItem('books')) || {};
  
    savedBooks[transactionName] = randomTransactions;
  
    localStorage.setItem('books', JSON.stringify(savedBooks));
  
    setTransactions({ ...randomTransactions });
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
    setSnackbarMessage('');
  };

  const handleAddTransaction = (type) => {
    setNewTransactionType(type);
    setModalOpen(true);
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
      let existingTransaction = updatedTransactions[type]?.find(t => t.nature === name);
  
      if (existingTransaction) {
        // If the transaction already exists, update the relevant months
        initializeMonths(existingTransaction);
        months.forEach(monthIndex => {
          existingTransaction.montants[monthIndex] += amount;
        });
      } else {
        // If the transaction does not exist, create it
        const newTransaction = {
          nature: name,
          montantInitial: 0,
          montants: Array(12).fill(0)
        };
  
        months.forEach(monthIndex => {
          newTransaction.montants[monthIndex] = amount;
        });
  
        // Insert the new transaction before the "Total" line by adding it at the start of the array
        updatedTransactions[type] = [newTransaction, ...(updatedTransactions[type] || [])];
      }
    };
  
    processTransaction(newTransactionType, newTransactionName, newTransactionAmount, selectedMonths);
  
    // Update the state and save to localStorage
    setTransactions({ ...updatedTransactions });
    localStorage.setItem('books', JSON.stringify({ ...JSON.parse(localStorage.getItem('books')), [transactionName]: updatedTransactions }));
    
    // Close the modal
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
        transactionName={transactionName}
        handleAddTransaction={handleAddTransaction}
        generateRandomTransactions={generateRandomTransactions}
        handleTransactionChange={handleTransactionChange}
        handleNewTransaction={handleNewTransaction}
      />
      
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
        transactions={transactions}
      />

      <Container maxWidth="xl" sx={{ paddingTop: isMobile ? 3 : 12, paddingBottom: isMobile ? 7 : 0 }}>
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
