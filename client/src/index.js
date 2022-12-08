import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider as GraphqlProvider } from "urql";
import App from "./App";
import { client } from "./graphql";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <GraphqlProvider value={client}>
    <Router>
      <App />
    </Router>
  </GraphqlProvider>
);
