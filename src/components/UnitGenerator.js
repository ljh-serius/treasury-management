import React, { useState } from 'react';
import {
  Box,
  Button,
  Container,
  Drawer,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Pagination,
  Switch,
  FormControlLabel,
} from '@mui/material';

const generateRandomUnits = (count) => {
  const workUnits = [];
  const productUnits = [];
  for (let i = 0; i < count; i++) {
    const unit = {
      id: i + 1,
      description: `Unit ${i + 1}`,
      quantity: Math.floor(Math.random() * 100) + 1,
      unitPrice: (Math.random() * 100).toFixed(2),
      totalBeforeDiscount: (Math.random() * 1000).toFixed(2),
      finalAmount: (Math.random() * 900).toFixed(2),
    };
    if (i % 2 === 0) {
      workUnits.push({
        ...unit,
        type: 'Work',
        hoursWorked: (Math.random() * 10).toFixed(2),
        rate: (Math.random() * 50).toFixed(2),
      });
    } else {
      productUnits.push({
        ...unit,
        type: 'Product',
      });
    }
  }
  return { workUnits, productUnits };
};

const UnitGenerator = () => {
  const [workUnits, setWorkUnits] = useState([]);
  const [productUnits, setProductUnits] = useState([]);
  const [page, setPage] = useState(1);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [showWorkUnits, setShowWorkUnits] = useState(true);
  const rowsPerPage = 10;

  const handleGenerateUnits = () => {
    const { workUnits, productUnits } = generateRandomUnits(100);
    setWorkUnits(workUnits);
    setProductUnits(productUnits);
    setDrawerOpen(false);
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const paginatedUnits = (showWorkUnits ? workUnits : productUnits).slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

  return (
    <Container maxWidth="lg" sx={{ paddingTop: 3, paddingBottom: 7 }}>
      <Box sx={{ padding: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Button variant="contained" color="primary" onClick={() => setDrawerOpen(true)}>
            Generate Units
          </Button>

          <FormControlLabel
            control={<Switch checked={showWorkUnits} onChange={() => setShowWorkUnits(!showWorkUnits)} />}
            label={showWorkUnits ? 'Show Work Units' : 'Show Product Units'}
            sx={{ marginTop: 2 }}
          />
        </Box>

        <TableContainer component={Paper} sx={{ marginTop: 3 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Type</TableCell>
                <TableCell>Quantity</TableCell>
                <TableCell>Unit Price</TableCell>
                {showWorkUnits && <TableCell>Hours Worked</TableCell>}
                {showWorkUnits && <TableCell>Rate</TableCell>}
                <TableCell>Total Before Discount</TableCell>
                <TableCell>Final Amount</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedUnits.map((unit) => (
                <TableRow key={unit.id}>
                  <TableCell>{unit.id}</TableCell>
                  <TableCell>{unit.description}</TableCell>
                  <TableCell>{unit.type}</TableCell>
                  <TableCell>{unit.quantity}</TableCell>
                  <TableCell>{unit.unitPrice}€</TableCell>
                  {showWorkUnits && <TableCell>{unit.hoursWorked}</TableCell>}
                  {showWorkUnits && <TableCell>{unit.rate}€</TableCell>}
                  <TableCell>{unit.totalBeforeDiscount}€</TableCell>
                  <TableCell>{unit.finalAmount}€</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Pagination
          count={Math.ceil((showWorkUnits ? workUnits : productUnits).length / rowsPerPage)}
          page={page}
          onChange={handlePageChange}
          sx={{ marginTop: 2 }}
        />
      </Box>

      <Drawer anchor="right" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        <Box sx={{ width: 300, padding: 2 }}>
          <Typography variant="h6">Generate Units</Typography>
          <Button variant="contained" color="primary" onClick={handleGenerateUnits} sx={{ mt: 2 }}>
            Generate 100 Units
          </Button>
        </Box>
      </Drawer>
    </Container>
  );
};

export default UnitGenerator;
    