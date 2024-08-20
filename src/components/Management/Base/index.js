import React, { useState, useEffect } from 'react';
import { Box, Container, Paper, Button, CircularProgress, Backdrop, FormControlLabel, Switch } from '@mui/material';

import FilterManager from './FilterManager';
import BaseTableToolbar from './BaseTableToolbar';
import BaseTable from './BaseTable.js';
import BaseModal from './BaseModal';

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
