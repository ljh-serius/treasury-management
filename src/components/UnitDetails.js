import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Divider,
  Container,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
} from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';

const stores = ['Store 1', 'Store 2', 'Store 3'];

const UnitDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { unit } = location.state || {};

  const [provisioningRequests, setProvisioningRequests] = useState([]);
  const [stopSellingRequests, setStopSellingRequests] = useState([]);
  const [provisioningModalOpen, setProvisioningModalOpen] = useState(false);
  const [stopSellingModalOpen, setStopSellingModalOpen] = useState(false);
  const [selectedStore, setSelectedStore] = useState('');
  const [selectedDuration, setSelectedDuration] = useState('');
  const [unitsToProvision, setUnitsToProvision] = useState(0);
  const [justification, setJustification] = useState('');

  const handleProvisioningSubmit = () => {
    setProvisioningRequests([
      ...provisioningRequests,
      { store: selectedStore, units: unitsToProvision, status: 'Requested' },
    ]);
    setProvisioningModalOpen(false);
    setSelectedStore('');
    setUnitsToProvision(0);
  };

  const handleStopSellingSubmit = () => {
    setStopSellingRequests([
      ...stopSellingRequests,
      {
        store: selectedStore,
        duration: selectedDuration,
        status: 'Requested',
        justification,
      },
    ]);
    setStopSellingModalOpen(false);
    setSelectedStore('');
    setSelectedDuration('');
    setJustification('');
  };

  const handleCancelProvisioning = (index) => {
    const updatedRequests = [...provisioningRequests];
    updatedRequests.splice(index, 1);
    setProvisioningRequests(updatedRequests);
  };

  const handleCancelStopSelling = (index) => {
    const updatedRequests = [...stopSellingRequests];
    updatedRequests.splice(index, 1);
    setStopSellingRequests(updatedRequests);
  };

  const handleCallEmployee = () => {
    alert(`Calling ${unit.personName}...`);
  };

  const handleEmailEmployee = () => {
    window.location.href = `mailto:${unit.email}?subject=Request for another intervention&body=Dear ${unit.personName},%0D%0A%0D%0AWe would like to request another intervention regarding your recent work on [Project/Task].%0D%0A%0D%0AThank you,%0D%0A[Your Name]`;
  };

  if (!unit) {
    return <div>No unit data available.</div>;
  }

  return (
    <Container maxWidth="xl" sx={{ paddingTop: 3, paddingBottom: 7 }}>
      <Box sx={{ padding: 3 }}>
        <Button variant="contained" color="primary" onClick={() => navigate(-1)}>
          Back to Summary
        </Button>

        <Card sx={{ marginTop: 3 }}>
          {/* Display product image if available */}
          {unit.imageUrl && (
            <CardMedia
              component="img"
              height="300"
              image={unit.imageUrl}
              alt={unit.description || 'Product Image'}
            />
          )}
          {/* Display person image if available */}
          {unit.personImageUrl && (
            <CardMedia
              component="img"
              height="300"
              image={unit.personImageUrl}
              alt={unit.personName || 'Person Image'}
            />
          )}
          <CardContent>
            <Typography variant="h5">{unit.description || unit.type}</Typography>
            {unit.longDescription && (
              <Typography variant="body1" sx={{ marginTop: 2 }}>
                {unit.longDescription}
              </Typography>
            )}
            <Divider sx={{ marginY: 2 }} />
            
            {/* Conditional rendering for product units */}
            {unit.unitPrice && (
              <>
                <Typography variant="body2" color="textSecondary">
                  <strong>Unit Price:</strong> {unit.unitPrice}€
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  <strong>Quantity:</strong> {unit.quantity}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  <strong>Discount:</strong> {unit.discount}%
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  <strong>Total Before Discount:</strong> {unit.totalBeforeDiscount}€
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  <strong>Final Amount:</strong> {unit.finalAmount}€
                </Typography>
                {unit.purchaseDate && (
                  <Typography variant="body2" color="textSecondary">
                    <strong>Purchase Date:</strong> {new Date(unit.purchaseDate).toLocaleDateString()}
                  </Typography>
                )}
              </>
            )}

            {/* Conditional rendering for work units */}
            {unit.hoursWorked && (
              <>
                <Typography variant="body2" color="textSecondary">
                  <strong>Hourly Rate:</strong> {unit.rate}€
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  <strong>Hours Worked:</strong> {unit.hoursWorked}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  <strong>Total Earnings:</strong> {unit.totalEarnings}€
                </Typography>
                {unit.jobDescription && (
                  <Typography variant="body1" sx={{ marginTop: 2 }}>
                    {unit.jobDescription}
                  </Typography>
                )}
                <Button variant="outlined" color="primary" onClick={handleCallEmployee} sx={{ mt: 2 }}>
                  Call {unit.personName}
                </Button>
                <Button variant="outlined" color="secondary" onClick={handleEmailEmployee} sx={{ mt: 2, ml: 2 }}>
                  Email {unit.personName}
                </Button>
              </>
            )}
            
            <Divider sx={{ marginY: 2 }} />
            <Typography variant="body2" color="textSecondary">
              {unit.notes}
            </Typography>
          </CardContent>
        </Card>

        {/* Provisioning Button */}
        <Button variant="outlined" color="secondary" onClick={() => setProvisioningModalOpen(true)} sx={{ mt: 2 }}>
          {unit.hoursWorked ? 'Request Another Intervention' : 'Provision Product'}
        </Button>

        {/* Stop Selling Button */}
        <Button variant="outlined" color="warning" onClick={() => setStopSellingModalOpen(true)} sx={{ mt: 2, ml: 2 }}>
          {unit.hoursWorked ? 'Stop Scheduling Interventions' : 'Stop Selling Product'}
        </Button>

        {/* Provisioning Requests Table */}
        <TableContainer component={Paper} sx={{ marginTop: 3 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>{unit.hoursWorked ? 'Intervention Location' : 'Store'}</TableCell>
                <TableCell>{unit.hoursWorked ? 'Hours Requested' : 'Units'}</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {provisioningRequests.map((request, index) => (
                <TableRow key={index}>
                  <TableCell>{request.store}</TableCell>
                  <TableCell>{request.units}</TableCell>
                  <TableCell>{request.status}</TableCell>
                  <TableCell>
                    <IconButton color="error" onClick={() => handleCancelProvisioning(index)}>
                      <CancelIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Stop Selling Requests Table */}
        <TableContainer component={Paper} sx={{ marginTop: 3 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>{unit.hoursWorked ? 'Intervention Location' : 'Store'}</TableCell>
                <TableCell>{unit.hoursWorked ? 'Stop Duration' : 'Duration'}</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Justification</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {stopSellingRequests.map((request, index) => (
                <TableRow key={index}>
                  <TableCell>{request.store}</TableCell>
                  <TableCell>{request.duration}</TableCell>
                  <TableCell>{request.status}</TableCell>
                  <TableCell>{request.justification}</TableCell>
                  <TableCell>
                    <IconButton color="error" onClick={() => handleCancelStopSelling(index)}>
                      <CancelIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Provisioning Modal */}
        <Dialog open={provisioningModalOpen} onClose={() => setProvisioningModalOpen(false)}>
          <DialogTitle>{unit.hoursWorked ? 'Request Another Intervention' : 'Provision Product'}</DialogTitle>
          <DialogContent>
            <TextField
              select
              label={unit.hoursWorked ? 'Select Location' : 'Select Store'}
              value={selectedStore}
              onChange={(e) => setSelectedStore(e.target.value)}
              fullWidth
              margin="normal"
            >
              {stores.map((store, index) => (
                <MenuItem key={index} value={store}>
                  {store}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              label={unit.hoursWorked ? 'Hours to Schedule' : 'Units to Provision'}
              type="number"
              value={unitsToProvision}
              onChange={(e) => setUnitsToProvision(e.target.value)}
              fullWidth
              margin="normal"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setProvisioningModalOpen(false)}>Cancel</Button>
            <Button onClick={handleProvisioningSubmit} color="primary">
              Submit
            </Button>
          </DialogActions>
        </Dialog>

        {/* Stop Selling Modal */}
        <Dialog open={stopSellingModalOpen} onClose={() => setStopSellingModalOpen(false)}>
          <DialogTitle>{unit.hoursWorked ? 'Stop Scheduling Interventions' : 'Stop Selling Product'}</DialogTitle>
          <DialogContent>
            <TextField
              select
              label={unit.hoursWorked ? 'Select Location' : 'Select Store'}
              value={selectedStore}
              onChange={(e) => setSelectedStore(e.target.value)}
              fullWidth
              margin="normal"
            >
              {stores.map((store, index) => (
                <MenuItem key={index} value={store}>
                  {store}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              select
              label="Duration"
              value={selectedDuration}
              onChange={(e) => setSelectedDuration(e.target.value)}
              fullWidth
              margin="normal"
            >
              <MenuItem value="7 days">7 Days</MenuItem>
              <MenuItem value="14 days">14 Days</MenuItem>
              <MenuItem value="1 month">1 Month</MenuItem>
              <MenuItem value="3 months">3 Months</MenuItem>
            </TextField>
            <TextField
              label="Justification"
              value={justification}
              onChange={(e) => setJustification(e.target.value)}
              fullWidth
              margin="normal"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setStopSellingModalOpen(false)}>Cancel</Button>
            <Button onClick={handleStopSellingSubmit} color="warning">
              Submit
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Container>
  );
};

export default UnitDetails;
