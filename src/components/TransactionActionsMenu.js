import React from 'react';
import { Menu, MenuItem } from '@mui/material';

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
}) => {

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
      {type === 'amount' &&
        [
          <MenuItem key="repeat" onClick={() => handleActionClick('repeat')}>
            Repeat for months
          </MenuItem>,
          <MenuItem key="advance" onClick={() => handleActionClick('advance')}>
            Advance transaction
          </MenuItem>,
          <MenuItem key="postpone" onClick={() => handleActionClick('postpone')}>
            Postpone transaction
          </MenuItem>,
          <MenuItem key="repeatUntil" onClick={() => handleActionClick('repeatUntil')}>
            Repeat until month
          </MenuItem>,
        ]}
      {type === 'column' &&
        [
          <MenuItem key="copyColumn" onClick={handleCopyColumn}>
            Copy Column
          </MenuItem>,
          <MenuItem key="pasteColumn" onClick={handlePasteColumn}>
            Paste Column
          </MenuItem>,
        ]}
      {type === 'nature' &&
        [
          <MenuItem key="copyNatureRow" onClick={handleCopyNatureRow}>
            Copy Row
          </MenuItem>,
          <MenuItem key="pasteNatureRow" onClick={handlePasteNatureRow}>
            Paste Row
          </MenuItem>,
        ]}
      {handleAddTransaction &&
        [
          <MenuItem key="encaissements" onClick={() => handleAddTransaction('encaissements')}>
            Encaissement
          </MenuItem>,
          <MenuItem key="decaissements" onClick={() => handleAddTransaction('decaissements')}>
            Décaissement
          </MenuItem>,
        ]}
    </Menu>
  );
};

export default TransactionActionsMenu;
