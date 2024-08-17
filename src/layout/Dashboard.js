import React, { useState, useEffect } from 'react';
import {
  AppBar,
  Toolbar,
  Box,
  CssBaseline,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  Button,
} from '@mui/material';
import { Link } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth, db } from '../utils/firebaseConfig';
import { getDoc, doc } from "firebase/firestore";
import {
  getAllStoreTransactionSummaries,
  getStoreTransactionSummaries,
  fetchEntities,
} from '../utils/firebaseHelpers';
import { translate } from '../utils/translate';
import { useTranslation } from '../utils/TranslationProvider';
import BookIcon from '@mui/icons-material/Book';
import DashboardIcon from '@mui/icons-material/Dashboard';
import TimelineIcon from '@mui/icons-material/Timeline';
import WorkIcon from '@mui/icons-material/Work';
import StorefrontIcon from '@mui/icons-material/Storefront';
import BusinessIcon from '@mui/icons-material/Business';
import ViewListIcon from '@mui/icons-material/ViewList';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import BuildIcon from '@mui/icons-material/Build';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import SearchIcon from '@mui/icons-material/Search';
import ShieldIcon from '@mui/icons-material/Shield';
import BarChartIcon from '@mui/icons-material/BarChart';
import SummarizeIcon from '@mui/icons-material/Summarize';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import TreeView from '../components/TreeView'; // Assuming you have this component
import TreasuryTable from '../components/TreasuryTable'; // Adjust the path as necessary


