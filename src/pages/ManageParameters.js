import React from 'react';
import { Tabs, Tab, Box, Container } from '@mui/material';
import ManageUsers from './ManageUsers';
import ManageOrganization from './ManageOrganization';
import EntityManager from './EntityManager';

const ManageParameters = () => {
  const [selectedTab, setSelectedTab] = React.useState(0);

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  return (
    <Container maxWidth="lg"  sx={{ paddingTop: 3, paddingBottom: 7, width: '60vw'}}>
        <Tabs value={selectedTab} onChange={handleTabChange}>
            <Tab label="Manage Users" />
            <Tab label="Manage Organization" />
            <Tab label="Manage Entiteis" />
        </Tabs>
        {selectedTab === 0 && (
            <ManageUsers />
        )}
        {selectedTab === 1 && (
            <ManageOrganization />
        )}
        {selectedTab === 2 && (
            <EntityManager />
        )}
    </Container>
  );
};

export default ManageParameters;
