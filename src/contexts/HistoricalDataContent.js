// src/contexts/HistoricalDataContext.js
import React, { createContext, useContext, useState } from 'react';

// Create the context
const HistoricalDataContext = createContext();

// Create a provider component
export const HistoricalDataProvider = ({ children }) => {
  const [historicalData, setHistoricalData] = useState({});

  const addData = (key, data) => {
    setHistoricalData((prevData) => ({
      ...prevData,
      [key]: [...(prevData[key] || []), data],
    }));
  };

  const getData = (key) => historicalData[key] || [];

  return (
    <HistoricalDataContext.Provider value={{ addData, getData }}>
      {children}
    </HistoricalDataContext.Provider>
  );
};

// Create a custom hook for using the context
export const useHistoricalData = () => {
  return useContext(HistoricalDataContext);
};
