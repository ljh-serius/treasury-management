import React, { useEffect, useState } from 'react';
import TreasuryTable from './TreasuryTable';
import BudgetSummary from './BudgetSummary';
import Snackbar from '@mui/material/Snackbar';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';

const TransactionBooks = ({ transactions }) => {
  const [localTransactions, setLocalTransactions] = useState(transactions);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  console.log("TTTT ", transactions)
  useEffect(() => {
    setLocalTransactions(transactions);
  }, [transactions]);

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
    setSnackbarMessage('');
  };

  return (
    <Container maxWidth="xl" sx={{ paddingTop: 3, paddingBottom: 7 }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <BudgetSummary transactions={localTransactions} />
        </Grid>
        <Grid item xs={12} style={{ margin: '0 auto' }}>
          <TreasuryTable
            transactions={localTransactions}
            setTransactions={setLocalTransactions}
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
