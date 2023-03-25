import React, { useState, useEffect } from "react";
import EarningsCalendar from "./EarningsCalendar";

const Stock = (props) => {
  const [targetPrice, setTargetPrice] = useState("N/A");

  useEffect(() => {
    async function fetchTargetPrice() {
      const response = await fetch(
        `https://financialmodelingprep.com/api/v4/price-target?symbol=${props.match.params.symbol}&apikey=4131bde50a774b5b89960fe988c591e8`
      );
      const data = await response.json();
      setTargetPrice(data.targetMeanPrice ? data.targetMeanPrice : "N/A");
    }
    fetchTargetPrice();
  }, [props.match.params.symbol]);

  const symbol = props.match.params.symbol;
  const [stockData, setStockData] = useState(null);

  useEffect(() => {
    async function fetchStockData() {
      const response = await fetch(
        `https://financialmodelingprep.com/api/v3/profile/${symbol}?apikey=4131bde50a774b5b89960fe988c591e8`
      );
      const data = await response.json();
      setStockData(data[0]);
    }
    fetchStockData();
  }, [symbol]);

  if (!stockData) {
    return <div>Loading stock data...</div>;
  }

  return (
    <div>
      <h1>
        {stockData.companyName} ({symbol})
      </h1>
      <p>{stockData.description}</p>
      <p>Price: {stockData.price}</p>
      <p>Target Price: {targetPrice}</p>
      <EarningsCalendar symbol={symbol} />
    </div>
  );
};

export default Stock;
