import React, { useState, useEffect } from 'react';
import { useTheme } from '@mui/material/styles';
import {
  AppBar,
  Toolbar,
  useMediaQuery,
  Box,
  CssBaseline,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import AddIcon from '@mui/icons-material/Add'; // Import AddIcon for the button
import { Link, useLocation } from 'react-router-dom';
import TransactionSelect from './TransactionSelect';
import TransactionBooks from './TransactionBooks'; // Import TransactionBooks
import AddTransactionModal from './AddTransactionModal'; // Import AddTransactionModal
import { initialTransactions, monthNames } from './transactionHelpers';

const drawerWidth = 240;

const Dashboard = ({ children }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const currentLocation = useLocation();

  const [transactions, setTransactions] = useState({});
  const [transactionName, setTransactionName] = useState('Main transaction book');
  const [availableTransactions, setAvailableTransactions] = useState([]);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [menuAnchorEl, setMenuAnchorEl] = useState(null); // State to manage the menu anchor
  const [modalOpen, setModalOpen] = useState(false); // State to manage modal visibility
  const [newTransactionType, setNewTransactionType] = useState(''); // To store the type of transaction being added
  const [newTransactionName, setNewTransactionName] = useState(''); // Name of the new transaction
  const [newTransactionAmount, setNewTransactionAmount] = useState(''); // Amount of the new transaction
  const [selectedMonths, setSelectedMonths] = useState([]); // Months selected for the transaction

  // Load transaction books from local storage on mount
  useEffect(() => {
    const savedBooks = JSON.parse(localStorage.getItem('books')) || {};
    if (!savedBooks['Main transaction book']) {
      savedBooks['Main transaction book'] = JSON.parse(JSON.stringify(initialTransactions));
      localStorage.setItem('books', JSON.stringify(savedBooks));
    }
    setAvailableTransactions(Object.keys(savedBooks));
    setTransactions(savedBooks);
  }, []);

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };

  const handleTransactionChange = (name) => {
    setTransactionName(name);
  };

  const handleDrawerClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setMobileOpen(false);
    }, 300); // Delay close to avoid interference
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  const generateRandomTransactions = () => {
    // Generate random transactions
    const encaissements = Array.from({ length: 5 }, (_, i) => ({
      nature: `Encaissement ${i + 1}`,
      montantInitial: Math.floor(Math.random() * 1000),
      montants: Array.from({ length: 12 }, () => Math.floor(Math.random() * 500)),
    }));
  
    const decaissements = Array.from({ length: 5 }, (_, i) => ({
      nature: `Décaissement ${i + 1}`,
      montantInitial: Math.floor(Math.random() * 1000),
      montants: Array.from({ length: 12 }, () => Math.floor(Math.random() * 500)),
    }));
  
    // Calculate totals for encaissements and decaissements
    const totalEncaissement = encaissements.reduce((total, transaction) => {
      return {
      nature: 'Total Encaissements',
        montantInitial: total.montantInitial + transaction.montantInitial,
        montants: total.montants.map((monthTotal, index) => monthTotal + transaction.montants[index]),
      };
    }, {
      nature: 'Total Encaissements',
      montantInitial: 0,
      montants: Array(12).fill(0),
    });
  
    const totalDecaissement = decaissements.reduce((total, transaction) => {
      return {
        nature: 'Total Décaissements',
        montantInitial: total.montantInitial + transaction.montantInitial,
        montants: total.montants.map((monthTotal, index) => monthTotal + transaction.montants[index]),
      };
    }, {
      nature: 'Total Décaissements',
      montantInitial: 0,
      montants: Array(12).fill(0),
    });
  
    // Add totals to the arrays
    encaissements.push(totalEncaissement);
    decaissements.push(totalDecaissement);
  
    const randomTransactions = {
      encaissements,
      decaissements,
    };
  
    const updatedBooks = {
      ...transactions,
      [transactionName]: randomTransactions,
    };
  
    // Save to local storage
    localStorage.setItem('books', JSON.stringify(updatedBooks));
  
    // Update state to trigger re-render
    setTransactions(updatedBooks);
  };

  const handleNewTransaction = () => {
    const name = prompt('Enter name for new transaction set:');
    if (name) {
      const savedBooks = JSON.parse(localStorage.getItem('books')) || {};
      savedBooks[name] = JSON.parse(JSON.stringify(initialTransactions));
      localStorage.setItem('books', JSON.stringify(savedBooks));
      setAvailableTransactions([...availableTransactions, name]);
      setTransactionName(name);
      setTransactions(savedBooks);
    }
  };

  // Handle menu open
  const handleAddClick = (event) => {
    setMenuAnchorEl(event.currentTarget);
  };

  // Handle menu close
  const handleMenuClose = () => {
    setMenuAnchorEl(null);
  };

  // Handle adding transactions (Encaissements/Decaissements)
  const handleAddTransaction = (type) => {
    setNewTransactionType(type); // Set the type of transaction being added
    setModalOpen(true); // Open the modal
    handleMenuClose(); // Close the menu
  };

