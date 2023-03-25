import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Dashboard() {
  const [stocks, setStocks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStocks() {
      const response = await fetch(
        "https://financialmodelingprep.com/api/v3/stock-screener?marketCapMoreThan=1000000000&betaMoreThan=1&volumeMoreThan=10000&sector=Technology&exchange=NASDAQ&dividendMoreThan=0&limit=100&apikey=4131bde50a774b5b89960fe988c591e8"
      );
      const data = await response.json();
      setStocks(data);
      setLoading(false);
    }
    fetchStocks();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h2>Technology Stocks</h2>
      {stocks &&
        stocks.map((stock, index) => (
          <Link key={index} to={`/stocks/${stock.symbol}`}>
            <div>
              {stock.symbol} - {stock.companyName}
            </div>
          </Link>
        ))}
    </div>
  );
}

export default Dashboard;
