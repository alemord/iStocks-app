import React, { useState, useEffect } from "react";

function EarningsCalendar(props) {
  const [earningsCalendar, setEarningsCalendar] = useState(null);
  const symbol = props.symbol;

  useEffect(() => {
    async function fetchEarningsCalendar() {
      const response = await fetch(
        `https://financialmodelingprep.com/api/v3/historical/earning_calendar/${symbol}?apikey=4131bde50a774b5b89960fe988c591e8`
      );
      const data = await response.json();
      if (Array.isArray(data)) {
        setEarningsCalendar(data);
      } else {
        setEarningsCalendar([]);
      }
    }
    fetchEarningsCalendar();
  }, [symbol]);

  if (!earningsCalendar) {
    return <div>Loading earnings calendar data...</div>;
  }

  return (
    <div>
      <h2>Earnings Calendar</h2>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>EPS Actual</th>
            <th>EPS Estimate</th>
            <th>Time</th>
          </tr>
        </thead>
        <tbody>
          {earningsCalendar.map((earning, index) => (
            <tr key={index}>
              <td>{earning.date}</td>
              <td>{earning.epsActual}</td>
              <td>{earning.epsEstimate}</td>
              <td>{earning.time}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default EarningsCalendar;
