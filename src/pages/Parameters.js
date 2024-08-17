import React from 'react';
import { Tabs, Tab, Box, Container } from '@mui/material';
import Organization from '../components/Parameters/Organization';
import Users from '../components/Parameters/Users';
import Enities from '../components/Parameters/Enities';

const Parameters = () => {
  const [selectedTab, setSelectedTab] = React.useState(0);

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  return (
    <Container maxWidth="xl"  sx={{ paddingTop: 3, paddingBottom: 7, width: '60vw'}}>
        <Tabs value={selectedTab} onChange={handleTabChange}>
            <Tab label="Manage Organization" />
            <Tab label="Manage Users" />
            <Tab label="Manage Entiteis" />
        </Tabs>
        {selectedTab === 0 && (
            <Organization />
        )}
        {selectedTab === 1 && (
            <Users />
        )}
        {selectedTab === 2 && (
            <Enities />
        )}
    </Container>
  );
};

export default Parameters;
