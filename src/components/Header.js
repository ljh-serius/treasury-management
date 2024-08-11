import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import TransactionSelect from './TransactionSelect';
import RefreshIcon from '@mui/icons-material/Refresh';
import { styled } from '@mui/material/styles';
import { AppBar, Toolbar, IconButton, Typography, Menu, MenuItem, Button, Box } from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';

const Randomize = styled(Button)(({ theme }) => ({
    backgroundColor: theme.palette.secondary.main,
    color: 'white',
    height: 36,
    '&:hover': {
      backgroundColor: theme.palette.secondary.dark,
    },
  }));
  
const Header = ({
  isMobile,
  generateRandomTransactions,
  transactionName,
  handleAddTransaction,
  availableTransactions,
  handleTransactionChange,
  handleNewTransaction,
  availableTransactionsBooks,
  showTransactionControls = true, // Default to true
}) => {
  
    const [menuAnchorEl, setMenuAnchorEl] = useState(null);

  // Handler to open the menu
  const handleAddClick = (event) => {
    setMenuAnchorEl(event.currentTarget);
  };

  // Handler to close the menu
  const handleMenuClose = () => {
    setMenuAnchorEl(null);
  };


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
              availableTransactions={availableTransactionsBooks}
              handleTransactionChange={handleTransactionChange}
              handleNewTransaction={handleNewTransaction}
            />
            <Randomize
              color="inherit"
              startIcon={<RefreshIcon />}
              onClick={generateRandomTransactions}
              sx={{ ml: 2 }}
            >
              Generate Random Transactions
            </Randomize>
            <IconButton color="inherit" onClick={handleAddClick}>
          <AddIcon />
        </IconButton>
        <Menu
          anchorEl={menuAnchorEl}
          open={Boolean(menuAnchorEl)}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={() => handleAddTransaction('encaissements')}>Encaissements</MenuItem>
          <MenuItem onClick={() => handleAddTransaction('decaissements')}>Décaissements</MenuItem>
        </Menu>
          </Box>
        )}
        <Button color="inherit" component={Link} to="/">
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
