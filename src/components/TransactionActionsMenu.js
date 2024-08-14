import React from 'react';
import { Menu, MenuItem } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import {Link} from "react-router-dom";

const TransactionActionsMenu = ({
  anchorEl,
  handleMenuClose,
  handleActionClick,
  handleAddTransaction,
  handleCopyColumn,
  handlePasteColumn,
  handleCopyNatureRow,
  handlePasteNatureRow,
  type,
  transactionBookName, // Ensure this prop is passed in containing the transaction row data
}) => {

  const transactionId = localStorage.getItem('selectedTransactionId')
  return (
    <Menu
      anchorEl={anchorEl}
      open={Boolean(anchorEl)}
      onClose={handleMenuClose}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
    >
      {type === 'column' && [
        <MenuItem key="copyColumn" onClick={handleCopyColumn}>
          Copy Column
        </MenuItem>,
        <MenuItem key="pasteColumn" onClick={handlePasteColumn}>
          Paste Column
        </MenuItem>,
      ]}
      {type === 'nature' && [
        <MenuItem key="copyNatureRow" onClick={handleCopyNatureRow}>
          Copy Row
        </MenuItem>,
        <MenuItem key="pasteNatureRow" onClick={handlePasteNatureRow}>
          Paste Row
        </MenuItem>,
        <MenuItem key="seeDetailsTransactionNature">
          <Link to="/units">
            See Details
          </Link>
        </MenuItem>
      ]}
    </Menu>
  );
};

export default TransactionActionsMenu;
