import React from 'react';
import {
  Table, Paper, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography, IconButton, InputAdornment
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import {
  calculateTotal, monthNames, calculateMonthlyTreasury, calculateAccumulatedTreasury, calculatePercentageBalanceVsEncaissements
} from './transactionHelpers';

const TransactionTable = ({
  inputValues = {}, // Default to an empty object if inputValues is undefined
  handleInputChange,
  handleFocus, handleBlur, handleKeyDown, handleMenuOpen, handleColumnMenuOpen, handleNatureMenuOpen, editingCell,
  highlightedRow, highlightedMonth
}) => {
  const presentedMonths = monthNames.slice(1);

  // Filter displayed months based on input values
  const displayedMonths = presentedMonths.filter((_, monthIndex) =>
    ["encaissements", "decaissements"].some(type =>
      inputValues[type] && Array.isArray(inputValues[type]) && 
      inputValues[type].some(transaction => transaction.montants[monthIndex] !== 0)
    )
  );
  
  const displayedMonthIndices = displayedMonths.map(month => presentedMonths.indexOf(month));

  // Ensure inputValues.encaissements and inputValues.decaissements are arrays
  const encaissements = inputValues.encaissements || [];
  const decaissements = inputValues.decaissements || [];

  // Calculate monthly and accumulated treasury, with checks for undefined properties
  const monthlyTreasury = calculateMonthlyTreasury(inputValues);
  const initialEncaissement = encaissements[encaissements.length - 1]?.montantInitial || 0;
  const initialDecaissement = decaissements[decaissements.length - 1]?.montantInitial || 0;
  const accumulatedTreasury = calculateAccumulatedTreasury(initialEncaissement - initialDecaissement, inputValues);
  const percentageVsEncaissements = calculatePercentageBalanceVsEncaissements(
    monthlyTreasury,
    encaissements[encaissements.length - 1]?.montants || []
  );

  const handleCellEdit = (type, index, monthIndex, value) => {
    handleInputChange(type, index, monthIndex, value);
  };

  const handleCellFocus = (type, index, monthIndex) => {
    handleFocus(type, index, monthIndex);
  };

  return (
    <TableContainer component={Paper} sx={{ overflowX: 'auto', width: '100%', boxShadow: 3, borderRadius: '10px' }}>
      <Table sx={{ minWidth: 650, width: '100%' }} size="small" aria-label="a dense table">
        <TableHead sx={{ backgroundColor: '#1e88e5' }}>
          <TableRow>
            <TableCell
              padding="normal"
              align="left"
              sx={{
                color: '#ffffff',
                position: 'sticky',
                left: 0,
                zIndex: 2,
                backgroundColor: '#1976d2',
                fontWeight: 'bold',
                borderRight: '1px solid #ffffff',
              }}
            >
              Type
            </TableCell>
            <TableCell
              padding="normal"
              align="left"
              sx={{
                color: '#ffffff',
                position: 'sticky',
                left: '120px',
                zIndex: 2,
                backgroundColor: '#1976d2',
                fontWeight: 'bold',
                borderRight: '1px solid #ffffff',
              }}
            >
              Nature de la transaction
            </TableCell>
            <TableCell
              padding="normal"
              align="left"
              sx={{ color: '#ffffff', backgroundColor: '#1976d2', fontWeight: 'bold', borderRight: '1px solid #ffffff' }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography align="left" gutterBottom style={{ flexGrow: 1 }}>
                  Solde Initial
                </Typography>
                <IconButton
                  aria-label="open column menu"
                  onClick={(event) => handleColumnMenuOpen(event, -1)}
                  edge="end"
                  size="small"
                  style={{ marginLeft: 'auto' }}
                >
                  <MoreVertIcon sx={{ color: '#ffffff' }} />
                </IconButton>
              </div>
            </TableCell>
            {displayedMonths.map((month, i) => (
              <TableCell
                key={month}
                align="left"
                padding="normal"
                sx={{ color: '#ffffff', backgroundColor: '#1976d2', fontWeight: 'bold', borderRight: '1px solid #ffffff' }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography align="left" gutterBottom style={{ flexGrow: 1 }}>
                    {month}
                  </Typography>
                  <IconButton
                    aria-label="open column menu"
                    onClick={(event) => handleColumnMenuOpen(event, i)}
                    edge="end"
                    size="small"
                    style={{ marginLeft: 'auto' }}
                  >
                    <MoreVertIcon sx={{ color: '#ffffff' }} />
                  </IconButton>
                </div>
              </TableCell>
            ))}
            <TableCell align="left" padding="normal" sx={{ color: '#ffffff', backgroundColor: '#1976d2', fontWeight: 'bold' }}>
              Total
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        {["encaissements", "decaissements"].map((type) => (
          <React.Fragment key={type}>
            {inputValues[type]?.map((transaction, index) => {
              const isHighlighted = 
                (type === 'encaissements' && highlightedRow.encaissements === transaction.nature) ||
                (type === 'decaissements' && highlightedRow.decaissements === transaction.nature);

              return (
                <TableRow key={index}>
                  {index === 0 && (
                    <TableCell
                      rowSpan={inputValues[type].length}
                      padding="normal"
                      align="left"
                      sx={{
                        backgroundColor: "#e3f2fd",
                        position: 'sticky',
                        left: 0,
                        zIndex: 1,
                        fontWeight: 'bold',
                        borderRight: '1px solid #cccccc',
                      }}
                    >
                      {type.charAt(0).toUpperCase() + type.slice(1)}
                    </TableCell>
                  )}
                  <TableCell
                    padding="normal"
                    align="left"
                    sx={{
                      backgroundColor: "#e3f2fd",
                      position: 'sticky',
                      left: '120px',
                      zIndex: 1,
                      borderRight: '1px solid #cccccc',
                    }}
                  >
                    {editingCell?.type === type && editingCell?.index === index && editingCell?.key === 'nature' ? (
                      <TextField
                        value={transaction.nature}
                        onChange={(e) => handleCellEdit(type, index, 'nature', e.target.value)}
                        onBlur={handleBlur}
                        onKeyDown={handleKeyDown}
                        fullWidth
                        inputProps={{
                          style: { height: '36px', padding: '0 8px', minWidth: '120px' },
                        }}
                      />
                    ) : (
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div onClick={() => handleCellFocus(type, index, 'nature')} style={{ height: '36px', padding: '0 8px', maxWidth: '150px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', flexGrow: 1 }}>
                          {transaction.nature}
                        </div>
                        <IconButton
                          aria-label="open nature menu"
                          onClick={(event) => handleNatureMenuOpen(event, type, index, {
                            selectedCategory: transaction.nature, // assuming nature is the category
                            selectedType: type,
                            selectedMonth: null, // This might be derived from `displayedMonths`
                            selectedYear: inputValues.name, // or another source if available
                            months: displayedMonths, // or another relevant list
                          })}
                          edge="end"
                          size="small"
                          style={{ marginLeft: 'auto', color: "#1976d2" }}
                        >
                          <MoreVertIcon />
                        </IconButton>
                      </div>
                    )}
                  </TableCell>
                  <TableCell padding="normal" align="left" sx={{ backgroundColor: isHighlighted ? 'rgba(0, 0, 255, 0.1)' : 'inherit', borderRight: '1px solid #cccccc' }}>
                    {editingCell?.type === type && editingCell?.index === index && editingCell?.key === 'montantInitial' ? (
                      <TextField
                        value={transaction.montantInitial}
                        onChange={(e) => handleCellEdit(type, index, 'montantInitial', e.target.value)}
                        onBlur={handleBlur}
                        onKeyDown={handleKeyDown}
                        fullWidth
                        inputProps={{
                          style: { height: '36px', padding: '0 8px', minWidth: '120px' },
                        }}
                      />
                    ) : (
                      <div onClick={() => handleCellFocus(type, index, 'montantInitial')} style={{ height: '36px', padding: '0 8px', minWidth: '120px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        {transaction.montantInitial}
                      </div>
                    )}
                  </TableCell>
                  {displayedMonths.map((presentedMonth, monthIndex) => (
                    <TableCell
                      padding="normal"
                      key={presentedMonth}
                      sx={{ 
                        backgroundColor: highlightedMonth === displayedMonthIndices[monthIndex] ? 'rgba(255, 0, 0, 0.1)' : isHighlighted ? 'rgba(0, 0, 255, 0.1)' : 'inherit', 
                        borderRight: '1px solid #cccccc' 
                      }}
                    >
                      {editingCell?.type === type && editingCell?.index === index && editingCell?.key === monthIndex ? (
                        <TextField
                          value={transaction.montants?.[displayedMonthIndices[monthIndex]] || ''}
                          onChange={(e) => handleCellEdit(type, index, displayedMonthIndices[monthIndex], e.target.value)}
                          onBlur={handleBlur}
                          onKeyDown={handleKeyDown}
                          fullWidth
                          InputProps={{
                            sx: { height: '36px', minWidth: '120px', padding: '0 2px', '& input': { padding: '5px' } },
                            endAdornment: (
                              <InputAdornment position="end">
                                <IconButton
                                  aria-label="open menu"
                                  onClick={(event) => handleMenuOpen(event, type, index, displayedMonthIndices[monthIndex])}
                                  edge="end"
                                  size="small"
                                >
                                  <MoreVertIcon sx={{ color: "#1976d2" }} />
                                </IconButton>
                              </InputAdornment>
                            ),
                          }}
                        />
                      ) : (
                        <div onClick={() => handleCellFocus(type, index, displayedMonthIndices[monthIndex])} style={{ height: '36px', padding: '0 8px', minWidth: '120px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                          {transaction.montants?.[displayedMonthIndices[monthIndex]] || ''}
                        </div>
                      )}
                    </TableCell>
                  ))}
                  <TableCell align="left" padding="normal" sx={{ backgroundColor: isHighlighted ? 'rgba(0, 0, 255, 0.1)' : 'inherit', fontWeight: 'bold' }}>
                    {calculateTotal(type, index, inputValues)}
                  </TableCell>
                </TableRow>
              );
            })}
          </React.Fragment>
        ))}
          <TableRow>
            <TableCell colSpan={3} padding="normal" sx={{ fontWeight: 'bold', backgroundColor: '#e3f2fd', borderTop: '2px solid #1976d2' }} align="left">Solde de la Trésorerie</TableCell>
            {displayedMonthIndices.map((monthIndex) => (
              <TableCell
                key={monthIndex}
                align="left"
                padding="normal"
                sx={{ 
                  backgroundColor: monthlyTreasury[monthIndex] < 0 ? 'rgba(255, 0, 0, 0.5)' : 'rgba(0, 255, 0, 0.5)', 
                  fontWeight: 'bold', 
                  borderTop: '2px solid #1976d2',
                  borderRight: '1px solid #cccccc',
                }}
              >
                {monthlyTreasury[monthIndex]}
              </TableCell>
            ))}
            <TableCell align="left" padding="normal" sx={{ fontWeight: 'bold', borderTop: '2px solid #1976d2' }}>
              {monthlyTreasury.reduce((acc, curr) => acc + curr, 0)}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell colSpan={3} padding="normal" sx={{ fontWeight: 'bold', backgroundColor: '#e3f2fd' }} align="left">Trésorerie Accumulée</TableCell>
            {displayedMonthIndices.map((monthIndex) => (
              <TableCell
                key={monthIndex}
                align="left"
                padding="normal"
                sx={{ 
                  backgroundColor: accumulatedTreasury[monthIndex] < 0 ? 'rgba(255, 0, 0, 0.5)' : 'rgba(0, 255, 0, 0.5)', 
                  fontWeight: 'bold',
                  borderRight: '1px solid #cccccc', 
                }}
              >
                {accumulatedTreasury[monthIndex]}
              </TableCell>
            ))}
            <TableCell align="left" padding="normal" sx={{ fontWeight: 'bold' }}>
              {accumulatedTreasury.slice(-1)[0]}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell colSpan={3} padding="normal" sx={{ fontWeight: 'bold', backgroundColor: '#e3f2fd' }} align="left">Percentage of Treasury vs Encaissements</TableCell>
            {displayedMonthIndices.map((monthIndex) => (
              <TableCell
                key={monthIndex}
                align="left"
                padding="normal"
                sx={{ 
                  backgroundColor: percentageVsEncaissements[monthIndex] < 0 ? 'rgba(255, 0, 0, 0.5)' : 'rgba(0, 255, 0, 0.5)', 
                  fontWeight: 'bold',
                  borderRight: '1px solid #cccccc',
                }}
              >
                {percentageVsEncaissements[monthIndex]?.toFixed(2)}%
              </TableCell>
            ))}
            <TableCell align="left" padding="normal" sx={{ fontWeight: 'bold' }}>-</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TransactionTable;
