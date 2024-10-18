// src/components/BinanceWebSocket.js
// src/components/BinanceWebSocket.js
import React, { useEffect, useState } from 'react';
import { useHistoricalData } from '../contexts/HistoricalDataContent';
import CandlestickChart from './CandlestickChart';


function BinanceWebSocket({ dropdown1, dropdown2 }) {
  const { addData, getData } = useHistoricalData();
  const [latestPriceData, setLatestPriceData] = useState(null);
  
  const combinationKey = `${dropdown1}-${dropdown2}`; // Create a unique key for each combination

  useEffect(() => {
    if (dropdown1 && dropdown2) {
      const socketUrl = `wss://stream.binance.com:9443/ws/${dropdown1.toLowerCase()}usdt@kline_${dropdown2}`;
      const socket = new WebSocket(socketUrl);

      socket.addEventListener('message', (event) => {
        const data = JSON.parse(event.data);
        const kline = data.k;

        const priceInfo = {
          o: kline.o,
          c: kline.c,
          h: kline.h,
          l: kline.l,
          v: kline.v,
          t: kline.t,
        };

        setLatestPriceData(priceInfo);
        addData(combinationKey, priceInfo); // Add data to context
      });

      return () => {
        socket.close();
      };
    }
  }, [dropdown1, dropdown2]); // Dependencies for useEffect

  const historicalData = getData(combinationKey); // Retrieve historical data
  console.log("Historical Data",historicalData);

  return (
    <div>
      <h1>{dropdown1.toUpperCase()}/USDT {dropdown2}-Minute Kline Data</h1>
      {latestPriceData ? (
        <>
          <CandlestickChart priceData={[...historicalData, latestPriceData]} />
          <h2>Latest Data:</h2>
          <ul>
            <li>Open: {latestPriceData.o}</li>
            <li>Close: {latestPriceData.c}</li>
            <li>High: {latestPriceData.h}</li>
            <li>Low: {latestPriceData.l}</li>
            <li>Volume: {latestPriceData.v}</li>
            <li>Time: {new Date(latestPriceData.t).toLocaleTimeString()}</li>
          </ul>
        </>
      ) : (
        <p>Loading data...</p>
      )}
    </div>
  );
}

export default BinanceWebSocket;
