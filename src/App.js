import React, { useState } from 'react';
import './App.css';
import { Route, Routes, Link } from 'react-router-dom';
import BinanceWebSocket from './components/BinanceWebSocket';
import Welcome from './components/Welcome';
import { HistoricalDataProvider } from './contexts/HistoricalDataContent';

function App() {
  // State to store selected options from dropdowns
  const [dropdown1, setDropdown1] = useState('');
  const [dropdown2, setDropdown2] = useState('');

  // Handlers to update dropdown values
  const handleDropdown1Change = (e) => setDropdown1(e.target.value);
  const handleDropdown2Change = (e) => setDropdown2(e.target.value);

  // Check if both dropdowns have a value
  const isNavVisible = dropdown1 && dropdown2;

  return (
    <HistoricalDataProvider>
    <div className="App">
      {/* Dropdown menus */}
      <div>
        <label>
          Select CryptoCurrency:
          <select value={dropdown1} onChange={handleDropdown1Change}>
            <option value="">Select</option>
            <option value="eth">ETH</option>
            <option value="bnb">BNB</option>
            <option value="dot">DOT</option>
          </select>
        </label>

        <label>
          Select TimeInterval:
          <select value={dropdown2} onChange={handleDropdown2Change}>
            <option value="">Select</option>
            <option value="1m">1</option>
            <option value="3m">3</option>
            <option value="5m">5</option>
          </select>
        </label>
      </div>

      <div>
        <nav>
          <Link to="/">Home</Link>
        </nav>
      </div>

      {/* Conditionally render the nav only if both dropdowns have values */}
      {isNavVisible && (
        <div>
          <nav>
            <Link to="/data">Generate Data</Link>
          </nav>
        </div>
      )}

      {/* Pass dropdown values to the route */}
      <Routes>
        <Route path="/" element={<Welcome/>}/>
        <Route
          path="/data"
          element={<BinanceWebSocket dropdown1={dropdown1} dropdown2={dropdown2} />}
        />
      </Routes>
    </div>
    </HistoricalDataProvider>
  );
}

export default App;
