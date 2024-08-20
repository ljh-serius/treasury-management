import React, { useState, useEffect } from 'react';
import { Box, Container, Paper, Button, CircularProgress, Backdrop, FormControlLabel, Switch } from '@mui/material';

import FilterManager from './FilterManager';
import BaseTableToolbar from './BaseTableToolbar';
import BaseTable from './BaseTable.js';
import BaseModal from './BaseModal';

import { faker } from '@faker-js/faker';

const getRandomElementId = (options) => {
  return options[Math.floor(Math.random() * options.length)].id;
};

const getMultipleRandomElementIds = (options) => {
  const selectedOptions = [];
  const maxSelections = Math.min(3, options.length); // Ensure no more than 3 selections and not more than available options
  const numSelections = Math.floor(Math.random() * maxSelections) + 1; // Random number of selections between 1 and maxSelections

  while (selectedOptions.length < numSelections) {
    const option = getRandomElementId(options);
    if (!selectedOptions.includes(option)) {
      selectedOptions.push(option);
    }
  }

  return selectedOptions;
};

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
    if (window.confirm("Are you sure you want to delete the selected items?")) {
      setLoading(true);
      for (const id of selected) {
        await deleteItem(id);
      }
      setSelected([]);
      const data = await fetchItems();
      setItems(data);
      setLoading(false);
    }
  };

  const handleModalSubmit = async (itemData) => {
    setLoading(true);
    if (currentItem) {
      await updateItem(currentItem.id, itemData);
    } else {
      await addItem(itemData);
    }
    const data = await fetchItems();
    setItems(data);
    setModalOpen(false);
    setLoading(false);
  };

  const handleViewItem = () => {
    if (selected.length === 1) {
      const id = selected[0];
      const url = `/#/${entityName.toLowerCase()}/${id}`;
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };


  const generateRandomRow = async () => {
    try {
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

      console.log("New row : ", newRow)
      await addItem(newRow);
      const data = await fetchItems();
      setItems(data);
    } catch (error) {
      console.error(`Error generating and saving random ${entityName}:`, error);
    }
  };

  return (
    <Container maxWidth="xl" sx={{ paddingTop: 3, paddingBottom: 7 }}>
      <Box sx={{ maxWidth: '80vw', position: 'relative' }}>
        <FilterManager filters={filters} setFilters={setFilters} fieldConfig={fieldConfig} />
        <Paper sx={{ width: '100%', mb: 2 }}>
          <BaseTableToolbar
            numSelected={selected.length}
            onAdd={handleAddItem}
            onDelete={handleDeleteItems}
            onEdit={handleEditItem}
            entityName={entityName}
          />
          <Button
            onClick={generateRandomRow}
            variant="contained"
            color="primary"
            sx={{ margin: 2 }}
          >
            Generate Random Row
          </Button>
          <Button onClick={handleViewItem} variant="contained" color="primary" sx={{ margin: 2 }}>
            View Selected
          </Button>
          <BaseTable
            items={filteredItems}
            order={order}
            setOrder={setOrder}          // Ensure this is passed
            orderBy={orderBy}
            setOrderBy={setOrderBy}      // Ensure this is passed
            selected={selected}
            setSelected={setSelected}
            page={page}
            setPage={setPage}
            rowsPerPage={rowsPerPage}
            setRowsPerPage={setRowsPerPage}
            dense={dense}
            setDense={setDense}
            fieldConfig={fieldConfig}
          />
        </Paper>
        <FormControlLabel control={<Switch checked={dense} onChange={() => setDense(!dense)} />} label="Dense padding" />
        <BaseModal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          onSubmit={handleModalSubmit}
          initialData={currentItem}
          fieldConfig={fieldConfig}
        />
        <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={loading}>
          <CircularProgress color="inherit" />
        </Backdrop>
      </Box>
    </Container>
  );
}
