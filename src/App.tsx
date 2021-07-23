import React from 'react';
import logo from './logo.svg';
import './App.css';
import IndustryTable from './components/Industries/IndustryTable';
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <IndustryTable />
      </header>
    </div>
  );
}

export default App;
