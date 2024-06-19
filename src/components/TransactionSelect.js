import React from 'react';
import { FormControl, InputLabel, Select, MenuItem, Button } from '@mui/material';

const TransactionSelect = ({ transactionName, availableTransactions, handleTransactionChange, handleNewTransaction }) => {
  return (
    <div style={{ marginBottom: 20 }}>
      <FormControl>
        <InputLabel id="transaction-select-label">Select Transaction</InputLabel>
        <Select
          labelId="transaction-select-label"
          value={transactionName}
          onChange={(e) => handleTransactionChange(e.target.value)}
        >
          {availableTransactions.map((name) => (
            <MenuItem key={name} value={name}>{name}</MenuItem>
          ))}
        </Select>
      </FormControl>
      <Button variant="contained" color="primary" onClick={handleNewTransaction} style={{ marginLeft: 20 }}>
        New Transaction Set
      </Button>
    </div>
  );
};

export default TransactionSelect;
