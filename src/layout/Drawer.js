
import React, { useState } from 'react';
import { ListItem, ListItemButton, ListItemIcon, ListItemText, Typography, IconButton, Divider, List } from '@mui/material';
import { Link } from 'react-router-dom';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';


import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

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
import LogoutIcon from '@mui/icons-material/Logout';

const drawerItems = [
    { key: "treasury", label: "Treasury", icon: <SummarizeIcon style={{ fontSize: '1.6rem' }} />, path: "/summary" },
    { key: "people-and-relationships", label: "People and Relationships", icon: null, seperator: true },
    { key: "clients", label: "Clients", icon: <SummarizeIcon style={{ fontSize: '1.6rem' }} />, path: "/management/clients" },
    { key: "partners", label: "Partners", icon: <GroupIcon style={{ fontSize: '1.6rem' }} />, path: "/management/partners" },
    { key: "providers", label: "Providers", icon: <StorefrontIcon style={{ fontSize: '1.6rem' }} />, path: "/management/providers" },
    { key: "employees", label: "Employees", icon: <TimelineIcon style={{ fontSize: '1.6rem' }} />, path: "/management/employees" },
    { key: "operations", label: "Operations", icon: null, seperator: true },
    { key: "costs", label: "Costs", icon: <MonetizationOnIcon style={{ fontSize: '1.6rem' }} />, path: "/management/costs" },
    { key: "risks", label: "Risks", icon: <SecurityIcon style={{ fontSize: '1.6rem' }} />, path: "/management/risks" },
    { key: "campaigns", label: "Campaigns", icon: <PeopleAltIcon style={{ fontSize: '1.6rem' }} />, path: "/management/campaigns" },
    { key: "projects", label: "Projects", icon: <WorkIcon style={{ fontSize: '1.6rem' }} />, path: "/management/projects" },
    { key: "invoices", label: "Invoices", icon: <ReceiptIcon style={{ fontSize: '1.6rem' }} />, path: "/management/invoices" },
    { key: "products", label: "Products", icon: <InventoryIcon style={{ fontSize: '1.6rem' }} />, path: "/management/products" },
    { key: "documents", label: "Documents", icon: null, seperator: true },
    { key: "gantt-chart", label: "Gantt Chart", icon: <TimelineIcon style={{ fontSize: '1.6rem' }} />, path: "/gantt-chart" },
    { key: "analytics", label: "Analytics", icon: <InsightsIcon style={{ fontSize: '1.6rem' }} />, path: "/analytics" },
    { key: "parameters", label: "Parameters", icon: <SettingsIcon style={{ fontSize: '1.6rem' }} />, path: "/parameters" },
    { key: "entities", label: "Entities", icon: <TimelineIcon style={{ fontSize: '1.6rem' }} />, path: "/management/entities" },
];

export default function DashboardDrawer({ setShowAnalytics }) {
    const [hoveredItem, setHoveredItem] = useState(null);

    return (
        <div>
            <List>
                <Divider />
                {drawerItems.map(({ key, label, icon, path, seperator }) => (
                    <React.Fragment key={key}>
                        {seperator ? (
                            <>
                                <Divider />
                                <ListItem key={key} disablePadding>
                                    <ListItemButton>
                                        <ListItemText primary={<Typography variant="body1">{label}</Typography>} />
                                    </ListItemButton>
                                </ListItem>
                                <Divider />
                            </>
                        ) : (
                            <ListItem
                                disablePadding
                                style={{ display: 'flex', alignItems: 'center', width: '100%' }}
                                onMouseEnter={() => setHoveredItem(key)}
                                onMouseLeave={() => setHoveredItem(null)}
                            >
                                <ListItemButton
                                    component={Link}
                                    to={path}
                                    style={{ pl: 4, pt: 0}}

                                    onClick={() => { setShowAnalytics(false); }}
                                >
                                    {icon && <ListItemIcon>{icon}</ListItemIcon>}
                                    <ListItemText 
                                        style={{ width: '75%' }}
                                        primary={<Typography variant="body1">{label}</Typography>}
                                    />

                                    <div
                                        style={{ height: '100%', borderLeft: '1px solid rgba(0, 0, 0, 0.2)', width: '25%', padding: 4, display: 'flex', justifyContent: 'right', opacity: hoveredItem === key ? 1 : 0}}
                                        onClick={(event) => { event.stopPropagation(); setShowAnalytics(true);}}
                                    >
                                        <IconButton size="small" style={{ height: '100%'}}>
                                            <ArrowForwardIosIcon fontSize="small" />
                                        </IconButton>
                                    </div>
                                </ListItemButton>
                            </ListItem>
                        )
                        }
                    </React.Fragment>
                ))}
            </List>
        </div>
    );
};
