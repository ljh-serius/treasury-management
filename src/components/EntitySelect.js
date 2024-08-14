import React from 'react';
import { FormControl, Select, MenuItem, Box } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledFormControl = styled(FormControl)(({ theme }) => ({
  backgroundColor: 'white',
  minWidth: 200,
  marginRight: '10px',
  borderRadius: 4,
  height: 36,
  '& .MuiInputBase-root': {
    height: 36,
    alignItems: 'center',
  },
  '& .MuiSelect-select': {
    display: 'flex',
    alignItems: 'center',
    height: '100%',
  },
}));

const EntitySelect = ({
  selectedEntity = '', // Initialize with an empty string
  availableEntities = [], // Default to empty array
  handleEntityChange
}) => {
  return (
    <Box display="flex" alignItems="center">
      <StyledFormControl>
        <Select
          value={selectedEntity || ''} // Ensure value is always a string
          onChange={(e) => handleEntityChange(e.target.value)}
          displayEmpty
        >
          {availableEntities.map((entity) => (
            <MenuItem key={entity.id} value={entity.id}>
              {entity.name || 'Unnamed Entity'}
            </MenuItem>
          ))}
        </Select>
      </StyledFormControl>
    </Box>
  );
};

export default EntitySelect;
