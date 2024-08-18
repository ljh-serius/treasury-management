import React, { useState, useEffect } from 'react';
import {
  Box, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TableSortLabel,
  Toolbar, Typography, Paper, Checkbox as MUICheckbox, IconButton, Tooltip, Modal, TextField, Button, Container,
  FormControlLabel, Switch, Grid, FormControl, InputLabel, Select, MenuItem, Chip, Stack, Autocomplete
} from '@mui/material';
import { alpha } from '@mui/material/styles';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import CloseIcon from '@mui/icons-material/Close';

import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { faker } from '@faker-js/faker';

import { Link } from 'react-router-dom';

function getRandomArbitraryInteger(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

const truncateText = (text, wordLimit) => {
  const words = text.split(' ');
  if (words.length <= wordLimit) return text;
  return words.slice(0, wordLimit).join(' ') + '...';
};

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) return -1;
  if (b[orderBy] > a[orderBy]) return 1;
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

function BaseTableHead({ headCells, order, orderBy, onRequestSort, onSelectAllClick, numSelected, rowCount }) {
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <MUICheckbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              'aria-label': 'select all items',
            }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

function BaseTableToolbar({ numSelected, onAdd, onDelete, onEdit }) {
  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) => alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography sx={{ flex: '1 1 100%' }} color="inherit" variant="subtitle1" component="div">
          {numSelected} selected
        </Typography>
      ) : (
        <Typography sx={{ flex: '1 1 100%' }} variant="h6" id="tableTitle" component="div">
          Items
        </Typography>
      )}
      {numSelected === 1 ? (
        <Tooltip title="Edit">
          <IconButton onClick={onEdit}>
            <EditIcon />
          </IconButton>
        </Tooltip>
      ) : null}
      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton onClick={onDelete}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Add">
          <IconButton onClick={onAdd}>
            <AddIcon />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
}

function BaseModal({ open, onClose, onSubmit, initialData, fieldConfig }) {
  const [formData, setFormData] = useState(
    initialData || Object.keys(fieldConfig).reduce((acc, field) => {
      acc[field] = fieldConfig[field].multiple ? [] : '';
      return acc;
    }, {})
  );

  useEffect(() => {
    setFormData(
      initialData || Object.keys(fieldConfig).reduce((acc, field) => {
        acc[field] = fieldConfig[field].multiple ? [] : '';
        return acc;
      }, {})
    );
  }, [initialData, fieldConfig]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleAutocompleteChange = (event, value, field) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: fieldConfig[field].multiple ? (value ? value.map((v) => v.id) : []) : (value ? value.id : ''),
    }));
  };

  const handleSubmit = () => {
    onSubmit(formData);
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '80%',
          maxWidth: 1200,
          height: '80%',
          bgcolor: 'background.paper',
          border: '2px solid #000',
          boxShadow: 24,
          p: 4,
          overflowY: 'auto',
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
          <Typography variant="h6" component="h2">
            {initialData ? 'Edit Item' : 'Add Item'}
          </Typography>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2}>
            {Object.keys(fieldConfig).map((field) => (
              <Grid item xs={12} sm={6} md={4} key={field}>
                {fieldConfig[field].type === 'select' ? (
                  <Autocomplete
                    multiple={fieldConfig[field].multiple}
                    options={fieldConfig[field].options}
                    getOptionLabel={(option) => option.label}
                    value={fieldConfig[field].multiple
                      ? fieldConfig[field].options.filter((option) =>
                          formData[field] ? formData[field].includes(option.id) : false
                        )
                      : fieldConfig[field].options.find((option) => option.id === formData[field]) || null}
                    onChange={(event, value) => handleAutocompleteChange(event, value, field)}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label={fieldConfig[field].label}
                        placeholder={`Search ${fieldConfig[field].label}`}
                        fullWidth
                      />
                    )}
                    isOptionEqualToValue={(option, value) => option.id === value.id}
                  />
                ) : (
                  <TextField
                    label={fieldConfig[field].label}
                    name={field}
                    type={fieldConfig[field].type}
                    value={formData[field]}
                    onChange={handleChange}
                    fullWidth
                    multiline={fieldConfig[field].multiline || false}
                    rows={fieldConfig[field].rows || 1}
                    InputLabelProps={fieldConfig[field].type === 'date' ? { shrink: true } : undefined}
                  />
                )}
              </Grid>
            ))}
          </Grid>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 2 }}>
          <Button onClick={onClose}>Cancel</Button>
          <Button variant="contained" onClick={handleSubmit}>
            {initialData ? 'Update' : 'Add'}
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}

