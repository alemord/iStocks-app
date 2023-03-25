import React, { useState, useEffect } from "react";

function StockData() {
  const [stockPrices, setStockPrices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStockPrices() {
      const response = await fetch(
        "https://financialmodelingprep.com/api/v3/stock-screener?marketCapMoreThan=1000000000&betaMoreThan=1&volumeMoreThan=10000&sector=Technology&exchange=NASDAQ&dividendMoreThan=0&limit=100&apikey=4131bde50a774b5b89960fe988c591e8"
      );
      const data = await response.json();
      setStockPrices(data.stockList);
      setLoading(false);
    }
    fetchStockPrices();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h2>Stock Prices</h2>
      <ul>
        {stockPrices.map((stock, index) => (
          <li key={index}>
            {stock.symbol}: {stock.price}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default StockData;
