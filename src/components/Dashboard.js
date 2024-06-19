import React, { useState, useEffect } from 'react';
import TreasuryTable from './TreasuryTable';
import TransactionSelect from './TransactionSelect';
import { initialTransactions } from './transactionHelpers';
import TransactionActionsMenu from './TransactionActionsMenu';
import { AppBar, Toolbar, useMediaQuery, Typography, Grid, Fab, Snackbar, Container, Box } from '@mui/material';
import { useTheme, styled } from '@mui/material/styles';
import { Add as AddIcon } from '@mui/icons-material';
import BudgetSummary from './BudgetSummary'; // Import the new component

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
    const savedTransactions = localStorage.getItem('currentTransaction');
    return savedTransactions ? JSON.parse(savedTransactions) : initialTransactions;
  });
  const [transactionName, setTransactionName] = useState('currentTransaction');
  const [availableTransactions, setAvailableTransactions] = useState([]);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [addAnchorEl, setAddAnchorEl] = useState(null);

  useEffect(() => {
    localStorage.setItem(transactionName, JSON.stringify(transactions));
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

  const handleAddClick = (event) => {
    setAddAnchorEl(event.currentTarget);
  };

  const handleAddClose = () => {
    setAddAnchorEl(null);
  };

  const handleAddTransaction = (type) => {
    if (type === 'encaissements') {
      setTransactions((prevTransactions) => ({
        ...prevTransactions,
        encaissements: [
          { nature: 'New Encaissement', montantInitial: 0, montants: Array(12).fill(0) },
          ...prevTransactions.encaissements
        ]
      }));
    } else if (type === 'decaissements') {
      setTransactions((prevTransactions) => ({
        ...prevTransactions,
        decaissements: [
          { nature: 'New Décaissement', montantInitial: 0, montants: Array(12).fill(0) },
          ...prevTransactions.decaissements
        ]
      }));
    }
    setSnackbarMessage(`Added ${type} transaction`);
    setSnackbarOpen(true);
    setAddAnchorEl(null);
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
      <Container maxWidth="xl" sx={{ paddingTop: isMobile ? 3 : 10, maxWidth: '100%' }}>
        <Typography variant="h4" align="left" gutterBottom>
          Dashboard
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <BudgetSummary transactions={transactions}></BudgetSummary>
          </Grid>
          <Grid item xs={12} style={{ margin: '0 auto', overflowX: 'auto' }}>
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
      <TransactionActionsMenu
        anchorEl={addAnchorEl}
        handleMenuClose={handleAddClose}
        handleAddTransaction={handleAddTransaction}
      />
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
