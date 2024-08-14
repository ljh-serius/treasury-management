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
  MenuItem,
  Typography,
  Button,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link, useLocation } from 'react-router-dom';
import TransactionSelect from './TransactionSelect';
import EntitySelect from './EntitySelect';
import AddTransactionModal from './AddTransactionModal';
import { signOut } from 'firebase/auth';
import { auth, db } from '../utils/firebaseConfig';
import { getDoc, doc } from "firebase/firestore";
import {
  getAllStoreTransactionSummaries,
  getStoreTransactionSummaries,
  saveSummaryToFirestore,
  fetchEntities,
} from '../utils/firebaseHelpers';
import { translate } from '../utils/translate';
import { useTranslation } from '../utils/TranslationProvider';
import BookIcon from '@mui/icons-material/Book';
import InsertChartIcon from '@mui/icons-material/InsertChart';
import ListAltIcon from '@mui/icons-material/ListAlt';
import AddBoxIcon from '@mui/icons-material/AddBox';
import AssessmentIcon from '@mui/icons-material/Assessment';
import LogoutIcon from '@mui/icons-material/Logout';
import ShuffleIcon from '@mui/icons-material/Shuffle';
import AddIcon from '@mui/icons-material/Add';
import PeopleIcon from '@mui/icons-material/People';
import { v4 as uuidv4 } from 'uuid';
import TransactionBooks from './TransactionBooks'; // Adjust the path as necessary

