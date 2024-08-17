import React, { useState, useEffect } from 'react';
import {
  Box, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TableSortLabel,
  Toolbar, Typography, Paper, Checkbox as MUICheckbox, IconButton, Tooltip, Modal, TextField, Button, Container,
  FormControlLabel, Switch, Link, Grid, FormControl, InputLabel, Select, MenuItem
} from '@mui/material';

import { alpha } from '@mui/material/styles';
import { visuallyHidden } from '@mui/utils';

import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import CloseIcon from '@mui/icons-material/Close';

import { fetchProjects, addProject, updateProject, deleteProject } from '../utils/projectsFirebaseHelpers';
import { fetchCostAllocations } from '../utils/costAllocationFirebaseHelpers';
import { generateFakeProjectData } from '../fakers/projectsFaker'; // Adjust this path accordingly

export const projectFieldConfig = {
  name: { label: 'Project Name', type: 'text' },
  description: { label: 'Description', type: 'text', multiline: true, rows: 4 },
  startDate: { label: 'Start Date', type: 'date' },
  endDate: { label: 'End Date', type: 'date' },
  status: {
    label: 'Status',
    type: 'select',
    options: [
      { id: 'not_started', label: 'Not Started' },
      { id: 'in_progress', label: 'In Progress' },
      { id: 'completed', label: 'Completed' },
      { id: 'on_hold', label: 'On Hold' },
    ],
  },
  managerName: { label: 'Manager Name', type: 'text' },
  managerEmail: { label: 'Manager Email', type: 'email' },
  teamMembers: { label: 'Team Members', type: 'number' },
  budget: { label: 'Budget', type: 'number' },
  priority: {
    label: 'Priority',
    type: 'select',
    options: [
      { id: 'low', label: 'Low' },
      { id: 'medium', label: 'Medium' },
      { id: 'high', label: 'High' },
    ],
  },
  projectType: {
    label: 'Project Type',
    type: 'select',
    options: [
      { id: 'internal', label: 'Internal' },
      { id: 'client', label: 'Client' },
      { id: 'rnd', label: 'R&D' },
    ],
  },
  clientName: {
    label: 'Client Name',
    type: 'select',
    options: [
      { id: 'client1', label: 'Client 1' },
      { id: 'client2', label: 'Client 2' },
      { id: 'client3', label: 'Client 3' },
      { id: 'client4', label: 'Client 4' },
    ],
  },
  phase: {
    label: 'Project Phase',
    type: 'select',
    options: [
      { id: 'planning', label: 'Planning' },
      { id: 'execution', label: 'Execution' },
      { id: 'closure', label: 'Closure' },
    ],
  },
  progress: { label: 'Progress (%)', type: 'number' },
  risks: { label: 'Risks Identified', type: 'text' },
  lastUpdated: { label: 'Last Updated', type: 'date' },
  estimatedCompletion: { label: 'Estimated Completion', type: 'date' },
  actualCompletion: { label: 'Actual Completion', type: 'date' },
  revenueGenerated: { label: 'Revenue Generated', type: 'number' },
  dependencies: {
    label: 'Dependencies',
    type: 'select',
    options: [
      { id: 'dep1', label: 'Dependency 1' },
      { id: 'dep2', label: 'Dependency 2' },
      { id: 'dep3', label: 'Dependency 3' },
    ],
  },
  projectCategory: {
    label: 'Project Category',
    type: 'select',
    options: [
      { id: 'category1', label: 'Category 1' },
      { id: 'category2', label: 'Category 2' },
      { id: 'category3', label: 'Category 3' },
    ],
  },
  resourceAllocation: { label: 'Resource Allocation', type: 'text' },
  technologyStack: {
    label: 'Technology Stack',
    type: 'select',
    options: [
      { id: 'tech1', label: 'Tech Stack 1' },
      { id: 'tech2', label: 'Tech Stack 2' },
      { id: 'tech3', label: 'Tech Stack 3' },
    ],
  },
  stakeholders: {
    label: 'Stakeholders',
    type: 'select',
    options: [
      { id: 'stakeholder1', label: 'Stakeholder 1' },
      { id: 'stakeholder2', label: 'Stakeholder 2' },
      { id: 'stakeholder3', label: 'Stakeholder 3' },
    ],
  },
  complianceRequirements: { label: 'Compliance Requirements', type: 'text' },
  riskMitigation: { label: 'Risk Mitigation', type: 'text' },
  criticalPath: {
    label: 'Critical Path',
    type: 'select',
    options: [
      { id: 'present', label: 'Present' },
      { id: 'absent', label: 'Absent' },
    ],
  },
  milestones: { label: 'Milestones', type: 'text' },
  KPIs: { label: 'KPIs', type: 'text' },
  projectSponsor: {
    label: 'Project Sponsor',
    type: 'select',
    options: [
      { id: 'sponsor1', label: 'Sponsor 1' },
      { id: 'sponsor2', label: 'Sponsor 2' },
      { id: 'sponsor3', label: 'Sponsor 3' },
    ],
  },
  businessImpact: {
    label: 'Business Impact',
    type: 'select',
    options: [
      { id: 'low', label: 'Low Impact' },
      { id: 'medium', label: 'Medium Impact' },
      { id: 'high', label: 'High Impact' },
      { id: 'critical', label: 'Critical Impact' },
    ],
  },
  operatingCosts: { label: 'Operating Costs', type: 'number' },
  userStories: {
    label: 'User Stories',
    type: 'text',
    multiline: true,
    rows: 4,
  },
  codeRepository: { label: 'Code Repository', type: 'text' },
  documentation: { label: 'Documentation', type: 'text' },
};


