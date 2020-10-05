import React from "react";

import "./App.css";
import RouterHOC from "./route/RouterHOC";
import { ThemeProvider } from "react-jss";
import theme from "./theme";

function App(props) {
  return (
    <>
      <ThemeProvider theme={theme}>
        <RouterHOC />;
      </ThemeProvider>
    </>
  );
}

export default App;
