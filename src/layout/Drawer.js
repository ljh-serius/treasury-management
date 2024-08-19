import React, { useState } from 'react';
import { styled, ThemeProvider, createTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';

import SummarizeIcon from '@mui/icons-material/Summarize';
import WorkIcon from '@mui/icons-material/Work';
import StorefrontIcon from '@mui/icons-material/Storefront';
import GroupIcon from '@mui/icons-material/Group';
import InventoryIcon from '@mui/icons-material/Inventory';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import ReceiptIcon from '@mui/icons-material/Receipt';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import SecurityIcon from '@mui/icons-material/Security';
import TimelineIcon from '@mui/icons-material/Timeline';
import InsightsIcon from '@mui/icons-material/Insights';
import SettingsIcon from '@mui/icons-material/Settings';

const FireNav = styled(List)(({ theme }) => ({
  '& .MuiListItemButton-root': {
    paddingLeft: 24,
    paddingRight: 24,
  },
  '& .MuiListItemIcon-root': {
    minWidth: 0,
    marginRight: 16,
  },
  '& .MuiSvgIcon-root': {
    fontSize: 20,
  },
}));

const drawerItems = [
  {
    key: "financial-management",
    label: "Financial Management",
    icon: <MonetizationOnIcon />,
    description: "Manages the company’s financial operations.",
    children: [
      {
        key: "accounts-payable",
        label: "Accounts Payable",
        description: "Manages the company's payables.",
        children: [
          { key: "vendor-invoices", label: "Vendor Invoices", description: "Records of bills received." },
          { key: "payment-terms", label: "Payment Terms", description: "Conditions for payments." },
        ]
      },
      {
        key: "accounts-receivable",
        label: "Accounts Receivable",
        description: "Tracks receivables.",
        children: [
          { key: "customer-invoices", label: "Customer Invoices", description: "Bills issued to customers." },
          { key: "credit-management", label: "Credit Management", description: "Managing credit." }
        ]
      },
    ],
  },
  // More categories here as needed (Projects, Operations, etc.)
];

export default function DashboardDrawer() {
  const [openItems, setOpenItems] = useState({});

  const handleClick = (key) => {
    setOpenItems((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const theme = createTheme({
    palette: {
      mode: 'dark',
      primary: { main: 'rgb(102, 157, 246)' },
      background: { paper: 'rgb(5, 30, 52)' },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: 'flex'}}>
        <Paper elevation={0} sx={{ width: 300 ,  borderRadius: '0px'}}>
          <FireNav component="nav" disablePadding>
            <ListItemButton component="a" href="#customized-list">
              <ListItemIcon sx={{ fontSize: 20 }}>🔥</ListItemIcon>
              <ListItemText
                primary="Dashboard"
                primaryTypographyProps={{
                  fontSize: 20,
                  fontWeight: 'medium',
                  letterSpacing: 0,
                }}
              />
            </ListItemButton>
            <Divider />
            {drawerItems.map(({ key, label, icon, description, children }) => (
              <React.Fragment key={key}>
                <ListItemButton onClick={() => handleClick(key)}>
                  <ListItemIcon>{icon}</ListItemIcon>
                  <ListItemText
                    primary={label}
                    primaryTypographyProps={{
                      fontSize: 15,
                      fontWeight: 'medium',
                      lineHeight: '20px',
                    }}
                  />
                  {openItems[key] ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                <Collapse in={openItems[key]} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    {children.map(({ key: subKey, label: subLabel, children: subChildren }) => (
                      <React.Fragment key={subKey}>
                        <ListItemButton sx={{ pl: 4 }} onClick={() => handleClick(subKey)}>
                          <ListItemText primary={subLabel} />
                          {subChildren ? (openItems[subKey] ? <ExpandLess /> : <ExpandMore />) : <ChevronRightIcon />}
                        </ListItemButton>
                        {subChildren && (
                          <Collapse in={openItems[subKey]} timeout="auto" unmountOnExit>
                            <List component="div" disablePadding>
                              {subChildren.map(({ key: subSubKey, label: subSubLabel }) => (
                                <Tooltip title={subSubLabel} placement="right" key={subSubKey}>
                                  <ListItemButton sx={{ pl: 8 }}>
                                    <ListItemText primary={subSubLabel} />
                                  </ListItemButton>
                                </Tooltip>
                              ))}
                            </List>
                          </Collapse>
                        )}
                      </React.Fragment>
                    ))}
                  </List>
                </Collapse>
              </React.Fragment>
            ))}
          </FireNav>
        </Paper>
      </Box>
    </ThemeProvider>
  );
}
