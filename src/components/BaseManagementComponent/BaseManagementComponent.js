import React, { useState, useEffect } from 'react';
import {
  Box, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TableSortLabel,
  Toolbar, Typography, Paper, Checkbox as MUICheckbox, IconButton, Tooltip, Modal, TextField, Button, Container,
  FormControlLabel, Switch, Grid, FormControl, InputLabel, Select, MenuItem, Chip, Stack, Autocomplete, Backdrop,
  CircularProgress
} from '@mui/material';

import { alpha } from '@mui/material/styles';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import CloseIcon from '@mui/icons-material/Close';

import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

import { faker } from '@faker-js/faker';

import { Link } from 'react-router-dom';

const truncateText = (text, wordLimit) => {
  const words = text.split(' ');
  if (words.length <= wordLimit) return text;
  return words.slice(0, wordLimit).join(' ') + '...';
};

const getDateFormatyyyyMMdd = (dateString) => {
  console.log("Date string ", dateString)
  const [year, month, day] = dateString.split('T')[0].split('-');
  const formattedDate = `${year}-${month}-${day}`;
  return formattedDate;
}

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

function BaseTableToolbar({ numSelected, onAdd, onDelete, onEdit, entityName}) {
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
          { entityName }
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
  // Lazy initialization of formData
  const [formData, setFormData] = useState(() => 
    Object.keys(fieldConfig).reduce((acc, field) => {
      acc[field] = initialData && initialData[field] !== undefined ? initialData[field] : (fieldConfig[field].multiple ? [] : '');
      return acc;
    }, {})
  );

  // Update formData when initialData changes
  useEffect(() => {
    if (initialData) {
      setFormData((prevData) => 
        Object.keys(fieldConfig).reduce((acc, field) => {
          acc[field] = initialData[field] !== undefined ? initialData[field] : prevData[field];
          return acc;
        }, {})
      );
    }
  }, [initialData, fieldConfig]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    // Only update if the value has changed
    if (formData[name] !== value) {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleAutocompleteChange = (event, value, field) => {
    const newValue = fieldConfig[field].multiple
      ? (value ? value.map((v) => v.id) : [])
      : (value ? value.id : '');

    // Only update if the value has changed
    if (formData[field] !== newValue) {
      setFormData((prevData) => ({
        ...prevData,
        [field]: newValue,
      }));
    }
  };

  const handleSubmit = () => {
    onSubmit(formData);

    // Reset formData to its initial state after submission
    setFormData(() => 
      Object.keys(fieldConfig).reduce((acc, field) => {
        acc[field] = initialData && initialData[field] !== undefined ? initialData[field] : (fieldConfig[field].multiple ? [] : '');
        return acc;
      }, {})
    );
  };

  const handleClose = () => {
    // Clear the form data on close
    setFormData(() => 
      Object.keys(fieldConfig).reduce((acc, field) => {
        acc[field] = fieldConfig[field].multiple ? [] : '';
        return acc;
      }, {})
    );

    onClose();
  };

  return (
    <Modal open={open} onClose={handleClose}>
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
          <IconButton onClick={handleClose}>
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
                    value={fieldConfig[field].type === 'date' ? (formData[field] ? getDateFormatyyyyMMdd(formData[field]) : '') : formData[field]}
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
          <Button onClick={handleClose}>Cancel</Button>
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
  entityName,
}) {
  const [refreshedFieldsConfig, setRefreshedFieldsConfig] = useState(fieldConfig);
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
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({});

  useEffect(() => {
    setRefreshedFieldsConfig(fieldConfig);
  }, [fieldConfig]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const data = await fetchItems();
      setItems(data);
      setLoading(false);
    };

    fetchData();
    setSelected([]);
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

  // Event listeners for key presses
  useEffect(() => {
    const handleKeyDown = async (event) => {
      if (event.shiftKey || event.ctrlKey) {
        if (event.key === '+') {
          event.preventDefault();
          handleAddItem();
        } else if (event.key === 'Backspace') {
            event.preventDefault();
            restoreItem();
        } else if (event.key === 'Delete') {
            event.preventDefault();
            confirmDelete();
            }
      };
      if(event.key === 'Enter' && modalOpen) {
        event.preventDefault();
        handleModalSubmit(formData);
      }
    }
    
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selected, modalOpen, currentItem, formData]);


  const storeItemInLocalStorage = (item) => {
    localStorage.setItem('lastDeletedOrUpdatedItem', JSON.stringify(item));
  };

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
    setFormData({});
    setModalOpen(true);
  };

  const handleEditItem = () => {
    const itemToEdit = filteredItems.find((item) => item.id === selected[0]);
    setCurrentItem(itemToEdit);
    setFormData(itemToEdit);
    setModalOpen(true);
  };

  const confirmDelete = () => {
    if (window.confirm("Are you sure you want to delete the selected items?")) {
      handleDeleteItems();
    }
  };

  const handleDeleteItems = async () => {
    try {
      setLoading(true);
      for (const id of selected) {
        const itemToDelete = items.find((item) => item.id === id);
        storeItemInLocalStorage(itemToDelete); // Store item before deletion
        await deleteItem(id); // Ensure this function deletes the item from the backend or state
      }
      setSelected([]);
      const data = await fetchItems(); // Refetch items from the backend to ensure the deleted items are no longer there
      setItems(data); // Update the items in the state with the latest data
    } catch (error) {
      console.error(`Error deleting ${entityName}:`, error);
    } finally {
      setLoading(false);
    }
  };

  const restoreItem = async () => {
    const lastItem = JSON.parse(localStorage.getItem('lastDeletedOrUpdatedItem'));
    if (lastItem) {
      try {
        setLoading(true);
  
        await updateItem(lastItem.id, lastItem);
        console.log(`Item with ID ${lastItem.id} was successfully updated.`);
        
      } catch (error) {
        if (error.message.includes("Could not update document in")) {
          console.log(`Item with ID ${lastItem.id} not found. Adding it instead.`);
          try {
            await addItem(lastItem);
            console.log(`Item with ID ${lastItem.id} was successfully added.`);
          } catch (addError) {
            console.error(`Failed to add item with ID ${lastItem.id}:`, addError);
          }
        } else {
          console.error(`Failed to update item with ID ${lastItem.id}:`, error);
        }
      } finally {
        try {
          const data = await fetchItems();
          setItems(data);
        } catch (fetchError) {
          console.error(`Error fetching items after restore:`, fetchError);
        } finally {
          setLoading(false);
          localStorage.removeItem('lastDeletedOrUpdatedItem'); // Clean up local storage after restoring
        }
      }
    } else {
      alert("No item to restore.");
    }
  };

  const handleModalSubmit = async (itemData) => {
    try {
      setLoading(true);
      if (currentItem) {
        storeItemInLocalStorage(currentItem); // Store item before update
        await updateItem(currentItem.id, itemData);
      } else {
        await addItem(itemData);
      }
      const data = await fetchItems();
      setItems(data);
      setModalOpen(false);
      setCurrentItem(null); // Clear currentItem after saving
      setFormData({}); // Clear formData after saving
      refreshAllFieldOptions(); // Refresh field config after saving
    } catch (error) {
      console.error(`Error saving ${entityName}:`, error);
    } finally {
      setLoading(false);
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
      if (randomElement) {
        result.add(randomElement);
      }
    }

    return Array.from(result);
  };


  const refreshAllFieldOptions = async () => {
    const updatedConfig = {};

    for (const key of Object.keys(refreshedFieldsConfig)) {
      const field = refreshedFieldsConfig[key];

      if (field.refreshOptions && typeof field.refreshOptions === 'function') {
        try {
          const newOptions = await field.refreshOptions();
          updatedConfig[key] = {
            ...field,
            options: newOptions,
          };
        } catch (error) {
          console.error(`Failed to refresh options for ${key}:`, error);
          // If refresh fails, keep the original options
          updatedConfig[key] = field;
        }
      } else {
        // If no refreshOptions function, keep the original field config
        updatedConfig[key] = field;
      }
    }

    // Update the state with the new configuration
    setRefreshedFieldsConfig((prevState) => ({
      ...prevState,
      ...updatedConfig,
    }));
  };


  useEffect(() => {
    // Automatically refresh all fields' options when the component mounts
    refreshAllFieldOptions();
  }, []);


  const generateRandomRow = async () => {
    try {
      await refreshAllFieldOptions();
      const newRow = Object.keys(refreshedFieldsConfig).reduce((acc, key) => {
        const field = refreshedFieldsConfig[key];
        let value;
        if (field.faker) {
          const fakerPath = field.faker.split('.');
          value = fakerPath.reduce((acc, method) => acc[method], faker);
          if (field.type === 'select' && field.multiple) {
            value = getMultipleRandomElementIds(field.options);
          } else if (field.type === 'select') {
            value = getRandomElementId(field.options);
          } else if (field.faker.includes('date')) {
            value = new Date(value()).toISOString();
          } else {
            value = typeof value === 'function' ? value() : value;
          }
        } else {
          value = field.type === 'number' ? faker.datatype.number() : faker.lorem.word();
        }
        acc[key] = value;
        return acc;
      }, {});

      await addItem(newRow);
      const data = await fetchItems();
      setItems(data);
    } catch (error) {
      console.error(`Error generating and saving random ${entityName}:`, error);
    }
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

  const handleViewItem = () => {
    if (selected.length === 1) {
      const id = selected[0];
      const url = `/#/${entityName.toLowerCase()}/${id}`;
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

  // Adding the keyboard shortcut for CTRL + Enter
  useEffect(() => {
    const handleKeyDown = async (event) => {
      if (event.ctrlKey && event.key === 'Enter') {
        event.preventDefault();
        handleViewItem();
      }
      // Other key events (e.g., for Add, Delete) remain unchanged
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selected]);
  // Rendering the components

  // Rendering the components
  return (
    <Container maxWidth="xl" sx={{ paddingTop: 3, paddingBottom: 7 }}>
      <Box sx={{ maxWidth: '80vw', position: 'relative' }}>
        <FilterManager filters={filters} setFilters={setFilters} fieldConfig={fieldConfig} />
        <Paper sx={{ width: '100%', mb: 2 }}>
          <BaseTableToolbar
            numSelected={selected.length}
            onAdd={handleAddItem}
            onDelete={confirmDelete}
            onEdit={handleEditItem}
            entityName={entityName}
          />
          <Button onClick={generateRandomRow} variant="contained" color="secondary" sx={{ margin: 2 }}>
            Generate Random Row
          </Button>
          <Button
            onClick={handleViewItem}
            variant="contained"
            color="primary"
            sx={{ margin: 2 }}
            disabled={selected.length !== 1}  // Disable button if more than one or no item is selected
          >
            View Selected
          </Button>
          <TableContainer>
            <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle" size={dense ? 'small' : 'medium'}>
              <BaseTableHead
                headCells={Object.keys(fieldConfig).map((key) => ({
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
                        const isMultipleSelectField =
                          fieldConfig[field].type === 'select' && fieldConfig[field].multiple === true;
                        const link = fieldConfig[field].link;

                        let displayValue;

                        if (isTextField) {
                          displayValue = cellValue ? truncateText(cellValue.toString(), 5) : '';
                        } else if (isCheckboxField) {
                          displayValue = cellValue ? 'True' : 'False';
                        } else if (isMultipleSelectField) {
                          if (link) {
                            displayValue = cellValue
                              ? cellValue.map((element) => {
                                  return (
                                    <div key={element}>
                                      <Link to={`${link}/${element}`} onClick={(e) => e.stopPropagation()}>
                                        {element}
                                      </Link>
                                    </div>
                                  );
                                })
                              : null;
                          } else {
                            displayValue = cellValue;
                          }
                        } else {
                          displayValue = cellValue !== undefined && cellValue !== null ? cellValue.toString() : 'N/A';
                        }

                        return (
                          <TableCell key={field} align={fieldConfig[field].numeric ? 'right' : 'left'}>
                            {displayValue ? displayValue : '--'}
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

        <Backdrop
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={loading}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      </Box>
    </Container>
  );
}