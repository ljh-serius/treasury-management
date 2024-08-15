import React, { useState, useEffect } from 'react';
import {
  Box, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TableSortLabel,
  Toolbar, Typography, Paper, Checkbox, IconButton, Tooltip, Modal, TextField, Button, Container, FormControlLabel, Switch
} from '@mui/material';
import { alpha } from '@mui/material/styles';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import { fetchProjects, addProject, updateProject, deleteProject } from '../utils/projectsFirebaseHelpers';
import { visuallyHidden } from '@mui/utils';

const headCells = [
  { id: 'name', numeric: false, disablePadding: true, label: 'Project Name' },
  { id: 'description', numeric: false, disablePadding: false, label: 'Description' },
  { id: 'startDate', numeric: false, disablePadding: false, label: 'Start Date' },
  { id: 'endDate', numeric: false, disablePadding: false, label: 'End Date' },
  { id: 'status', numeric: false, disablePadding: false, label: 'Status' },
  { id: 'managerName', numeric: false, disablePadding: false, label: 'Manager' },
  { id: 'teamMembers', numeric: true, disablePadding: false, label: 'Team Members' },
  { id: 'budget', numeric: true, disablePadding: false, label: 'Budget' },
  { id: 'priority', numeric: false, disablePadding: false, label: 'Priority' },
];

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


function EnhancedTableHead(props) {
  const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{ 'aria-label': 'select all projects' }}
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
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

function ProjectModal({ open, onClose, onSubmit, initialData, organizationId }) {
  const [projectData, setProjectData] = useState(
    initialData || {
      name: '',
      description: '',
      startDate: '',
      endDate: '',
      status: 'Active',
      managerName: '',
      managerEmail: '',
      teamMembers: '',
      budget: '',
      priority: 'Medium',
      organizationId: organizationId,
    }
  );

  useEffect(() => {
    setProjectData(initialData || {
      name: '',
      description: '',
      startDate: '',
      endDate: '',
      status: 'Active',
      managerName: '',
      managerEmail: '',
      teamMembers: '',
      budget: '',
      priority: 'Medium',
      organizationId: organizationId,
    });
  }, [initialData, organizationId]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setProjectData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    onSubmit(projectData);
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, bgcolor: 'background.paper', border: '2px solid #000', boxShadow: 24, p: 4 }}>
        <Typography variant="h6" component="h2">
          {initialData ? 'Edit Project' : 'Add Project'}
        </Typography>
        <TextField label="Name" name="name" fullWidth margin="normal" value={projectData.name} onChange={handleChange} />
        <TextField label="Description" name="description" fullWidth margin="normal" value={projectData.description} onChange={handleChange} />
        <TextField label="Start Date" name="startDate" type="date" fullWidth margin="normal" value={projectData.startDate} onChange={handleChange} InputLabelProps={{ shrink: true }} />
        <TextField label="End Date" name="endDate" type="date" fullWidth margin="normal" value={projectData.endDate} onChange={handleChange} InputLabelProps={{ shrink: true }} />
        <TextField label="Status" name="status" fullWidth margin="normal" value={projectData.status} onChange={handleChange} />
        <TextField label="Manager Name" name="managerName" fullWidth margin="normal" value={projectData.managerName} onChange={handleChange} />
        <TextField label="Manager Email" name="managerEmail" fullWidth margin="normal" value={projectData.managerEmail} onChange={handleChange} />
        <TextField label="Team Members" name="teamMembers" type="number" fullWidth margin="normal" value={projectData.teamMembers} onChange={handleChange} />
        <TextField label="Budget" name="budget" type="number" fullWidth margin="normal" value={projectData.budget} onChange={handleChange} />
        <TextField label="Priority" name="priority" fullWidth margin="normal" value={projectData.priority} onChange={handleChange} />
        <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
          <Button onClick={onClose} sx={{ mr: 1 }}>Cancel</Button>
          <Button variant="contained" onClick={handleSubmit}>
            {initialData ? 'Update' : 'Add'}
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}


function EnhancedTableToolbar(props) {
  const { numSelected, onAdd, onDelete, onEdit } = props;

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
          Projects
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

export default function Projects() {
  const organizationId = JSON.parse(localStorage.getItem('userData')).organizationId;
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('name');
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [dense, setDense] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [projects, setProjects] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [currentProject, setCurrentProject] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const projectsData = await fetchProjects();
      setProjects(projectsData);
    };

    fetchData();
  }, []);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = projects.map((n) => n.id);
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

  const handleAddProject = () => {
    setCurrentProject(null);
    setModalOpen(true);
  };

  const handleEditProject = () => {
    const projectToEdit = projects.find((project) => project.id === selected[0]);
    setCurrentProject(projectToEdit);
    setModalOpen(true);
  };

  const handleDeleteProjects = async () => {
    try {
      await Promise.all(selected.map((id) => deleteProject(id)));
      setSelected([]);
      const projectsData = await fetchProjects();
      setProjects(projectsData);
    } catch (error) {
      console.error('Error deleting projects:', error);
    }
  };

  const handleModalSubmit = async (projectData) => {
    try {
      if (currentProject) {
        await updateProject(currentProject.id, projectData);
      } else {
        await addProject({ ...projectData, organizationId });
      }
      const projectsData = await fetchProjects();
      setProjects(projectsData);
      setModalOpen(false);
    } catch (error) {
      console.error('Error saving project:', error);
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

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - projects.length) : 0;

  const visibleRows = React.useMemo(
    () =>
      stableSort(projects, getComparator(order, orderBy)).slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
      ),
    [order, orderBy, page, rowsPerPage, projects]
  );

  return (
    <Container maxWidth="lg" sx={{ paddingTop: 3, paddingBottom: 7 }}>
      <Box sx={{ width: '100%' }}>
        <Paper sx={{ width: '100%', mb: 2 }}>
          <EnhancedTableToolbar
            numSelected={selected.length}
            onAdd={handleAddProject}
            onDelete={handleDeleteProjects}
            onEdit={handleEditProject}
          />
          <TableContainer>
            <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle" size={dense ? 'small' : 'medium'}>
              <EnhancedTableHead
                numSelected={selected.length}
                order={order}
                orderBy={orderBy}
                onSelectAllClick={handleSelectAllClick}
                onRequestSort={handleRequestSort}
                rowCount={projects.length}
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
                        <Checkbox
                          color="primary"
                          checked={isItemSelected}
                          inputProps={{ 'aria-labelledby': labelId }}
                        />
                      </TableCell>
                      <TableCell component="th" id={labelId} scope="row" padding="none">
                        {row.name}
                      </TableCell>
                      <TableCell align="left">{row.description}</TableCell>
                      <TableCell align="left">{row.startDate}</TableCell>
                      <TableCell align="left">{row.endDate}</TableCell>
                      <TableCell align="left">{row.status}</TableCell>
                      <TableCell align="left">{row.managerName}</TableCell>
                      <TableCell align="right">{row.teamMembers}</TableCell>
                      <TableCell align="right">{row.budget}</TableCell>
                      <TableCell align="left">{row.priority}</TableCell>
                    </TableRow>
                  );
                })}
                {emptyRows > 0 && (
                  <TableRow
                    style={{
                      height: (dense ? 33 : 53) * emptyRows,
                    }}
                  >
                    <TableCell colSpan={12} />
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={projects.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
        <FormControlLabel control={<Switch checked={dense} onChange={handleChangeDense} />} label="Dense padding" />
        <ProjectModal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          onSubmit={handleModalSubmit}
          initialData={currentProject}
          organizationId={organizationId}
        />
      </Box>
    </Container>
  );
}