const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const Dashboard = ({ children }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const currentLocation = useLocation();
  const drawerWidth = 250;

  const { language, toggleLanguage } = useTranslation();
  
  const [summaries, setSummaries] = useState({});
  const [summaryName, setSummaryName] = useState(translate('Main transaction book', language));
  const [availableSummaries, setAvailableSummaries] = useState([]);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [menuAnchorEl, setMenuAnchorEl] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [newTransactionType, setNewTransactionType] = useState('');
  const [newTransactionName, setNewTransactionName] = useState('');
  const [newTransactionAmount, setNewTransactionAmount] = useState('');
  const [selectedMonths, setSelectedMonths] = useState([]);
  const [currentSummaryId, setCurrentSummaryId] = useState('');
  const [userRole, setUserRole] = useState('');
  const [selectedEntity, setSelectedEntity] = useState('');
  const [entities, setEntities] = useState([]);  // Make sure this is defined here
  const [isClosing, setIsClosing] = useState(false);

  const userId = auth.currentUser?.uid;

// This part of the Dashboard code should correctly set available transactions.
useEffect(() => {
  const fetchUserData = async () => {
    const user = auth.currentUser;
    if (user) {
      const userDoc = await getDoc(doc(db, 'users', user.uid));
      if (userDoc.exists()) {
        const userData = userDoc.data();
        setUserRole(userData.role);
        const organizationId = userData.organizationId;

        if (userData.role === 'admin' || userData.role === 'headquarter') {
          const fetchedEntities = await fetchEntities(organizationId);
          setEntities(fetchedEntities);

          // Set the default selected entity and fetch the summaries
          const firstEntityId = fetchedEntities[0]?.id || '';
          setSelectedEntity(firstEntityId);

          const fetchedSummaries = await getAllStoreTransactionSummaries(organizationId);
          setSummaries(fetchedSummaries);

          // Prepare available transactions per entity
          const availableTransactionsForEntity = fetchedSummaries[firstEntityId] 
            ? Object.keys(fetchedSummaries[firstEntityId])
            : [];


            console.log("fetchedSummaries", fetchedSummaries)
            console.log("firstEntityId", firstEntityId)
          setAvailableSummaries(availableTransactionsForEntity);
          setSummaryName(availableTransactionsForEntity[0] || translate('Main transaction book', language));
          setCurrentSummaryId(availableTransactionsForEntity[0] || '');
        } else if (userData.role === 'store') {
          const fetchedSummaries = await getStoreTransactionSummaries(organizationId, userData.entityId);
          setSummaries(fetchedSummaries);

          // Prepare available transactions per entity
          const availableTransactionsForEntity = fetchedSummaries[userData.entityId] 
            ? Object.keys(fetchedSummaries[userData.entityId])
            : [];

          setAvailableSummaries(availableTransactionsForEntity);
          setSummaryName(availableTransactionsForEntity[0] || translate('Main transaction book', language));
          setCurrentSummaryId(availableTransactionsForEntity[0] || '');
        }
      }
    }
  };

  fetchUserData();
}, [userId, language]);


  const handleEntityChange = async (entityId) => {
    setSelectedEntity(entityId);
    const organizationId = JSON.parse(localStorage.getItem('userData')).organizationId;
    const fetchedSummaries = await getStoreTransactionSummaries(organizationId, entityId);
    setSummaries(fetchedSummaries);

    const firstSummaryId = Object.keys(fetchedSummaries)[0];
    setCurrentSummaryId(firstSummaryId);
    setSummaryName(fetchedSummaries[firstSummaryId]?.name || translate('Main transaction book', language));
    const summaryNames = Object.keys(fetchedSummaries).map((key) => fetchedSummaries[key].name);
    setAvailableSummaries(summaryNames);
  };

  const handleDrawerClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setMobileOpen(false);
    }, 300);
  };
  
  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  const handleSummaryChange = (name) => {
    setSummaryName(name);
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      window.location.href = '/';
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleAddClick = (event) => {
    setMenuAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setMenuAnchorEl(null);
  };

  const handleAddTransaction = (type) => {
    setNewTransactionType(type);
    setModalOpen(true);
    handleMenuClose();
  };

  const handleModalClose = () => {
    setModalOpen(false);
    setNewTransactionName('');
    setNewTransactionAmount('');
    setSelectedMonths([]);
  };

  const handleModalSubmit = async () => {
    const updatedSummary = { ...summaries[currentSummaryId] };

    const initializeMonths = (transaction) => {
      if (!transaction.montants) {
        transaction.montants = Array(12).fill(0);
      }
    };

    const processTransaction = (type, name, amount, months) => {
      if (!updatedSummary[type]) {
        updatedSummary[type] = [];
      }

      let existingTransaction = updatedSummary[type].find(t => t.nature === name);

      if (existingTransaction) {
        initializeMonths(existingTransaction);
        months.forEach(monthIndex => {
          existingTransaction.montants[monthIndex] += parseFloat(amount);
        });
      } else {
        const newTransaction = {
          id: uuidv4(),
          nature: name,
          montantInitial: 0,
          montants: Array(12).fill(0),
        };

        months.forEach(monthIndex => {
          newTransaction.montants[monthIndex] = parseFloat(amount);
        });

        updatedSummary[type] = [newTransaction, ...(updatedSummary[type] || [])];
      }
    };

    if (newTransactionAmount && newTransactionName) {
      processTransaction(newTransactionType, newTransactionName, newTransactionAmount, selectedMonths);
    } else {
      console.warn('Transaction Name or Amount is invalid.');
      return;
    }

    const updatedSummaries = {
      ...summaries,
      [currentSummaryId]: updatedSummary,
    };

    setSummaries(updatedSummaries);
    const organizationId = JSON.parse(localStorage.getItem("userData")).organizationId;

    await saveSummaryToFirestore(organizationId, selectedEntity, currentSummaryId, updatedSummary);

    handleModalClose();
  };

  const generateRandomTransactions = async () => {
    try {
      const encaissements = Array.from({ length: 5 }, (_, i) => ({
        id: uuidv4(),
        nature: `Encaissement ${i + 1}`,
        montantInitial: Math.floor(Math.random() * 1000),
        montants: Array.from({ length: 12 }, () => Math.floor(Math.random() * 500)),
      }));
  
      const decaissements = Array.from({ length: 5 }, (_, i) => ({
        id: uuidv4(),
        nature: `Décaissement ${i + 1}`,
        montantInitial: Math.floor(Math.random() * 1000),
        montants: Array.from({ length: 12 }, () => Math.floor(Math.random() * 500)),
      }));
  
      if (!summaryName) {
        throw new Error('summaryName is undefined');
      }
      if (!userId) {
        throw new Error('userId is undefined');
      }
  
      const randomSummary = {
        name: summaryName,
        encaissements,
        decaissements,
      };
  
      const updatedSummaries = {
        ...summaries,
        [summaryName]: randomSummary,
      };
  
      setSummaries(updatedSummaries);
  
      const organizationId = localStorage.getItem("organizationId");
      await saveSummaryToFirestore(organizationId, selectedEntity, summaryName, randomSummary);
    } catch (error) {
      console.error('Error in generateRandomTransactions:', error);
    }
  };

  const handleNewSummary = async () => {
    const name = prompt(translate('Enter name for new summary set:', language));
    if (name) {
      const year = new Date().getFullYear();
      const newSummary = { name, encaissements: [], decaissements: [] };
      const updatedSummaries = { ...summaries, [year]: newSummary };
      setSummaries(updatedSummaries);
      setAvailableSummaries([...availableSummaries, name]);
  
      setSummaryName(name);
      const organizationId = localStorage.getItem("organizationId");
      await saveSummaryToFirestore(organizationId, selectedEntity, year, newSummary);
    }
  };
  
  const drawer = (
    <div>
      <Toolbar />
      <Divider />
      <List>
        <ListItem key="books" disablePadding>
          <ListItemButton component={Link} to="/books">
            <ListItemIcon>
              <BookIcon style={{ fontSize: '1.6rem' }} />
            </ListItemIcon>
            <ListItemText primary={<Typography variant="body1">{translate("Transaction Books", language)}</Typography>} /> 
          </ListItemButton>
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem key="generate" disablePadding>
          <ListItemButton onClick={generateRandomTransactions}>
            <ListItemIcon>
              <ShuffleIcon style={{ fontSize: '1.6rem' }} />
            </ListItemIcon>
            <ListItemText primary={<Typography variant="body1">{translate("Generate Random Summary", language)}</Typography>} /> 
          </ListItemButton>
        </ListItem>
        <ListItem key="new" disablePadding>
          <ListItemButton onClick={handleNewSummary}>
            <ListItemIcon>
              <AddBoxIcon style={{ fontSize: '1.6rem' }} />
            </ListItemIcon>
            <ListItemText primary={<Typography variant="body1">{translate("Add New Summary", language)}</Typography>} />
          </ListItemButton>
        </ListItem>
        <ListItem key="analytics" disablePadding>
          <ListItemButton component={Link} to="/analytics">
            <ListItemIcon>
              <InsertChartIcon style={{ fontSize: '1.6rem' }} /> 
            </ListItemIcon>
            <ListItemText primary={<Typography variant="body1">{translate("Analytics", language)}</Typography>} />
          </ListItemButton>
        </ListItem>
        <ListItem key="units" disablePadding>
          <ListItemButton component={Link} to="/units">
            <ListItemIcon>
              <ListAltIcon style={{ fontSize: '1.6rem' }} />
            </ListItemIcon>
            <ListItemText primary={<Typography variant="body1">{translate("Units", language)}</Typography>} /> 
          </ListItemButton>
        </ListItem>
        <ListItem key="summary" disablePadding>
          <ListItemButton component={Link} to="/summary">
            <ListItemIcon>
              <AssessmentIcon style={{ fontSize: '1.6rem' }} /> 
            </ListItemIcon>
            <ListItemText primary={<Typography variant="body1">{translate("Summary", language)}</Typography>} />
          </ListItemButton>
        </ListItem>
        <ListItem key="manage-parameters" disablePadding>
          <ListItemButton component={Link} to="/manage-parameters">
            <ListItemIcon>
              <PeopleIcon style={{ fontSize: '1.6rem' }} />
            </ListItemIcon>
            <ListItemText primary={<Typography variant="body1">{translate("Manage Parameters", language)}</Typography>} />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton onClick={handleLogout}>
            <ListItemIcon>
              <LogoutIcon style={{ fontSize: '1.6rem' }} />
            </ListItemIcon>
            <ListItemText primary={<Typography variant="body1">{translate("Logout", language)}</Typography>} />
          </ListItemButton>
        </ListItem>
      </List>
    </div>
  );

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
            sx={{ mr: 1.6, display: { sm: 'none' } }} 
          >
            <MenuIcon style={{ fontSize: '1.6rem' }} />
          </IconButton>
          
          {currentLocation.pathname === '/books' && (
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <EntitySelect
                selectedEntity={selectedEntity}
                availableEntities={entities}
                handleEntityChange={handleEntityChange}
              />
              <TransactionSelect
                transactionName={summaryName}
                availableTransactions={availableSummaries}
                handleTransactionChange={handleSummaryChange}
              />
              <IconButton
                color="default"
                variant="round"
                onClick={handleAddClick}
                style={{ backgroundColor: 'purple', marginLeft: '8px' }}
              >
                <AddIcon style={{ fontSize: '1.2rem' }} /> 
              </IconButton>
              <Menu
                anchorEl={menuAnchorEl}
                open={Boolean(menuAnchorEl)}
                onClose={handleMenuClose}
              >
                <MenuItem onClick={() => handleAddTransaction('encaissements')}>
                  {translate("Encaissements", language)}
                </MenuItem>
                <MenuItem onClick={() => handleAddTransaction('decaissements')}>
                  {translate("Décaissements", language)}
                </MenuItem>
              </Menu>
            </div>
          )}
          <Button
            variant="outlined"
            color="inherit"
            onClick={toggleLanguage}
            sx={{ ml: 'auto', fontSize: '0.8rem' }} 
          >
            {translate("Switch Language", language)}
          </Button>
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
        sx={{ flexGrow: 1, p: 2.4, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
      >
        <Toolbar />
        {isTransactionBooks ? (
          <TransactionBooks transactionName={summaryName} transactions={summaries[selectedEntity][summaryName]} />
        ) : (
          children
        )}
        <AddTransactionModal
          modalOpen={modalOpen}
          handleModalClose={handleModalClose}
          newTransactionType={newTransactionType}
          newTransactionName={newTransactionName}
          setNewTransactionName={setNewTransactionName}
          availableTransactions={availableSummaries}
          newTransactionAmount={newTransactionAmount}
          setNewTransactionAmount={setNewTransactionAmount}
          selectedMonths={selectedMonths}
          setSelectedMonths={setSelectedMonths}
          handleModalSubmit={handleModalSubmit}
          availableMonths={monthNames}
        />
      </Box>
    </Box>
  );
};

export default Dashboard;
