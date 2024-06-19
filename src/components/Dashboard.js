import React, { useState, useEffect } from 'react';
import { Typography, Grid, Snackbar } from '@mui/material';
import TreasuryTable from './TreasuryTable';
import TransactionSelect from './TransactionSelect';
import { initialTransactions, calculateTotals } from './transactionHelpers';

const Dashboard = () => {
  const [transactions, setTransactions] = useState(() => {
    const savedTransactions = localStorage.getItem('currentTransaction');
    return savedTransactions ? JSON.parse(savedTransactions) : initialTransactions;
  });
  const [transactionName, setTransactionName] = useState('currentTransaction');
  const [availableTransactions, setAvailableTransactions] = useState([]);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  useEffect(() => {
    const updatedTransactions = calculateTotals(transactions);
    localStorage.setItem(transactionName, JSON.stringify(updatedTransactions));
  }, [transactions, transactionName]);

  useEffect(() => {
    const keys = Object.keys(localStorage);
    setAvailableTransactions(keys);
  }, []);

  const handleTransactionChange = (name) => {
    setTransactionName(name);
    const savedTransactions = localStorage.getItem(name);
    if (savedTransactions) {
      setTransactions(JSON.parse(savedTransactions));
    } else {
      setTransactions(initialTransactions);
    }
  };

  const handleNewTransaction = () => {
    const name = prompt('Enter name for new transaction set:');
    if (name) {
      localStorage.setItem(name, JSON.stringify(initialTransactions));
      setAvailableTransactions([...availableTransactions, name]);
      setTransactionName(name);
      setTransactions(initialTransactions);
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
    setSnackbarMessage('');
  };

  return (
    <div>
      <Typography variant="h4" align="center" gutterBottom>
        Dashboard
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TransactionSelect
            transactionName={transactionName}
            availableTransactions={availableTransactions}
            handleTransactionChange={handleTransactionChange}
            handleNewTransaction={handleNewTransaction}
          />
        </Grid>
        <Grid item xs={12}>
          <TreasuryTable
            transactions={transactions}
            setTransactions={setTransactions}
            transactionName={transactionName}
            setSnackbarMessage={setSnackbarMessage}
            setSnackbarOpen={setSnackbarOpen}
          />
        </Grid>
      </Grid>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        message={snackbarMessage}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      />
    </div>
  );
};

export default Dashboard;
