import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import SystemUpdateAltIcon from '@mui/icons-material/SystemUpdateAlt';
import { visuallyHidden } from '@mui/utils';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import Alert from '@mui/material/Alert';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import React, { useState } from 'react';
import Create from './create.js';
import Delete from './delete.js';
import Update from './update.js';
import Popup from './../popup.js';
import API from "../api";
import PropTypes from 'prop-types';
import "../style.css";

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
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
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

function onlyNumbers(str) {
  return /^[+-]?([0-9]*[.])?[0-9]+$/.test(str);
}

const headCells = [
  {
    id: 'name',
    numeric: false,
    disablePadding: true,
    label: 'Nom du produit',
  },
  {
    id: 'type',
    numeric: false,
    string: true,
    disablePadding: false,
    label: 'Type',
  },
  {
    id: 'price',
    numeric: true,
    string: false,
    disablePadding: false,
    label: 'Prix',
  },
  {
    id: 'rating',
    numeric: true,
    string: false,
    disablePadding: false,
    label: 'Note',
  },
  {
    id: 'warranty_years',
    numeric: true,
    string: false,
    disablePadding: false,
    label: 'Garantie',
  },
  {
    id: 'available',
    numeric: false,
    string: true,
    disablePadding: false,
    label: 'Disponible',
  },
];

function EnhancedTableHead(props) {
  const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } =
    props;
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
            inputProps={{
              'aria-label': 'select all phones',
            }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric || headCell.string ? 'right' : 'left'}
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

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const currencies = [
  {
    value: 'Oui',
    label: 'Oui',
  },
  {
    value: 'Non',
    label: 'Non',
  },
];

function CreateProduct(product) {
  const create = new Create();
  create.create_product(product);
  window.location.reload();
}

function DeleteProduct(names) {
  const to_delete = new Delete();
  to_delete.delete_product(names);
  window.location.reload();
}

function UpdateProduct(names, updateData) {
  const update = new Update();
  update.update_product(names, updateData);
  window.location.reload();
}

