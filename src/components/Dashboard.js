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
import ShuffleIcon from '@mui/icons-material/Shuffle';
import AddBoxIcon from '@mui/icons-material/AddBox';
import InsertChartIcon from '@mui/icons-material/InsertChart';
import ListAltIcon from '@mui/icons-material/ListAlt';
import AssessmentIcon from '@mui/icons-material/Assessment';
import PeopleIcon from '@mui/icons-material/People';
import LogoutIcon from '@mui/icons-material/Logout';
import GanttChartIcon from '@mui/icons-material/Timeline';
import ProjectsIcon from '@mui/icons-material/Work';
import ProvidersIcon from '@mui/icons-material/LocalShipping';
import ProductLineIcon from '@mui/icons-material/Category';
import CostIcon from '@mui/icons-material/MonetizationOn';
import PrototypeIcon from '@mui/icons-material/Engineering';
import PartnersIcon from '@mui/icons-material/Group';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import PrioritizeIcon from '@mui/icons-material/Sort';
import RiskIcon from '@mui/icons-material/Warning';
import { v4 as uuidv4 } from 'uuid';
import TransactionBooks from './TransactionBooks'; // Adjust the path as necessary

const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

function getCurrentTime() {
  const now = new Date();
  return now.toLocaleTimeString();
}

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

  useEffect(() => {
    const fetchUserData = async () => {
      const user = auth.currentUser;
      
      if (!user) return;
      
      const organizationId = JSON.parse(localStorage.getItem("userData")).organizationId;
  
      const userDoc = await getDoc(doc(db, 'users', user.uid));
      
      if (userDoc.exists()) {
        const userData = userDoc.data();
        
        setUserRole(userData.role);

        const data = await getAllStoreTransactionSummaries(organizationId);
        
        setSummaries(data)
  
        if (['admin', 'headquarter'].includes(userData.role)) {
          const fetchedEntities = await fetchEntities(organizationId);
          
          setEntities(fetchedEntities)
          setSelectedEntity(fetchedEntities[0].id)
          setAvailableSummaries(Object.keys(data[fetchedEntities[0].id]))

        } else if (userData.role === 'store') {
          const entityId = JSON.parse(localStorage.getItem("userData")).entityId;

          const data = await getStoreTransactionSummaries(organizationId, entityId);
          setSummaries(data)
        }
      }
    };
  
    fetchUserData();
  }, [userId, language]);
  

  const handleDrawerClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setMobileOpen(false);
    }, 300);
  };
  
  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  const saveToLocalStorage = (userId, key, data) => {
    if (!userId) return;
    const fullKey = `${userId}_${key}`;
    const dataToStore = {
      timestamp: getCurrentTime(),
      data
    };
    localStorage.setItem(fullKey, JSON.stringify(dataToStore));
  };

  const handleSummaryChange = (name) => {
    const organizationId = JSON.parse(localStorage.getItem('userData')).organizationId;
    saveToLocalStorage(organizationId, 'currentSummaryName', name)
    setSummaryName(name);
    setCurrentSummaryId(name);
  };

  const handleEntityChange = async (entityId) => {
    const organizationId = JSON.parse(localStorage.getItem('userData')).organizationId;
    saveToLocalStorage(organizationId, 'currentEntityId', entityId)
    setSelectedEntity(entityId)
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
  
      const organizationId = JSON.parse(localStorage.getItem("userData")).organizationId;
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
            <ListItemText primary={<Typography variant="body1">Transaction Books</Typography>} />
          </ListItemButton>
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem key="gantt-chart" disablePadding>
          <ListItemButton component={Link} to="/gantt-chart">
            <ListItemIcon>
              <GanttChartIcon style={{ fontSize: '1.6rem' }} />
            </ListItemIcon>
            <ListItemText primary={<Typography variant="body1">Gantt Chart</Typography>} />
          </ListItemButton>
        </ListItem>
        <ListItem key="projects" disablePadding>
          <ListItemButton component={Link} to="/projects">
            <ListItemIcon>
              <ProjectsIcon style={{ fontSize: '1.6rem' }} />
            </ListItemIcon>
            <ListItemText primary={<Typography variant="body1">Projects</Typography>} />
          </ListItemButton>
        </ListItem>
        <ListItem key="providers" disablePadding>
          <ListItemButton component={Link} to="/providers">
            <ListItemIcon>
              <ProvidersIcon style={{ fontSize: '1.6rem' }} />
            </ListItemIcon>
            <ListItemText primary={<Typography variant="body1">Providers</Typography>} />
          </ListItemButton>
        </ListItem>
        <ListItem key="product-line-assessment" disablePadding>
          <ListItemButton component={Link} to="/product-line-assessment">
            <ListItemIcon>
              <ProductLineIcon style={{ fontSize: '1.6rem' }} />
            </ListItemIcon>
            <ListItemText primary={<Typography variant="body1">Product Line Assessment</Typography>} />
          </ListItemButton>
        </ListItem>
        <ListItem key="cost-optimization" disablePadding>
          <ListItemButton component={Link} to="/cost-optimization">
            <ListItemIcon>
              <CostIcon style={{ fontSize: '1.6rem' }} />
            </ListItemIcon>
            <ListItemText primary={<Typography variant="body1">Cost Optimization</Typography>} />
          </ListItemButton>
        </ListItem>
        <ListItem key="product-prototypes" disablePadding>
          <ListItemButton component={Link} to="/product-prototypes">
            <ListItemIcon>
              <PrototypeIcon style={{ fontSize: '1.6rem' }} />
            </ListItemIcon>
            <ListItemText primary={<Typography variant="body1">Product Prototypes</Typography>} />
          </ListItemButton>
        </ListItem>
        <ListItem key="partners" disablePadding>
          <ListItemButton component={Link} to="/partners">
            <ListItemIcon>
              <PartnersIcon style={{ fontSize: '1.6rem' }} />
            </ListItemIcon>
            <ListItemText primary={<Typography variant="body1">Partners</Typography>} />
          </ListItemButton>
        </ListItem>
        <ListItem key="search-partners" disablePadding>
          <ListItemButton component={Link} to="/search-partners">
            <ListItemIcon>
              <SearchIcon style={{ fontSize: '1.6rem' }} />
            </ListItemIcon>
            <ListItemText primary={<Typography variant="body1">Search Partners</Typography>} />
          </ListItemButton>
        </ListItem>
        <ListItem key="project-prioritization" disablePadding>
          <ListItemButton component={Link} to="/project-prioritization">
            <ListItemIcon>
              <PrioritizeIcon style={{ fontSize: '1.6rem' }} />
            </ListItemIcon>
            <ListItemText primary={<Typography variant="body1">Project Prioritization</Typography>} />
          </ListItemButton>
        </ListItem>
        <ListItem key="risk-management" disablePadding>
          <ListItemButton component={Link} to="/risk-management">
            <ListItemIcon>
              <RiskIcon style={{ fontSize: '1.6rem' }} />
            </ListItemIcon>
            <ListItemText primary={<Typography variant="body1">Risk Management</Typography>} />
          </ListItemButton>
        </ListItem>
        <ListItem key="analytics" disablePadding>
          <ListItemButton component={Link} to="/analytics">
            <ListItemIcon>
              <InsertChartIcon style={{ fontSize: '1.6rem' }} />
            </ListItemIcon>
            <ListItemText primary={<Typography variant="body1">Analytics</Typography>} />
          </ListItemButton>
        </ListItem>
        <ListItem key="units" disablePadding>
          <ListItemButton component={Link} to="/units">
            <ListItemIcon>
              <ListAltIcon style={{ fontSize: '1.6rem' }} />
            </ListItemIcon>
            <ListItemText primary={<Typography variant="body1">Units</Typography>} />
          </ListItemButton>
        </ListItem>
        <ListItem key="summary" disablePadding>
          <ListItemButton component={Link} to="/summary">
            <ListItemIcon>
              <AssessmentIcon style={{ fontSize: '1.6rem' }} />
            </ListItemIcon>
            <ListItemText primary={<Typography variant="body1">Summary</Typography>} />
          </ListItemButton>
        </ListItem>
        <ListItem key="manage-parameters" disablePadding>
          <ListItemButton component={Link} to="/manage-parameters">
            <ListItemIcon>
              <PeopleIcon style={{ fontSize: '1.6rem' }} />
            </ListItemIcon>
            <ListItemText primary={<Typography variant="body1">Manage Parameters</Typography>} />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton onClick={handleLogout}>
            <ListItemIcon>
              <LogoutIcon style={{ fontSize: '1.6rem' }} />
            </ListItemIcon>
            <ListItemText primary={<Typography variant="body1">Logout</Typography>} />
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
        {isTransactionBooks && summaries[selectedEntity] && summaries[selectedEntity][summaryName] ? (
            <TransactionBooks 
              transactionName={summaryName} 
              transactions={summaries[selectedEntity][summaryName]} 
            />
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
