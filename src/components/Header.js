import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import TransactionSelect from './TransactionSelect';

const Header = ({
  isMobile,
  handleAddClick,
  generateRandomTransactions,
  transactionName,
  availableTransactions,
  handleTransactionChange,
  handleNewTransaction,
  showTransactionControls = true, // Default to true
}) => {
  return (
    <AppBar
      position="fixed"
      color="primary"
      sx={{ top: isMobile ? 'auto' : 0, bottom: isMobile ? 0 : 'auto' }}
    >
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Vault Insight
        </Typography>
        {showTransactionControls && (
          <Box sx={{ ml: 'auto', display: 'flex', alignItems: 'center' }}>
            <TransactionSelect
              transactionName={transactionName}
              availableTransactions={availableTransactions}
              handleTransactionChange={handleTransactionChange}
              handleNewTransaction={handleNewTransaction}
            />
          </Box>
        )}
        <Button color="inherit" component={Link} to="/">
          Home
        </Button>
        <Button color="inherit" component={Link} to="/transaction-books">
          Transaction Books
        </Button>
        <Button color="inherit" component={Link} to="/analytical-comparison">
          Analytical Comparison
        </Button>
        
      </Toolbar>
    </AppBar>
  );
};

export default Header;
