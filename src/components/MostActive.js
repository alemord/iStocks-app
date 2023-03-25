import React, { useState, useEffect } from "react";

function MostActive() {
  const [mostActive, setMostActive] = useState(null);

  useEffect(() => {
    async function fetchMostActive() {
      const response = await fetch(
        "https://financialmodelingprep.com/api/v3/stock/actives?apikey=4131bde50a774b5b89960fe988c591e8"
      );
      const data = await response.json();
      setMostActive(data.mostActiveStock);
    }
    fetchMostActive();
  }, []);

  if (!mostActive) {
    return <div>Loading most active stocks data...</div>;
  }

  return (
    <div>
      <h2>Most Active Stocks of the Day</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Changes</th>
            <th>Changes Percentage</th>
          </tr>
        </thead>
        <tbody>
          {mostActive.map((stock, index) => (
            <tr key={index}>
              <td>{stock.companyName}</td>
              <td>{stock.price}</td>
              <td style={{ color: stock.changes >= 0 ? "green" : "red" }}>
                {stock.changes}
              </td>
              <td
                style={{
                  color: stock.changesPercentage >= 0 ? "green" : "red"
                }}
              >
                {stock.changesPercentage}
              </td>
              <td>{stock.symbol}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default MostActive;
