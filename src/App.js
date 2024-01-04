
import React, { useState } from 'react';
import CricketTable from './cricket_table';
import cricketData from './cricketer_data.json';

const App = () => {
  const [players, setPlayers] = useState(cricketData);

  const handleDelete = (index) => {
    const updatedPlayers = [...players];
    updatedPlayers.splice(index, 1);
    setPlayers(updatedPlayers);
  };

  return (
    <div>
    <center>
      <h1>Cricket Players Data</h1>
      <CricketTable data={players} onDelete={handleDelete} />
      </center>
    </div>
  );
};

export default App;