function FilterManager({ filters, setFilters, fieldConfig }) {
  const [currentFilter, setCurrentFilter] = useState({ column: '', value: '', active: true });

  const addFilter = () => {
    if (currentFilter.column && currentFilter.value) {
      setFilters((prevFilters) => [
        ...prevFilters,
        { id: Date.now(), ...currentFilter },
      ]);
      setCurrentFilter({ column: '', value: '', active: true });
    }
  };

  const handleFilterChange = (key, value) => {
    setCurrentFilter((prevFilter) => ({
      ...prevFilter,
      [key]: value,
    }));
  };

  const toggleFilterActive = (id) => {
    setFilters((prevFilters) =>
      prevFilters.map((filter) =>
        filter.id === id ? { ...filter, active: !filter.active } : filter
      )
    );
  };

  const removeFilter = (id) => {
    setFilters((prevFilters) => prevFilters.filter((filter) => filter.id !== id));
  };

  return (
    <Box sx={{ pl: 1, pt: 2, pb: 2, width: '100%' }}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={4}>
          <FormControl fullWidth >
            <InputLabel>Column</InputLabel>
            <Select
              value={currentFilter.column}
              onChange={(e) => handleFilterChange('column', e.target.value)}
              label="Column"
            >
              {Object.keys(fieldConfig).map((field) => (
                <MenuItem key={field} value={field}>
                  {fieldConfig[field].label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={4}>
          {fieldConfig[currentFilter.column]?.type === 'select' ? (
            <FormControl fullWidth>
              <InputLabel>Value</InputLabel>
              <Select
                value={currentFilter.value}
                onChange={(e) => handleFilterChange('value', e.target.value)}
                label="Value"
              >
                {fieldConfig[currentFilter.column]?.options.map((option) => (
                  <MenuItem key={option.id} value={option.id}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          ) : (
            <TextField
              value={currentFilter.value}
              onChange={(e) => handleFilterChange('value', e.target.value)}
              placeholder="Enter value"
            />
          )}
        </Grid>
        <Grid item xs={12} sm={4}>
          <Button
            startIcon={<AddCircleOutlineIcon />}
            onClick={addFilter}
            variant="outlined"
            fullWidth
            height="64px"
          >
            Add Filter
          </Button>
        </Grid>
      </Grid>
      <Stack direction="row" spacing={1} sx={{ mt: 2, flexWrap: 'wrap' }}>
        {filters.filter(filter => filter.column && filter.value).map((filter) => (
          <Chip
            key={filter.id}
            label={`${fieldConfig[filter.column]?.label}: ${filter.value}`}
            onDelete={() => removeFilter(filter.id)}
            deleteIcon={<DeleteIcon />}
            color={filter.active ? "primary" : "default"}
            variant="outlined"
            sx={{ marginBottom: 1 }}
          />
        ))}
      </Stack>
    </Box>
  );
}

export default function BaseTableComponent({
  fetchItems,
  addItem,
  updateItem,
  deleteItem,
  fieldConfig,
  entityName
}) {
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState(Object.keys(fieldConfig)[0]);
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [dense, setDense] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [filters, setFilters] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchItems();
      setItems(data);
    };

    fetchData();
  }, [fetchItems]);

  useEffect(() => {
    let filteredData = items;

    filters.forEach((filter) => {
      if (filter.active && filter.column && filter.value) {
        filteredData = filteredData.filter((item) =>
          item[filter.column]?.toString().toLowerCase().includes(filter.value.toLowerCase())
        );
      }
    });

    setFilteredItems(filteredData);
  }, [filters, items]);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = filteredItems.map((n) => n.id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }
    setSelected(newSelected);
  };

  const handleAddItem = () => {
    setCurrentItem(null);
    setModalOpen(true);
  };

  const handleEditItem = () => {
    const itemToEdit = filteredItems.find((item) => item.id === selected[0]);
    setCurrentItem(itemToEdit);
    setModalOpen(true);
  };

  const handleDeleteItems = async () => {
    try {
      await Promise.all(selected.map((id) => deleteItem(id)));
      setSelected([]);
      const data = await fetchItems();
      setItems(data);
    } catch (error) {
      console.error(`Error deleting ${entityName}:`, error);
    }
  };

  const handleModalSubmit = async (itemData) => {
    try {
      if (currentItem) {
        await updateItem(currentItem.id, itemData);
      } else {
        await addItem(itemData);
      }
      const data = await fetchItems();
      setItems(data);
      setModalOpen(false);
    } catch (error) {
      console.error(`Error saving ${entityName}:`, error);
    }
  };
  
  const generateRandomRow = async () => {
    const getRandomElementId = (arr) => {
      if (!Array.isArray(arr) || arr.length === 0) return null;
      const randomIndex = Math.floor(Math.random() * arr.length);
      const element = arr[randomIndex];
      return element && element.id ? element.id : null;
    };
  
    const getMultipleRandomElementIds = (arr) => {
      if (!Array.isArray(arr) || arr.length === 0) return [];
      const randomCount = Math.floor(Math.random() * arr.length) + 1;
      let result = new Set();
    
      while (result.size < randomCount) {
        const randomElement = getRandomElementId(arr);
        result.add(randomElement);
      }
    
      console.log("RESULT ", Array.from(result));
      return Array.from(result);
    };
    
    const newRow = Object.keys(fieldConfig).reduce((acc, key) => {
      const field = fieldConfig[key];
      let value;
  
      if (field.faker) {
        const fakerPath = field.faker.split('.');
        if (fakerPath[0] === 'random' && field.type === 'select' && field.multiple) {
          value = getMultipleRandomElementIds(field.options);
        } else if (fakerPath[0] === 'random' && field.type === 'select') {
          value = getRandomElementId(field.options);
        } else {
          value = fakerPath.reduce((acc, method) => acc[method], faker);
  
          // Handle different types of date generation
          if (field.faker === 'date.past') {
            value = new Date(value(10, 0)).toISOString(); // Past date within the last 10 years
          } else if (field.faker === 'date.future') {
            value = new Date(value(10, 1)).toISOString(); // Future date within the next 10 years
          } else if (field.faker === 'date.recent') {
            const sixMonthsAgo = new Date();
            sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
            value = new Date(value(sixMonthsAgo)).toISOString(); // Date within the last 6 months
          } else {
            value = typeof value === 'function' ? value() : value;
          }
        }
      } else {
        value = field.type === 'number' ? faker.datatype.number() : faker.lorem.word();
      }
  
      acc[key] = value;
      return acc;
    }, {});
  
    try {
      await addItem(newRow);
      const data = await fetchItems();
      setItems(data);
    } catch (error) {
      console.error(`Error generating and saving random ${entityName}:`, error);
    }
  };
  
  
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  const isSelected = (id) => selected.indexOf(id) !== -1;

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - filteredItems.length) : 0;

  const visibleRows = React.useMemo(
    () =>
      stableSort(filteredItems, getComparator(order, orderBy)).slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
      ),
    [order, orderBy, page, rowsPerPage, filteredItems]
  );

const logit = (field) => {
  console.log("fdqskjfs ", field)
}

  return (
    <Container maxWidth="xl" sx={{ paddingTop: 3, paddingBottom: 7 }}>
      <Box sx={{ maxWidth: '80vw' }}>
        <FilterManager filters={filters} setFilters={setFilters} fieldConfig={fieldConfig} />
        <Paper sx={{ width: '100%', mb: 2 }}>
          <BaseTableToolbar
            numSelected={selected.length}
            onAdd={handleAddItem}
            onDelete={handleDeleteItems}
            onEdit={handleEditItem}
          />
          <Button onClick={generateRandomRow} variant="contained" color="secondary" sx={{ margin: 2 }}>
            Generate Random Row
          </Button>
          <TableContainer>
            <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle" size={dense ? 'small' : 'medium'}>
              <BaseTableHead
                headCells={Object.keys(fieldConfig).map(key => ({
                  id: key,
                  label: fieldConfig[key].label,
                }))}
                order={order}
                orderBy={orderBy}
                onRequestSort={handleRequestSort}
                onSelectAllClick={handleSelectAllClick}
                numSelected={selected.length}
                rowCount={filteredItems.length}
              />
              <TableBody>
                {visibleRows.map((row, index) => {
                  console.log("visible row", row.id)
                  const isItemSelected = isSelected(row.id);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      onClick={(event) => handleClick(event, row.id)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.id}
                      selected={isItemSelected}
                      sx={{ cursor: 'pointer' }}
                    >
                      <TableCell padding="checkbox">
                        <MUICheckbox
                          color="primary"
                          checked={isItemSelected}
                          inputProps={{ 'aria-labelledby': labelId }}
                        />
                      </TableCell>
                      {Object.keys(fieldConfig).map((field) => {
                        const cellValue = row[field];
                        const isTextField = fieldConfig[field].type === 'text';
                        const isCheckboxField = fieldConfig[field].type === 'checkbox';
                        const isMultipleSelectField = fieldConfig[field].type === 'select' && fieldConfig[field].multiple === true;
                        const link = fieldConfig[field].link;
                        let displayValue;

                        if (isTextField) {
                          displayValue = cellValue ? truncateText(cellValue.toString(), 5) : '';
                        } else if (isCheckboxField) {
                          displayValue = cellValue ? 'True' : 'False';
                        } else if (isMultipleSelectField) {

                          console.log("ROW ", [row, cellValue, field])
                          if(link){
                            displayValue = cellValue ? cellValue.map((element) => {
                              return (
                                <div key={element}>
                                  <Link to={`${link}/${element}`} onClick={(e) => e.stopPropagation()}>
                                    {element}
                                  </Link>
                                </div>
                              )
                            }) : null;
                          } else {
                            displayValue = cellValue;
                          }
                        }else {
                          displayValue = cellValue !== undefined && cellValue !== null ? cellValue.toString() : 'N/A';
                        }

                        return (
                          <TableCell key={field} align={fieldConfig[field].numeric ? 'right' : 'left'}>
                            { displayValue ? displayValue : '--' }
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
                {emptyRows > 0 && (
                  <TableRow
                    style={{
                      height: (dense ? 33 : 53) * emptyRows,
                    }}
                  >
                    <TableCell colSpan={Object.keys(fieldConfig).length + 2} />
                  </TableRow>
                )}
              </TableBody>

            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={filteredItems.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
        <FormControlLabel control={<Switch checked={dense} onChange={handleChangeDense} />} label="Dense padding" />
        <BaseModal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          onSubmit={handleModalSubmit}
          initialData={currentItem}
          fieldConfig={fieldConfig}
        />
      </Box>
    </Container>
  );
}

