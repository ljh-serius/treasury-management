import React, { useState } from 'react';
import { Button, Checkbox, FormControlLabel, FormGroup, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';

const FilterComponent = ({ columns, rows, onFilterChange }) => {
  const [selectedColumns, setSelectedColumns] = useState(columns);
  const [selectedRows, setSelectedRows] = useState(rows);
  const [open, setOpen] = useState(false);

  const handleColumnChange = (event) => {
    const { name, checked } = event.target;
    setSelectedColumns((prev) => ({ ...prev, [name]: checked }));
  };

  const handleRowChange = (event) => {
    const { name, checked } = event.target;
    setSelectedRows((prev) => ({ ...prev, [name]: checked }));
  };

  const handleApply = () => {
    onFilterChange(selectedColumns, selectedRows);
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Button variant="outlined" color="primary" onClick={handleOpen} style={{ marginBottom: 16 }}>
        Filter Columns and Rows
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Filter Columns and Rows</DialogTitle>
        <DialogContent>
          <FormGroup>
            <h4>Columns</h4>
            {Object.keys(columns).map((column) => (
              <FormControlLabel
                key={column}
                control={
                  <Checkbox
                    checked={selectedColumns[column]}
                    onChange={handleColumnChange}
                    name={column}
                  />
                }
                label={column}
              />
            ))}
          </FormGroup>
          <FormGroup>
            <h4>Rows</h4>
            {Object.keys(rows).map((row) => (
              <FormControlLabel
                key={row}
                control={
                  <Checkbox
                    checked={selectedRows[row]}
                    onChange={handleRowChange}
                    name={row}
                  />
                }
                label={row}
              />
            ))}
          </FormGroup>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleApply} color="primary">
            Apply
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default FilterComponent;