function EnhancedTableToolbar(props) {
  const { numSelected } = props;

  const [name, setName] = React.useState('');
  const handleChangeName = (event) => {
    setName(event.target.value);
  };
  const [type, setType] = React.useState('');
  const handleChangeType = (event) => {
    setType(event.target.value);
  };
  const [price, setPrice] = React.useState('');
  const handleChangePrice = (event) => {
    setPrice(event.target.value);
  };
  const [rating, setRating] = React.useState('');
  const handleChangeRating = (event) => {
    setRating(event.target.value);
  };
  const [warranty_years, setWarranty] = React.useState('');
  const handleChangeWarranty = (event) => {
    setWarranty(event.target.value);
  };
  const [available, setAvailable] = React.useState('');
  const handleChangeAvailable = (event) => {
    setAvailable(event.target.value);
  };

  const resetState = () => {
    setName('');
    setType('');
    setPrice('');
    setRating('');
    setWarranty('');
    setAvailable('');
  };

  const [isAddPopup, setIsAddOpen] = useState(false);
  const toggleAddPopup = () => {
    resetState();
    setIsAddOpen(!isAddPopup);
  }

  const [isDelPopup, setIsDelOpen] = useState(false);
  const toggleDelPopup = () => {
    setIsDelOpen(!isDelPopup);
  }

  const [isModPopup, setIsModOpen] = useState(false);
  const toggleModPopup = () => {
    resetState();
    setIsModOpen(!isModPopup);
  }

  const fields = [
    {
      name: name,
      type: type,
      price: parseFloat(price) || -1,
      rating: parseFloat(rating) || -1,
      warranty_years: parseFloat(warranty_years) || -1,
      available: available,
    }
  ];

  const handleFields = (fields) => {
    var isCreate = false;

    fields.map((field) => {
      if (!field.name || !field.type || !field.price || field.price === -1 || !field.rating || field.rating === -1 || !field.warranty_years || field.warranty_years === -1 || (field.available !== "Oui" && field.available !== "Non")) {
        return null;
      }
      toggleAddPopup();
      isCreate = true;
      return null;
    });
    if (isCreate) {
      return (CreateProduct(fields[0]));
    }
  }

  const handleDelete = (names) => {
    toggleDelPopup();
    return DeleteProduct(names);
  }

  const handleUpdate = (names, updateData) => {
    toggleModPopup();
    console.log('.??.');
    return UpdateProduct(names, updateData[0]);
  }

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: '1 1 100%' }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} produit(s) selectioné(s)
        </Typography>
      ) : (
        <Typography
          sx={{ flex: '1 1 100%' }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          Téléphones
        </Typography>
      )}
      {numSelected > 0 ? (
        <Box
          sx={{
            '& > :not(style)': {
              m: 0,
            },
          }}
        >
          <Tooltip title="Supprimer un ou des produit(s)">
            <IconButton onClick={toggleDelPopup}>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Modifier un ou des produit(s)">
            <IconButton onClick={toggleModPopup}>
              <SystemUpdateAltIcon />
            </IconButton>
          </Tooltip>
        </Box>
      ) : (
        <Tooltip title="Ajouter un produit">
          <IconButton onClick={toggleAddPopup}>
            <AddCircleOutlineIcon />
          </IconButton>
        </Tooltip>
      )}
      <div>
      {isAddPopup && <Popup
        content={<>
          <b className="title">Ajouter un produit</b>
          <p className="position">
          </p>
            <Box
              component="form"
              sx={{
                '& > :not(style)': { m: 1 },
              }}
              noValidate
              autoComplete="off"
            >
            <FormControl>
              <InputLabel htmlFor="component-outlined">Nom du produit</InputLabel>
              <OutlinedInput
                id="component-outlined"
                value={name}
                onChange={handleChangeName}
                label="Nom du produit"
              />
            </FormControl>
            <FormControl>
              <InputLabel htmlFor="component-outlined">Type</InputLabel>
              <OutlinedInput
                id="component-outlined"
                value={type}
                onChange={handleChangeType}
                label="Type"
              />
            </FormControl>
            <FormControl>
              <InputLabel htmlFor="component-outlined">Prix</InputLabel>
              <OutlinedInput
                id="component-outlined"
                value={price}
                onChange={handleChangePrice}
                label="Prix"
              />
            </FormControl>
            <FormControl>
              <InputLabel htmlFor="component-outlined">Note</InputLabel>
              <OutlinedInput
                id="component-outlined"
                value={rating}
                onChange={handleChangeRating}
                label="Note"
              />
            </FormControl>
            <FormControl>
              <InputLabel htmlFor="component-outlined">Garantie</InputLabel>
              <OutlinedInput
                id="component-outlined"
                value={warranty_years}
                onChange={handleChangeWarranty}
                label="Garantie"
              />
            </FormControl>
            <Box
              sx={{
                '& .MuiTextField-root': { m: 1, width: '25ch' },
              }}
              noValidate
              autoComplete="off"
            >
            <TextField
              id="outlined-select-currency"
              select
              label="Disponible"
              value={available}
              onChange={handleChangeAvailable}
            >
              {currencies.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
            </Box>
            </Box>
          <p className='position'>
          </p>
          <Button onClick={() => {handleFields(fields);}} variant="outlined" color="success">Ajouter</Button>
          <div className='alert'>
          { !name || !type || !price || !rating || !warranty_years || (available !== "Oui" && available !== "Non") || !onlyNumbers(price) || !onlyNumbers(rating) || !onlyNumbers(warranty_years)
            ? (<Alert severity="warning">Attention: Un ou plusieurs champs ne sont pas renseignés ou contient des erreurs !</Alert>)
            : (<Alert severity="info">Info: Tous les champs sont renseignés, vous pouvez ajouter votre produit.</Alert>)
          }
          </div>
        </>}
        handleClose={toggleAddPopup}
      />}
      {isDelPopup && <Popup
        content={<>
          <b className="title">Supprimer un ou des produit(s)</b>
          <p className='position'>
          </p>
          <Alert severity="info">Êtes-vous sûr de vouloir supprimer {numSelected} élément(s) ?</Alert>
          <p className='position'>
          </p>
          <Button onClick={() => {handleDelete(props.selected);}} variant="outlined" color="error">Supprimer</Button>
        </>}
        handleClose={toggleDelPopup}
      />}
      {isModPopup && <Popup
        content={<>
          <b className="title">Modifier un ou des produit(s)</b>
          <p className='position'>
          </p>
            <Box
              component="form"
              sx={{
                '& > :not(style)': { m: 1 },
              }}
              noValidate
              autoComplete="off"
            >
            <FormControl>
              <InputLabel htmlFor="component-outlined">Nom du produit</InputLabel>
              <OutlinedInput
                id="component-outlined"
                value={name}
                onChange={handleChangeName}
                label="Nom du produit"
              />
            </FormControl>
            <FormControl>
              <InputLabel htmlFor="component-outlined">Type</InputLabel>
              <OutlinedInput
                id="component-outlined"
                value={type}
                onChange={handleChangeType}
                label="Type"
              />
            </FormControl>
            <FormControl>
              <InputLabel htmlFor="component-outlined">Prix</InputLabel>
              <OutlinedInput
                id="component-outlined"
                value={price}
                onChange={handleChangePrice}
                label="Prix"
              />
            </FormControl>
            <FormControl>
              <InputLabel htmlFor="component-outlined">Note</InputLabel>
              <OutlinedInput
                id="component-outlined"
                value={rating}
                onChange={handleChangeRating}
                label="Note"
              />
            </FormControl>
            <FormControl>
              <InputLabel htmlFor="component-outlined">Garantie</InputLabel>
              <OutlinedInput
                id="component-outlined"
                value={warranty_years}
                onChange={handleChangeWarranty}
                label="Garantie"
              />
            </FormControl>
            <Box
              sx={{
                '& .MuiTextField-root': { m: 1, width: '25ch' },
              }}
              noValidate
              autoComplete="off"
            >
            <TextField
              id="outlined-select-currency"
              select
              label="Disponible"
              value={available}
              onChange={handleChangeAvailable}
            >
              {currencies.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
            </Box>
            </Box>
          <p className="position">
          </p>
          <Alert severity="info">Êtes-vous sûr de vouloir modifier {numSelected} élément(s) ?</Alert>
          <p className='position'>
          </p>
          <Button onClick={() => {handleUpdate(props.selected, fields);}} variant="outlined">Modifier</Button>
          <div className='alert'>
          { (price && !onlyNumbers(price)) || (rating && !onlyNumbers(rating)) || (warranty_years && !onlyNumbers(warranty_years))
            ? (<Alert severity="warning">Attention: Un ou plusieurs champs a / ont des erreurs !</Alert>)
            : (<Alert severity="info">Info: Tous les champs sont renseignés, vous pouvez ajouter votre produit.</Alert>)
          }
          </div>
        </>}
        handleClose={toggleModPopup}
      />}
      </div>
    </Toolbar>
  );
}

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

