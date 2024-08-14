import React, { useState, useEffect } from 'react';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { fetchEntities, fetchEntityById } from '../utils/firebaseHelpers';

const EntitySelect = ({ userId, userRole, onEntityChange }) => {
  const [entities, setEntities] = useState([]);
  const [selectedEntity, setSelectedEntity] = useState('');

  useEffect(() => {
    const fetchUserEntities = async () => {
      const organizationId = localStorage.getItem('organizationId');
      if (organizationId && userRole) {
        try {
          const entitiesData = userRole === 'headquarter' || userRole === 'organization' 
            ? await fetchEntities(organizationId) 
            : await fetchEntityById(organizationId, userId);
          
          setEntities(entitiesData);
          const firstEntityId = entitiesData[0]?.id || '';
          setSelectedEntity(firstEntityId);
          onEntityChange(firstEntityId);
        } catch (error) {
          console.error('Error fetching entities: ', error);
        }
      }
    };

    fetchUserEntities();
  }, [userId, userRole, onEntityChange]);

  const handleEntityChange = (event) => {
    setSelectedEntity(event.target.value);
    onEntityChange(event.target.value);
  };

  return (
    <FormControl fullWidth>
      <InputLabel id="entity-select-label">Select Entity</InputLabel>
      <Select
        labelId="entity-select-label"
        value={selectedEntity}
        onChange={handleEntityChange}
      >
        {entities.map((entity) => (
          <MenuItem key={entity.id} value={entity.id}>
            {entity.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default EntitySelect;