// Handle modal close
const handleModalClose = () => {
  setModalOpen(false);
  setNewTransactionName('');
  setNewTransactionAmount('');
  setSelectedMonths([]);
};

const handleModalSubmit = () => {
  const updatedTransactions = { ...transactions };
  const transactionArray = updatedTransactions[transactionName][newTransactionType];

  // Find the existing transaction by its nature
  const existingTransactionIndex = transactionArray.findIndex(
    (transaction) => transaction.nature === newTransactionName
  );

  if (existingTransactionIndex !== -1) {
    // If the transaction exists, update its values
    const existingTransaction = transactionArray[existingTransactionIndex];
    
    // Update montantInitial and montants for the selected months
    existingTransaction.montantInitial = newTransactionAmount;
    selectedMonths.forEach((month) => {
      existingTransaction.montants[month] = newTransactionAmount;
    });

    transactionArray[existingTransactionIndex] = existingTransaction;
  } else {
    // If the transaction doesn't exist, add it as a new transaction
    const newTransaction = {
      nature: newTransactionName,
      montantInitial: newTransactionAmount,
      montants: Array(12).fill(0),
    };

    selectedMonths.forEach((month) => {
      newTransaction.montants[month] = newTransactionAmount;
    });

    // Insert the new transaction n-1 order from the bottom
    transactionArray.splice(transactionArray.length - 1, 0, newTransaction);
  }

  // Update the state and local storage
  setTransactions(updatedTransactions);
  localStorage.setItem('books', JSON.stringify(updatedTransactions));
  handleModalClose();
};


  const drawer = (
    <div>
      <Toolbar />
      <Divider />
      <List>
        <ListItem key="books" disablePadding>
          <ListItemButton component={Link} to="/">
            <ListItemIcon>
              <MailIcon />
            </ListItemIcon>
            <ListItemText primary="Transaction Books" />
          </ListItemButton>
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem key="generate" disablePadding>
          <ListItemButton onClick={generateRandomTransactions}>
            <ListItemIcon>
              <InboxIcon />
            </ListItemIcon>
            <ListItemText primary="Generate Random Transactions" />
          </ListItemButton>
        </ListItem>
        <ListItem key="new" disablePadding>
          <ListItemButton onClick={handleNewTransaction}>
            <ListItemIcon>
              <MailIcon />
            </ListItemIcon>
            <ListItemText primary="Add New Transaction Book" />
          </ListItemButton>
        </ListItem>
        <ListItem key="analytics" disablePadding>
          <ListItemButton component={Link} to="/analytics">
            <ListItemIcon>
              <MailIcon />
            </ListItemIcon>
            <ListItemText primary="Analytics" />
          </ListItemButton>
        </ListItem>
      </List>
    </div>
  );

  // Check if children is of type TransactionBooks
  const isTransactionBooks = React.Children.toArray(children).some(
    (child) => React.isValidElement(child) && child.type === TransactionBooks
  );

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          {currentLocation.pathname === '/' && (
            <div>
              <TransactionSelect
                transactionName={transactionName}
                availableTransactions={availableTransactions}
                handleTransactionChange={handleTransactionChange}
              />

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
            </div>
          )}
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="transaction books"
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerClose}
          onTransitionEnd={handleDrawerTransitionEnd}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
      >
        <Toolbar />
        {/* Conditionally render based on child type */}
        {isTransactionBooks && (
          <TransactionBooks transactionName={transactionName} transactions={transactions[transactionName]} />
        ) || children}

        {/* Render the AddTransactionModal */}
        <AddTransactionModal
          modalOpen={modalOpen}
          handleModalClose={handleModalClose}
          newTransactionType={newTransactionType}
          newTransactionName={newTransactionName}
          setNewTransactionName={setNewTransactionName}
          availableTransactions={availableTransactions}
          newTransactionAmount={newTransactionAmount}
          setNewTransactionAmount={setNewTransactionAmount}
          selectedMonths={selectedMonths}
          setSelectedMonths={setSelectedMonths}
          handleModalSubmit={handleModalSubmit}
          availableMonths={monthNames.slice(1)}
          monthNames={Array.from({ length: 12 }, (_, i) => `Month ${i + 1}`)}
          transactions={transactions[transactionName]} // Pass the current transactions to the modal
        />
      </Box>
    </Box>
  );
};

export default Dashboard;