function EnhancedTable(props) {
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('calories');
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = props.rows.map((n) => n.name);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
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

  const isSelected = (name) => selected.indexOf(name) !== -1;

  // Avoid a layout jump when reaching the last page with empty props.rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - props.rows.length) : 0;

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <EnhancedTableToolbar numSelected={selected.length} selected={selected} />
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size={dense ? 'small' : 'medium'}
          >
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={props.rows.length}
            />
            <TableBody>
              {stableSort(props.rows, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row.name);
                  const labelId = `enhanced-table-checkbox-${index}`;
                  const available = row.available ? "Oui" : "Non";

                  return (
                    <TableRow
                      hover
                      onClick={(event) => handleClick(event, row.name)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.name}
                      selected={isItemSelected}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          color="primary"
                          checked={isItemSelected}
                          inputProps={{
                            'aria-labelledby': labelId,
                          }}
                        />
                      </TableCell>
                      <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        padding="none"
                      >
                        {row.name}
                      </TableCell>
                      <TableCell align="right">{row.type}</TableCell>
                      <TableCell align="right">{row.price}</TableCell>
                      <TableCell align="right">{row.rating}</TableCell>
                      <TableCell align="right">{row.warranty_years}</TableCell>
                      <TableCell align="right">{available}</TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: (dense ? 33 : 53) * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={props.rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      <FormControlLabel
        control={<Switch checked={dense} onChange={handleChangeDense} />}
        label="Dense padding"
      />
    </Box>
  );
}


export default class List extends React.Component {
  state = {
    datas: []
  }

  componentDidMount() {
    API.get(`/getAll`)
      .then(res => {
        const datas = res.data;
        this.setState({ datas });
      })
  }

  render() {
    return (
      <div>
        <EnhancedTable rows={this.state.datas}/>
      </div>
    )
  }
}
