import React from 'react';
import {
  Table, Paper, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography, IconButton, InputAdornment
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { calculateTotal, monthNames, calculateMonthlyTreasury, calculateAccumulatedTreasury, calculatePercentageBalanceVsEncaissements } from './transactionHelpers';

const TransactionTable = ({
  transactions, inputValues, handleInputChange,
  handleFocus, handleBlur, handleKeyDown, handleMenuOpen, handleColumnMenuOpen, handleNatureMenuOpen, editingCell,
  highlightedRow, highlightedMonth, highlightedCumulativeMonth
}) => {
  return (
    <TableContainer component={Paper} sx={{ overflowX: 'auto', width: '100%' }}>
      <Table sx={{ minWidth: 650, width: '100vw' }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell padding="normal" align="left">Type</TableCell>
            <TableCell padding="normal" align="left">Nature de la transaction</TableCell>
            <TableCell padding="normal" align="left">
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
                  <MoreVertIcon />
                </IconButton>
              </div>
            </TableCell>
            {monthNames.slice(1).map((month, i) => (
              <TableCell key={i} align="left" padding="normal">
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
                    <MoreVertIcon />
                  </IconButton>
                </div>
              </TableCell>
            ))}
            <TableCell align="left" padding="normal">Total</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Object.keys(inputValues).map((type) => (
            <React.Fragment key={type}>
              {inputValues[type].map((transaction, index) => {
                const isHighlighted = (type === 'encaissements' && highlightedRow.encaissements === transaction.nature) ||
                  (type === 'decaissements' && highlightedRow.decaissements === transaction.nature);

                return (
                  <TableRow key={index}>
                    {index === 0 && (
                      <TableCell
                        rowSpan={inputValues[type].length}
                        padding="normal"
                        align="left"
                        sx={{
                          backgroundColor: inputValues[type].some(t =>
                            (type === 'encaissements' && highlightedRow.encaissements === t.nature) ||
                            (type === 'decaissements' && highlightedRow.decaissements === t.nature)
                          ) ? 'rgba(0, 0, 255, 0.1)' : 'inherit'
                        }}
                      >
                        {type.charAt(0).toUpperCase() + type.slice(1)}
                      </TableCell>
                    )}
                    <TableCell padding="normal" align="left" sx={{ backgroundColor: isHighlighted ? 'rgba(0, 0, 255, 0.1)' : 'inherit' }}>
                      {editingCell?.type === type && editingCell?.index === index && editingCell?.key === 'nature' ? (
                        <TextField
                          value={transaction.nature}
                          onChange={(e) => handleInputChange(type, index, 'nature', e.target.value)}
                          onBlur={handleBlur}
                          onKeyDown={handleKeyDown}
                          fullWidth
                          inputProps={{
                            style: { height: '36px', padding: '0 8px', minWidth: '120px' },
                          }}
                        />
                      ) : (
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <div onClick={() => handleFocus(type, index, 'nature')} style={{ height: '36px', padding: '0 8px', minWidth: '120px', whiteSpace: 'nowrap', flexGrow: 1 }}>
                            {transaction.nature}
                          </div>
                          <IconButton
                            aria-label="open nature menu"
                            onClick={(event) => handleNatureMenuOpen(event, type, index)}
                            edge="end"
                            size="small"
                            style={{ marginLeft: 'auto' }}
                          >
                            <MoreVertIcon />
                          </IconButton>
                        </div>
                      )}
                    </TableCell>
                    <TableCell padding="normal" align="left" sx={{ backgroundColor: isHighlighted ? 'rgba(0, 0, 255, 0.1)' : 'inherit' }}>
                      {editingCell?.type === type && editingCell?.index === index && editingCell?.key === 'montantInitial' ? (
                        <TextField
                          value={transaction.montantInitial}
                          onChange={(e) => handleInputChange(type, index, 'montantInitial', e.target.value)}
                          onBlur={handleBlur}
                          onKeyDown={handleKeyDown}
                          fullWidth
                          inputProps={{
                            style: { height: '36px', padding: '0 8px', minWidth: '120px' },
                          }}
                        />
                      ) : (
                        <div onClick={() => handleFocus(type, index, 'montantInitial')} style={{ height: '36px', padding: '0 8px', minWidth: '120px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                          {transaction.montantInitial}
                        </div>
                      )}
                    </TableCell>
                    {transaction.montants.map((montant, i) => (
                      <TableCell
                        padding="normal"
                        key={i}
                        sx={{ backgroundColor: highlightedMonth === i ? 'rgba(255, 0, 0, 0.1)' : isHighlighted ? 'rgba(0, 0, 255, 0.1)' : (highlightedCumulativeMonth !== null && i <= highlightedCumulativeMonth) ? 'rgba(0, 0, 255, 0.1)' : 'inherit' }}
                      >
                        {editingCell?.type === type && editingCell?.index === index && editingCell?.key === i ? (
                          <TextField
                            value={montant}
                            onChange={(e) => handleInputChange(type, index, i, e.target.value)}
                            onBlur={handleBlur}
                            onKeyDown={handleKeyDown}
                            fullWidth
                            InputProps={{
                              sx: { height: '36px', minWidth: '120px', padding: '0 2px', '& input': { padding: '5px' } },
                              endAdornment: (
                                <InputAdornment position="end">
                                  <IconButton
                                    aria-label="open menu"
                                    onClick={(event) => handleMenuOpen(event, type,  index, i)}
                                    edge="end"
                                    size="small"
                                  >
                                    <MoreVertIcon />
                                  </IconButton>
                                </InputAdornment>
                              ),
                            }}
                          />
                        ) : (
                          <div onClick={() => handleFocus(type, index, i)} style={{ height: '36px', padding: '0 8px', minWidth: '120px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            {montant}
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
            <TableCell colSpan={3} padding="normal" sx={{ fontWeight: 'bold' }} align="left">Solde de la Trésorerie</TableCell>
            {calculateMonthlyTreasury(transactions).map((treasury, index) => (
              <TableCell
                key={index}
                align="left"
                padding="normal"
                sx={{ backgroundColor: treasury < 0 ? 'rgba(255, 0, 0, 0.5)' : 'rgba(0, 255, 0, 0.5)', fontWeight: 'bold' }}
              >
                {treasury}
              </TableCell>
            ))}
            <TableCell align="left" padding="normal" sx={{ fontWeight: 'bold' }}>{calculateMonthlyTreasury(transactions).reduce((acc, curr) => acc + curr, 0)}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell colSpan={3} padding="normal" sx={{ fontWeight: 'bold' }} align="left">Trésorerie Accumulée</TableCell>
            {calculateAccumulatedTreasury(transactions.encaissements[transactions.encaissements.length - 1].montantInitial - transactions.decaissements[transactions.decaissements.length - 1].montantInitial, transactions).map((treasury, index) => (
              <TableCell
                key={index}
                align="left"
                padding="normal"
                sx={{ backgroundColor: treasury < 0 ? 'rgba(255, 0, 0, 0.5)' : 'rgba(0, 255, 0, 0.5)', fontWeight: 'bold' }}
              >
                {treasury}
              </TableCell>
            ))}
            <TableCell align="left" padding="normal" sx={{ fontWeight: 'bold' }}>{calculateAccumulatedTreasury(transactions.encaissements[transactions.encaissements.length - 1].montantInitial - transactions.decaissements[transactions.decaissements.length - 1].montantInitial, transactions).slice(-1)[0]}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell colSpan={3} padding="normal" sx={{ fontWeight: 'bold' }} align="left">Percentage of Treasury vs Encaissements</TableCell>
            {calculatePercentageBalanceVsEncaissements(calculateMonthlyTreasury(transactions), transactions.encaissements[transactions.encaissements.length - 1].montants).map((value, index) => (
              <TableCell
                key={index}
                align="left"
                padding="normal"
                sx={{ backgroundColor: value < 0 ? 'rgba(255, 0, 0, 0.5)' : 'rgba(0, 255, 0, 0.5)', fontWeight: 'bold' }}
              >
                {value.toFixed(2)}%
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
