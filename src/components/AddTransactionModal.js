import React, { useMemo } from 'react';
import { Modal, Box, Typography, FormControl, InputLabel, Select, MenuItem, OutlinedInput, TextField, Checkbox, ListItemText, Button } from '@mui/material';

const AddTransactionModal = ({
  modalOpen,
  handleModalClose,
  newTransactionType,
  newTransactionName,
  setNewTransactionName,
  availableTransactions,
  newTransactionAmount,
  setNewTransactionAmount,
  selectedMonths,
  setSelectedMonths,
  handleModalSubmit,
  monthNames,
  transactions, // Pass the transactions prop here
}) => {
  
  const handleInputChange = (event) => {
    setNewTransactionName(event.target.value);
  };

  const availableMonths = useMemo(() => {
    if (newTransactionName && transactions?.[newTransactionType]) {
      const existingTransaction = transactions[newTransactionType].find(t => t.nature === newTransactionName);
      if (existingTransaction) {
        return monthNames.filter((_, index) => existingTransaction.montants[index] === 0);
      }
    }
    return monthNames;
  }, [newTransactionName, transactions, newTransactionType, monthNames]);

  return (
    <Modal
      open={modalOpen}
      onClose={handleModalClose}
      aria-labelledby="add-transaction-modal"
      aria-describedby="add-transaction-modal-description"
    >
      <Box sx={{ width: 400, p: 4, m: 'auto', mt: '20%', bgcolor: 'background.paper', borderRadius: '8px' }}>
        <Typography variant="h6" gutterBottom>
          Add {newTransactionType === 'encaissements' ? 'Encaissement' : 'Décaissement'}
        </Typography>

        <FormControl fullWidth margin="normal">
          <InputLabel id="transaction-select-label">Transaction Name</InputLabel>
          <Select
            labelId="transaction-select-label"
            value={newTransactionName}
            onChange={(e) => setNewTransactionName(e.target.value)}
            input={<OutlinedInput label="Transaction Name" />}
            renderValue={(selected) => selected || "Select or type a transaction name"}
          >
            {availableTransactions.map((name, index) => (
              <MenuItem key={index} value={name}>
                {name}
              </MenuItem>
            ))}
          </Select>
          <TextField
            fullWidth
            margin="normal"
            label="Or type a new transaction name"
            value={newTransactionName}
            onChange={handleInputChange}
            placeholder="New transaction name"
            variant="outlined"
            sx={{ mt: 2 }}
          />
        </FormControl>

        <TextField
          fullWidth
          margin="normal"
          label="Transaction Amount"
          type="number"
          value={newTransactionAmount}
          onChange={(e) => setNewTransactionAmount(parseFloat(e.target.value))}
        />

        <FormControl fullWidth margin="normal">
          <InputLabel id="month-multi-select-label">Months</InputLabel>
          <Select
            labelId="month-multi-select-label"
            multiple
            value={selectedMonths}
            onChange={(e) => setSelectedMonths(e.target.value)}
            input={<OutlinedInput label="Months" />}
            renderValue={(selected) => selected.map(index => availableMonths[index]).join(', ')}
          >
            {availableMonths.map((month, index) => (
              <MenuItem key={index} value={index}>
                <Checkbox checked={selectedMonths.indexOf(index) > -1} />
                <ListItemText primary={month} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
          <Button onClick={handleModalClose} sx={{ mr: 2 }}>Cancel</Button>
          <Button variant="contained" color="primary" onClick={handleModalSubmit}>Add</Button>
        </Box>
      </Box>
    </Modal>
  );
}

export default AddTransactionModal;
