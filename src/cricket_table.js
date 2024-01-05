import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import React, { useState } from 'react';
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import './styles.css';
import TablePagination from "@mui/material/TablePagination";


const CricketTable = ({ data, onDelete }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const requestSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const sortedData = () => {
    const sortableData = [...data];
    if (sortConfig.key !== null) {
      sortableData.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableData;
  };

  const filteredData = () => {
    return sortedData().filter(
      (player) =>
        player.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  const clearSearch = () => {
    setSearchTerm('');
  };

  const SortingIcon = ({ sortKey }) => {
    if (!sortConfig.key || sortConfig.key !== sortKey) {
      return null;
    }

    return sortConfig.direction === 'asc' ? <ArrowUpwardIcon /> : <ArrowDownwardIcon />;
  };

  return (
    <div>
      <Container>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <TextField
          margin='dense'
          type="text"
          placeholder="Search by Name"
          value={searchTerm}
          variant="standard"
          onChange={handleSearch}
        />

          {searchTerm && (
            <Button variant="standard" onClick={clearSearch} sx={{color:'red'}}>
              Clear Search
            </Button>
          )}


        <FormControl variant="standard" >
          <InputLabel sx>Sort By</InputLabel>
          <Select
            value={sortConfig.key || 'none'}
            onChange={(e) => requestSort(e.target.value)}
          >
            <MenuItem value="none">None</MenuItem>
            <MenuItem value="name">Name</MenuItem>
            <MenuItem value="matches">Matches</MenuItem>
            <MenuItem value="average">Average</MenuItem>
          </Select>
        </FormControl>
    </div>

        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 65 ,fontfamily: 'Open Sans'}} aria-label="simple table">
            <TableHead style={{ background: '#211f2f' }}>
            <TableRow sx={{color:'white'}}>
                <SortableHeader
                  label="Name"
                  sortKey="name"
                  requestSort={requestSort}
                  sortConfig={sortConfig}
                  SortingIcon={<SortingIcon sortKey="name" />}
                />
                <SortableHeader
                  label="Matches"
                  sortKey="matches"
                  requestSort={requestSort}
                  sortConfig={sortConfig}
                  SortingIcon={<SortingIcon sortKey="matches" />}
                />
                <SortableHeader
                  label="Average"
                  sortKey="average"
                  requestSort={requestSort}
                  sortConfig={sortConfig}
                  SortingIcon={<SortingIcon sortKey="average" />}
                />
                <TableCell sx={{color:'white'}}>Team</TableCell>
                <TableCell sx={{color:'white'}}>Action</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {filteredData()
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((player, index) => (
                  <TableRow key={index} sx={{ backgroundColor: index % 2 === 0 ? '#ffffff' : '#ffefc1' ,color:'red'}}>
                    <TableCell>{player.name}</TableCell>
                    <TableCell>{player.matches}</TableCell>
                    <TableCell>{player.average}</TableCell>
                    <TableCell>{player.team}</TableCell>
                    <TableCell>
                      <Button onClick={() => onDelete(data.indexOf(player))} sx={{color:"Red"}}>Delete</Button>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>

        <div style={{ display: 'flex', justifyContent: 'center', marginTop: 16,color:'white' }}>
        <TablePagination
          rowsPerPageOptions={[5,10,15,20]}
          component="div"
          count={filteredData().length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
        </div>
      </Container>
    </div>
  );
};

const SortableHeader = ({ label, sortKey, requestSort, sortConfig, SortingIcon }) => {
  const getClassNamesFor = (name) => {
    if (!sortConfig.key) {
      return;
    }
    return sortConfig.key === name ? sortConfig.direction : undefined;
  };

  return (
    <TableCell onClick={() => requestSort(sortKey)} className={getClassNamesFor(sortKey)}>
       <div style={{ display: 'flex', alignItems: 'right' ,color:'white'}}>
        {label}
        {SortingIcon}
      </div>
    </TableCell>
  );
};

export default CricketTable;
