import React, { useState, useEffect } from 'react';
import TreasuryTable from './TreasuryTable';
import BudgetSummary from './BudgetSummary';
import Snackbar from '@mui/material/Snackbar';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import { initialTransactions } from './transactionHelpers';

const TransactionBooks = ({ transactionName }) => {
  const [transactions, setTransactions] = useState(() => {
    const savedBooks = JSON.parse(localStorage.getItem('books')) || {};
    return savedBooks[transactionName] || JSON.parse(JSON.stringify(initialTransactions));
  });

  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  useEffect(() => {
    const savedBooks = JSON.parse(localStorage.getItem('books')) || {};
    setTransactions(savedBooks[transactionName] || JSON.parse(JSON.stringify(initialTransactions)));
  }, [transactionName]);

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
    setSnackbarMessage('');
  };

  return (
    <Container maxWidth="xl" sx={{ paddingTop: 3, paddingBottom: 7 }}>
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
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        message={snackbarMessage}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      />
    </Container>
  );
};

export default TransactionBooks;
