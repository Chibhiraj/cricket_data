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

const CricketTable = ({ data, onDelete }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

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

//Function for sorting is implemented here.
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

//Search function starts here.
  const filteredData = () => {
    return sortedData().filter(
      (player) =>
        player.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };


//Returning the required table.
  return (
    <div>
      <Container >
        <TextField
          margin='dense'
          type="text"
          placeholder="Search by Name"
          value={searchTerm}
          variant="standard"
          onChange={handleSearch}
          
        />

        <FormControl variant="standard" sx={{ marginLeft: 100 }}>
          <InputLabel>Sort By</InputLabel>
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

        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 65 }} aria-label="simple table">
            <TableHead style={{ background: 'linear-gradient(to right,#4ecdc4, #556270)' }}>
              <TableRow>
                <SortableHeader
                  label="Name"
                  sortKey="name"
                  requestSort={requestSort}
                  sortConfig={sortConfig}
                  
                />
                <SortableHeader
                  label="Matches"
                  sortKey="matches"
                  requestSort={requestSort}
                  sortConfig={sortConfig}
                />
                <SortableHeader
                  label="Average"
                  sortKey="average"
                  requestSort={requestSort}
                  sortConfig={sortConfig}
                />
                <TableCell>Team</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {filteredData().map((player, index) => (
                <TableRow key={index}>
                  <TableCell>{player.name}</TableCell>
                  <TableCell>{player.matches}</TableCell>
                  <TableCell>{player.average}</TableCell>
                  <TableCell>{player.team}</TableCell>
                  <TableCell>
                    <Button onClick={() => onDelete(data.indexOf(player))}>Delete</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </div>
  );
};



//The header sorting is implemented from here
const SortableHeader = ({ label, sortKey, requestSort, sortConfig }) => {
  const getClassNamesFor = (name) => {
    if (!sortConfig.key) {
      return;
    }
    return sortConfig.key === name ? sortConfig.direction : undefined;
  };

  return (
    <TableCell onClick={() => requestSort(sortKey)} className={getClassNamesFor(sortKey)}>
      {label}
    </TableCell>
  );
};

export default CricketTable;
