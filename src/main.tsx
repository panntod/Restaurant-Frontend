import { BrowserRouter as Router } from "react-router-dom";
import ReactDOM from "react-dom";
import React from "react";
import App from "./App";
import { Toaster } from "react-hot-toast"
import "./index.css";

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Toaster position="top-right"/>
      <App />
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