const Dashboard = ({ children }) => {
  const drawerWidth = 230;
  const headerHeight = 60;

  const { language, toggleLanguage } = useTranslation();

  const [summaries, setSummaries] = useState({});
  const [entities, setEntities] = useState([]);
  const [showAnalytics, setShowAnalytics] = useState(false);
  const [currentSummary, setCurrentSummary] = useState({});
  const [bookName, setBookName] = useState(''); // Add state for bookName
  const [entityName, setEntityName] = useState(''); // Add state for entityName
  const organizationId = JSON.parse(localStorage.getItem("userData")).organizationId;

  useEffect(() => {
    const fetchUserData = async () => {
      const user = auth.currentUser;

      if (!user) return;


      const userDoc = await getDoc(doc(db, 'users', user.uid));

      if (userDoc.exists()) {
        const userData = userDoc.data();

        const data = await getAllStoreTransactionSummaries(organizationId);

        setSummaries(data);

        if (['admin', 'headquarter'].includes(userData.role)) {
          const fetchedEntities = await fetchEntities(organizationId);

          setEntities(fetchedEntities);

        } else if (userData.role === 'store') {
          const entityId = JSON.parse(localStorage.getItem("userData")).entityId;

          const data = await getStoreTransactionSummaries(organizationId, entityId);
          setSummaries(data);
        }
      }
    };

    fetchUserData();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      window.location.href = '/';
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };

  const toggleShowAnalytics = () => {
    setShowAnalytics(!showAnalytics);
  };

  const onSelectSummaryTreeView = async (selectedSummary) => {
    const [identifier, holder, subHolder] = selectedSummary.split('-');

    if (identifier === 'historical') {
      setCurrentSummary(summaries.historicalSummary);
      const orgDocRef = doc(db, 'organizations', organizationId);
      const orgDoc = await getDoc(orgDocRef);
      if (orgDoc.exists()) {
        const orgData = orgDoc.data();
        setBookName('Historical Transactions Book for ' + orgData.name); // Set appropriate book name
        setEntityName(null); // Set appropriate entity name
      }

    } else if (identifier === 'entity') {
      const entity = summaries.entitySummaries[holder];

      const entityName = entities.filter((entity) => {
        return entity.id === holder;
      })[0].name;

      setCurrentSummary(entity);
      setBookName('Entity Book'); // Set appropriate book name
      setEntityName(entityName); // Set entity name based on holder
    } else if (identifier === 'year') {
      const summary = summaries.summaries[holder][subHolder];
      const entityName = entities.filter((entity) => {
        return entity.id === holder;
      })[0].name;

      setCurrentSummary(summary);
      setBookName(subHolder) // Set appropriate book name
      setEntityName(entityName); // Set appropriate entity name
    }
  };


  const drawer = (
    <div>
      <Toolbar />
      <Divider />
      <List>
        <ListItem key="generate-summaries" disablePadding>
          <ListItemButton component={Link} to="/generate-summaries">
            <ListItemIcon>
              <SummarizeIcon style={{ fontSize: '1.6rem' }} />
            </ListItemIcon>
            <ListItemText primary={<Typography variant="body1">Generate Summaries</Typography>} />
          </ListItemButton>
        </ListItem>
        <ListItem key="books" disablePadding>
          <ListItemButton component={Link} to="/books">
            <ListItemIcon>
              <BookIcon style={{ fontSize: '1.6rem' }} />
            </ListItemIcon>
            <ListItemText primary={<Typography variant="body1">Transaction Books</Typography>} />
          </ListItemButton>
        </ListItem>
        <Divider />
        <TreeView data={summaries || {}} entities={entities || []} onSelectSummary={onSelectSummaryTreeView}></TreeView>
      </List>
      <Divider />
      <List>
        <ListItem key="projects" disablePadding>
          <ListItemButton component={Link} to="/projects">
            <ListItemIcon>
              <WorkIcon style={{ fontSize: '1.6rem' }} />
            </ListItemIcon>
            <ListItemText primary={<Typography variant="body1">Projects</Typography>} />
          </ListItemButton>
        </ListItem>
        <ListItem key="providers" disablePadding>
          <ListItemButton component={Link} to="/providers">
            <ListItemIcon>
              <StorefrontIcon style={{ fontSize: '1.6rem' }} />
            </ListItemIcon>
            <ListItemText primary={<Typography variant="body1">Providers</Typography>} />
          </ListItemButton>
        </ListItem>
        <ListItem key="partners" disablePadding>
          <ListItemButton component={Link} to="/partners">
            <ListItemIcon>
              <PeopleAltIcon style={{ fontSize: '1.6rem' }} />
            </ListItemIcon>
            <ListItemText primary={<Typography variant="body1">Partners</Typography>} />
          </ListItemButton>
        </ListItem>
        <ListItem key="products" disablePadding>
          <ListItemButton component={Link} to="/products">
            <ListItemIcon>
              <BusinessIcon style={{ fontSize: '1.6rem' }} />
            </ListItemIcon>
            <ListItemText primary={<Typography variant="body1">Products</Typography>} />
          </ListItemButton>
        </ListItem>
        <ListItem key="employees" disablePadding>
          <ListItemButton component={Link} to="/employees">
            <ListItemIcon>
              <PeopleAltIcon style={{ fontSize: '1.6rem' }} />
            </ListItemIcon>
            <ListItemText primary={<Typography variant="body1">Employees</Typography>} />
          </ListItemButton>
        </ListItem>
        <ListItem key="analytics" disablePadding>
          <ListItemButton component={Link} to="/analytics">
            <ListItemIcon>
              <BarChartIcon style={{ fontSize: '1.6rem' }} />
            </ListItemIcon>
            <ListItemText primary={<Typography variant="body1">Analytics</Typography>} />
          </ListItemButton>
        </ListItem>
        <ListItem key="cost-allocation" disablePadding>
          <ListItemButton component={Link} to="/cost-allocation">
            <ListItemIcon>
              <AttachMoneyIcon style={{ fontSize: '1.6rem' }} />
            </ListItemIcon>
            <ListItemText primary={<Typography variant="body1">Cost Allocation</Typography>} />
          </ListItemButton>
        </ListItem>
        <ListItem key="products-and-services" disablePadding>
          <ListItemButton component={Link} to="/products-and-services">
            <ListItemIcon>
              <ViewListIcon style={{ fontSize: '1.6rem' }} />
            </ListItemIcon>
            <ListItemText primary={<Typography variant="body1">Products and Services</Typography>} />
          </ListItemButton>
        </ListItem>
        <ListItem key="product-prototypes" disablePadding>
          <ListItemButton component={Link} to="/product-prototypes">
            <ListItemIcon>
              <BuildIcon style={{ fontSize: '1.6rem' }} />
            </ListItemIcon>
            <ListItemText primary={<Typography variant="body1">Product Prototypes</Typography>} />
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
        <ListItem key="risk-management" disablePadding>
          <ListItemButton component={Link} to="/risk-management">
            <ListItemIcon>
              <ShieldIcon style={{ fontSize: '1.6rem' }} />
            </ListItemIcon>
            <ListItemText primary={<Typography variant="body1">Risk Management</Typography>} />
          </ListItemButton>
        </ListItem>
        <ListItem key="gantt-chart" disablePadding>
          <ListItemButton component={Link} to="/gantt-chart">
            <ListItemIcon>
              <TimelineIcon style={{ fontSize: '1.6rem' }} />
            </ListItemIcon>
            <ListItemText primary={<Typography variant="body1">Gantt Chart</Typography>} />
          </ListItemButton>
        </ListItem>
        <ListItem key="manage-parameters" disablePadding>
          <ListItemButton component={Link} to="/manage-parameters">
            <ListItemIcon>
              <SettingsIcon style={{ fontSize: '1.6rem' }} />
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

  const isTreasuryTable = React.Children.toArray(children).some(
    (child) => React.isValidElement(child) && child.type === TreasuryTable
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
          <Button
            variant="outlined"
            color="inherit"
            onClick={toggleShowAnalytics}
            sx={{ ml: 'auto', fontSize: '0.8rem' }}
          >
            {showAnalytics && translate("Show Data", language)}
            {!showAnalytics && translate("Show Analysis", language)}
          </Button>
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
      <Drawer
        variant="permanent"
        open
      >
        {drawer}
      </Drawer>

      <main style={{ paddingLeft: '250px', margin: '100px auto' }}>
        {isTreasuryTable && currentSummary ? (
          <TreasuryTable
            transactions={currentSummary}
            showAnalytics={showAnalytics}
            bookName={bookName} // Pass bookName as prop
            entityName={entityName} // Pass entityName as prop
          />
        ) : (
          React.cloneElement(children, { showAnalytics })
        )}
      </main>
    </Box>
  );
};

export default Dashboard;
