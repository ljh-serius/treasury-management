import React, { useState } from 'react';
import { styled, ThemeProvider, createTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Tooltip from '@mui/material/Tooltip';
import Collapse from '@mui/material/Collapse';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { Link } from 'react-router-dom';

import { drawerItems } from './drawerItems';
import { keyToActionMap } from './keyToLinkMap';
import { keyToLinkMap } from './keyToLinkMap';

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

    
const StyledFireNav = styled('div')({
    height: 'calc(100% - 56px)',
    marginTop: '60px', // Adjust the height to accommodate the fixed header
    overflowY: 'auto',
    '&::-webkit-scrollbar': {
        width: '4px',
    },
    '&::-webkit-scrollbar-track': {
        background: '#f1f1f1',
    },
    '&::-webkit-scrollbar-thumb': {
        background: '#888',
        borderRadius: '4px',
    },
    '&::-webkit-scrollbar-thumb:hover': {
        background: '#555',
    },
});

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
            <Box sx={{ display: 'flex' }}>
                <Paper elevation={0} sx={{ width: 300, borderRadius: '0px', zIndex: 10, height: '100%', position: 'fixed' }}>
                    <Box sx={{ position: 'fixed', top: 0, width: 'inherit', background: 'rgb(5, 30, 52)', borderBottom: '1px solid #ddd' }}>
                        <ListItemButton component="a" href="/">
                            <ListItemIcon sx={{ fontSize: 20 }}>🔥</ListItemIcon>
                            <ListItemText
                                primary="Vault Insight"
                                primaryTypographyProps={{
                                    fontSize: 20,
                                    fontWeight: 'medium',
                                    letterSpacing: 0,
                                }}
                            />
                        </ListItemButton>
                        <Divider />
                    </Box>
                    <StyledFireNav>
                        <Box > {/* Offset to avoid overlap with fixed header */}
                            <List component="nav" disablePadding>
                                {drawerItems.map(({ key, label, icon, description, children }) => (
                                    <React.Fragment key={key}>
                                        <ListItemButton onClick={() => handleClick(key)}>
                                            <ListItemIcon>{icon}</ListItemIcon>
                                            <ListItemText
                                                primary={`${label}`}
                                                primaryTypographyProps={{
                                                    fontSize: 15,
                                                    fontWeight: 'medium',
                                                    lineHeight: '20px',
                                                }}
                                            />
                                            {children ? (openItems[key] ? <ExpandLess /> : <ExpandMore />) : null}
                                        </ListItemButton>
                                        {children && (
                                            <Collapse in={openItems[key]} timeout="auto" unmountOnExit>
                                                <List component="div" disablePadding>
                                                    {children.map(({ key: subKey, label: subLabel, children: subChildren }) => (
                                                        <React.Fragment key={subKey}>
                                                            <ListItemButton onClick={() => handleClick(subKey)}>
                                                                <ListItemText sx={{ pl: 4 }} primary={`• ${subLabel}`} />
                                                                {subChildren ? (openItems[subKey] ? <ExpandLess /> : <ExpandMore />) : <ChevronRightIcon />}
                                                            </ListItemButton>
                                                            {subChildren && (
                                                                <Collapse in={openItems[subKey]} timeout="auto" unmountOnExit>
                                                                    <List component="div" disablePadding>
                                                                        {subChildren.map(({ key: subSubKey, label: subSubLabel, description }) => (
                                                                            <Link to={keyToLinkMap[subSubKey] || '#'} key={subSubKey} style={{ textDecoration: 'none', color: 'inherit' }}>
                                                                                <ListItemButton>
                                                                                    <Tooltip title={description} placement="right">
                                                                                        <ListItemText sx={{ pl: 6 }} primary={`• ${subSubLabel}`} />
                                                                                    </Tooltip>
                                                                                </ListItemButton>
                                                                            </Link>
                                                                        ))}
                                                                    </List>
                                                                </Collapse>
                                                            )}
                                                        </React.Fragment>
                                                    ))}
                                                </List>
                                            </Collapse>
                                        )}
                                    </React.Fragment>
                                ))}
                            </List>
                        </Box>
                    </StyledFireNav>
                </Paper>
            </Box>
        </ThemeProvider>
    );
};
