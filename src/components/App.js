import React from "react";
import stockData from "./stock-data";
import Header from "./Header";
import Main from "./Main";
import { withRouter } from "react-router";
// import { withRouter } from 'react-router'

function App(props) {
  return (
    <div>
      <Header />
      <Main stockData={stockData} />
    </div>
  );
}

// export default App;
export default withRouter(App);
