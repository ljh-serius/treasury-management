import React from 'react';
import { FormControl, Select, MenuItem, Button, Box } from '@mui/material';
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

const StyledButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.secondary.main,
  color: 'white',
  height: 36,
  '&:hover': {
    backgroundColor: theme.palette.secondary.dark,
  },
}));

const TransactionSelect = ({
  transactionName,
  availableTransactions,
  handleTransactionChange,
  handleNewTransaction,
}) => {
  return (
    <Box display="flex" alignItems="center">
      <StyledFormControl>
        <Select
          value={transactionName}
          onChange={(e) => handleTransactionChange(e.target.value)}
          label="Transaction"
        >
          {availableTransactions.map((name) => (
            <MenuItem key={name} value={name}>
              {name}
            </MenuItem>
          ))}
        </Select>
      </StyledFormControl>
      <StyledButton onClick={handleNewTransaction}>
        New Book
      </StyledButton>
    </Box>
  );
};

export default TransactionSelect;
