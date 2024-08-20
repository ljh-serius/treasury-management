import React from 'react';
import { Toolbar, Typography, IconButton, Tooltip } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';

export default function BaseTableToolbar({ numSelected, onAdd, onDelete, onEdit, entityName }) {
  return (
    <Toolbar>
      <Typography sx={{ flex: '1 1 100%' }} variant="h6" id="tableTitle" component="div">
        {entityName}
      </Typography>
      {numSelected > 0 && (
        <>
          <Tooltip title="Edit">
            <IconButton onClick={onEdit} disabled={numSelected !== 1}>
              <EditIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete">
            <IconButton onClick={onDelete}>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </>
      )}
      <Tooltip title="Add">
        <IconButton onClick={onAdd}>
          <AddIcon />
        </IconButton>
      </Tooltip>
    </Toolbar>
  );
}
