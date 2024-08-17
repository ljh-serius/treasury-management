import React, { useState, useEffect } from 'react';
import {
  Box, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TableSortLabel,
  Toolbar, Typography, Paper, Checkbox as MUICheckbox, IconButton, Tooltip, Modal, TextField, Button, Container, FormControlLabel, Switch, Link
} from '@mui/material';
import { alpha } from '@mui/material/styles';

import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import CloseIcon from '@mui/icons-material/Close';

import { fetchProjects, addProject, updateProject, deleteProject } from '../utils/projectsFirebaseHelpers';
import { fetchCostAllocations } from '../utils/costAllocationFirebaseHelpers';
import { visuallyHidden } from '@mui/utils';

const headCells = [
  { id: 'name', numeric: false, disablePadding: true, label: 'Project Name' },
  { id: 'description', numeric: false, disablePadding: false, label: 'Description' },
  { id: 'startDate', numeric: false, disablePadding: false, label: 'Start Date' },
  { id: 'endDate', numeric: false, disablePadding: false, label: 'End Date' },
  { id: 'status', numeric: false, disablePadding: false, label: 'Status' },
  { id: 'managerName', numeric: false, disablePadding: false, label: 'Manager' },
  { id: 'managerEmail', numeric: false, disablePadding: false, label: 'Manager Email' },
  { id: 'teamMembers', numeric: true, disablePadding: false, label: 'Team Members' },
  { id: 'budget', numeric: true, disablePadding: false, label: 'Budget' },
  { id: 'priority', numeric: false, disablePadding: false, label: 'Priority' },
  { id: 'costAllocation', numeric: false, disablePadding: false, label: 'Cost Allocation' },
  { id: 'projectType', numeric: false, disablePadding: false, label: 'Project Type' },
  { id: 'clientName', numeric: false, disablePadding: false, label: 'Client Name' },
  { id: 'phase', numeric: false, disablePadding: false, label: 'Project Phase' },
  { id: 'progress', numeric: true, disablePadding: false, label: 'Progress (%)' },
  { id: 'risks', numeric: false, disablePadding: false, label: 'Risks Identified' },
  { id: 'lastUpdated', numeric: false, disablePadding: false, label: 'Last Updated' },
  { id: 'estimatedCompletion', numeric: false, disablePadding: false, label: 'Estimated Completion' },
  { id: 'actualCompletion', numeric: false, disablePadding: false, label: 'Actual Completion' },
  { id: 'revenueGenerated', numeric: true, disablePadding: false, label: 'Revenue Generated' },
  { id: 'dependencies', numeric: false, disablePadding: false, label: 'Dependencies' },
  { id: 'projectCategory', numeric: false, disablePadding: false, label: 'Project Category' },
  { id: 'resourceAllocation', numeric: false, disablePadding: false, label: 'Resource Allocation' },
  { id: 'technologyStack', numeric: false, disablePadding: false, label: 'Technology Stack' },
  { id: 'stakeholders', numeric: false, disablePadding: false, label: 'Stakeholders' },
  { id: 'complianceRequirements', numeric: false, disablePadding: false, label: 'Compliance Requirements' },
  { id: 'riskMitigation', numeric: false, disablePadding: false, label: 'Risk Mitigation' },
  { id: 'criticalPath', numeric: false, disablePadding: false, label: 'Critical Path' },
  { id: 'milestones', numeric: false, disablePadding: false, label: 'Milestones' },
  { id: 'KPIs', numeric: false, disablePadding: false, label: 'KPIs' },
  { id: 'projectSponsor', numeric: false, disablePadding: false, label: 'Project Sponsor' },
  { id: 'businessImpact', numeric: false, disablePadding: false, label: 'Business Impact' },
  { id: 'operatingCosts', numeric: false, disablePadding: false, label: 'Operating Costs' },
  { id: 'userStories', numeric: false, disablePadding: false, label: 'User Stories' },
  { id: 'codeRepository', numeric: false, disablePadding: false, label: 'Code Repository' },
  { id: 'documentation', numeric: false, disablePadding: false, label: 'Documentation' },
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
      projectType: '',
      clientName: '',
      phase: '',
      progress: '',
      risks: '',
      lastUpdated: '',
      estimatedCompletion: '',
      actualCompletion: '',
      revenueGenerated: '',
      dependencies: '',
      projectCategory: '',
      resourceAllocation: '',
      technologyStack: '',
      stakeholders: '',
      complianceRequirements: '',
      riskMitigation: '',
      criticalPath: '',
      milestones: '',
      KPIs: '',
      projectSponsor: '',
      businessImpact: '',
      operatingCosts: '',
      userStories: '',
      codeRepository: '',
      documentation: '',
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
      projectType: '',
      clientName: '',
      phase: '',
      progress: '',
      risks: '',
      lastUpdated: '',
      estimatedCompletion: '',
      actualCompletion: '',
      revenueGenerated: '',
      dependencies: '',
      projectCategory: '',
      resourceAllocation: '',
      technologyStack: '',
      stakeholders: '',
      complianceRequirements: '',
      riskMitigation: '',
      criticalPath: '',
      milestones: '',
      KPIs: '',
      projectSponsor: '',
      businessImpact: '',
      operatingCosts: '',
      userStories: '',
      codeRepository: '',
      documentation: '',
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
        <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <TextField label="Name" name="name" fullWidth value={projectData.name} onChange={handleChange} />
            <TextField label="Project Type" name="projectType" fullWidth value={projectData.projectType} onChange={handleChange} />
            <TextField label="Project Category" name="projectCategory" fullWidth value={projectData.projectCategory} onChange={handleChange} />
          </Box>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <TextField label="Client Name" name="clientName" fullWidth value={projectData.clientName} onChange={handleChange} />
            <TextField label="Manager Name" name="managerName" fullWidth value={projectData.managerName} onChange={handleChange} />
            <TextField label="Manager Email" name="managerEmail" fullWidth value={projectData.managerEmail} onChange={handleChange} />
          </Box>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <TextField label="Priority" name="priority" fullWidth value={projectData.priority} onChange={handleChange} />
            <TextField label="Phase" name="phase" fullWidth value={projectData.phase} onChange={handleChange} />
            <TextField label="Progress (%)" name="progress" type="number" fullWidth value={projectData.progress} onChange={handleChange} />
          </Box>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <TextField label="Start Date" name="startDate" type="date" fullWidth value={projectData.startDate} onChange={handleChange} InputLabelProps={{ shrink: true }} />
            <TextField label="End Date" name="endDate" type="date" fullWidth value={projectData.endDate} onChange={handleChange} InputLabelProps={{ shrink: true }} />
            <TextField label="Status" name="status" fullWidth value={projectData.status} onChange={handleChange} />
          </Box>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <TextField label="Team Members" name="teamMembers" type="number" fullWidth value={projectData.teamMembers} onChange={handleChange} />
            <TextField label="Budget" name="budget" type="number" fullWidth value={projectData.budget} onChange={handleChange} />
            <TextField label="Revenue Generated" name="revenueGenerated" type="number" fullWidth value={projectData.revenueGenerated} onChange={handleChange} />
          </Box>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <TextField label="Risks Identified" name="risks" fullWidth value={projectData.risks} onChange={handleChange} />
            <TextField label="Dependencies" name="dependencies" fullWidth value={projectData.dependencies} onChange={handleChange} />
            <TextField label="Compliance Requirements" name="complianceRequirements" fullWidth value={projectData.complianceRequirements} onChange={handleChange} />
          </Box>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <TextField label="Critical Path" name="criticalPath" fullWidth value={projectData.criticalPath} onChange={handleChange} />
            <TextField label="Milestones" name="milestones" fullWidth value={projectData.milestones} onChange={handleChange} />
            <TextField label="KPIs" name="KPIs" fullWidth value={projectData.KPIs} onChange={handleChange} />
          </Box>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <TextField label="Project Sponsor" name="projectSponsor" fullWidth value={projectData.projectSponsor} onChange={handleChange} />
            <TextField label="Business Impact" name="businessImpact" fullWidth value={projectData.businessImpact} onChange={handleChange} />
            <TextField label="Operating Costs" name="operatingCosts" fullWidth value={projectData.operatingCosts} onChange={handleChange} />
          </Box>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <TextField label="Resource Allocation" name="resourceAllocation" fullWidth value={projectData.resourceAllocation} onChange={handleChange} />
            <TextField label="Technology Stack" name="technologyStack" fullWidth value={projectData.technologyStack} onChange={handleChange} />
            <TextField label="Stakeholders" name="stakeholders" fullWidth value={projectData.stakeholders} onChange={handleChange} />
          </Box>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <TextField label="User Stories" name="userStories" fullWidth value={projectData.userStories} onChange={handleChange} />
            <TextField label="Code Repository" name="codeRepository" fullWidth value={projectData.codeRepository} onChange={handleChange} />
            <TextField label="Documentation" name="documentation" fullWidth value={projectData.documentation} onChange={handleChange} />
          </Box>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <TextField label="Estimated Completion" name="estimatedCompletion" type="date" fullWidth value={projectData.estimatedCompletion} onChange={handleChange} InputLabelProps={{ shrink: true }} />
            <TextField label="Actual Completion" name="actualCompletion" type="date" fullWidth value={projectData.actualCompletion} onChange={handleChange} InputLabelProps={{ shrink: true }} />
          </Box>
          <TextField label="Last Updated" name="lastUpdated" type="date" fullWidth value={projectData.lastUpdated} onChange={handleChange} InputLabelProps={{ shrink: true }} />
          <TextField label="Description" name="description" fullWidth multiline rows={4} value={projectData.description} onChange={handleChange} />
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 2 }}>
            <Button onClick={onClose}>Cancel</Button>
            <Button variant="contained" onClick={handleSubmit}>
              {initialData ? 'Update' : 'Add'}
            </Button>
          </Box>
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
                        <TableCell key={field.id} align="left">
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