const headCells = Object.keys(projectFieldConfig).map(key => ({
  id: key,
  label: projectFieldConfig[key].label,
}));

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

function ProjectModal({ open, onClose, onSubmit, initialData, organizationId }) {
  const [projectData, setProjectData] = useState(
    initialData || Object.keys(projectFieldConfig).reduce((acc, field) => {
      acc[field] = '';
      return acc;
    }, { organizationId })
  );

  useEffect(() => {
    setProjectData(
      initialData || Object.keys(projectFieldConfig).reduce((acc, field) => {
        acc[field] = '';
        return acc;
      }, { organizationId })
    );
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
            {initialData ? 'Edit Project' : 'Add Project'}
          </Typography>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2}>
            {Object.keys(projectFieldConfig).map((field) => (
              <Grid item xs={12} sm={6} md={4} key={field}>
                {projectFieldConfig[field].type === 'select' ? (
                  <FormControl fullWidth>
                    <InputLabel>{projectFieldConfig[field].label}</InputLabel>
                    <Select
                      label={projectFieldConfig[field].label}
                      name={field}
                      value={projectData[field]}
                      onChange={handleChange}
                    >
                      {projectFieldConfig[field].options.map(option => (
                        <MenuItem key={option.id} value={option.id}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                ) : (
                  <TextField
                    label={projectFieldConfig[field].label}
                    name={field}
                    type={projectFieldConfig[field].type}
                    value={projectData[field]}
                    onChange={handleChange}
                    fullWidth
                    multiline={projectFieldConfig[field].multiline || false}
                    rows={projectFieldConfig[field].rows || 1}
                    InputLabelProps={projectFieldConfig[field].type === 'date' ? { shrink: true } : undefined}
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

function EnhancedTableHead(props) {
  const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;
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

function EnhancedTableToolbar({ numSelected, onAdd, onDelete, onEdit, onGenerateFakeProjects }) {
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
        <>
          <Tooltip title="Add">
            <IconButton onClick={onAdd}>
              <AddIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Generate Fake Projects">
            <Button
              variant="contained"
              color="primary"
              onClick={onGenerateFakeProjects}
              sx={{ marginBottom: 2 }}
            >
              Random
            </Button>
          </Tooltip>
        </>
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
  const [costAllocations, setCostAllocations] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [currentProject, setCurrentProject] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const projectsData = await fetchProjects();
      setProjects(projectsData);

      const costAllocationsData = await fetchCostAllocations(organizationId);
      setCostAllocations(costAllocationsData);
    };

    fetchData();
  }, [organizationId]);

  const handleGenerateFakeProjects = async () => {
    const fakeProjectData = generateFakeProjectData(projects);

    try {
      await addProject(fakeProjectData);
      const projectsData = await fetchProjects();
      setProjects(projectsData);
    } catch (error) {
      console.error('Error generating fake project:', error);
    }
  };

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

  const getCostAllocationLink = (projectId) => {
    const allocation = costAllocations.find(allocation => allocation.projectIds.includes(projectId));
    return allocation ? `#/cost-allocation/${projectId}` : null;
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
    <Container maxWidth="xl" sx={{ paddingTop: 3, paddingBottom: 7 }}>
      <Box sx={{ width: '100%' }}>
        <Paper sx={{ width: '100%', mb: 2 }}>
          <EnhancedTableToolbar
            numSelected={selected.length}
            onAdd={handleAddProject}
            onDelete={handleDeleteProjects}
            onEdit={handleEditProject}
            onGenerateFakeProjects={handleGenerateFakeProjects}
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
                  const costAllocationLink = getCostAllocationLink(row.id);

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
                      {headCells.map((field) => (
                        <TableCell key={field.id} align={field.numeric ? 'right' : 'left'}>
                          {row[field.id]}
                        </TableCell>
                      ))}
                      <TableCell align="left">
                        {costAllocationLink ? (
                          <Link href={costAllocationLink} underline="none">
                            View Cost Allocation
                          </Link>
                        ) : (
                          'No Allocation'
                        )}
                      </TableCell>
                    </TableRow>
                  );
                })}
                {emptyRows > 0 && (
                  <TableRow
                    style={{
                      height: (dense ? 33 : 53) * emptyRows,
                    }}
                  >
                    <TableCell colSpan={headCells.length + 2} />
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
