import React from 'react';
import { Tabs, Tab, Box, Container } from '@mui/material';
import UsersManagement from './UsersManagement';
import OrganizationManagement from './OrganizationManagement';
import EnitiesManagement from './EnitiesManagement';

const ParametersManagement = () => {
  const [selectedTab, setSelectedTab] = React.useState(0);

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  return (
    <Container maxWidth="xl"  sx={{ paddingTop: 3, paddingBottom: 7, width: '60vw'}}>
        <Tabs value={selectedTab} onChange={handleTabChange}>
            <Tab label="Manage Users" />
            <Tab label="Manage Organization" />
            <Tab label="Manage Entiteis" />
        </Tabs>
        {selectedTab === 0 && (
            <UsersManagement />
        )}
        {selectedTab === 1 && (
            <OrganizationManagement />
        )}
        {selectedTab === 2 && (
            <EnitiesManagement />
        )}
    </Container>
  );
};

export default ParametersManagement;
