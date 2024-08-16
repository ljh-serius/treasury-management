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
import PrioritizeIcon from '@mui/icons-material/Sort';
import RiskIcon from '@mui/icons-material/Warning';
import TreeView from './TreeView';
import TreasuryTable from './TreasuryTable'; // Adjust the path as necessary

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

    console.log("PARAMS PRAMS FILTERS ",  [identifier, holder, subHolder])
    if(identifier === 'historical'){
      console.log("orginzationId", organizationId)
      setCurrentSummary(summaries.historicalSummary);
      const orgDocRef = doc(db, 'organizations', organizationId);
      const orgDoc = await getDoc(orgDocRef);
      if (orgDoc.exists()) {
        console.log("Organization data:", orgDoc.data());
        const orgData = orgDoc.data();
        setBookName('Historical Transactions Book for ' + orgData.name); // Set appropriate book name
        setEntityName(null); // Set appropriate entity name
      }
   
    } else if (identifier === 'entity'){
      const entity = summaries.entitySummaries[holder];

      const entityName = entities.filter((entity) => {
        return entity.id === holder;
      })[0].name;

      setCurrentSummary(entity);
      setBookName('Entity Book'); // Set appropriate book name
      setEntityName(entityName); // Set entity name based on holder
    }else if (identifier === 'year'){
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
              <ProjectsIcon style={{ fontSize: '1.6rem' }} />
            </ListItemIcon>
            <ListItemText primary={<Typography variant="body1">Projects</Typography>} />
          </ListItemButton>
        </ListItem>
        <ListItem key="gantt-chart" disablePadding>
          <ListItemButton component={Link} to="/gantt-chart">
            <ListItemIcon>
              <GanttChartIcon style={{ fontSize: '1.6rem' }} />
            </ListItemIcon>
            <ListItemText primary={<Typography variant="body1">Gantt Chart</Typography>} />
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
        <ListItem key="providers" disablePadding>
          <ListItemButton component={Link} to="/providers">
            <ListItemIcon>
              <ProvidersIcon style={{ fontSize: '1.6rem' }} />
            </ListItemIcon>
            <ListItemText primary={<Typography variant="body1">Providers</Typography>} />
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
        <ListItem key="risk-management" disablePadding>
          <ListItemButton component={Link} to="/risk-management">
            <ListItemIcon>
              <RiskIcon style={{ fontSize: '1.6rem' }} />
            </ListItemIcon>
            <ListItemText primary={<Typography variant="body1">Risk Management</Typography>} />
          </ListItemButton>
        </ListItem>
        <ListItem key="employees" disablePadding>
          <ListItemButton component={Link} to="/employees">
            <ListItemIcon>
              <RiskIcon style={{ fontSize: '1.6rem' }} />
            </ListItemIcon>
            <ListItemText primary={<Typography variant="body1">Employees</Typography>} />
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
          children
        )}
      </main>
    </Box>
  );
};

export default Dashboard;
