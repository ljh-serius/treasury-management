import React from 'react';
import { Modal, Box, Typography, Grid, Button, FormControlLabel, Checkbox, Radio } from '@mui/material';
import { modalStyle } from './transactionHelpers';

const ModalDialog = ({ modalOpen, handleCancel, getAvailableMonths, selectedMonths, setSelectedMonths, handleConfirm, action, selectedTransaction }) => {
  return (
    <Modal
      open={modalOpen}
      onClose={handleCancel}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <Box sx={modalStyle}>
        <Typography id="modal-title" variant="h6" component="h2">
          Select Month
        </Typography>
        <Grid container spacing={2} sx={{ mt: 2 }}>
          {getAvailableMonths().map((month, i) => (
            (i !== selectedTransaction.month) && (
              <Grid item xs={6} sm={4} md={3} key={i}>
                {(action === 'postpone' || action === 'advance' || action === 'repeatUntil') ? (
                  <FormControlLabel
                    control={
                      <Radio
                        checked={selectedMonths.includes(i)}
                        onChange={() => setSelectedMonths([i])} // Ensure only one month is selected
                      />
                    }
                    label={month}
                  />
                ) : (
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={selectedMonths.includes(i)}
                        onChange={() => setSelectedMonths((prev) => {
                          if (prev.includes(i)) {
                            return prev.filter((m) => m !== i);
                          } else {
                            return [...prev, i];
                          }
                        })}
                      />
                    }
                    label={month}
                  />
                )}
              </Grid>
            )
          ))}
        </Grid>
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: 16 }}>
          <Button variant="contained" color="primary" onClick={() => handleConfirm(false)} style={{ marginRight: 8 }}>Confirm</Button>
          <Button variant="contained" color="secondary" onClick={handleCancel}>Cancel</Button>
        </div>
      </Box>
    </Modal>
  );
};

export default ModalDialog;
